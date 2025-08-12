import { z } from "zod";

export const initialSignupSchema = z
  .object({
    email: z
      .email("البريد الإلكتروني غير صحيح")
      .min(1, "البريد الإلكتروني مطلوب"),
    password: z
      .string()
      .min(1, "كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    firstName: z
      .string()
      .min(1, "الاسم الأول مطلوب")
      .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
    lastName: z
      .string()
      .min(1, "اسم العائلة مطلوب")
      .min(2, "اسم العائلة يجب أن يكون حرفين على الأقل"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["confirmPassword"],
  });

export type InitialSignupFormData = z.infer<typeof initialSignupSchema>;
