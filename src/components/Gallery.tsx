"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryView } from "@/lib/data";

export default function Gallery({ images }: { images: GalleryView[] }) {
  const [active, setActive] = useState<GalleryView | null>(null);
  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="bg-sand py-24 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-gold"
        >
          Photo Gallery
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="section-heading text-wine-deep text-[clamp(34px,4.5vw,56px)]"
        >
          A peek inside.
        </motion.h2>

        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {images.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setActive(g)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 8) * 0.05 }}
              className="group block w-full overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(77,13,31,0.08)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.image}
                alt={g.caption || "Leelansh PG photo"}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.image} alt={active.caption || "Photo"} className="max-h-[85vh] w-full object-contain" />
              {active.caption && (
                <p className="bg-black/70 px-4 py-2 text-center text-sm text-white">{active.caption}</p>
              )}
            </motion.div>
            <button
              aria-label="Close"
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-xl text-white hover:bg-white/25"
              onClick={() => setActive(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
