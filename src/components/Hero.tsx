"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/data/site";
import { ContactButton } from "@/components/ContactChooser";

export default function Hero({
  propertyCount,
  heroImages = [],
}: {
  propertyCount: number;
  heroImages?: string[];
}) {
  const count = propertyCount;
  // Use real admin photos if available, otherwise the branding defaults.
  const imgs = heroImages.length > 0 ? heroImages : site.heroImages;
  const city = site.city.split(",")[0];
  const eyebrow =
    count > 0
      ? `${count} Premium Location${count === 1 ? "" : "s"} in ${city}`
      : `Premium Girls PG in ${city}`;
  const stats = site.stats.map((s) =>
    s.label === "Locations" ? { ...s, value: count > 0 ? String(count) : "—" } : s
  );
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] as const } },
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-6 pb-16 pt-32 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:pt-36"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.span
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-[13px] font-semibold text-wine"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {eyebrow}
        </motion.span>

        <h1 className="section-heading text-wine-deep text-[clamp(44px,6vw,82px)]">
          {site.heroTitle.map((line, i) => (
            <motion.span key={i} variants={item} className="block">
              {i === site.heroTitle.length - 1 ? (
                <span className="text-wine-soft">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-[460px] text-[18px] leading-relaxed text-ink/70"
        >
          {site.heroSubtitle}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3.5">
          <a
            href="#properties"
            className="inline-flex items-center gap-2 rounded-full bg-wine px-7 py-4 font-semibold text-white
                       transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(122,21,48,0.35)]"
          >
            Explore Properties →
          </a>
          <ContactButton
            mode="wa"
            className="inline-flex items-center rounded-full border-[1.5px] border-wine px-7 py-4 font-semibold text-wine
                       transition-all hover:bg-wine hover:text-white"
          >
            Chat on WhatsApp
          </ContactButton>
        </motion.div>

        <motion.div variants={item} className="mt-12 flex gap-9">
          {stats.map((s) => (
            <div key={s.label}>
              <b className="font-serif text-3xl text-wine">{s.value}</b>
              <span className="block text-[13px] text-ink/55">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Visual */}
      <div className="relative h-[420px] md:h-[560px]">
        <motion.div
          aria-hidden
          className="absolute left-[-30px] top-[36%] h-44 w-44 rounded-full border-2 border-dashed border-gold animate-spin-slow"
        />
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="absolute right-0 top-0 z-20 h-[82%] w-[72%] overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(77,13,31,0.25)]"
        >
          {imgs[0] ? (
            <img src={imgs[0]} alt="Comfortable PG room" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-wine to-wine-deep">
              <span className="font-serif text-5xl font-black text-white/90">
                {site.brand}
                <span className="text-gold">.</span>
              </span>
            </div>
          )}
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="absolute bottom-0 left-0 z-30 h-[46%] w-[50%] overflow-hidden rounded-3xl border-[6px] border-cream shadow-[0_20px_40px_rgba(77,13,31,0.2)]"
        >
          {imgs[1] ? (
            <img src={imgs[1]} alt="Cozy PG interior" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-sand">
              <span className="font-serif text-2xl font-black text-wine/70">Jaipur</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
