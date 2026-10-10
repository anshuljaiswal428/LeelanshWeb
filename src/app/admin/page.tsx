import { getProperties, getGallery, getOwnerPhoto } from "@/lib/data";
import { isDbConfigured } from "@/lib/prisma";
import { isStorageConfigured } from "@/lib/storage";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [properties, gallery, ownerPhoto] = await Promise.all([
    getProperties(),
    getGallery(),
    getOwnerPhoto(),
  ]);
  return (
    <AdminClient
      properties={properties}
      gallery={gallery}
      ownerPhoto={ownerPhoto}
      dbReady={isDbConfigured()}
      storageReady={isStorageConfigured()}
    />
  );
}
