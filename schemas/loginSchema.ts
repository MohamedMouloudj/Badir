import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("البريد الإلكتروني غير صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
