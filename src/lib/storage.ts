import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || "images";

export function isStorageConfigured(): boolean {
  return !!(SUPABASE_URL && SERVICE_KEY);
}

function adminClient() {
  return createClient(SUPABASE_URL!, SERVICE_KEY!, {
    auth: { persistSession: false },
  });
}

/** Uploads a File to Supabase Storage and returns its public URL. */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!isStorageConfigured()) {
    throw new Error(
      "Image storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const rand = Math.random().toString(36).slice(2, 10);
  const path = `${folder}/${Date.now()}-${rand}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const supabase = adminClient();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type || "image/jpeg", upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Best-effort delete of a previously uploaded image (ignores failures). */
export async function deleteImageByUrl(url: string): Promise<void> {
  if (!isStorageConfigured() || !url) return;
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return; // not one of our storage files (e.g. an external URL)
  const path = url.slice(idx + marker.length);
  try {
    await adminClient().storage.from(BUCKET).remove([path]);
  } catch {
    /* ignore */
  }
}
