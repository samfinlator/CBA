import { useEffect, useRef, useState } from "react";
import GradientCanvas from "./GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "../gradientConfig";

interface Value {
  label: string;
  color: string;
  description: string;
}

const values: Value[] = [
  {
    label: "Empathy",
    color: "#FFBA00",
    description:
      "We support every candidate with sensitivity and counsel, particularly those missing out on roles they set their hearts on.",
  },
  {
    label: "Tenacity",
    color: "#0073FF",
    description:
      "We keep the process moving. Re-engaging candidates, managing dropouts and solving problems until the role is filled.",
  },
  {
    label: "Flexibility",
    color: "#53B2A8",
    description:
      "No two briefs are the same. We adapt to your process, your timeline and your priorities. Without compromising quality.",
  },
  {
    label: "Integrity",
    color: "#E53333",
    description:
      "Honest with clients, honest with candidates. We give it to you straight even when it's not what you want to hear.",
  },
  {
    label: "Intuition",
    color: "#D900D9",
    description:
      "Pattern recognition built over decades. Knowing which candidate will thrive before anyone else does.",
  },
];

const TABLET_BREAKPOINT = 1196;
const COMPACT_BREAKPOINT = 880;

function getLayoutWidth() {
  return window.outerWidth || document.documentElement.clientWidth || window.innerWidth;
}

function Frame({
  active,
  railLeft,
}: {
  active: boolean;
  railLeft: number;
}) {
  const leftConnectorX = active ? 0 : railLeft;
  const horizontalLeft = active ? 21 : railLeft + 11;
  const verticalTop = active ? 22 : 0;
  const verticalBottom = active ? 22 : 0;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40 }}>
      <img src="/assets/left-connector-down.svg" alt="" className="absolute" style={{ top: 0, left: leftConnectorX, width: 11, height: 12, zIndex: 2 }} />
      <img src="/assets/right-connector-down.svg" alt="" className="absolute" style={{ top: 0, right: 0, width: 12, height: 12, zIndex: 2 }} />
      <img src="/assets/left-connector-up.svg" alt="" className="absolute" style={{ bottom: 0, left: leftConnectorX, width: 11, height: 12, zIndex: 2 }} />
      <img src="/assets/right-connector-up.svg" alt="" className="absolute" style={{ bottom: 0, right: 0, width: 11, height: 12, zIndex: 2 }} />
      <div className="absolute" style={{ top: 0, left: horizontalLeft, right: 21, height: 1.5, backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ bottom: 0, left: horizontalLeft, right: 21, height: 1.5, backgroundColor: "#E9E9E9" }} />
      {active && (
        <div className="absolute" style={{ left: 0, top: verticalTop, bottom: verticalBottom, width: 1.5, backgroundColor: "#E9E9E9" }} />
      )}
      <div className="absolute" style={{ right: 0, top: verticalTop, bottom: verticalBottom, width: 1.5, backgroundColor: "#E9E9E9" }} />
    </div>
  );
}

