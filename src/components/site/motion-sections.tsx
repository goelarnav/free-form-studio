import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects";

/* ---------- Hero: single image, slow drift zoom + scroll parallax ---------- */
export function Hero({ src, alt, label }: { src: string; alt: string; label: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

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
    <section ref={wrapRef} className="relative h-screen min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        <img src={src} alt={alt} className="drift absolute inset-0 h-full w-full object-cover" />
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
            A Miami practice shaping warm, restrained spaces — from the first plan study to the last
            placed object.
          </p>
          <span className="eyebrow text-ivory/80">{label}</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero picker: cycles every candidate main image with an index
   label + clickable dots, purely to help choose the final hero photo.
   Swap back to <Hero src=... /> once one is picked. ---------- */
export function HeroPicker({ slides }: { slides: { src: string; alt: string }[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % slides.length), 4000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[520px] w-full overflow-hidden">
      {slides.map((s, n) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            n === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-ink/10" />

      <div className="absolute left-6 top-24 md:left-10 md:top-28">
        <span className="inline-block bg-ink/70 px-4 py-2 font-sans text-sm font-semibold tracking-widest text-ivory backdrop-blur-sm">
          Option {i + 1} / {slides.length}
        </span>
      </div>

      {/* vertical studio line, Sandra-Britt style — same as the real Hero */}
      <span className="eyebrow absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 text-ivory/80 md:block [writing-mode:vertical-rl]">
        Luxury Decora — Miami, Florida
      </span>

      <div className="absolute inset-x-6 bottom-10 md:inset-x-16 md:bottom-14">
        <h1 className="font-display text-[3.75vw] leading-[0.82] tracking-tight text-ivory md:text-[2.25vw]">
          Interiors <em className="italic">for the</em> way you live
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-xs text-sm font-light leading-relaxed text-ivory/85">
            A Miami practice shaping warm, restrained spaces — from the first plan study to the last
            placed object.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {slides.map((s, n) => (
              <button
                key={s.src}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setI(n)}
                aria-label={`Show option ${n + 1}`}
                className={`h-2 shrink-0 rounded-full transition-all duration-300 ${
                  n === i ? "w-6 bg-ivory" : "w-2 bg-ivory/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Horizontal project rail — scrolls sideways only on deliberate
   horizontal input (trackpad swipe, shift+wheel, drag), never hijacks the
   page's normal vertical scroll. ---------- */
export function HorizontalProjects({ items }: { items: Project[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  /* Progress bar follows the track's own scroll position. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [items.length]);

  /* Click-and-drag scrolling for mouse users (trackpads already scroll
     the container natively on a horizontal swipe or shift+wheel). */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      track.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      dragging = false;
    };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="flex items-baseline justify-between px-6 md:px-10">
        <p className="eyebrow">Selected work</p>
        <Link to="/projects" className="eyebrow link-underline text-ink">
          All projects
        </Link>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-10 flex cursor-grab items-end gap-[10vw] overflow-x-auto px-6 pb-2 [overscroll-behavior-inline:contain] active:cursor-grabbing md:gap-[6vw] md:px-10"
      >
        {items.map((p, n) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className={`group block shrink-0 select-none ${
              n % 2 === 0 ? "w-[72vw] md:w-[34vw]" : "w-[62vw] md:w-[26vw]"
            }`}
          >
            <div className={n % 2 === 0 ? "" : "mb-[6vh] md:mb-[10vh]"}>
              <div className="overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  draggable={false}
                  className="h-[46vh] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] md:h-[52vh]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl leading-none text-ink md:text-3xl">
                  {p.title}
                </span>
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

      <div className="mt-8 px-6 md:px-10">
        <div className="rule-line relative">
          <span ref={barRef} className="absolute left-0 top-0 h-px w-0 bg-ink" />
        </div>
      </div>
    </section>
  );
}
