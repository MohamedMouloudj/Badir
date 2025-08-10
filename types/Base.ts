// ===== BASE INTERFACES =====
export interface BaseEntity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  latitude?: number;
  longitude?: number;
  city?: string;
  state?: string;
  country?: string;
}
