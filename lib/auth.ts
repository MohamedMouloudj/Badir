import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { waitUntil } from "@vercel/functions";

const resend = new Resend(process.env.RESEND_API_KEY);

const PASSWORD_RESET_EXPIRY_MINUTES = 15;

export const auth = betterAuth({
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      userType: {
        type: "string",
        required: true,
        defaultValue: "participant",
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "USER",
      },
      profileCompleted: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: PASSWORD_RESET_EXPIRY_MINUTES * 60,
    sendResetPassword: async ({ user, url, token }, request) => {
      const resetLink = url;
      const userName = user.name || user.email.split("@")[0];

      const emailHtml = await render(
        PasswordResetEmail({
          resetLink,
          userName,
          expiryMinutes: PASSWORD_RESET_EXPIRY_MINUTES,
        }),
      );
      const sendEmail = async () => {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: user.email,
            subject: "إعادة تعيين كلمة المرور - منصة بادر",
            html: emailHtml,
            headers: {
              "X-Entity-Ref-ID": `badir-password-reset-${Date.now()}`,
            },
            tags: [
              { name: "category", value: "password-reset" },
              {
                name: "environment",
                value: process.env.NODE_ENV || "development",
              },
            ],
          });
        } catch (error) {
          console.error("Failed to send password reset email:", error);
        }
      };

      // waitUntil in production (Vercel) will keep function alive for background email sending
      if (typeof waitUntil !== "undefined") {
        waitUntil(sendEmail());
      } else {
        await sendEmail();
      }
    },
  },
  secret: process.env.BETTER_AUTH_SECRET as string,
  trustedOrigins: [process.env.BETTER_AUTH_URL as string],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
