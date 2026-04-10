import { useState, useEffect, useRef } from "react";
import { subscribe } from "../utils/gradientSampler";

interface Quote {
  attribution: string;
  text: React.ReactNode;
}


const GradientPhrase = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribe((url) => {
      const rect = el.getBoundingClientRect();
      const viewportW = document.documentElement.clientWidth || window.innerWidth || 1;
      const viewportH = document.documentElement.clientHeight || window.innerHeight || 1;
      el.style.backgroundImage = `url(${url})`;
      el.style.backgroundSize = `${viewportW}px ${viewportH}px`;
      el.style.backgroundPosition = `${-rect.left}px ${-rect.top}px`;
    });
  }, []);

  return (
    <span
      ref={ref}
      style={{
        backgroundRepeat: "no-repeat",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
};

const quotes: Quote[] = [
  {
    attribution: "Radhika Radhakrishnan — CFO, S4 Capital",
    text: (
      <>
        &ldquo;CAMPBELL BROWN HAS BEEN{" "}
        <GradientPhrase>NOTHING SHORT OF EXCELLENT</GradientPhrase>{" "}
        — RESPONSIVE, TIMELY AND FUN.&rdquo;
      </>
    ),
  },
  {
    attribution: "Dan Yardley — CFO, MSQ",
    text: (
      <>
        &ldquo;THE{" "}
        <GradientPhrase>BEST-CONNECTED</GradientPhrase>{" "}
        HEADHUNTER IN THE ADVERTISING / COMMUNICATIONS SECTOR&rdquo;
      </>
    ),
  },
  {
    attribution: "David Graham — CFO, The & Partnership",
    text: (
      <>
        &ldquo;THEIR INTUITION OF KNOWING A CANDIDATE IS RIGHT FOR THE ROLE IS
        <GradientPhrase> TRULY EXCEPTIONAL</GradientPhrase>&rdquo;
      </>
    ),
  },
];

/* ── Connector Frame ──────────────────────────────────────────── */
function ConnectorFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img src="/assets/left-connector-down.svg"  alt="" className="absolute" style={{ top: 0,    left: 0,   width: 11, height: 12 }} />
      <img src="/assets/right-connector-down.svg" alt="" className="absolute" style={{ top: 0,    right: 0,  width: 12, height: 12 }} />
      <img src="/assets/left-connector-up.svg"    alt="" className="absolute" style={{ bottom: 0, left: 0,   width: 11, height: 12 }} />
      <img src="/assets/right-connector-up.svg"   alt="" className="absolute" style={{ bottom: 0, right: 0,  width: 11, height: 12 }} />
      <div className="absolute" style={{ top: 0,    left: 21, right: 21, height: "1.5px", backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ bottom: 0, left: 21, right: 21, height: "1.5px", backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ left: 0,  top: 22, bottom: 22, width: "1.5px",  backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ right: 0, top: 22, bottom: 22, width: "1.5px",  backgroundColor: "#E9E9E9" }} />
    </div>
  );
}

/* ── Responsive layout constants derived from container width ─── */
function getLayout(containerWidth: number) {
  const isSmall = containerWidth < 640;
  const isMid   = containerWidth >= 640 && containerWidth < 1024;

  // Active card narrower than viewport so side cards always peek in
  const cardW = isSmall
    ? Math.max(240, containerWidth - 80)          // ~295px at 375 → ~20px peek each side
    : isMid
    ? Math.round(containerWidth * 0.8)            // ~614px at 768 → ~35px peek each side
    : Math.min(980, containerWidth - 160);        // desktop: 980px max

  const gap       = isSmall ? 20 : isMid ? 40 : 120;
  const sideScale = 0.8;

  // Keep font size closer to original — let text wrap, don't shrink aggressively
  const fontSize = isSmall ? 36 : isMid ? Math.max(40, Math.round(containerWidth * 0.055)) : 64;

  const padding   = isSmall ? "24px 24px 40px" : isMid ? "32px 32px 48px" : "40px 40px 60px";
  const sectionPy = isSmall ? 40 : 80;
  return { cardW, gap, sideScale, fontSize, padding, sectionPy };
}

/* ── Infinite carousel ────────────────────────────────────────── */
const N        = quotes.length;
const extended = [...quotes, ...quotes, ...quotes];

const DURATION_MS = 1200;
const INTERVAL_MS = 12000;

