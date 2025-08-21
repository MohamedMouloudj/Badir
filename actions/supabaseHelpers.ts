"use server";
import { StorageHelpers } from "@/services/supabase-storage";
import { BUCKETS } from "@/types/Statics";

/**
 * Returns the public URL for a file stored in Supabase Storage.
 * @param bucket - The name of the storage bucket.
 * @param path - The relative path of the file (as stored in DB).
 * @returns The public URL string, or null if not found.
 */
export async function getPublicStorageUrl(
  bucket: BUCKETS,
  path: string
): Promise<string | null> {
  if (!bucket || !path) return null;
  const storage = new StorageHelpers();
  return await storage.getPublicUrl(bucket, path);
}
