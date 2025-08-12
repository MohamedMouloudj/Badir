import CompleteProfileForm from "@/components/pages/signups/CompleteProfileForm";
import Image from "next/image";

export default function CompleteProfilePage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-primary-600 p-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-neutrals-100 rounded-xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Image Section */}
        <div className="flex-1 relative h-64 lg:h-auto">
          <Image
            src="/images/auth-form-aside.png"
            alt="Volunteer"
            fill
            className="object-cover md:rounded-r-4xl"
            priority
            style={{
              boxShadow: "3px 0 5px 0 rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <CompleteProfileForm />
        </div>
      </div>
    </section>
  );
}
