import { useEffect, useRef, useState } from "react";
import GradientCanvas from "./GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "../gradientConfig";

const MASK: React.CSSProperties = {
  WebkitMaskImage:    "url('/assets/campbell-brown-logo.svg')",
  WebkitMaskSize:     "contain",
  WebkitMaskRepeat:   "no-repeat",
  WebkitMaskPosition: "center",
  maskImage:          "url('/assets/campbell-brown-logo.svg')",
  maskSize:           "contain",
  maskRepeat:         "no-repeat",
  maskPosition:       "center",
};


const LINES = ["Campbell", "Brown", "Associates"];

export default function Header() {
  const logoRef                         = useRef<HTMLDivElement>(null);
  const [clipPct, setClipPct]           = useState(0);   // % clipped from bottom of white overlay
  const [overHero, setOverHero]         = useState(true); // for wordmark / CTA colour

  /* Live clip-path: clip tracks the inner gradient div's bottom edge (not the full
     hero-section which includes LogoTicker + padding below the gradient). */
  useEffect(() => {
    const heroInner   = document.getElementById("hero-inner");
    const heroSection = document.getElementById("hero-section");
    if (!heroInner || !heroSection) return;

    const update = () => {
      const logoEl = logoRef.current;
      if (!logoEl) return;
      const innerBounds   = heroInner.getBoundingClientRect();
      const sectionBounds = heroSection.getBoundingClientRect();
      const logoBounds    = logoEl.getBoundingClientRect();

      // Clip white overlay from bottom as gradient edge crosses the logo
      const overlap = logoBounds.bottom - innerBounds.bottom;
      const pct = Math.min(100, Math.max(0, (overlap / logoBounds.height) * 100));
      setClipPct(pct);
      // Wordmark stays white while any part of the hero section is visible
      setOverHero(sectionBounds.bottom > 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="flex items-center justify-between mx-auto"
        style={{ padding: "30px 40px" }}
      >
      {/* ── Logo lockup ── */}
      <div className="flex items-center" style={{ gap: "14px" }}>

        {/* Mark: gradient always underneath, white overlay clips to hero edge */}
        <div ref={logoRef} className="relative flex-shrink-0" style={{ width: 65, height: 42 }}>
          <div className="absolute inset-0" style={{ ...MASK }}>
            <GradientCanvas className="absolute inset-0 w-full h-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: "white",
              ...MASK,
              clipPath: `inset(0 0 ${clipPct}% 0)`,
            }}
          />
        </div>

        {/* Wordmark: clipped from the bottom to match the white logo overlay */}
        <div
          className="font-body overflow-hidden"
          style={{
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.1,
            color: "rgba(255,255,255,0.92)",
            clipPath: `inset(0 0 ${clipPct}% 0)`,
          }}
        >
          {LINES.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <a href="#contact" style={{ textDecoration: "none" }}>
        <span
          className={`font-body ${!overHero ? "gradient-text" : ""}`}
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: overHero ? "white" : undefined,
          }}
        >
          Get In Touch
        </span>
      </a>
      </div>
    </header>
  );
}
