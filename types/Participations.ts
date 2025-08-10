/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from "./Base";
import { Initiative } from "./Inititaives";
import { User } from "./User";

export enum ParticipationStatus {
  REGISTERED = "registered",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum ParticipationType {
  DIRECT = "direct",
  ORG_MEMBER = "org_member",
  TEMPORARY_MEMBER = "temporary_member",
}

export enum ParticipantRole {
  HELPER = "helper",
  PARTICIPANT = "participant",
}

// ===== PARTICIPATION TYPES =====
export interface InitiativeParticipation extends BaseEntity {
  initiativeId: string | number;
  userId: string | number;
  participationType: ParticipationType;
  status: ParticipationStatus;
  participantRole: ParticipantRole;
  membershipFormData?: Record<string, any>;
  adminNotes?: string;
  isCheckedIn: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  registeredAt: string;

  // Relations
  user: Pick<User, "id" | "firstName" | "lastName" | "profileImage">;
  initiative: Pick<Initiative, "id" | "titleAr" | "titleEn">;
}
