import {
  InitiativeStatus,
  OrganizerType,
  TargetAudience,
} from "@prisma/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type CarouselImage = {
  id: number;
  src: string;
  alt: string;
};
export type TestimonialOpinion = {
  id: number;
  userName: string;
  userJob: string;
  comment: string;
};
export type Partner = {
  imageSrc: string;
  name: string;
};
export type AboutInfo = {
  title: string;
  description: string;
};

// ===== FORM TYPES =====
export interface FormData {
  [fieldId: string]: any;
}

export interface FormField {
  id: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "multiselect"
    | "file"
    | "checkbox"
    | "radio";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select/radio/checkbox
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ===== SEARCH & FILTER TYPES =====
export interface InitiativeFilters {
  search?: string;
  categoryId?: number;
  city?: string;
  targetAudience?: TargetAudience;
  status?: InitiativeStatus;
  startDate?: string;
  endDate?: string;
  organizerType?: OrganizerType;
  maxDistance?: number; // in km
  hasAvailableSpots?: boolean;
}

export interface ProximitySearch {
  latitude: number;
  longitude: number;
  radiusKm?: number;
}

// ======== Supabase Storage ========

export type BUCKETS = "avatars" | "documents" | "post-images";

export const BUCKET_MIME_TYPES = {
  avatars: ["image/jpeg", "image/jpg", "image/png", "image/jpg"],

  // DOCUMENTS BUCKET (Organization verification docs)
  documents: [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",

    // PDFs
    "application/pdf",
  ],

  // POST-IMAGES BUCKET
  "post-images": [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ],
};
export const BUCKET_SIZE_LIMITS = {
  avatars: 10 * 1024 * 1024, // 10MB
  documents: 15 * 1024 * 1024, // 15MB
  "post-images": 30 * 1024 * 1024, // 30MB
};
