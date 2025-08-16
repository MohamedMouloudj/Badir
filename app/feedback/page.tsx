import PlatformRatingForm from "@/components/pages/feedbacks/PlatformRatingForm";

export default function page() {
  return (
    <section className="container mx-auto px-4 py-12 space-y-8" dir="rtl">
      {/* Main Title */}
      <h2 className="section-title font-bold text-primary-500 text-center mb-10">
        استمارة تقييم منصة بادر
      </h2>
      <p className="text-neutrals-600text-secondary-sm font-semibold w-full text-center">
        نقدر رأيك في تجربتك مع منصة بادر ونسعى لتحسين خدماتنا
      </p>
      <PlatformRatingForm />
    </section>
  );
}
