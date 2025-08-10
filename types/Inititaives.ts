import { BaseEntity, Location } from "./Base";
import { Organization } from "./Organizations";
import { InitiativeParticipation } from "./Participations";
import { InitiativePost } from "./Posts";
import { FormField } from "./Statics";
import { User } from "./User";

export enum InitiativeStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TargetAudience {
  HELPERS = "helpers",
  PARTICIPANTS = "participants",
  BOTH = "both",
}

export enum OrganizerType {
  USER = "user",
  ORGANIZATION = "organization",
}

export interface InitiativeCategory {
  id: number;
  nameAr: string;
  nameEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  isActive: boolean;
}

export interface Initiative extends BaseEntity, Location {
  organizerType: OrganizerType;
  organizerUserId?: string | number;
  organizerOrgId?: string | number;
  createdByUserId: string | number;
  categoryId: number;
  titleAr: string;
  titleEn?: string;
  descriptionAr: string;
  descriptionEn?: string;
  shortDescriptionAr?: string;
  shortDescriptionEn?: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationDeadline?: string;
  maxParticipants: number;
  currentParticipants: number;
  isOpenParticipation: boolean;
  targetAudience: TargetAudience;
  requiredQualifications?: string[]; // Array of qualification categories
  requiresOrgMembership: boolean;
  allowTemporaryMembership: boolean;
  membershipFormFields?: FormField[];
  status: InitiativeStatus;
  isFeatured: boolean;
  coverImage?: string;
  gallery?: string[];

  // Relations
  category: InitiativeCategory;
  organizerUser?: User;
  organizerOrg?: Organization;
  createdBy: User;
}

export interface InitiativeCard
  extends Pick<
    Initiative,
    | "id"
    | "titleAr"
    | "titleEn"
    | "shortDescriptionAr"
    | "shortDescriptionEn"
    | "coverImage"
    | "city"
    | "startDate"
    | "endDate"
    | "maxParticipants"
    | "currentParticipants"
    | "targetAudience"
    | "status"
    | "isFeatured"
  > {
  category: Pick<
    InitiativeCategory,
    "nameAr" | "nameEn" | "icon" | "bgColor" | "textColor"
  >;
  organizer: {
    type: OrganizerType;
    name: string;
    image?: string;
  };
  distance?: number; // in kilometers
}

export interface InitiativeDetails extends Initiative {
  participants: InitiativeParticipation[];
  posts: InitiativePost[];
  canJoin: boolean;
  userParticipation?: InitiativeParticipation;
}
