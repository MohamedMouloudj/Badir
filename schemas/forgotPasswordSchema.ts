import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .email({ error: "يرجى إدخال بريد إلكتروني صحيح" })
    .min(1, "البريد الإلكتروني مطلوب"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
