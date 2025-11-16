const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  templates: {
    criticalRating:
      process.env.NEXT_PUBLIC_EMAILJS_CRITICAL_RATING_TEMPLATE_ID!,
    contactUs: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
  },
  adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
};

export default emailConfig;
