import { useEffect, useLayoutEffect, useRef, useState } from "react";
import GradientMirror from "./GradientMirror";

const MASK: React.CSSProperties = {
  WebkitMaskImage: "url('/assets/campbell-brown-logo.svg')",
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskImage: "url('/assets/campbell-brown-logo.svg')",
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
};

const LINES = ["Campbell", "Brown", "Associates"];
const GET_IN_TOUCH_LABEL = "Get In Touch";
const HOME_LABEL = "Home";
const CTA_FONT_WEIGHT = 700;
const CTA_LINE_HEIGHT = 1;
const CTA_MASK_PAD_Y = 1;

function buildTextMask(width: number, height: number, text: string, fontSize: number, padX: number) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="transparent" />
      <text
        x="${padX}"
        y="${height / 2}"
        fill="white"
        font-family="ABC ROM, Inter, system-ui, sans-serif"
        font-size="${fontSize}"
        font-weight="${CTA_FONT_WEIGHT}"
        dominant-baseline="middle"
      >${text}</text>
    </svg>
  `;

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

function HeaderActionText({
  clipPct,
  label,
  measureRef,
  mobile,
  showGradient = true,
}: {
  clipPct: number;
  label: string;
  measureRef: React.RefObject<HTMLSpanElement | null>;
  mobile: boolean;
  showGradient?: boolean;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const fontSize = mobile ? 13 : 16;
  const padX = mobile ? 4 : 8;

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const width = Math.ceil(rect.width) + padX * 3;
      const height = Math.ceil(rect.height) + CTA_MASK_PAD_Y * 2;
      setSize({ width, height });
      setMaskImage(buildTextMask(width, height, label, fontSize, padX));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [fontSize, label, padX]);

  return (
    <span
      className="relative inline-block font-body overflow-hidden"
      style={{
        width: size.width || undefined,
        height: size.height || undefined,
        fontSize,
        fontWeight: CTA_FONT_WEIGHT,
        lineHeight: CTA_LINE_HEIGHT,
        verticalAlign: "top",
      }}
    >
      <span
        ref={measureRef}
        className="invisible absolute left-0 top-0 whitespace-nowrap pointer-events-none"
        style={{ transform: `translate(${padX}px, ${CTA_MASK_PAD_Y}px)` }}
      >
        {label}
      </span>

      {size.width > 0 && size.height > 0 && maskImage ? (
        <>
          {showGradient ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
              style={{
                width: size.width,
                height: size.height,
                WebkitMaskImage: maskImage,
                WebkitMaskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "left top",
                maskImage,
                maskSize: "100% 100%",
                maskRepeat: "no-repeat",
                maskPosition: "left top",
              }}
            >
              <GradientMirror className="h-full w-full" />
            </span>
          ) : null}

          <span
            aria-hidden="true"
            className="absolute left-0 top-0 whitespace-nowrap"
            style={{
              color: "rgba(255,255,255,0.92)",
              clipPath: showGradient ? `inset(0 0 ${clipPct}% 0)` : `inset(${clipPct}% 0 0 0)`,
              transform: `translate(${padX}px, ${CTA_MASK_PAD_Y}px)`,
            }}
          >
            {label}
          </span>
        </>
      ) : null}
    </span>
  );
}

export default function Header() {
  const logoRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<HTMLSpanElement>(null);
  const homeRef = useRef<HTMLSpanElement>(null);
  const [logoClipPct, setLogoClipPct] = useState(0);
  const [ctaClipPct, setCtaClipPct] = useState(0);
  const [layoutW, setLayoutW] = useState(() => window.outerWidth || document.documentElement.clientWidth || window.innerWidth);
  const pathname = window.location.pathname;
  const isContactPage = pathname === "/get-in-touch";
  const isPolicyPage = pathname === "/privacy-policy" || pathname === "/cookies-policy";
  const isHomePage = pathname === "/";

  useEffect(() => {
    const updateLayoutW = () => setLayoutW(window.outerWidth || document.documentElement.clientWidth || window.innerWidth);
    window.addEventListener("resize", updateLayoutW);
    return () => window.removeEventListener("resize", updateLayoutW);
  }, []);

  useEffect(() => {
    const heroInner = document.getElementById("hero-inner");
    const heroSection = document.getElementById("hero-section");
    if (!heroInner || !heroSection) return;

    const update = () => {
      const logoEl = logoRef.current;
      const ctaEl = getInTouchRef.current ?? homeRef.current;
      const innerBounds = heroInner.getBoundingClientRect();

      if (logoEl) {
        const logoBounds = logoEl.getBoundingClientRect();
        const overlap = logoBounds.bottom - innerBounds.bottom;
        const pct = Math.min(100, Math.max(0, (overlap / logoBounds.height) * 100));
        setLogoClipPct(pct);
      }

      if (ctaEl) {
        const ctaBounds = ctaEl.getBoundingClientRect();
        const overlap = ctaBounds.bottom - innerBounds.bottom;
        const pct = Math.min(100, Math.max(0, (overlap / ctaBounds.height) * 100));
        setCtaClipPct(pct);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto flex items-center justify-between" style={{ padding: layoutW < 900 ? "20px 15px" : "30px 40px" }}>
        <a href="/" className="flex items-center" style={{ gap: layoutW < 900 ? "10px" : "14px", textDecoration: "none" }}>
          <div ref={logoRef} className="relative flex-shrink-0" style={{ width: 65, height: 42 }}>
            <div className="absolute inset-0" style={MASK}>
              <GradientMirror className="absolute inset-0 h-full w-full" />
            </div>

            <div
              className="absolute inset-0"
              style={{
                background: "white",
                ...MASK,
                clipPath: isPolicyPage ? "inset(100% 0 0 0)" : `inset(0 0 ${logoClipPct}% 0)`,
              }}
            />
          </div>

          <div
            className="font-body overflow-hidden"
            style={{
              height: 42,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1,
              color: "rgba(255,255,255,0.92)",
              clipPath: isPolicyPage ? "inset(100% 0 0 0)" : `inset(0 0 ${logoClipPct}% 0)`,
            }}
          >
            {LINES.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </a>

        <div
          className="flex items-center"
          style={{ gap: layoutW < 900 ? "16px" : "24px", flexShrink: 0 }}
        >
          {(isContactPage || isPolicyPage) ? (
            <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
              <HeaderActionText
                clipPct={isPolicyPage ? 100 : ctaClipPct}
                label={HOME_LABEL}
                measureRef={homeRef}
                mobile={layoutW < 900}
                showGradient={isPolicyPage}
              />
            </a>
          ) : null}

          {!isContactPage ? (
            <a href="/get-in-touch" style={{ textDecoration: "none", flexShrink: 0 }}>
              <HeaderActionText
                clipPct={isPolicyPage ? 100 : ctaClipPct}
                label={GET_IN_TOUCH_LABEL}
                measureRef={getInTouchRef}
                mobile={layoutW < 900}
                showGradient={!isHomePage}
              />
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
