// components/pages/footer-pages/Terms.tsx
import { Scale } from "lucide-react";
import { FooterPageSection } from "@/components/pages/FooterPageSection";
import { FooterPageItem } from "@/components/pages/FooterPageItem";
import AppButton from "@/components/AppButton";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:px-8" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="bg-primary-500 mb-4 rounded-full p-4">
          <Scale className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-primary-500 section-title mb-2 font-bold">
          شروط الاستخدام
        </h2>
        <p className="text-neutrals-600 text-secondary-sm max-w-2xl text-center font-semibold">
          اقرأ بعناية وتأكد من استخدام منصتنا وفقًا لشروط استخدامنا
        </p>
      </div>

      {/* Introduction Section */}
      <FooterPageSection title="مقدمة">
        <p className="mb-2">
          مرحبًا بك في &quot;منصة بادر&quot; - الفصل التطوعي. تُحكم هذه الشروط
          والأحكام استخدامك للمنصة العربية السعودية. هدفنا هو جعلها واضحة
          ومفهومة لتوضيح التوقعات وحماية الحقوق المتبادلة على منصتنا.
        </p>
        <p>
          نحن نحتفظ بالحق في تعديل هذه الشروط من وقت لآخر وسيتم إعلام جميع
          المستخدمين بهذه التغييرات. من المستحسن مراجعة الشروط بانتظاذ للبقاء
          على اطلاع بأحدث التحديث.
        </p>
      </FooterPageSection>

      {/* Accepting Terms Section */}
      <FooterPageSection title="قبول الشروط">
        <FooterPageItem text="بالوصول إلى منصتنا أو استخدامها، فإنك توافق على الالتزام بهذه الشروط والأحكام" />
        <FooterPageItem text="إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام المنصة" />
        <FooterPageItem text="تحتفظ بادر بالحق في تغيير هذه الشروط في أي وقت دون إشعار مسبق" />
        <FooterPageItem text="يعتبر استمرارك لاستخدام المنصة بعد نشر التغييرات موافقة على الشروط المحدثة" />
      </FooterPageSection>

      {/* Acceptable Use Section */}
      <FooterPageSection title="الاستخدام المقبول">
        <FooterPageItem text="يجب استخدام المنصة للأغراض المشروعة فقط" />
        <FooterPageItem text="يلتزم جميع مستخدمي بادر باحترام حقوق الآخرين" />
        <FooterPageItem text="عدم مشاركة معلومات مضللة أو غير صحيحة أو إزعاج الغير" />
        <FooterPageItem text="احترام خصوصية المستخدمين الآخرين وعدم التشهير بهم" />
      </FooterPageSection>

      {/* Content and IP Section */}
      <FooterPageSection title="المحتوى والملكية الفكرية">
        <FooterPageItem text="تحتفظ منصتنا بجميع حقوق الملكية الفكرية للمنصة" />
        <FooterPageItem text="المحتوى الذي تنشره على المنصة يبقى ملكك ولكننا نحتفظ باستخدامه" />
        <FooterPageItem text="يحظر أي انتهاك لحقوق الملكية الفكرية عند استخدام منصتنا" />
        <FooterPageItem text="نحترم حقوق الملكية الفكرية للآخرين ونتوقع منك فعل ذلك أيضًا" />
      </FooterPageSection>

      {/* Responsibility Section */}
      <FooterPageSection title="المسؤولية وإخلاء المسؤولية">
        <FooterPageItem text="تنصل المنصة مسؤوليتها إلى أقصى حد ممكن من أي ضرر يلحق بالمستخدم" />
        <FooterPageItem text="لسنا مسؤولين عن أي أضرار مباشرة أو غير مباشرة من استخدام المنصة" />
        <FooterPageItem text="معلوماتك الشخصية هي مسؤوليتك، فكن حذرًا دائمًا" />
        <FooterPageItem text="يرجى الإبلاغ عن جميع المشكلات إذا لاحظت أي خرق" />
      </FooterPageSection>

      {/* Account Rules Section */}
      <FooterPageSection title="قواعد الحساب">
        <FooterPageItem text="إنشاء الحساب: عليك تقديم معلومات صحيحة ودقيقة عند إنشاء حسابك" />
        <FooterPageItem text="أمان الحساب: أنت مسؤول عن الحفاظ على سرية بيانات حسابك" />
        <FooterPageItem text="استخدام الحساب: يجب عدم مشاركة حسابك مع أي شخص أو مؤسسة أخرى" />
        <FooterPageItem text="إنهاء الحساب: يمكننا إنهاء حسابك أو إيقافه إذا خالفت أي من سياسات المنصة" />
      </FooterPageSection>

      {/* Prohibited Activities Section */}
      <FooterPageSection title="الأنشطة المحظورة">
        <FooterPageItem text="نشر محتوى يروج للعنف" />
        <FooterPageItem text="محاولة اختراق أي جزء من المنصة" />
        <FooterPageItem text="الوصول إلى بيانات شخصية" />
        <FooterPageItem text="استخدام المنصة للأغراض التجارية دون إذن صريح بها" />
      </FooterPageSection>

      {/* Service Termination Section */}
      <FooterPageSection title="إنهاء الخدمة">
        <p className="mb-2">
          نحتفظ بحق تعليق أو إنهاء وصولك واستخدامك للمنصة إذا كان هناك أي شك في
          انتهاك شروط الاستخدام. لن نكون مسؤولين عن أي خسارة أو ضرر قد يترتب على
          إنهاء الحساب أو توقيفه معنا بعناية.
        </p>
      </FooterPageSection>

      {/* Contact Section */}
      <div className="mt-10 mb-6 text-center">
        <h2 className="text-primary-500 text-primary-sm mb-4 font-bold">
          تواصل معنا
        </h2>
        <p className="text-neutrals-600 text-paragraph-lg mb-6 font-medium">
          إذا كانت لديك أسئلة حول شروط الاستخدام هذه، يرجى{" "}
          <Link
            className="text-primary-500 hover:text-primary-400 underline"
            href="/contact"
          >
            التواصل معنا
          </Link>
        </p>

        <AppButton type="primary" size="sm" border="rounded" url="/">
          إلى الصفحة الرئيسية
        </AppButton>
      </div>
    </div>
  );
}
