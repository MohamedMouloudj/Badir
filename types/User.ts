import { BaseEntity, Location } from "./Base";
import { OrganizationMembership } from "./Organizations";

export enum UserType {
  HELPER = "helper",
  PARTICIPANT = "participant",
  BOTH = "both",
}

export enum CertificateType {
  PDF = "pdf",
  IMAGE = "image",
}

// ===== USER TYPES =====
export interface User extends BaseEntity, Location {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  profileImage?: string;
  bio?: string;
  userType: UserType;
  isActive: boolean;
}

export interface UserProfile extends User {
  qualifications: UserQualification[];
  organizationMemberships: OrganizationMembership[];
  stats: {
    initiativesParticipated: number;
    initiativesOrganized: number;
  };
}

export interface UserQualification extends BaseEntity {
  userId: string | number;
  title: string;
  description: string;
  certificateType: CertificateType;
  certificateUrl: string;
  isVerified: boolean;
  verifiedBy?: string | number;
  verifiedAt?: string;
  qualificationCategory?: string;
}
