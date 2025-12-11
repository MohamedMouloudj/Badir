import { z } from "zod";

// Hex color validation regex
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const categorySchema = z.object({
  nameAr: z
    .string()
    .min(2, "يجب أن يحتوي الاسم بالعربية على حرفين على الأقل")
    .max(100, "يجب ألا يتجاوز الاسم بالعربية 100 حرف"),
  nameEn: z
    .string()
    .max(100, "يجب ألا يتجاوز الاسم بالإنجليزية 100 حرف")
    .optional()
    .or(z.literal("")),
  descriptionAr: z
    .string()
    .max(500, "يجب ألا يتجاوز الوصف بالعربية 500 حرف")
    .optional()
    .or(z.literal("")),
  descriptionEn: z
    .string()
    .max(500, "يجب ألا يتجاوز الوصف بالإنجليزية 500 حرف")
    .optional()
    .or(z.literal("")),
  icon: z
    .string()
    .max(100, "يجب ألا يتجاوز رمز الأيقونة 100 حرف")
    .optional()
    .or(z.literal("")),
  bgColor: z
    .string()
    .regex(hexColorRegex, "يجب أن يكون اللون بصيغة hex صحيحة (مثال: #FF5733)")
    .optional()
    .or(z.literal("")),
  textColor: z
    .string()
    .regex(hexColorRegex, "يجب أن يكون اللون بصيغة hex صحيحة (مثال: #FFFFFF)")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().optional().default(true),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
