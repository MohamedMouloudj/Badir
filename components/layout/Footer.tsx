import Image from "next/image";
import Link from "next/link";
import AppButton from "@/components/AppButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer dir="rtl">
      <div className="flex-center justify-center gap-4 mb-16" dir="ltr">
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
            className="object-contain w-auto h-auto"
          />
        </a>
        <div className="h-16 w-0.5 bg-neutrals-100" />
        <Image
          src="/images/logos/logo-white.png"
          alt="Badir and Bunian logos"
          width={160}
          height={40}
          quality={100}
          className="object-contain w-auto h-auto"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* First column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">المنصة</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  عن المنصة
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  كيف تعمل
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">للمتطوعين</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/assistance"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  ابحث عن مبادرات
                </Link>
              </li>
              <li>
                <Link
                  href="/signup/user"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  انضم كمتطوع
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer-guide"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  دليل المتطوع
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>

          {/* Left Column - For Volunteers */}
          <div className="flex-center items-end h-full">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/assistance"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  ابحث عن مساعدات
                </Link>
              </li>
              <li>
                <Link
                  href="/signup/organization"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  انضم كمنظمة{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/organization-guide"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  دليل المنظمة
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-neutrals-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">
              جريدتنا الإلكترونية
            </h3>
            <p className="text-neutrals-200 text-sm mb-4">
              احصل على آخر المواضيع والأخبار في بريدك
            </p>

            {/* Responsive Input Container */}
            <div className="flex items-center bg-neutrals-100 rounded-full shadow-sm overflow-hidden">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 min-w-0 h-10 sm:h-12 px-3 sm:px-4 bg-transparent text-neutrals-700 placeholder-neutrals-400 focus:outline-none text-sm sm:text-base"
                dir="rtl"
              />
              <div className="flex-shrink-0 p-1">
                <AppButton
                  type="primary"
                  border="rounded"
                  size="sm"
                  className="whitespace-nowrap px-3 sm:px-4 h-8 sm:h-10"
                >
                  اشترك
                </AppButton>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-neutrals-100 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Copyright */}
          <div className="text-center text-neutrals-400 text-sm">
            © {currentYear} منصة بادر - جميع الحقوق محفوظة
          </div>
        </div>
      </div>
    </footer>
  );
}
