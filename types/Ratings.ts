import { BaseEntity } from "./Base";

export interface UserInitiativeRating extends BaseEntity {
  userId: number;
  initiativeId: number;
  rating?: number;
  comment?: string;
}

export type CreateRatingRequest = Omit<UserInitiativeRating, keyof BaseEntity>;
export type UpdateRatingRequest = Partial<
  Omit<UserInitiativeRating, keyof BaseEntity | "userId" | "initiativeId">
>;

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    [key: number]: number;
  };
}
