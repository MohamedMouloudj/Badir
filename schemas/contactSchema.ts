import z from "zod";

const inquiryTypes = [
  "طلب تطوع",
  "الفرص المتاحة",
  "استفسار عن مبادرة",
  "إضافة مبادرة",
  "شراكة",
  "دعم فني",
  "مساعدة على المنصة",
  "استفسار عام",
  "اقتراح",
  "شكوى",
  "استفسار إعلامي",
  "معلومات قانونية",
  "تمويل المنصة",
] as const;

const contactSchema = z.object({
  email: z
    .email("البريد الإلكتروني غير صالح")
    .min(1, "البريد الإلكتروني مطلوب"),
  fullName: z.string().min(2, "الاسم الكامل مطلوب").max(100),
  title: z.string().min(2, "عنوان الرسالة مطلوب").max(100),
  inquiryType: z.enum(inquiryTypes),
  message: z.string().min(10, "يجب أن تكون على الأقل 10 أحرف").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export { inquiryTypes, contactSchema, type ContactFormData };
