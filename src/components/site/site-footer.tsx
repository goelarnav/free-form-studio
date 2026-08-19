import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-cropped.png";

const siteLinks = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-linen px-6 pb-10 pt-16 md:px-10 md:pt-20">
      {/* Asymmetric grid — statement carries weight on the left, the rest breathes on the right */}
      <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-6">
          <p className="font-display text-4xl leading-[1.08] text-ink md:text-6xl">
            Interiors that are
            <br />
            <em className="italic">quiet, warm, enduring.</em>
          </p>
          <Link
            to="/start-a-project"
            className="group mt-10 inline-flex items-center gap-5 border border-ink px-8 py-4 transition-colors hover:bg-ink"
          >
            <span className="eyebrow text-ink transition-colors group-hover:text-ivory">
              Start a project
            </span>
            <span
              aria-hidden="true"
              className="text-ink transition-all group-hover:translate-x-1 group-hover:text-ivory"
            >
              →
            </span>
          </Link>
        </div>

        <div className="md:col-span-2 md:col-start-8 md:mt-2">
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {siteLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-underline inline-block font-display text-lg text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 md:col-start-10 md:mt-2">
          <p className="eyebrow">Studio</p>
          <p className="mt-5 text-sm font-light leading-relaxed text-stone">
            601 Gate Ln
            <br />
            Miami, FL 33137
          </p>
        </div>

        <div className="md:col-span-2 md:col-start-12 md:mt-2 md:justify-self-end">
          <p className="eyebrow">Contact</p>
          <p className="mt-5 text-sm font-light leading-relaxed text-stone">
            <a href="tel:+13053322202" className="link-underline inline-block">
              +1 305 332 2202
            </a>
            <br />
            <a href="mailto:info@luxurydecora.com" className="link-underline inline-block">
              info@luxurydecora.com
            </a>
          </p>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap items-end justify-between gap-4 md:mt-28">
        <Link to="/" aria-label="Luxury Decora home" className="flex items-end gap-5">
          <span
            role="img"
            aria-label="Luxury Decora"
            className="block h-7 w-10 bg-ink transition-opacity hover:opacity-70"
            style={{
              WebkitMaskImage: `url(${logo})`,
              maskImage: `url(${logo})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "left bottom",
              maskPosition: "left bottom",
            }}
          />
          <span className="eyebrow">Miami, Florida</span>
        </Link>
        <span className="eyebrow">© {new Date().getFullYear()} Luxury Decora</span>
      </div>
      <div className="rule-line mt-6" />
    </footer>
  );
}
