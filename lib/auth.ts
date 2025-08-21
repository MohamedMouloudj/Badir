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
      userType: {
        type: "string",
        required: true,
        defaultValue: "participant",
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
