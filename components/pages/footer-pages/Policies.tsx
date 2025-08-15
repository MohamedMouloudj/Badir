import { ShieldUser } from "lucide-react";
import { FooterPageSection } from "@/components/pages/FooterPageSection";
import { FooterPageItem } from "@/components/pages/FooterPageItem";
import AppButton from "@/components/AppButton";
import Link from "next/link";

export default function Policies() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-5xl" dir="rtl">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="bg-primary-500 p-4 rounded-full mb-4">
          <ShieldUser className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-primary-500 section-title font-bold mb-2">
          سياسة الخصوصية
        </h2>
        <p className="text-neutrals-600 text-center text-secondary-sm font-semibold max-w-2xl">
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
      <div className="text-center mt-10 mb-6">
        <h2 className="text-primary-500 font-bold text-primary-sm mb-4">
          تواصل معنا
        </h2>
        <p className="text-neutrals-600 text-paragraph-lg font-medium mb-6">
          إذا كانت لديك أسئلة حول سياسة الخصوصية هذه أو ممارساتنا، إذا كنت ترغب
          في ممارسة أي من حقوقك، يرجى{" "}
          <Link
            className="text-primary-500 underline hover:text-primary-400"
            href="/contact"
          >
            التواصل معنا
          </Link>
        </p>

        <AppButton type="primary" size="sm" corner="rounded" url="/">
          إلى الصفحة الرئيسية
        </AppButton>
      </div>
    </div>
  );
}
