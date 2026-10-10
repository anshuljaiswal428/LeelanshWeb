"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { ContactButton } from "@/components/ContactChooser";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m5.8 14.01c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02s.75-2.14 1.02-2.43c.27-.29.58-.37.78-.37.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.73 1.21 1.57 1.96 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.17-.19.7-.82.89-1.1.19-.29.37-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36" />
    </svg>
  );
}

export default function Owners({ photo }: { photo?: string }) {
  return (
    <section id="owners" className="bg-wine-deep py-24 text-cream md:py-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        >
          {photo ? (
            <img src={photo} alt={site.owners.names} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-wine to-wine-deep text-center">
              <div>
                <span className="font-serif text-6xl font-black text-gold">SN</span>
                <p className="mt-3 text-sm text-cream/70">Photo coming soon</p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-gold">
            Owned &amp; Managed By
          </p>
          <h2 className="section-heading text-white text-[clamp(32px,4.2vw,52px)]">
            {site.owners.names}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-cream/80">{site.owners.bio}</p>

          <div id="contact" className="mt-8 flex flex-wrap gap-4">
            <ContactButton
              mode="call"
              className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-gold hover:text-wine-deep"
            >
              <PhoneIcon /> Call us
            </ContactButton>
            <ContactButton
              mode="wa"
              className="flex items-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <WaIcon /> WhatsApp
            </ContactButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
