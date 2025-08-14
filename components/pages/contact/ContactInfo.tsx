import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="size-full flex-1/3 mx-auto" dir="rtl">
      <div className="h-full bg-neutrals-50 border-2 border-neutrals-300 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm flex-center-column">
        {/* Header */}
        <div className="text-right mb-8">
          <h2 className="text-primary-sm font-bold text-primary-500 mb-4">
            معلومات التواصل
          </h2>
          <p className="text-neutrals-600 text-secondary-sm font-semibold">
            يمكنك التواصل معنا من خلال الطرق التالية
          </p>
        </div>

        {/* Contact Items */}
        <div className="space-y-8">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              </div>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-paragraph-lg font-semibold text-neutrals-700 mb-2">
                البريد الإلكتروني
              </h3>
              <a
                href="mailto:info@badir.org"
                className="text-primary-500 text-paragraph-md font-medium hover:text-primary-600 transition-colors underline decoration-2 underline-offset-4"
              >
                info@badir.org
              </a>
              <p className="text-neutrals-500 text-paragraph-md mt-1">
                راسلنا في أي وقت
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              </div>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-paragraph-lg font-semibold text-neutrals-700 mb-2">
                الهاتف
              </h3>
              <a
                href="tel:+213000000000"
                className="text-neutrals-700  text-paragraph-md font-medium hover:text-primary-500 transition-colors"
              >
                +213 000 00 00 00
              </a>
              <p className="text-neutrals-500 text-paragraph-md mt-1">
                من السبت إلى الخميس
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              </div>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-paragraph-lg font-semibold text-neutrals-700 mb-2">
                العنوان
              </h3>
              <p className="text-neutrals-700 text-paragraph-md font-medium">
                الجزائر العاصمة - الجزائر
              </p>
              <p className="text-neutrals-500 text-paragraph-md mt-1">
                من السبت إلى الخميس
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              </div>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-2">
                ساعات العمل
              </h3>
              <p className="text-neutrals-700 text-paragraph-md font-medium">
                8:00 صباحا - 16:00 مساء
              </p>
              <p className="text-neutrals-500 text-paragraph-md mt-1">
                من السبت إلى الخميس
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
