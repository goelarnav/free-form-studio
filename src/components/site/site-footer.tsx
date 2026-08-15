import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-linen px-6 pb-10 pt-24 md:px-10 md:pt-36">
      <div className="rule-line" />
      <div className="grid gap-12 pt-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl leading-tight text-ink md:text-5xl">
            Interiors that are<br />
            <em className="italic">quiet, warm, enduring.</em>
          </p>
          <Link
            to="/start-a-project"
            className="eyebrow link-underline mt-10 inline-block text-ink"
          >
            Start a project
          </Link>
        </div>

        <div className="md:col-span-3 md:col-start-8">
          <p className="eyebrow">Studio</p>
          <p className="mt-4 text-sm font-light leading-relaxed text-stone">
            601 Gate Ln
            <br />
            Miami, FL 33137
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow">Contact</p>
          <p className="mt-4 text-sm font-light leading-relaxed text-stone">
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

      <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
        <span className="eyebrow">Luxury Decora — Miami, Florida</span>
        <span className="eyebrow">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}