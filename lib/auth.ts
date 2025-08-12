import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";

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
      sex: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      dateOfBirth: {
        type: "date",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      userType: {
        type: "string",
        required: true,
        defaultValue: "participant",
      },
      latitude: {
        type: "number",
        required: false,
      },
      longitude: {
        type: "number",
        required: false,
      },
      city: {
        type: "string",
        required: false,
      },
      state: {
        type: "string",
        required: false,
      },
      country: {
        type: "string",
        required: false,
        defaultValue: "Algeria",
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
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
