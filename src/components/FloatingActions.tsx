"use client";

import { openContact } from "@/components/ContactChooser";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3.5">
      {/* Call */}
      <button
        type="button"
        onClick={() => openContact("call")}
        aria-label="Call us"
        className="grid h-[60px] w-[60px] place-items-center rounded-full bg-wine shadow-[0_10px_30px_rgba(122,21,48,0.5)] transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        type="button"
        onClick={() => openContact("wa")}
        aria-label="Chat on WhatsApp"
        className="relative grid h-[60px] w-[60px] place-items-center rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.5)] transition-transform hover:scale-110 animate-floaty"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-ripple" />
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2m5.8 14.01c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02s.75-2.14 1.02-2.43c.27-.29.58-.37.78-.37.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.73 1.21 1.57 1.96 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.17-.19.7-.82.89-1.1.19-.29.37-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36" />
        </svg>
      </button>
    </div>
  );
}
