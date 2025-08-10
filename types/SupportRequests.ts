import { BaseEntity } from "./Base";
import { Initiative } from "./Inititaives";
import { User } from "./User";

export enum SupportType {
  LOGISTICAL = "logistical",
  MEDIA = "media",
  HUMAN_RESOURCES = "human_resources",
  TECHNICAL = "technical",
  FINANCIAL = "financial",
  OTHER = "other",
}

export enum SupportUrgency {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum SupportStatus {
  PENDING = "pending",
  IN_REVIEW = "in_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

// ===== SUPPORT REQUEST TYPES =====
export interface SupportRequest extends BaseEntity {
  initiativeId: string | number;
  requesterId: string | number;
  supportType: SupportType;
  title: string;
  description: string;
  urgency: SupportUrgency;
  status: SupportStatus;
  adminNotes?: string;
  requestedAt: string;

  // Relations
  initiative: Pick<Initiative, "id" | "titleAr" | "titleEn">;
  requester: Pick<User, "id" | "firstName" | "lastName">;
}
