import { useEffect, useRef, useState } from "react";
import GradientCanvas from "./GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "../gradientConfig";

export default function Hero() {
  const [fontSize, setFontSize] = useState(80);
  const textRef = useRef<HTMLSpanElement>(null);

  /* Fit headline to fill the text area width.
     Must wait for the custom font to load — measuring with the fallback gives wrong results. */
  useEffect(() => {
    const fit = () => {
      const el = textRef.current;
      if (!el) return;

      const containerW = window.innerWidth - 90; // 5px hero padding + 40px inner padding each side

      // Temporarily fixed+inline so getBoundingClientRect gives the true text width at 100px
      el.style.fontSize   = "100px";
      el.style.whiteSpace = "nowrap";
      el.style.display    = "inline";
      el.style.position   = "fixed";
      el.style.width      = "auto";
      const textW = el.getBoundingClientRect().width;
      el.style.fontSize   = "";
      el.style.display    = "";
      el.style.position   = "";
      el.style.width      = "";

      if (textW > 0) setFontSize(Math.floor((100 * containerW) / textW));
    };

    // Wait for the custom heading font before measuring, then re-fit on resize
    document.fonts.load('100px "NGT Vina Sans Neue"').then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div
      id="hero-inner"
      className="relative flex-1 overflow-hidden"
      style={{ borderRadius: "5px", minHeight: 0 }}
    >
      {/* Local gradient canvas — clipped by the border-radius */}
      <GradientCanvas className="absolute inset-0 w-full h-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />

      {/* Text content pinned to the bottom */}
      <div
        className="absolute inset-0 flex flex-col justify-end z-10"
        style={{ padding: "40px 40px 40px 40px" }}
      >
        {/* Main headline — fills container width */}
        <span
          ref={textRef}
          className="font-heading uppercase text-white block"
          style={{ fontSize, lineHeight: 0.92, whiteSpace: "nowrap" }}
        >
          Unrivalled Results. Unmatched Network.
        </span>

        {/* Bottom row: subtext left  |  Always Bespoke. right */}
        <div
          className="flex items-end justify-between"
          style={{ marginTop: "16px" }}
        >
          <p
            className="font-body text-white/90"
            style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.1 }}
          >
            16 years placing top finance talent
            <br />
            for cutting edge clients
          </p>

          <span
            className="font-heading uppercase text-white"
            style={{ fontSize, lineHeight: 0.92 }}
          >
            Always Bespoke.
          </span>
        </div>
      </div>
    </div>
  );
}
