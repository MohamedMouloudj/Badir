"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function acceptTerms() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Not authenticated");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { profileCompleted: true },
  });
}

export async function updateProfile(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;

  // Save in your DB
  await prisma.user.update({
    where: { id: session.user.id },
    data: { firstName, lastName, phone, profileCompleted: true },
  });

  // Redirect to dashboard
  redirect("/dashboard");
}