function ValueCard({
  value,
  active,
  width,
  frameWidth,
  height,
  collapsedFrameHeight,
  copyW,
  onActivate,
  hoverEnabled,
}: {
  value: Value;
  active: boolean;
  width: number | string;
  frameWidth: number | string;
  height: number;
  collapsedFrameHeight: number;
  copyW: number;
  onActivate: () => void;
  hoverEnabled: boolean;
}) {
  const railLeft = active ? 14 : 3;
  const frameHeight = active ? "100%" : collapsedFrameHeight;
  const railInset = active ? 16 : 0;

  return (
    <button
      data-value-card={value.label}
      type="button"
      onMouseEnter={hoverEnabled ? onActivate : undefined}
      onFocus={hoverEnabled ? onActivate : undefined}
      onClick={onActivate}
      className="relative overflow-hidden text-left"
      style={{
        width,
        height,
        flexShrink: 0,
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        backgroundColor: "#F7F7F7",
        padding: 0,
        transition: "width 450ms ease",
        display: "flex",
        alignItems: "center",
        cursor: hoverEnabled ? "pointer" : "default",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: frameWidth,
          height: frameHeight,
          padding: active ? "24px 24px 28px" : "24px 18px 22px",
          transition: "width 450ms ease, height 450ms ease, padding 450ms ease",
        }}
      >
        <div
          className="absolute z-10"
          style={{
            left: railLeft,
            width: 12,
            top: railInset,
            bottom: railInset,
            overflow: "hidden",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
            zIndex: 20,
          }}
        >
          <GradientCanvas className="absolute inset-0 h-full w-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: value.color,
              mixBlendMode: "color",
              opacity: 0.95,
            }}
          />
        </div>

        <Frame active={active} railLeft={railLeft} />

        <div
          className="relative flex h-full flex-col"
          style={{ paddingLeft: active ? 12 : 2, paddingRight: active ? 12 : 0 }}
        >
          <p
            className="type-card-name"
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {value.label}
          </p>

          <div
            style={{
              overflow: "hidden",
              width: active ? copyW : 0,
              minWidth: 0,
              flex: "0 0 auto",
              opacity: active ? 1 : 0,
              transition: active
                ? "width 450ms ease, opacity 300ms ease 180ms"
                : "width 450ms ease, opacity 140ms ease",
              marginTop: "auto",
            }}
          >
            <p
              className="type-body"
              style={{
                margin: 0,
                width: copyW,
              }}
            >
              {value.description}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function WhatMakesUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const compactRailRef = useRef<HTMLDivElement>(null);
  const activeLabelRef = useRef<Value["label"]>("Empathy");
  const compactScrollLockRef = useRef(false);
  const [containerW, setContainerW] = useState(1432);
  const [layoutW, setLayoutW] = useState(() => getLayoutWidth());
  const [isDesktop, setIsDesktop] = useState(() => getLayoutWidth() >= TABLET_BREAKPOINT);
  const [isCompact, setIsCompact] = useState(() => getLayoutWidth() < COMPACT_BREAKPOINT);
  const [activeLabel, setActiveLabel] = useState<Value["label"]>("Empathy");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(() => update());
    update();
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      const nextLayoutW = getLayoutWidth();
      setLayoutW(nextLayoutW);
      setIsDesktop(nextLayoutW >= TABLET_BREAKPOINT);
      setIsCompact(nextLayoutW < COMPACT_BREAKPOINT);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    activeLabelRef.current = activeLabel;
  }, [activeLabel]);

  useEffect(() => {
    if (containerW >= COMPACT_BREAKPOINT) return;
    const rail = compactRailRef.current;
    if (!rail) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const updateActive = () => {
      const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-value-card]"));
      if (!cards.length) return;

      const scrollX = rail.scrollLeft;
      const maxScrollX = rail.scrollWidth - rail.clientWidth;
      const currentIndex = values.findIndex((value) => value.label === activeLabelRef.current);

      let targetIndex = currentIndex;

      if (scrollX <= 8) {
        targetIndex = 0;
      } else if (scrollX >= maxScrollX - 8) {
        targetIndex = cards.length - 1;
      } else {
        let closestIndex = currentIndex;
        let closestDistance = Number.POSITIVE_INFINITY;
        cards.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft - scrollX);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        targetIndex = Math.max(currentIndex - 1, Math.min(currentIndex + 1, closestIndex));
      }

      const targetLabel = cards[targetIndex]?.dataset.valueCard as Value["label"] | undefined;
      if (!targetLabel) return;

      if (targetLabel !== activeLabelRef.current) {
        setActiveLabel(targetLabel);
      }

      const targetCard = cards[targetIndex];
      if (targetCard && Math.abs(targetCard.offsetLeft - scrollX) > 2 && !compactScrollLockRef.current) {
        compactScrollLockRef.current = true;
        rail.scrollTo({ left: targetCard.offsetLeft, behavior: "smooth" });
        window.setTimeout(() => {
          compactScrollLockRef.current = false;
        }, 260);
      }
    };

    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateActive, 80);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    updateActive();

    return () => {
      clearTimeout(timeoutId);
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, [containerW]);

  const isTablet = !isDesktop && !isCompact;
  const desktopRowGap = 20;
  const desktopCardsMinW = 945;
  const desktopCardsMaxW = 960;
  const cardsW = isDesktop
    ? Math.min(desktopCardsMaxW, Math.max(desktopCardsMinW, containerW - 211 - desktopRowGap))
    : containerW;
  const narrativeW = isDesktop ? Math.max(211, containerW - cardsW - desktopRowGap) : containerW;
  const gap = 20;
  const cardH = isCompact ? 352 : isTablet ? 380 : 420;
  const tabletInactiveW = Math.max(104, Math.min(122, Math.floor(cardsW * 0.12)));
  const desktopInactiveW = Math.max(122, Math.min(154, Math.floor(cardsW * 0.142)));
  const desktopActiveW = Math.max(320, cardsW - 4 * desktopInactiveW - 4 * gap);
  const tabletActiveW = Math.max(320, cardsW - 4 * tabletInactiveW - 4 * gap);
  const tabletActiveCssW = `calc(100% - ${4 * tabletInactiveW + 4 * gap}px)`;
  const compactActiveW = Math.min(layoutW * 0.8, 383);
  const activeW = isCompact ? compactActiveW : isTablet ? tabletActiveCssW : desktopActiveW;
  const activeWNumber = isCompact ? compactActiveW : isTablet ? tabletActiveW : desktopActiveW;
  const inactiveFrameW = isCompact ? 154 : isTablet ? tabletInactiveW : desktopInactiveW;
  const collapsedFrameHeight = isCompact ? 352 : 352;
  const copyW = isCompact ? Math.max(220, activeWNumber - 74) : Math.max(240, activeWNumber - 56);

  return (
    <section className="px-5 py-[80px] md:px-10">
      <div ref={containerRef} className="mx-auto max-w-[1432px]">
        <h2 className="type-section-heading mb-5">What Makes Us</h2>

        <div className="relative" style={{ backgroundColor: "var(--color-page)" }}>
          <div className="absolute left-0 right-0 top-0 pointer-events-none" style={{ height: 1.5, backgroundColor: "#E9E9E9" }} />
          <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{ height: 1.5, backgroundColor: "#E9E9E9" }} />

          <div
            className="flex"
            style={{
              flexDirection: isDesktop ? "row" : "column",
              gap: isDesktop ? desktopRowGap : isCompact ? 28 : 40,
              paddingTop: 24,
              paddingBottom: 24,
            }}
          >
            <div style={{ width: isDesktop ? narrativeW : "100%", flex: isDesktop ? "1 1 auto" : undefined, minWidth: 0, flexShrink: 0 }}>
              <div className="flex flex-col gap-8">
                <p className="type-body-lg" style={{ margin: 0 }}>
                  Our personal, face-to-face approach sets us apart from other firms.
                </p>
                <p className="type-body-lg" style={{ margin: 0 }}>
                  Executive search is becoming increasingly automated, but there is a real demand for personal, human qualities. This is the service we provide to client and candidate alike.
                </p>
              </div>
            </div>

            <div
              style={{
                minWidth: 0,
                flex: isCompact ? "0 0 auto" : isDesktop ? `0 0 ${cardsW}px` : 1,
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap,
                overflowX: isCompact ? "auto" : "visible",
                overflowY: "hidden",
                scrollbarWidth: isCompact ? "none" : undefined,
                msOverflowStyle: isCompact ? "none" : undefined,
                paddingBottom: isCompact ? 4 : 0,
                paddingRight: isCompact ? "calc(12svw + 20px)" : 0,
                marginRight: isCompact ? -40 : 0,
                position: isCompact ? "sticky" : "static",
                top: isCompact ? 20 : undefined,
                alignSelf: isCompact ? "flex-start" : undefined,
                scrollSnapType: isCompact ? "x mandatory" : undefined,
                scrollPaddingLeft: isCompact ? 0 : undefined,
                scrollPaddingRight: isCompact ? "12svw" : undefined,
                WebkitOverflowScrolling: "touch",
                overscrollBehaviorX: isCompact ? "contain" : undefined,
                width: isCompact ? "calc(100% + 40px)" : isDesktop ? cardsW : "100%",
              }}
              ref={isCompact ? compactRailRef : undefined}
              className={isCompact ? "hide-scrollbar" : undefined}
            >
              {values.map((value) => {
                const active = value.label === activeLabel;
                return (
                  <ValueCard
                    key={value.label}
                    value={value}
                    active={active}
                    width={active ? activeW : inactiveFrameW}
                    frameWidth={active ? "100%" : inactiveFrameW}
                    height={cardH}
                    collapsedFrameHeight={collapsedFrameHeight}
                    copyW={copyW}
                    hoverEnabled={!isCompact}
                    onActivate={() => {
                      setActiveLabel(value.label);
                      if (isCompact) {
                        const rail = compactRailRef.current;
                        const card = rail?.querySelector<HTMLElement>(`[data-value-card="${value.label}"]`);
                        if (rail && card) rail.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
