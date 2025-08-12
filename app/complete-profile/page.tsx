import Link from "next/link";

export default function CompleteProfilePage() {
  return (
    <section>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              مرحباً بك في منصة بادر!
            </h1>
            <p className="text-lg text-gray-600">
              تم إنشاء حسابك بنجاح. يمكنك الآن البدء في استكشاف المبادرات
              التطوعية.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              إكمال الملف الشخصي (اختياري)
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  الخطوات التالية:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    استكشف المبادرات التطوعية المتاحة
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    انضم إلى المبادرات التي تهمك
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    تواصل مع المنظمات والمتطوعين الآخرين
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href="/initiatives"
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-full text-center transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  استكشف المبادرات
                </Link>
                <Link
                  href="/"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full text-center transition-all duration-200"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
