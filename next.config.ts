import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server app (admin + uploads need a backend). Deploy free on Vercel.
  // Images come from Supabase Storage / external URLs — keep them unoptimized
  // so no per-domain config is needed.
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
