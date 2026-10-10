"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { PropertyView, GalleryView } from "@/lib/data";
import {
  addProperty,
  updateProperty,
  deleteProperty,
  addGalleryImage,
  deleteGalleryImage,
  updateOwnerPhoto,
} from "./actions";

type Props = {
  properties: PropertyView[];
  gallery: GalleryView[];
  ownerPhoto: string;
  dbReady: boolean;
  storageReady: boolean;
};

export default function AdminClient({
  properties,
  gallery,
  ownerPhoto,
  dbReady,
  storageReady,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const pgFormRef = useRef<HTMLFormElement>(null);
  const galFormRef = useRef<HTMLFormElement>(null);
  const ownerFormRef = useRef<HTMLFormElement>(null);
  const [editing, setEditing] = useState<PropertyView | null>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    if (type === "ok") setTimeout(() => setMsg(null), 3000);
  }

  function handleAddProperty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await addProperty(fd);
      if (res.ok) {
        flash("ok", "PG added ✓");
        pgFormRef.current?.reset();
        router.refresh();
      } else flash("err", res.error || "Failed to add PG.");
    });
  }

  function handleAddGallery(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await addGalleryImage(fd);
      if (res.ok) {
        flash("ok", "Image added ✓");
        galFormRef.current?.reset();
        router.refresh();
      } else flash("err", res.error || "Failed to add image.");
    });
  }

  function handleUpdateProperty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateProperty(fd);
      if (res.ok) {
        flash("ok", "PG updated ✓");
        setEditing(null);
        router.refresh();
      } else flash("err", res.error || "Failed to update PG.");
    });
  }

  function handleOwnerPhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateOwnerPhoto(fd);
      if (res.ok) {
        flash("ok", "Owner photo updated ✓");
        ownerFormRef.current?.reset();
        router.refresh();
      } else flash("err", res.error || "Failed to update photo.");
    });
  }

  function removeProperty(id: string, name: string) {
    if (!confirm(`Remove "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await deleteProperty(id);
      if (res.ok) {
        flash("ok", "PG removed ✓");
        router.refresh();
      } else flash("err", res.error || "Failed to remove.");
    });
  }

  function removeGallery(id: string) {
    if (!confirm("Remove this image?")) return;
    startTransition(async () => {
      const res = await deleteGalleryImage(id);
      if (res.ok) {
        flash("ok", "Image removed ✓");
        router.refresh();
      } else flash("err", res.error || "Failed to remove.");
    });
  }

  const inputCls =
    "w-full rounded-lg border border-wine/20 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-wine";
  const labelCls = "block text-xs font-semibold text-ink/70 mb-1";

  return (
    <main className="min-h-screen bg-sand/50 pb-24">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-wine/10 bg-cream/90 px-6 py-4 backdrop-blur">
        <div>
          <h1 className="font-serif text-xl font-black text-wine">Leelansh Admin</h1>
          <p className="text-xs text-ink/50">Manage properties &amp; gallery</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-sm font-medium text-wine hover:underline">
            View site ↗
          </a>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-full bg-wine px-4 py-2 text-sm font-semibold text-white hover:bg-wine-deep">
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        {/* Config warnings */}
        {(!dbReady || !storageReady) && (
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            <b>Setup needed.</b>{" "}
            {!dbReady && "Database (DATABASE_URL) is not configured — changes won't save. "}
            {!storageReady && "Image storage (Supabase keys) is not configured — uploads will fail. "}
            See <code>SETUP.md</code>. The lists below currently show demo data.
          </div>
        )}
        {dbReady && storageReady && (
          <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
            Until you add your own, the public site shows a few demo photos/PGs. Anything you add here replaces them live.
          </div>
        )}

        {/* Flash message */}
        {msg && (
          <div
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              msg.type === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* ---------------- PROPERTIES ---------------- */}
        <section className="mt-8">
          <h2 className="font-serif text-2xl font-bold text-wine-deep">Properties ({properties.length})</h2>

          <div className="mt-4 grid gap-3">
            {properties.length === 0 && (
              <p className="rounded-xl border border-dashed border-wine/20 bg-white/50 p-6 text-center text-sm text-ink/50">
                No PGs added yet. Use the form below to add your first one.
              </p>
            )}
            {properties.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-xl border border-wine/10 bg-white p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-16 w-20 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{p.name}</p>
                  <p className="truncate text-xs text-ink/55">{p.address}</p>
                </div>
                <button
                  onClick={() => setEditing(p)}
                  disabled={pending || p.id.startsWith("static-")}
                  title={p.id.startsWith("static-") ? "Demo item — add a real PG first" : "Edit"}
                  className="rounded-lg border border-wine/25 px-3 py-2 text-sm font-medium text-wine hover:bg-wine/5 disabled:opacity-40"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeProperty(p.id, p.name)}
                  disabled={pending || p.id.startsWith("static-")}
                  title={p.id.startsWith("static-") ? "Demo item — add a real PG first" : "Remove"}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add property form */}
          <form
            ref={pgFormRef}
            onSubmit={handleAddProperty}
            className="mt-6 rounded-2xl border border-wine/10 bg-white p-5"
          >
            <h3 className="font-semibold text-wine-deep">Add a new PG</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>PG name *</label>
                <input name="name" required className={inputCls} placeholder="Leelansh PG — Vaishali Nagar" />
              </div>
              <div>
                <label className={labelCls}>Area / tag *</label>
                <input name="area" required className={inputCls} placeholder="Vaishali Nagar" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Full address *</label>
                <input name="address" required className={inputCls} placeholder="Plot 12, ..., Jaipur 302021" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Google Maps link</label>
                <input name="mapLink" className={inputCls} placeholder="https://share.google/..." />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Short description</label>
                <input name="description" className={inputCls} placeholder="A comfortable and secure girls' PG..." />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Photo (upload) *</label>
                <input name="image" type="file" accept="image/*" className={inputCls} />
                <p className="mt-1 text-[11px] text-ink/40">Or paste an image URL instead:</p>
                <input name="imageUrl" className={`${inputCls} mt-1`} placeholder="https://... (optional)" />
              </div>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="mt-5 rounded-xl bg-wine px-6 py-3 font-semibold text-white hover:bg-wine-deep disabled:opacity-60"
            >
              {pending ? "Saving…" : "Add PG"}
            </button>
          </form>
        </section>

        {/* ---------------- OWNER PHOTO ---------------- */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-wine-deep">Owners&apos; Photo</h2>
          <p className="mt-1 text-sm text-ink/55">
            The photo of Sonali &amp; Navin Jaiswal shown in the &ldquo;Owned &amp; Managed By&rdquo; section.
          </p>
          <form
            ref={ownerFormRef}
            onSubmit={handleOwnerPhoto}
            className="mt-4 flex flex-col gap-5 rounded-2xl border border-wine/10 bg-white p-5 sm:flex-row sm:items-center"
          >
            {ownerPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ownerPhoto}
                alt="Current owners"
                className="h-28 w-24 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="grid h-28 w-24 shrink-0 place-items-center rounded-xl bg-sand text-center text-[11px] text-ink/40">
                No photo yet
              </div>
            )}
            <div className="flex-1">
              <label className={labelCls}>Upload a new owners&apos; photo</label>
              <input name="image" type="file" accept="image/*" className={inputCls} />
              <p className="mt-1 text-[11px] text-ink/40">Or paste an image URL instead:</p>
              <input name="imageUrl" className={`${inputCls} mt-1`} placeholder="https://... (optional)" />
              <button
                type="submit"
                disabled={pending}
                className="mt-4 rounded-xl bg-wine px-6 py-2.5 font-semibold text-white hover:bg-wine-deep disabled:opacity-60"
              >
                {pending ? "Saving…" : "Update photo"}
              </button>
            </div>
          </form>
        </section>

        {/* ---------------- GALLERY ---------------- */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-wine-deep">Gallery ({gallery.length})</h2>

          {gallery.length === 0 && (
            <p className="mt-4 rounded-xl border border-dashed border-wine/20 bg-white/50 p-6 text-center text-sm text-ink/50">
              No gallery photos yet. Upload your first one below.
            </p>
          )}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {gallery.map((g) => (
              <div key={g.id} className="group relative overflow-hidden rounded-xl border border-wine/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image} alt={g.caption || "Gallery"} className="aspect-square w-full object-cover" />
                <button
                  onClick={() => removeGallery(g.id)}
                  disabled={pending || g.id.startsWith("static-")}
                  className="absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:hidden"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add gallery image */}
          <form
            ref={galFormRef}
            onSubmit={handleAddGallery}
            className="mt-6 rounded-2xl border border-wine/10 bg-white p-5"
          >
            <h3 className="font-semibold text-wine-deep">Add gallery photo</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Photo (upload) *</label>
                <input name="image" type="file" accept="image/*" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Caption (optional)</label>
                <input name="caption" className={inputCls} placeholder="Study room" />
              </div>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="mt-5 rounded-xl bg-wine px-6 py-3 font-semibold text-white hover:bg-wine-deep disabled:opacity-60"
            >
              {pending ? "Uploading…" : "Add Photo"}
            </button>
          </form>
        </section>
      </div>

      {/* ---------------- EDIT PG MODAL ---------------- */}
      {editing && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setEditing(null)}
        >
          <form
            onSubmit={handleUpdateProperty}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-wine-deep">Edit PG</h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="grid h-8 w-8 place-items-center rounded-full text-ink/50 hover:bg-sand"
              >
                ✕
              </button>
            </div>

            <input type="hidden" name="id" value={editing.id} />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>PG name *</label>
                <input name="name" required defaultValue={editing.name} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Area / tag *</label>
                <input name="area" required defaultValue={editing.area} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Full address *</label>
                <input name="address" required defaultValue={editing.address} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Google Maps link</label>
                <input name="mapLink" defaultValue={editing.mapLink} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Short description</label>
                <input name="description" defaultValue={editing.description} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Photo</label>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={editing.image} alt="" className="h-14 w-16 rounded-lg object-cover" />
                  <input name="image" type="file" accept="image/*" className={inputCls} />
                </div>
                <p className="mt-1 text-[11px] text-ink/40">
                  Leave empty to keep the current photo. Or paste a new image URL:
                </p>
                <input name="imageUrl" className={`${inputCls} mt-1`} placeholder="https://... (optional)" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl border border-wine/20 px-5 py-2.5 font-semibold text-ink/70 hover:bg-sand"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="rounded-xl bg-wine px-6 py-2.5 font-semibold text-white hover:bg-wine-deep disabled:opacity-60"
              >
                {pending ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
