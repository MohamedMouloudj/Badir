import ContactForm from "@/components/pages/contact/ContactForm";
import ContactInfo from "@/components/pages/contact/ContactInfo";
import React from "react";

export default function page() {
  return (
    <div className="flex-center-column lg:flex-center container mx-auto flex-col-reverse gap-4 px-4 py-8 md:gap-8 lg:flex-row">
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
