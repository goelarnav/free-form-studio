import { useEffect, useState } from "react";
import logo from "@/assets/logo-cropped.png";

const HOLD_MS = 1400;
const FADE_MS = 1500;

/** A single big LD mark, centered, that zooms gently away before the
 * homepage settles in. Plays on every landing on "/". */
export function IntroSplash() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const leaveTimer = window.setTimeout(() => setLeaving(true), HOLD_MS);
    const removeTimer = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, HOLD_MS + FADE_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-sand transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <span
        className={`block h-[16vh] w-[24vh] bg-clay transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${
          leaving ? "scale-110" : "scale-100"
        }`}
        style={{
          transitionDuration: `${FADE_MS}ms`,
          WebkitMaskImage: `url(${logo})`,
          maskImage: `url(${logo})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  );
}
