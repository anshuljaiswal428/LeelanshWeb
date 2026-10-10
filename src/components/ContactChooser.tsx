"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, telLink, waLink } from "@/data/site";

type Mode = "call" | "wa";

// Module-level trigger so ANY component (even server-rendered ones via
// <ContactButton/>) can open the single global chooser.
let openFn: ((m: Mode) => void) | null = null;
export function openContact(mode: Mode) {
  openFn?.(mode);
}

/** A button that opens the number chooser. Use anywhere (incl. server comps). */
export function ContactButton({
  mode,
  className,
  children,
}: {
  mode: Mode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={() => openContact(mode)} className={className}>
      {children}
    </button>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m5.8 14.01c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02s.75-2.14 1.02-2.43c.27-.29.58-.37.78-.37.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.73 1.21 1.57 1.96 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.17-.19.7-.82.89-1.1.19-.29.37-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36" />
    </svg>
  );
}

export default function ContactChooser() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    openFn = (m) => setMode(m);
    return () => {
      openFn = null;
    };
  }, []);

  const close = () => setMode(null);
  const isCall = mode === "call";

  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/55 p-4"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="font-serif text-xl font-bold text-wine-deep">
                {isCall ? "Call us" : "Chat on WhatsApp"}
              </h3>
              <button
                onClick={close}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full text-ink/50 hover:bg-sand"
              >
                ✕
              </button>
            </div>
            <p className="px-5 pb-1 pt-1 text-sm text-ink/55">Choose a number:</p>
            <div className="p-3">
              {site.phones.map((ph) => (
                <a
                  key={ph.raw}
                  href={isCall ? telLink(ph.raw) : waLink(ph.raw, site.whatsappMessage)}
                  target={isCall ? undefined : "_blank"}
                  onClick={close}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-sand"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                      isCall ? "bg-wine/10 text-wine" : "bg-[#25D366]/15 text-[#128C4B]"
                    }`}
                  >
                    {isCall ? <PhoneIcon /> : <WaIcon />}
                  </span>
                  <span>
                    <b className="block text-[15px] text-ink">{ph.display}</b>
                    <span className="text-xs text-ink/50">{ph.label}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
