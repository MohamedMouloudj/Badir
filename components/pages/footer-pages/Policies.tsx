import { ShieldUser } from "lucide-react";
import { FooterPageSection } from "@/components/pages/FooterPageSection";
import { FooterPageItem } from "@/components/pages/FooterPageItem";
import AppButton from "@/components/AppButton";
import Link from "next/link";

export default function Policies() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:px-8" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="bg-primary-500 mb-4 rounded-full p-4">
          <ShieldUser className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-primary-500 section-title mb-2 font-bold">
          سياسة الخصوصية
        </h2>
        <p className="text-neutrals-600 text-secondary-sm max-w-2xl text-center font-semibold">
          نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية. تحدد هذه السياسة كيفية
          جمع واستخدام وحماية معلوماتك
        </p>
      </div>

      {/* Introduction Section */}
      <FooterPageSection title="مقدمة">
        <p className="mb-2">
          مرحبًا بك في &quot;منصة بادر&quot; - الفصل التطوعي. نحن نقدر ثقتك بنا
          ونلتزم بحماية خصوصيتك. تشرح هذه السياسة أنواع المعلومات التي نجمعها
          منك وكيف نستخدمها، وكيف نشاركها وكيف نحميها.
        </p>
        <p>
          باستخدام منصتنا، فإنك توافق على جمع واستخدام المعلومات وفقًا لهذه
          السياسة. إذا كانت لديك أسئلة حول هذه السياسة، يرجى التواصل معنا.
        </p>
      </FooterPageSection>

      {/* Data Collection Section */}
      <FooterPageSection title="جمع المعلومات">
        <FooterPageItem text="نقوم بجمع المعلومات التي تقدمها لنا بشكل مباشر عند التسجيل أو المشاركة" />
        <FooterPageItem text="معلومات الاتصال مثل الاسم والبريد الإلكتروني ورقم الهاتف" />
        <FooterPageItem text="المعلومات المتعلقة بمشاركاتك في المبادرات التطوعية" />
        <FooterPageItem text="بيانات الاستخدام مثل الصفحات التي تزورها والوقت المستغرق" />
      </FooterPageSection>

      {/* Data Usage Section */}
      <FooterPageSection title="استخدام المعلومات">
        <FooterPageItem text="تحسين تجربة المستخدم وتخصيص المحتوى" />
        <FooterPageItem text="التواصل معك بخصوص المبادرات والفعاليات" />
        <FooterPageItem text="إرسال التحديثات والإشعارات الهامة" />
        <FooterPageItem text="تحليل استخدام المنصة لتطويرها وتحسينها" />
      </FooterPageSection>

      {/* Data Protection Section */}
      <FooterPageSection title="حماية البيانات">
        <FooterPageItem text="نستخدم التشفير لحماية بياناتك أثناء النقل والتخزين" />
        <FooterPageItem text="الوصول للبيانات مقيد على الموظفين المخولين فقط" />
        <FooterPageItem text="نراقب أنظمتنا باستمرار للكشف عن أي انتهاكات أمنية" />
        <FooterPageItem text="نحتفظ بنسخ احتياطية آمنة من بياناتك" />
      </FooterPageSection>

      {/* Data Sharing Section */}
      <FooterPageSection title="مشاركة المعلومات">
        <FooterPageItem text="لا نبيع أو نؤجر بياناتك الشخصية لأطراف ثالثة" />
        <FooterPageItem text="قد نشارك معلومات محدودة مع شركاء موثوقين لتحسين الخدمة" />
        <FooterPageItem text="نلتزم بعدم الكشف عن هويتك في التقارير الإحصائية" />
        <FooterPageItem text="قد نضطر للكشف عن المعلومات استجابة لطلبات قانونية" />
      </FooterPageSection>

      {/* User Rights Section */}
      <FooterPageSection title="حقوقك">
        <FooterPageItem text="الوصول والتصحيح: يحق لك الوصول إلى بياناتك الشخصية وطلب تصحيح أي معلومات غير صحيحة" />
        <FooterPageItem text="الحذف: يمكنك طلب حذف بياناتك الشخصية في ظروف معينة" />
        <FooterPageItem text="النقل: يحق لك الحصول على نسخة من بياناتك بتنسيق قابل للنقل" />
        <FooterPageItem text="الاعتراض: يمكنك الاعتراض على معالجة بياناتك في ظروف معينة" />
      </FooterPageSection>

      {/* Contact Section */}
      <div className="mt-10 mb-6 text-center">
        <h2 className="text-primary-500 text-primary-sm mb-4 font-bold">
          تواصل معنا
        </h2>
        <p className="text-neutrals-600 text-paragraph-lg mb-6 font-medium">
          إذا كانت لديك أسئلة حول سياسة الخصوصية هذه أو ممارساتنا، إذا كنت ترغب
          في ممارسة أي من حقوقك، يرجى{" "}
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
