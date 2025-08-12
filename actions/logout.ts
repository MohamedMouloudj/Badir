"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    // Redirect to home page after logout
    redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    redirect("/");
  }
}
