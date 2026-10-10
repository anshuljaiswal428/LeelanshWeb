"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ContactButton } from "@/components/ContactChooser";

const links = [
  { href: "#properties", label: "Properties" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#owners", label: "Owners" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300 backdrop-blur-md border-b ${
        scrolled
          ? "py-3 bg-cream/85 border-wine/10 shadow-[0_6px_20px_rgba(77,13,31,0.08)]"
          : "py-5 bg-cream/60 border-transparent"
      }`}
    >
      <a href="#top" className="font-serif text-2xl font-black text-wine tracking-tight">
        {site.brand}
        <span className="text-gold">.</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="relative text-[15px] font-medium text-ink transition-colors hover:text-wine
                       after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-wine
                       after:transition-all hover:after:w-full"
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ContactButton
          mode="wa"
          className="hidden sm:inline-flex rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-white
                     transition-all hover:bg-wine-deep hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(122,21,48,0.3)]"
        >
          WhatsApp Us
        </ContactButton>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-wine/20 text-wine"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full md:hidden bg-cream border-b border-wine/10 shadow-lg">
          <div className="flex flex-col p-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-ink font-medium border-b border-wine/5 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
