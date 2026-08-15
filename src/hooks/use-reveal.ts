import { useEffect, useRef, type RefObject } from "react";

/** Adds `is-in` to the element (and any [data-reveal] children) once it enters the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets: HTMLElement[] = [el, ...Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"))];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = entry.target as HTMLElement;
            const delay = Number(t.dataset.revealDelay ?? 0);
            window.setTimeout(() => t.classList.add("is-in"), delay);
            io.unobserve(t);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}
