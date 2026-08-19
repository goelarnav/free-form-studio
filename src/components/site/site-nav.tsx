import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo-cropped.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/start-a-project", label: "Start a Project" },
  { to: "/contact", label: "Contact" },
] as const;

const FALLBACK_BG = "oklch(0.962 0.011 88)"; // ivory — the page's own default background

/** Reads the background color of whatever sits directly beneath a screen point,
 * walking up through ancestors until it finds one that actually paints a color. */
function readBackgroundAt(x: number, y: number): string {
  let el = document.elementFromPoint(x, y) as HTMLElement | null;
  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    el = el.parentElement;
  }
  return FALLBACK_BG;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const headerRef = useRef<HTMLElement | null>(null);

  // Only the home page opens on a full-bleed dark photo — everywhere else
  // starts directly on a light section, so the header should read solid,
  // color-matched to that section, from the first frame.
  const [overHero, setOverHero] = useState(isHome);
  const [headerColor, setHeaderColor] = useState(isHome ? "transparent" : FALLBACK_BG);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const header = headerRef.current;
    let raf = 0;

    const sample = () => {
      raf = 0;

      if (isHome && window.scrollY <= window.innerHeight - 120) {
        setOverHero(true);
        setHeaderColor("transparent");
        return;
      }
      setOverHero(false);

      if (!header) return;
      const y = header.getBoundingClientRect().height / 2 || 40;
      const prevPointerEvents = header.style.pointerEvents;
      header.style.pointerEvents = "none";
      const color = readBackgroundAt(window.innerWidth / 2, y);
      header.style.pointerEvents = prevPointerEvents;
      setHeaderColor(color);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [isHome]);

  // The mobile overlay is always a light sand panel, so the header must read
  // dark whenever it's open — independent of the section-color state.
  const dark = !overHero || open;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          overHero ? "border-transparent" : "border-ink/10"
        }`}
        style={{ backgroundColor: headerColor }}
      >
        <div className="grid grid-cols-3 items-center px-6 py-6 md:px-10 md:py-8">
          <Link to="/" className="block justify-self-start" aria-label="Luxury Decora home">
            <span
              role="img"
              aria-label="Luxury Decora"
              className={`block h-6 w-10 transition-[background-color,opacity] duration-500 hover:opacity-70 md:h-8 md:w-14 ${
                dark ? "bg-stone" : "bg-ivory"
              }`}
              style={{
                WebkitMaskImage: `url(${logo})`,
                maskImage: `url(${logo})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
              }}
            />
          </Link>

          <Link
            to="/"
            className={`font-wordmark justify-self-center whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-500 hover:opacity-60 sm:tracking-[0.22em] md:text-base md:tracking-[0.28em] ${
              dark ? "text-ink" : "text-ivory"
            }`}
          >
            Luxury Decora
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`z-50 justify-self-end font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-500 hover:opacity-60 md:text-xs md:tracking-[0.28em] ${
              dark ? "text-ink" : "text-ivory"
            }`}
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-sand transition-[opacity,visibility] duration-700 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center px-6 md:px-10">
          <ul className="space-y-1 md:space-y-2">
            {links.map((l, i) => (
              <li
                key={l.to}
                style={{ transitionDelay: `${120 + i * 60}ms` }}
                className={`transition-[opacity,transform] duration-700 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl leading-[1.15] text-ink transition-opacity hover:opacity-50 md:text-6xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-col gap-1 md:flex-row md:gap-12">
            <span className="eyebrow">+1 305 332 2202</span>
            <span className="eyebrow">info@luxurydecora.com</span>
            <span className="eyebrow">601 Gate Ln, Miami, FL 33137</span>
          </div>
        </nav>
      </div>
    </>
  );
}
