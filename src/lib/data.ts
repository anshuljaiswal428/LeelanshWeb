import { getPrisma, isDbConfigured } from "./prisma";

export type PropertyView = {
  id: string;
  name: string;
  area: string;
  address: string;
  mapLink: string;
  image: string;
  description: string;
};

export type GalleryView = {
  id: string;
  image: string;
  caption: string | null;
};

export const OWNER_PHOTO_KEY = "ownerPhoto";

// All content is admin-managed. If the DB isn't configured or is empty,
// these return empty — nothing is hardcoded.

export async function getProperties(): Promise<PropertyView[]> {
  if (!isDbConfigured()) return [];
  try {
    const rows = await getPrisma().property.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      area: r.area,
      address: r.address,
      mapLink: r.mapLink,
      image: r.image,
      description: r.description,
    }));
  } catch (e) {
    console.error("getProperties failed:", e);
    return [];
  }
}

export async function getGallery(): Promise<GalleryView[]> {
  if (!isDbConfigured()) return [];
  try {
    const rows = await getPrisma().galleryImage.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return rows.map((r) => ({ id: r.id, image: r.image, caption: r.caption }));
  } catch (e) {
    console.error("getGallery failed:", e);
    return [];
  }
}

/** Returns the admin-set owner photo, or "" if none has been uploaded yet. */
export async function getOwnerPhoto(): Promise<string> {
  if (!isDbConfigured()) return "";
  try {
    const row = await getPrisma().siteSetting.findUnique({
      where: { key: OWNER_PHOTO_KEY },
    });
    return row?.value || "";
  } catch (e) {
    console.error("getOwnerPhoto failed:", e);
    return "";
  }
}
