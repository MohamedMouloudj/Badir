import ContactForm from "@/components/pages/contact/ContactForm";
import ContactInfo from "@/components/pages/contact/ContactInfo";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-4 py-8 flex-center-column flex-col-reverse lg:flex-center lg:flex-row gap-4 md:gap-8">
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
