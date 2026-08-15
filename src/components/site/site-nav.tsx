import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/start-a-project", label: "Start a Project" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-normal">
        <div className="flex items-start justify-between px-6 py-6 md:px-10 md:py-8">
          <Link to="/" className="block" aria-label="Luxury Decora home">
            <img
              src={logo.url}
              alt="Luxury Decora"
              className="h-10 w-auto mix-blend-multiply contrast-[2.2] brightness-[0.78] md:h-14"
            />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="eyebrow z-50 text-ink transition-opacity hover:opacity-60"
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