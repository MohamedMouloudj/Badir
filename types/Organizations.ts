import { BaseEntity, Location } from "./Base";

export enum OrganizationRole {
  ADMIN = "admin",
  MANAGER = "manager",
  MEMBER = "member",
}

export enum OrganizationStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

// ===== ORGANIZATION TYPES =====
export interface Organization extends BaseEntity, Location {
  name: string;
  description?: string;
  logo?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  address?: string;
  isVerified: boolean;
  isActive: boolean;
}

export interface OrganizationMembership {
  id: string | number;
  organizationId: string | number;
  userId: string | number;
  role: OrganizationRole;
  status: OrganizationStatus;
  joinedAt: string;
  organization: Organization;
}
