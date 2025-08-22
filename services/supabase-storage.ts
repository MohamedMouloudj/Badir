import { createClient } from "@/lib/supabase/server";

export class StorageHelpers {
  private supabase: ReturnType<typeof createClient>;

  constructor() {
    this.supabase = createClient();
  }

  async uploadFile(bucket: string, path: string, file: Buffer, type?: string) {
    const supabase = await this.supabase;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: type });
    if (error) throw error;
    return data;
  }

  async getPublicUrl(bucket: string, path: string) {
    const supabase = await this.supabase;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async deleteFile(bucket: string, path: string) {
    const { error } = await (await this.supabase).storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
  }

  async downloadFile(bucket: string, path: string) {
    const { data, error } = await (await this.supabase).storage
      .from(bucket)
      .download(path);
    if (error) throw error;
    return data;
  }

  async listFiles(bucket: string, folder: string = "") {
    const { data, error } = await (await this.supabase).storage
      .from(bucket)
      .list(folder);
    if (error) throw error;
    return data;
  }
}
