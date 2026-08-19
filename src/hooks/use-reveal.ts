import { useEffect, useRef, type RefObject } from "react";

/** Adds `is-in` to the element (and any [data-reveal] children) once it enters the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets: HTMLElement[] = [
      el,
      ...Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]")),
    ];

    const reveal = (t: HTMLElement) => {
      const delay = Number(t.dataset["revealDelay"] ?? 0);
      window.setTimeout(() => t.classList.add("is-in"), delay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    // Anything already on screen at mount reveals immediately instead of
    // waiting on the observer's first callback — covers cases where a
    // target starts within (or just below) the fold, and guards against
    // the observer failing to fire (e.g. a hidden/backgrounded tab at
    // mount time never getting an initial intersection record).
    targets.forEach((t) => {
      const r = t.getBoundingClientRect();
      const alreadyVisible = r.top < window.innerHeight * 0.92 && r.bottom > 0;
      if (alreadyVisible) {
        reveal(t);
      } else {
        io.observe(t);
      }
    });

    return () => io.disconnect();
  }, []);

  return ref;
}
