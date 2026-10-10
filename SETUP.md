# Leelansh PG — Setup Guide

A Next.js site with a public page + an admin panel (`/admin`) to add/remove PGs,
manage the photo gallery, and change the owners' photo. Data lives in **Supabase
Postgres** (via Prisma); uploaded images live in **Supabase Storage**.

Until Supabase is configured, the site runs on demo data and the admin shows a
"setup needed" banner. Login still works for previewing the panel.

---

## 1. Run locally

```bash
cd web
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000  ·  admin: /admin/login
```

The included `.env.local` already has a dev password (`admin123`) so you can log
in immediately. **Change it before going live.**

---

## 2. Create the free Supabase project

1. Go to https://supabase.com → **New project** (free tier). Pick a DB password.
2. **Project Settings → API**: copy
   - `Project URL`  → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`
3. **Project Settings → Database → Connection string** (choose **Prisma** / URI):
   - Pooled (port **6543**) → `DATABASE_URL` (append `?pgbouncer=true`)
   - Direct (port **5432**) → `DIRECT_URL`
4. **Storage → New bucket** → name it `images`, mark it **Public**.

Put all of these in `web/.env.local` (see `.env.example` for the exact format).

---

## 3. Create the database tables

```bash
cd web
npx prisma migrate deploy   # or: npx prisma db push
```

This creates the `properties`, `gallery_images`, and `site_settings` tables.

---

## 4. Use the admin panel

- Visit `/admin/login`, enter your `ADMIN_PASSWORD`.
- **Properties** — add a PG (name, area, address, Google-map link, photo) or remove one.
- **Owners' Photo** — upload a new photo of Sonali & Navin.
- **Gallery** — upload/remove photos shown in the public "Photo Gallery" section.

Changes appear on the live site immediately.

---

## 5. Deploy (free) on Vercel

1. Push this repo to GitHub.
2. On https://vercel.com → **Import Project** → select the repo, root dir `web`.
3. Add the same env vars (from `.env.local`) in **Vercel → Settings → Environment Variables**.
4. Deploy. (Build runs `prisma generate` automatically via the postinstall/next build.)

> Note: because of the admin + uploads, this is a server app (not a static export),
> which Vercel hosts for free.
