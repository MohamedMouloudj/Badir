import PlatformRatingForm from "@/components/pages/feedbacks/PlatformRatingForm";

export default function page() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h2 className="section-title text-primary-500 mb-10 text-center font-bold">
        استمارة تقييم منصة بادر
      </h2>
      <p className="text-neutrals-600text-secondary-sm w-full text-center font-semibold">
        نقدر رأيك في تجربتك مع منصة بادر ونسعى لتحسين خدماتنا
      </p>
      <PlatformRatingForm />
    </section>
  );
}
