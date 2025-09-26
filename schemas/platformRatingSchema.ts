import { z } from "zod";

export const ratingOptions = ["ممتاز", "جيد جدا", "جيد", "ضعيف"] as const;
export const platformSections = [
  "المبادرات التطوعية",
  "فرص التدريب والتطوير",
  "الدليل العربي للمنظمات",
  "المقالات والموارد",
  "أخرى",
] as const;
export const recommendationOptions = ["نعم، بالتأكيد", "ربما", "لا"] as const;

export const platformRatingSchema = z
  .object({
    easeOfUse: z.enum(ratingOptions, {
      error: "يرجى تقييم سهولة الاستخدام",
    }),
    informationClarity: z.enum(ratingOptions, {
      error: "يرجى تقييم وضوح المعلومات",
    }),
    contentDiversity: z.enum(ratingOptions, {
      error: "يرجى تقييم تنوع المحتوى",
    }),
    performanceSpeed: z.enum(ratingOptions, {
      error: "يرجى تقييم سرعة التصفح والأداء",
    }),
    generalSatisfaction: z.enum(ratingOptions, {
      error: "يرجى تقييم رضاك العام عن المنصة",
    }),
    usefulSections: z.array(z.enum(platformSections)),
    encounteredDifficulties: z.enum(["نعم", "لا"], {
      error: "يرجى الإجابة على هذا السؤال",
    }),
    difficultiesDetails: z.string().optional(),
    improvementSuggestions: z.string().optional(),
    wouldRecommend: z.enum(recommendationOptions, {
      error: "يرجى الإجابة على هذا السؤال",
    }),
    appRating: z.enum(["1", "2", "3", "4", "5"], {
      error: "يرجى تقييم المبادرة",
    }),
  })
  .refine(
    (data) => {
      if (data.encounteredDifficulties === "نعم") {
        return (
          data.difficultiesDetails !== undefined &&
          data.difficultiesDetails.trim().length > 0
        );
      }
      return true;
    },
    {
      error: "يرجى تقديم تفاصيل حول الصعوبات التي واجهتها",
      path: ["difficultiesDetails"],
    }
  );

export type PlatformRatingFormData = z.infer<typeof platformRatingSchema>;
