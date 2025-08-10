import { BaseEntity } from "./Base";
import { User } from "./User";

export enum PostType {
  ANNOUNCEMENT = "announcement",
  UPDATE = "update",
  INSTRUCTION = "instruction",
  MEDIA = "media",
}

// ===== POST TYPES =====
export interface InitiativePost extends BaseEntity {
  initiativeId: string | number;
  authorId: string | number;
  title?: string;
  content: string;
  postType: PostType;
  attachments?: MediaAttachment[];
  isPinned: boolean;
  isVisible: boolean;

  // Relations
  author: Pick<User, "id" | "firstName" | "lastName" | "profileImage">;
}

export interface MediaAttachment {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  filename: string;
  size: number;
}
