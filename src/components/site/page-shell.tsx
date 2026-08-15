import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageOpener({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
}) {
  return (
    <section className="px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-52">
      <p className="eyebrow fade-up">{eyebrow}</p>
      <h1 className="fade-up mt-8 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-8xl">
        {title}
      </h1>
      {lede ? (
        <p className="fade-up mt-10 max-w-xl text-sm font-light leading-relaxed text-stone md:ml-auto md:text-base">
          {lede}
        </p>
      ) : null}
    </section>
  );
}