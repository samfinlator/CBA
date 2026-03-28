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
    color: "var(--color-accent-gold)",
    description:
      "We work with people, not just CVs. Candidates are treated with the same care as clients.",
  },
  {
    label: "Tenacity",
    color: "var(--color-accent-blue)",
    description:
      "We keep the process moving. Re-engaging candidates, managing dropouts and solving problems until the role is filled.",
  },
  {
    label: "Flexibility",
    color: "var(--color-accent-teal)",
    description:
      "No two briefs are the same. We adapt to your process, your timeline and your priorities. Without compromising quality.",
  },
  {
    label: "Integrity",
    color: "var(--color-accent-salmon)",
    description:
      "Honest with clients, honest with candidates. We give it to you straight even when it's not what you want to hear.",
  },
  {
    label: "Intuition",
    color: "var(--color-accent-magenta)",
    description:
      "Pattern recognition built over decades. Knowing which candidate will thrive before anyone else does.",
  },
];

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
}: {
  value: Value;
  active: boolean;
  width: number | string;
  frameWidth: number | string;
  height: number;
  collapsedFrameHeight: number;
  copyW: number;
  onActivate: () => void;
}) {
  const railLeft = active ? 14 : 3;
  const frameHeight = active ? "100%" : collapsedFrameHeight;
  const railInset = active ? 16 : 0;

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className="relative overflow-hidden text-left"
      style={{
        width,
        height,
        backgroundColor: "#F7F7F7",
        padding: 0,
        transition: "width 450ms ease",
        display: "flex",
        alignItems: "center",
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
          style={{ paddingLeft: active ? 22 : 2 }}
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
  const [containerW, setContainerW] = useState(1432);
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

  const isStacked = containerW < 800;
  const narrativeW = isStacked ? containerW : Math.max(320, Math.min(560, containerW * 0.36));
  const cardsW = isStacked ? containerW : containerW - narrativeW - 40;
  const gap = 20;
  const cardH = isStacked ? 220 : 420;
  const activeW = isStacked ? cardsW : Math.max(320, Math.min(560, cardsW * 0.42));
  const inactiveFrameW = isStacked ? cardsW : Math.max(122, Math.min(154, Math.floor(cardsW * 0.142)));
  const collapsedFrameHeight = isStacked ? 220 : 352;
  const copyW = Math.max(220, activeW - 74);

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
              flexDirection: isStacked ? "column" : "row",
              gap: isStacked ? 28 : 40,
              paddingTop: 24,
              paddingBottom: 24,
            }}
          >
            <div style={{ width: isStacked ? "100%" : narrativeW, flexShrink: 0 }}>
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
                flex: 1,
                display: "flex",
                flexDirection: isStacked ? "column" : "row",
                gap,
              }}
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
                    onActivate={() => setActiveLabel(value.label)}
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
