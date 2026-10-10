"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPrisma, isDbConfigured } from "@/lib/prisma";
import { uploadImage, deleteImageByUrl, isStorageConfigured } from "@/lib/storage";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { OWNER_PHOTO_KEY } from "@/lib/data";

async function assertAdmin() {
  const store = await cookies();
  const ok = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!ok) throw new Error("Unauthorized");
}

function requireDb() {
  if (!isDbConfigured()) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL / DIRECT_URL (Supabase) to enable saving."
    );
  }
}

export type ActionResult = { ok: boolean; error?: string };

// --- Properties ------------------------------------------------------------
export async function addProperty(formData: FormData): Promise<ActionResult> {
  try {
    await assertAdmin();
    requireDb();

    const name = String(formData.get("name") || "").trim();
    const area = String(formData.get("area") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const mapLink = String(formData.get("mapLink") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const file = formData.get("image") as File | null;

    if (!name || !area || !address) {
      return { ok: false, error: "Name, area and address are required." };
    }

    let image = String(formData.get("imageUrl") || "").trim();
    if (file && file.size > 0) {
      if (!isStorageConfigured())
        return { ok: false, error: "Image storage not configured — cannot upload." };
      image = await uploadImage(file, "properties");
    }
    if (!image) {
      return { ok: false, error: "Please upload a photo (or paste an image URL)." };
    }

    await getPrisma().property.create({
      data: { name, area, address, mapLink, image, description },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

export async function updateProperty(formData: FormData): Promise<ActionResult> {
  try {
    await assertAdmin();
    requireDb();

    const id = String(formData.get("id") || "");
    if (!id) return { ok: false, error: "Missing property id." };

    const name = String(formData.get("name") || "").trim();
    const area = String(formData.get("area") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const mapLink = String(formData.get("mapLink") || "").trim();
    const description = String(formData.get("description") || "").trim();
    if (!name || !area || !address) {
      return { ok: false, error: "Name, area and address are required." };
    }

    const existing = await getPrisma().property.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "That PG no longer exists." };

    // Determine the image: new upload > pasted URL > keep existing.
    const file = formData.get("image") as File | null;
    const pastedUrl = String(formData.get("imageUrl") || "").trim();
    let image = existing.image;
    let oldImageToDelete: string | null = null;

    if (file && file.size > 0) {
      if (!isStorageConfigured())
        return { ok: false, error: "Image storage not configured — cannot upload." };
      image = await uploadImage(file, "properties");
      oldImageToDelete = existing.image;
    } else if (pastedUrl && pastedUrl !== existing.image) {
      image = pastedUrl;
    }

    await getPrisma().property.update({
      where: { id },
      data: { name, area, address, mapLink, description, image },
    });
    if (oldImageToDelete) await deleteImageByUrl(oldImageToDelete);

    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Update failed." };
  }
}

export async function deleteProperty(id: string): Promise<ActionResult> {
  try {
    await assertAdmin();
    requireDb();
    const row = await getPrisma().property.delete({ where: { id } });
    await deleteImageByUrl(row.image);
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed." };
  }
}

// --- Owner photo -----------------------------------------------------------
export async function updateOwnerPhoto(formData: FormData): Promise<ActionResult> {
  try {
    await assertAdmin();
    requireDb();

    const file = formData.get("image") as File | null;
    let image = String(formData.get("imageUrl") || "").trim();
    if (file && file.size > 0) {
      if (!isStorageConfigured())
        return { ok: false, error: "Image storage not configured — cannot upload." };
      image = await uploadImage(file, "owners");
    }
    if (!image) {
      return { ok: false, error: "Please choose a photo to upload (or paste an image URL)." };
    }

    // Remove the previous custom photo (if any) before saving the new one.
    const prev = await getPrisma().siteSetting.findUnique({ where: { key: OWNER_PHOTO_KEY } });
    await getPrisma().siteSetting.upsert({
      where: { key: OWNER_PHOTO_KEY },
      update: { value: image },
      create: { key: OWNER_PHOTO_KEY, value: image },
    });
    if (prev?.value) await deleteImageByUrl(prev.value);

    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Update failed." };
  }
}

// --- Gallery ---------------------------------------------------------------
export async function addGalleryImage(formData: FormData): Promise<ActionResult> {
  try {
    await assertAdmin();
    requireDb();

    const caption = String(formData.get("caption") || "").trim() || null;
    const file = formData.get("image") as File | null;

    let image = String(formData.get("imageUrl") || "").trim();
    if (file && file.size > 0) {
      if (!isStorageConfigured())
        return { ok: false, error: "Image storage not configured — cannot upload." };
      image = await uploadImage(file, "gallery");
    }
    if (!image) {
      return { ok: false, error: "Please choose a photo to upload (or paste an image URL)." };
    }

    await getPrisma().galleryImage.create({ data: { image, caption } });
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Upload failed." };
  }
}

export async function deleteGalleryImage(id: string): Promise<ActionResult> {
  try {
    await assertAdmin();
    requireDb();
    const row = await getPrisma().galleryImage.delete({ where: { id } });
    await deleteImageByUrl(row.image);
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed." };
  }
}
