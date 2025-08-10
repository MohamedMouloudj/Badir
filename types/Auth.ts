import { UserType } from "./User";

// ===== AUTHENTICATION TYPES =====
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: UserType;
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface AuthUser {
  id: string | number;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  profileImage?: string;
  isActive: boolean;
}
