import { z } from "zod";
import {
  InitiativeStatus,
  ParticipantRole,
  TargetAudience,
} from "@prisma/client";

// Validate the custom participation question form fields
export const FormFieldSchema = z.object({
  id: z.string(),
  question: z.string().min(3, "السؤال يجب أن يكون 3 أحرف على الأقل"),
  type: z.enum(["text", "radio", "checkbox"]),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
});

export type FormFieldType = z.infer<typeof FormFieldSchema>;

export const NewInitiativeSchema = z
  .object({
    titleAr: z
      .string()
      .min(5, "العنوان يجب أن يكون 5 أحرف على الأقل")
      .max(200, "العنوان يجب أن يكون أقل من 200 حرف"),
    titleEn: z
      .string()
      .max(200, "العنوان يجب أن يكون أقل من 200 حرف")
      .optional(),
    shortDescriptionAr: z
      .string()
      .max(500, "الوصف المختصر يجب أن يكون أقل من 500 حرف")
      .optional(),
    shortDescriptionEn: z
      .string()
      .max(500, "الوصف المختصر يجب أن يكون أقل من 500 حرف")
      .optional(),
    descriptionAr: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
    descriptionEn: z.string().optional(),

    categoryId: z.string().min(1, "يجب اختيار تصنيف"),

    location: z.string().min(3, "يجب إدخال موقع المبادرة"),
    city: z.string().min(1, "يجب إدخال المدينة"),
    state: z.string().optional(),
    country: z.string().default("Algeria"),

    startDate: z.date().refine((val) => val !== undefined, {
      message: "يجب تحديد تاريخ البدء",
    }),
    endDate: z.date().refine((val) => val !== undefined, {
      message: "يجب تحديد تاريخ الانتهاء",
    }),
    registrationDeadline: z.date().optional(),

    targetAudience: z.enum(TargetAudience, {
      message: "الجمهور المستهدف مطلوب",
    }),

    maxParticipants: z.number().int().positive().optional(),

    // allowedRoles: z.array(
    //   z.enum(ParticipantRole, {
    //     message: "يجب اختيار دور مشارك واحد على الأقل",
    //   })
    // ),

    // Form settings
    requiresForm: z.boolean().default(true),
    participationQstForm: z.array(FormFieldSchema).optional(),

    coverImage: z.string().optional().nullable(),

    status: z
      .enum(InitiativeStatus, {
        message: "حالة المبادرة مطلوبة",
      })
      .default(InitiativeStatus.draft),
  })
  .refine(
    (data) => {
      return data.endDate > data.startDate;
    },
    {
      message: "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.registrationDeadline) {
        return data.registrationDeadline <= data.endDate;
      }
      return true;
    },
    {
      message: "الموعد النهائي للتسجيل يجب أن يكون قبل تاريخ الانتهاء",
      path: ["registrationDeadline"],
    }
  )
  // .refine(
  //   (data) => {
  //     if (data.allowedRoles.length === 0) {
  //       return false;
  //     }
  //     return true;
  //   },
  //   {
  //     message: "يجب اختيار دور مشارك واحد على الأقل",
  //     path: ["allowedRoles"],
  //   }
  // )
  .refine(
    (data) => {
      if (data.requiresForm) {
        return (
          data.participationQstForm && data.participationQstForm.length > 0
        );
      }
      return true;
    },
    {
      message: "يجب إضافة أسئلة نموذج المشاركة",
      path: ["participationQstForm"],
    }
  );

export type NewInitiativeFormData = z.infer<typeof NewInitiativeSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateNewInitiativeData(data: any) {
  console.log("Validating data:", data);
  const result = NewInitiativeSchema.safeParse(data);
  return result;
}
