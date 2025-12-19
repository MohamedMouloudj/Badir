import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ error: "كلمة المرور مطلوبة" })
      .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم واحد على الأقل",
      ),
    confirmPassword: z
      .string({ error: "تأكيد كلمة المرور مطلوب" })
      .min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
