import { ParticipantRole } from "@prisma/client";
import z from "zod";

export const FormResponseSchema = z.record(
  z.string(),
  z.string().or(z.array(z.string()))
);
export type FormResponseType = z.infer<typeof FormResponseSchema>;

export interface JoinInitiativeParams {
  initiativeId: string;
  role: ParticipantRole;
  formResponses?: FormResponseType;
}
