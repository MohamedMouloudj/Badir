"use server";
import { auth } from "@/lib/auth";
import { InitiativeService } from "@/services/initiatives";
import { StorageHelpers } from "@/services/supabase-storage";
import { BUCKETS } from "@/types/Statics";
import { headers } from "next/headers";

/**
 * Returns the public URL for a file stored in Supabase Storage.
 * @param bucket - The name of the storage bucket.
 * @param path - The relative path of the file (as stored in DB).
 * @returns The public URL string, or null if not found.
 */
export async function getPublicStorageUrl(
  bucket: BUCKETS,
  path: string | null,
): Promise<string | null> {
  if (!bucket || !path) return null;
  const storage = new StorageHelpers();
  return await storage.getPublicUrl(bucket, path);
}

/**
 * Helpers for manager-only member management
 * @param initiativeId Initiative ID
 * @returns User ID
 */
export async function assertManager(initiativeId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("unauthorized");
  const initiative = await InitiativeService.getById(
    initiativeId,
    session.user.id,
  );
  const isManager =
    initiative?.organizerUserId === session?.user.id ||
    initiative?.organizerOrg?.userId === session?.user.id;
  if (!isManager) throw new Error("forbidden");
  return { userId: session.user.id };
}

/**
 * Check if user is admin of the platform
 * @returns User ID
 */
export async function checkAdminPermission() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("يجب تسجيل الدخول");
  }

  // TODO: Implement your admin permission check
  // This could be based on user role, specific admin table, or environment variable
  // For now, assuming you have an isAdmin field or similar
  // Replace this with your actual admin check logic
  const isAdmin = session.user.email === process.env.ADMIN_EMAIL;
  if (!isAdmin) {
    throw new Error("غير مصرح لك بالوصول لهذه الصفحة");
  }

  return session.user.id;
}
