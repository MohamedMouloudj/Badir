import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import PostNotificationEmail from "@/emails/PostNotificationEmail";
import FeedbackReceivedEmail from "@/emails/FeedbackReceivedEmail";
import ContactMessageEmail from "@/emails/ContactMessageEmail";
import emailConfig from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email type definitions
type EmailType =
  | "password-reset"
  | "post-notification"
  | "feedback"
  | "contact";

interface BaseEmailRequest {
  type: EmailType;
  to: string;
}

interface PasswordResetRequest extends BaseEmailRequest {
  type: "password-reset";
  data: {
    resetLink: string;
    userName?: string;
    expiryMinutes?: number;
  };
}

interface PostNotificationRequest extends BaseEmailRequest {
  type: "post-notification";
  data: {
    postTitle: string;
    authorName: string;
    postExcerpt?: string;
    postUrl: string;
    categoryName?: string;
  };
}

interface FeedbackRequest extends BaseEmailRequest {
  type: "feedback";
  data: {
    userName?: string;
    userEmail?: string;
    easeOfUse?: string;
    informationClarity?: string;
    contentDiversity?: string;
    performanceSpeed?: string;
    generalSatisfaction?: string;
    encounteredDifficulties?: string;
    difficultiesDetails?: string;
    improvementSuggestions?: string;
    wouldRecommend?: string;
    appRating?: string;
    timestamp: string;
  };
}

interface ContactRequest extends BaseEmailRequest {
  type: "contact";
  data: {
    fullName: string;
    email: string;
    inquiryType: string;
    title: string;
    message: string;
    timestamp: string;
  };
}

type EmailRequest =
  | PasswordResetRequest
  | PostNotificationRequest
  | FeedbackRequest
  | ContactRequest;

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json();

    if (!body.type || !body.to) {
      return NextResponse.json(
        { error: "Missing required fields: type and to" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    let emailResponse;
    const fromEmail = emailConfig.fromEmail;

    switch (body.type) {
      case "password-reset": {
        const { resetLink, userName, expiryMinutes } = body.data;

        emailResponse = await resend.emails.send({
          from: fromEmail,
          to: body.to,
          subject: "إعادة تعيين كلمة المرور - منصة بادر",
          react: PasswordResetEmail({
            resetLink,
            userName,
            expiryMinutes,
          }),
        });
        break;
      }

      case "post-notification": {
        const { postTitle, authorName, postExcerpt, postUrl, categoryName } =
          body.data;

        emailResponse = await resend.emails.send({
          from: fromEmail,
          to: body.to,
          subject: `منشور جديد: ${postTitle}`,
          react: PostNotificationEmail({
            postTitle,
            authorName,
            postExcerpt,
            postUrl,
            categoryName,
          }),
        });
        break;
      }

      case "feedback": {
        const feedbackData = body.data;

        // Determine if this is critical feedback
        const isCritical =
          feedbackData.easeOfUse === "سيء جداً" ||
          feedbackData.informationClarity === "سيء جداً" ||
          feedbackData.contentDiversity === "سيء جداً" ||
          feedbackData.performanceSpeed === "سيء جداً" ||
          feedbackData.generalSatisfaction === "سيء جداً" ||
          (feedbackData.appRating && parseInt(feedbackData.appRating) <= 2);

        const subject = isCritical
          ? "⚠️ تقييم حرج للمنصة - يتطلب متابعة فورية"
          : "تقييم جديد للمنصة - منصة بادر";

        emailResponse = await resend.emails.send({
          from: fromEmail,
          to: body.to,
          subject,
          react: FeedbackReceivedEmail(feedbackData),
        });
        break;
      }

      case "contact": {
        const { fullName, email, inquiryType, title, message, timestamp } =
          body.data;

        emailResponse = await resend.emails.send({
          from: fromEmail,
          to: body.to,
          subject: `رسالة تواصل جديدة: ${title}`,
          replyTo: email, // Allow admin to reply directly to the user
          react: ContactMessageEmail({
            fullName,
            email,
            inquiryType,
            title,
            message,
            timestamp,
          }),
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 },
        );
    }

    // Check if email was sent successfully
    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        messageId: emailResponse.data?.id,
        message: "Email sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
