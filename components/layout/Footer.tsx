import Image from "next/image";
import Link from "next/link";
import AppButton from "@/components/AppButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer dir="rtl">
      <div className="flex-center mb-16 justify-center gap-4" dir="ltr">
        <a
          href="https://www.linkedin.com/company/bunian-%D8%A8%D9%86%D9%8A%D8%A7%D9%86/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/logos/bunian.png"
            alt="Badir and Bunian logos"
            width={160}
            height={40}
            quality={100}
            className="h-auto w-auto object-contain"
          />
        </a>
        <div className="bg-neutrals-100 h-16 w-0.5" />
        <Image
          src="/images/logos/logo-white.png"
          alt="Badir and Bunian logos"
          width={160}
          height={40}
          quality={100}
          className="h-auto w-auto object-contain"
        />
      </div>
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* First column */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">المنصة</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  عن المنصة
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  كيف تعمل
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle column */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">للمتطوعين</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/assistance"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  ابحث عن مبادرات
                </Link>
              </li>
              <li>
                <Link
                  href="/signup/user"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  انضم كمتطوع
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer-guide"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  دليل المتطوع
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>

          {/* Left Column - For Volunteers */}
          <div className="flex-center h-full items-end">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/assistance"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  ابحث عن مساعدات
                </Link>
              </li>
              <li>
                <Link
                  href="/signup/organization"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  انضم كمنظمة{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/organization-guide"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  دليل المنظمة
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-neutrals-200 text-sm transition-colors duration-200 hover:text-white"
                >
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="mb-4 text-xl font-bold text-white">
              جريدتنا الإلكترونية
            </h3>
            <p className="text-neutrals-200 mb-4 text-sm">
              احصل على آخر المواضيع والأخبار في بريدك
            </p>

            {/* Responsive Input Container */}
            <div className="bg-neutrals-100 flex items-center overflow-hidden rounded-full shadow-sm">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="text-neutrals-700 placeholder-neutrals-400 h-10 min-w-0 flex-1 bg-transparent px-3 text-sm focus:outline-none sm:h-12 sm:px-4 sm:text-base"
                dir="rtl"
              />
              <div className="flex-shrink-0 p-1">
                <AppButton
                  type="primary"
                  border="rounded"
                  size="sm"
                  className="h-8 px-3 whitespace-nowrap sm:h-10 sm:px-4"
                >
                  اشترك
                </AppButton>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-neutrals-100 my-8 h-0.5" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          {/* Copyright */}
          <div className="text-neutrals-400 text-center text-sm">
            © {currentYear} منصة بادر - جميع الحقوق محفوظة
          </div>
        </div>
      </div>
    </footer>
  );
}
