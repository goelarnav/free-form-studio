import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects";

/* ---------- Hero: slow crossfading stack with drifting frames ---------- */
export function HeroStack({
  slides,
}: {
  slides: { src: string; alt: string; label: string }[];
}) {
  const [i, setI] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % slides.length), 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      raf = window.requestAnimationFrame(() => setOffset(window.scrollY * 0.18));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[92vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        {slides.map((s, n) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={`drift absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              n === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-ink/10" />

      {/* vertical studio line, Sandra-Britt style */}
      <span className="eyebrow absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 text-ivory/80 md:block [writing-mode:vertical-rl]">
        Luxury Decora — Miami, Florida
      </span>

      <div className="absolute inset-x-6 bottom-10 md:inset-x-16 md:bottom-14">
        <h1 className="fade-up font-display text-[15vw] leading-[0.82] tracking-tight text-ivory md:text-[9vw]">
          Interiors <em className="italic">for the</em> way you live
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="fade-up max-w-xs text-sm font-light leading-relaxed text-ivory/85">
            A Miami practice shaping warm, restrained spaces — from the first plan study to the
            last placed object.
          </p>
          <div className="flex items-center gap-3">
            {slides.map((s, n) => (
              <button
                key={s.label}
                onClick={() => setI(n)}
                aria-label={s.label}
                className={`h-px w-10 transition-all duration-700 ${
                  n === i ? "bg-ivory" : "bg-ivory/35"
                }`}
              />
            ))}
            <span className="eyebrow ml-4 text-ivory/80">{slides[i]!.label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Endless horizontal image band ---------- */
export function ImageBand({ images }: { images: { src: string; caption: string }[] }) {
  const row = [...images, ...images];
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-linen py-10">
      <div className="marquee-track gap-6 pr-6">
        {row.map((im, n) => (
          <figure key={`${im.src}-${n}`} className="w-[52vw] shrink-0 md:w-[26vw]">
            <img
              src={im.src}
              alt={im.caption}
              loading="lazy"
              className="h-[34vh] w-full object-cover md:h-[42vh]"
            />
            <figcaption className="eyebrow mt-3">{im.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- Pinned horizontal project scroller ---------- */
export function HorizontalProjects({ items }: { items: Project[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const distance = Math.max(track.scrollWidth - window.innerWidth, 0);
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      setX(-p * distance);
    };
    const onScroll = () => {
      raf = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* desktop: pinned horizontal travel */}
      <section ref={sectionRef} className="relative hidden h-[380vh] bg-sand md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="flex items-baseline justify-between px-10">
            <p className="eyebrow">Selected work</p>
            <Link to="/projects" className="eyebrow link-underline text-ink">
              All projects
            </Link>
          </div>

          <div
            ref={trackRef}
            className="mt-10 flex w-max items-end gap-[6vw] px-10 will-change-transform"
            style={{ transform: `translate3d(${x}px, 0, 0)`, transition: "transform 120ms linear" }}
          >
            {items.map((p, n) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block shrink-0"
                style={{ width: n % 2 === 0 ? "34vw" : "26vw" }}
              >
                <div className={n % 2 === 0 ? "" : "mb-[10vh]"}>
                  <div className="overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="h-[52vh] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display text-3xl leading-none text-ink">{p.title}</span>
                    <span className="eyebrow">{p.index}</span>
                  </div>
                  <p className="eyebrow mt-2">
                    {p.location} — {p.year}
                  </p>
                </div>
              </Link>
            ))}
            <div className="w-[10vw] shrink-0" />
          </div>

          <div className="mt-12 px-10">
            <div className="rule-line relative">
              <span
                className="absolute left-0 top-0 h-px bg-ink transition-[width] duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* mobile: swipeable rail */}
      <section className="bg-sand py-20 md:hidden">
        <div className="flex items-baseline justify-between px-6">
          <p className="eyebrow">Selected work</p>
          <Link to="/projects" className="eyebrow link-underline text-ink">
            All
          </Link>
        </div>
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6">
          {items.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="w-[74vw] shrink-0 snap-start"
            >
              <img src={p.cover} alt={p.title} loading="lazy" className="h-[54vh] w-full object-cover" />
              <span className="mt-3 block font-display text-2xl text-ink">{p.title}</span>
              <span className="eyebrow">{p.location}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
