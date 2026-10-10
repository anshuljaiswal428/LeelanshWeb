"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

const ICONS: Record<string, React.ReactNode> = {
  food: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </>
  ),
  wifi: (
    <>
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.86a10 10 0 0 1 14 0" />
      <path d="M8.5 16.43a5 5 0 0 1 7 0" />
    </>
  ),
  parking: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="4" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </>
  ),
  security: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

function AmenityIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      {ICONS[name] ?? ICONS.security}
    </svg>
  );
}

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-gold"
        >
          Amenities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="section-heading text-wine-deep text-[clamp(34px,4.5vw,56px)]"
        >
          Everything taken care of.
        </motion.h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.amenities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="group rounded-[20px] border border-wine/5 bg-white p-8 text-center shadow-[0_8px_24px_rgba(77,13,31,0.06)]
                         transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-wine hover:shadow-[0_24px_50px_rgba(122,21,48,0.25)]"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-sand text-wine transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
                <AmenityIcon name={a.icon} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-wine-deep transition-colors group-hover:text-white">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60 transition-colors group-hover:text-white/85">
                {a.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
