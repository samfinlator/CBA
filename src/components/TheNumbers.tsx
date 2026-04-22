import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
}

const stats: Stat[] = [
  {
    value: "94",
    suffix: "%",
    label: "Fill rate, retained",
    icon: "/assets/stat-94.svg",
    iconWidth: 94,
    iconHeight: 94,
  },
  {
    value: "3",
    label: "Expert consultants",
    icon: "/assets/stat-icon.svg",
    iconWidth: 116,
    iconHeight: 116,
  },
  {
    value: "89",
    suffix: "%",
    label: "Referral & repeat businesses",
    icon: "/assets/stat-ring.svg",
    iconWidth: 104,
    iconHeight: 104,
  },
  {
    value: "76",
    label: "Years industry experience",
    icon: "/assets/stat-grid.svg",
    iconWidth: 85,
    iconHeight: 85,
  },
  {
    value: "86",
    suffix: "%",
    label: "of placements stay 2+ years\n(industry average is 62%)",
    icon: "/assets/stat-86.svg",
    iconWidth: 85,
    iconHeight: 85,
  },
  {
    value: "0",
    label: "Shortlist fees",
    icon: "/assets/stat-dollar.svg",
    iconWidth: 65,
    iconHeight: 93,
  },
];

const GRID_LINE = "#E9E9E9";

function GridOverlay({ compact }: { compact: boolean }) {
  const verticals = compact ? [50] : [100 / 3, (100 / 3) * 2];
  const horizontals = compact ? [100 / 3, (100 / 3) * 2] : [50];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, backgroundColor: GRID_LINE }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1.5, backgroundColor: GRID_LINE }} />

      {verticals.map((left, index) => (
        <div key={`v-${index}`}>
          <div style={{ position: "absolute", left: `${left}%`, top: 0, bottom: 0, width: 1.5, backgroundColor: GRID_LINE, transform: "translateX(-0.75px)" }} />
          <img src="/assets/connector-t-down.svg" alt="" style={{ position: "absolute", left: `calc(${left}% - 10px)`, top: -0.5, width: 20, height: 12 }} />
          <img src="/assets/connector-t-up.svg" alt="" style={{ position: "absolute", left: `calc(${left}% - 10px)`, bottom: -0.5, width: 20, height: 12 }} />
        </div>
      ))}

      {horizontals.map((top, rowIndex) => (
        <div key={`h-${rowIndex}`}>
          <div style={{ position: "absolute", top: `${top}%`, left: 0, right: 0, height: 1.5, backgroundColor: GRID_LINE, transform: "translateY(-0.75px)" }} />
          {verticals.map((left, colIndex) => (
            <img
              key={`c-${rowIndex}-${colIndex}`}
              src="/assets/connector-cross.svg"
              alt=""
              style={{
                position: "absolute",
                left: `calc(${left}% - 10px)`,
                top: `calc(${top}% - 10px)`,
                width: 20,
                height: 20,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function CompactStatCard({ stat, isLeftColumn }: { stat: Stat; isLeftColumn: boolean }) {
  return (
    <div
      className="flex h-full items-start"
      style={{
        minHeight: 0,
        paddingBlock: "20px",
        paddingLeft: isLeftColumn ? "0px" : "20px",
        paddingRight: isLeftColumn ? "20px" : "0px",
      }}
    >
      <div className="flex flex-col items-start" style={{ width: "100%", gap: 10 }}>
        <div className="flex items-center justify-start" style={{ width: 96, height: 96 }}>
          <img
            src={stat.icon}
            alt=""
            style={{
              width: Math.min(stat.iconWidth ?? 96, 96),
              height: Math.min(stat.iconHeight ?? 96, 96),
              display: "block",
            }}
          />
        </div>

        <div className="flex min-w-0 flex-col items-start" style={{ gap: 8, width: "100%" }}>
          <p
            className="font-heading text-dark uppercase"
            style={{
              margin: 0,
              fontSize: 48,
              lineHeight: 0.92,
              letterSpacing: "-0.8px",
            }}
          >
            {stat.value}
            {stat.suffix && <span style={{ fontSize: "0.55em", verticalAlign: "super" }}>{stat.suffix}</span>}
          </p>
          <p className="type-stat-label whitespace-pre-line" style={{ margin: 0, fontSize: 16, lineHeight: 1.35, textAlign: "left", whiteSpace: "normal" }}>
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
}

function DesktopStatCard({ stat }: { stat: Stat }) {
  return (
    <div className="flex h-full items-start" style={{ gap: 24, minHeight: 224, padding: "32px" }}>
      <div className="flex flex-shrink-0 items-center justify-center" style={{ width: 120, height: 120 }}>
        <img src={stat.icon} alt="" style={{ width: stat.iconWidth ?? 85, height: stat.iconHeight ?? 85, display: "block" }} />
      </div>

      <div className="flex min-w-0 flex-col justify-start" style={{ gap: 14, paddingTop: 8 }}>
        <p
          className="font-heading text-dark uppercase"
          style={{
            margin: 0,
            fontSize: 64,
            lineHeight: 0.92,
            letterSpacing: "-1.6px",
          }}
        >
          {stat.value}
          {stat.suffix && <span style={{ fontSize: "0.55em", verticalAlign: "super" }}>{stat.suffix}</span>}
        </p>
        <p className="type-stat-label whitespace-pre-line" style={{ margin: 0, maxWidth: 240 }}>
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export default function TheNumbers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1432);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(() => update());
    update();
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isCompact = containerW < 1100;

  return (
    <section className="px-5 py-[80px] md:px-10">
      <div ref={containerRef} className="mx-auto max-w-[1432px]">
        <h2 className="type-section-heading mb-5">The Numbers</h2>

        <div className="relative" style={{ backgroundColor: "var(--color-page)" }}>
          <GridOverlay compact={isCompact} />
          {!isCompact ? (
            <div className="relative grid grid-cols-3">
              {stats.map((stat) => (
                <DesktopStatCard key={stat.label} stat={stat} />
              ))}
            </div>
          ) : (
            <div className="relative grid grid-cols-2">
              {stats.map((stat, index) => (
                <CompactStatCard key={stat.label} stat={stat} isLeftColumn={index % 2 === 0} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
