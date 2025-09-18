import { prisma } from "@/lib/db";
import {
  Initiative,
  InitiativeCategory,
  InitiativeParticipant,
  Organization,
  ParticipantRole,
  ParticipationStatus,
  User,
  UserInitiativeRating,
} from "@prisma/client";

export type UserParticipation = {
  type: "participant" | "organizer";
  participantRole: ParticipantRole;
  status: ParticipationStatus;
  initiative: Initiative & {
    category: InitiativeCategory;
    organizerUser?: User | null;
    organizerOrg?: Organization | null;
  };
  rating: UserInitiativeRating | null;
};

export class ParticipationService {
  static API_PATH = "/participations";

  static async getUserParticipations(
    userId: string
  ): Promise<UserParticipation[]> {
    // Participations as participant
    const participations = await prisma.initiativeParticipant.findMany({
      where: {
        userId,
        status: { not: "cancelled" },
      },
      include: {
        initiative: {
          include: {
            category: true,
            organizerUser: true,
            organizerOrg: true,
          },
        },
      },
    });

    // Initiatives organized by the user (always manager)
    const organizedInitiatives = await prisma.initiative.findMany({
      where: {
        organizerUserId: userId,
      },
      include: {
        category: true,
        organizerUser: true,
        organizerOrg: true,
      },
    });

    // Get ratings for all relevant initiatives
    const initiativeIds = [
      ...participations.map((p) => p.initiativeId),
      ...organizedInitiatives.map((i) => i.id),
    ];
    const ratings = await prisma.userInitiativeRating.findMany({
      where: {
        userId,
        initiativeId: { in: initiativeIds },
      },
    });

    // Merge everything
    const participationsData = participations.map((p) => ({
      type: "participant" as const,
      participantRole: p.participantRole,
      status: p.status,
      initiative: p.initiative,
      rating: ratings.find((r) => r.initiativeId === p.initiativeId) || null,
    }));

    const organizedData = organizedInitiatives.map((i) => ({
      type: "organizer" as const,
      participantRole: ParticipantRole.manager,
      status: ParticipationStatus.approved,
      initiative: i,
      rating: ratings.find((r) => r.initiativeId === i.id) || null,
    }));

    return [...participationsData, ...organizedData];
  }

  static async getAll(): Promise<InitiativeParticipant[]> {
    return await prisma.initiativeParticipant.findMany({
      include: {
        initiative: {
          include: {
            category: true,
            organizerUser: true,
            organizerOrg: true,
          },
        },
      },
    });
  }
}