export default function FeaturedQuotes() {
  const [active, setActive]         = useState(N + 1);
  const [animate, setAnimate]       = useState(true);
  const [isHovered, setIsHovered]   = useState(false);
  const [containerW, setContainerW] = useState(980);

  const snapPending  = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const isDraggingRef = useRef(false);

  /* ── Track container width ────────────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width);
    });
    ro.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  /* ── Auto-advance — pauses while hovered ─────────────────────── */
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      if (snapPending.current) return;
      setAnimate(true);
      setActive(prev => prev + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [isHovered]);

  /* ── Seamless wrap ────────────────────────────────────────────── */
  useEffect(() => {
    if (active >= N * 2) {
      snapPending.current = true;
      const t = setTimeout(() => {
        setAnimate(false);
        setActive(prev => prev - N);
        snapPending.current = false;
      }, DURATION_MS + 80);
      return () => clearTimeout(t);
    }
  }, [active]);

  useEffect(() => {
    if (!animate) {
      const id = setTimeout(() => setAnimate(true), 32);
      return () => clearTimeout(id);
    }
  }, [animate]);

  /* ── Responsive layout ────────────────────────────────────────── */
  const { cardW, gap, sideScale, fontSize, padding, sectionPy } = getLayout(containerW);
  const sideVisual  = cardW * sideScale;
  const marginComp  = (cardW - sideVisual) / 2;

  const dragThreshold = 48;

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (containerW >= 1024) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDeltaRef.current = 0;
    setIsHovered(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    dragDeltaRef.current = e.clientX - dragStartXRef.current;
  }

  function onPointerEnd() {
    if (!isDraggingRef.current) return;
    const delta = dragDeltaRef.current;
    isDraggingRef.current = false;
    dragDeltaRef.current = 0;
    setIsHovered(false);

    if (snapPending.current || Math.abs(delta) < dragThreshold) return;

    setAnimate(true);
    setActive((prev) => {
      if (delta < 0) return prev + 1;
      if (prev <= N) return prev + N - 1;
      return prev - 1;
    });
  }

  /* ── Position calculation ─────────────────────────────────────── */
  const widths   = extended.map((_, i) => (i === active ? cardW : sideVisual));
  const centres: number[] = [];
  let xCursor = 0;
  widths.forEach((w, i) => {
    centres.push(xCursor + w / 2);
    if (i < widths.length - 1) xCursor += w + gap;
  });
  const stripWidth = xCursor + widths[widths.length - 1];
  const translateX = -(centres[active] - stripWidth / 2);

  return (
    <section
      className="overflow-hidden"
      style={{ paddingTop: sectionPy, paddingBottom: sectionPy }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[1512px]"
        style={{ padding: "20px 0", cursor: containerW < 1024 ? "grab" : undefined, touchAction: containerW < 1024 ? "pan-y" : undefined }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: animate
              ? `transform ${DURATION_MS}ms cubic-bezier(0.4,0,0.2,1)`
              : "none",
          }}
        >
          {extended.map((quote, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                className="flex-shrink-0 relative"
                onClick={!isActive ? () => {
                  if (snapPending.current) return;
                  setAnimate(true);
                  setActive(i < active ? active - 1 : active + 1);
                } : undefined}
                style={{
                  width: `${cardW}px`,
                  transform: isActive ? "scale(1)" : `scale(${sideScale})`,
                  transformOrigin: "center center",
                  marginLeft:  isActive ? "0" : `-${marginComp}px`,
                  marginRight: isActive ? "0" : `-${marginComp}px`,
                  cursor: isActive ? "default" : "pointer",
                  transition: animate
                    ? `transform ${DURATION_MS}ms cubic-bezier(0.4,0,0.2,1), margin ${DURATION_MS}ms cubic-bezier(0.4,0,0.2,1)`
                    : "none",
                }}
              >
                <div
                  className="relative w-full"
                  style={{
                    backgroundColor: "#F7F7F7",
                    padding,
                  }}
                >
                  <ConnectorFrame />
                  <p
                    className="type-ui font-body text-center"
                    style={{ color: "#575757", marginBottom: "16px", lineHeight: 1 }}
                  >
                    {quote.attribution}
                  </p>
                  <p
                    className="font-heading uppercase text-dark text-center"
                    style={{ fontSize: `${fontSize}px`, lineHeight: 1.1, letterSpacing: `${fontSize * -0.02}px` }}
                  >
                    {quote.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
