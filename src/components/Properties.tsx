"use client";

import { motion } from "framer-motion";
import type { PropertyView } from "@/lib/data";
import { openContact } from "@/components/ContactChooser";

const NUMBER_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve",
];
function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" className="mt-0.5 shrink-0 text-wine-soft">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m5.8 14.01c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02s.75-2.14 1.02-2.43c.27-.29.58-.37.78-.37.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.73 1.21 1.57 1.96 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.17-.19.7-.82.89-1.1.19-.29.37-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36" />
    </svg>
  );
}

export default function Properties({ properties }: { properties: PropertyView[] }) {
  const count = properties.length;
  const heading =
    count === 0
      ? "Our properties"
      : `${numberWord(count)} ${count === 1 ? "home" : "homes"}, one promise.`;
  return (
    <section
      id="properties"
      className="bg-gradient-to-b from-cream to-sand py-24 md:py-28"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-gold"
        >
          Our Properties
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="section-heading text-wine-deep text-[clamp(34px,4.5vw,56px)]"
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-ink/60"
        >
          Each Leelansh PG is personally managed for comfort, cleanliness and
          safety. Tap for directions or message us directly.
        </motion.p>

        {count === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-wine/20 bg-white/50 p-12 text-center">
            <p className="text-lg font-semibold text-wine-deep">Listings coming soon</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
              Our PG details are being added. Message us on WhatsApp for current availability and pricing.
            </p>
          </div>
        )}

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {properties.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(77,13,31,0.08)]
                         transition-shadow hover:shadow-[0_30px_60px_rgba(77,13,31,0.2)]"
            >
              <div className="relative h-56 overflow-hidden">
                <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-wine/90 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {p.area}
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-wine-deep">{p.name}</h3>
                <p className="mt-2 text-sm text-ink/55">{p.description}</p>
                <div className="mt-3 flex gap-2 text-sm leading-snug text-ink/70">
                  <PinIcon />
                  <span>{p.address}</span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <a
                    href={p.mapLink}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-sand px-2 py-3 text-sm font-semibold text-wine transition-colors hover:bg-wine hover:text-white"
                  >
                    <MapIcon /> Map
                  </a>
                  <button
                    type="button"
                    onClick={() => openContact("call")}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-wine px-2 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <PhoneIcon /> Call
                  </button>
                  <button
                    type="button"
                    onClick={() => openContact("wa")}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <WaIcon /> Chat
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
