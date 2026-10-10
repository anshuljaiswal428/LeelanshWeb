import { site } from "@/data/site";
import { ContactButton } from "@/components/ContactChooser";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-14 text-center text-[#c9b2b8]">
      <div className="mx-auto max-w-[1180px]">
        <a href="#top" className="font-serif text-2xl font-black text-white">
          {site.brand}
          <span className="text-gold">.</span>
        </a>
        <p className="mt-3 text-sm">Girls Paying Guest · {site.city}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ContactButton
            mode="call"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            📞 Call us
          </ContactButton>
          <ContactButton
            mode="wa"
            className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
          >
            💬 WhatsApp
          </ContactButton>
        </div>

        <p className="mt-8 text-xs opacity-60">
          © {new Date().getFullYear()} {site.brandFull} · {site.footerCredit}
        </p>
      </div>
    </footer>
  );
}
