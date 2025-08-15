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

// ------------------------- Complete profile schema ----------------//

export const step1Schema = z.object({
  dateOfBirth: z
    .string()
    .min(1, "تاريخ الميلاد مطلوب")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13;
    }, "يجب أن تكون 13 سنة على الأقل"),
  sex: z.enum(["male", "female"], {
    message: "الجنس مطلوب",
  }),
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .regex(/^[+]?[0-9]{8,20}$/, "رقم الهاتف غير صحيح"),
  city: z.string().max(100, "المدينة يجب أن تكون أقل من 100 حرف").optional(),
  state: z
    .string()
    .min(1, "الولاية مطلوبة")
    .max(100, "الولاية يجب أن تكون أقل من 100 حرف"),
  country: z
    .string()
    .max(100, "البلد يجب أن يكون أقل من 100 حرف")
    .default("Algeria"),
  latitude: z
    .number()
    .min(-90, "خط العرض غير صحيح")
    .max(90, "خط العرض غير صحيح")
    .optional(),
  longitude: z
    .number()
    .min(-180, "خط الطول غير صحيح")
    .max(180, "خط الطول غير صحيح")
    .optional(),
});

export const step2Schema = z.object({
  specification: z
    .string()
    .min(1, "التخصص مطلوب")
    .max(100, "التخصص يجب أن يكون أقل من 100 حرف"),
  educationalLevel: z
    .string()
    .min(1, "المستوى التعليمي مطلوب")
    .max(100, "المستوى التعليمي يجب أن يكون أقل من 100 حرف"),
  currentJob: z
    .string()
    .optional()
    .refine(
      (currentJob) => !currentJob || currentJob.length <= 100,
      "الوظيفة الحالية يجب ألا تتجاوز 100 حرف"
    ),
  bio: z
    .string()
    .optional()
    .refine(
      (bio) => !bio || bio.length <= 1000,
      "النبذة الشخصية يجب أن تكون أقل من 1000 حرف"
    ),
  userType: z.enum(["helper", "participant", "both"], {
    message: "نوع المستخدم مطلوب",
  }),
});

export const step3Schema = z.object({
  acceptConditions: z.boolean().refine((val) => val === true, {
    message: "يجب قبول الشروط والأحكام",
  }),
});

// Combined schema for all steps
export const registrationSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

// TypeScript types
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Options for select inputs
export const sexOptions = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

export const educationalLevelOptions = [
  { value: "other", label: "أخرى" },
  { value: "postgraduate", label: "دراسات عليا" },
  { value: "university", label: "جامعي" },
  { value: "secondary", label: "ثانوي" },
];

export const userTypeOptions = [
  { value: "both", label: "كلاهما" },
  { value: "participant", label: "مستفيد" },
  { value: "helper", label: "متطوع" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateStep = (step: number, data: any) => {
  switch (step) {
    case 1:
      return step1Schema.safeParse(data);
    case 2:
      return step2Schema.safeParse(data);
    case 3:
      return step3Schema.safeParse(data);
    default:
      throw new Error("Invalid step number");
  }
};
