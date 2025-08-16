import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/components/emails/Contact";
import { contactSchema } from "@/schemas/contactSchema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.RESEND_TO_EMAIL!],
      subject: `${validatedData.title} - رسالة من منصة بادر`,
      react: ContactEmail({
        fromName: validatedData.fullName,
        fromEmail: validatedData.email,
        subject: validatedData.title,
        inquiryType: validatedData.inquiryType,
        message: validatedData.message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "فشل في إرسال الرسالة" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: "تم إرسال رسالتك بنجاح",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة طلبك" },
      { status: 500 }
    );
  }
}
