"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

//?redirect should be called outside try-catch block in server actions and route handlers

export async function logoutAction() {
  let noError = true;
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Logout error:", error);
    noError = false;
  }
  if (noError) {
    redirect("/");
  }
}
