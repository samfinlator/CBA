import { useEffect, useRef, useState } from "react";
import LineFrame from "./LineFrame";

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
      <div
        className="flex flex-col items-start"
        style={{
          width: "100%",
          gap: 10,
        }}
      >
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
            {stat.suffix && (
              <span style={{ fontSize: "0.55em", verticalAlign: "super" }}>{stat.suffix}</span>
            )}
          </p>
          <p
            className="type-stat-label whitespace-pre-line"
            style={{ margin: 0, fontSize: 16, lineHeight: 1.35, textAlign: "left", whiteSpace: "normal" }}
          >
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
}

function DesktopStatCard({ stat }: { stat: Stat }) {
  return (
    <div
      className="flex h-full items-start"
      style={{
        gap: 24,
        minHeight: 224,
        padding: "32px",
      }}
    >
      <div className="flex flex-shrink-0 items-center justify-center" style={{ width: 120, height: 120 }}>
        <img
          src={stat.icon}
          alt=""
          style={{
            width: stat.iconWidth ?? 85,
            height: stat.iconHeight ?? 85,
            display: "block",
          }}
        />
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
          {stat.suffix && (
            <span style={{ fontSize: "0.55em", verticalAlign: "super" }}>{stat.suffix}</span>
          )}
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
  const compactGridRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1432);
  const [compactRowOffsets, setCompactRowOffsets] = useState<number[]>([]);

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
    const grid = compactGridRef.current;
    if (!grid || containerW >= 1100) return;

    const update = () => {
      const children = Array.from(grid.children) as HTMLElement[];
      if (children.length < 6) return;
      const gridTop = grid.getBoundingClientRect().top;
      const row2Top = children[2].getBoundingClientRect().top - gridTop;
      const row3Top = children[4].getBoundingClientRect().top - gridTop;
      setCompactRowOffsets([row2Top, row3Top]);
    };

    const ro = new ResizeObserver(() => update());
    ro.observe(grid);
    Array.from(grid.children).forEach((child) => ro.observe(child as Element));
    update();
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerW]);

  const isCompact = containerW < 1100;

  return (
    <section className="px-5 py-[80px] md:px-10">
      <div ref={containerRef} className="mx-auto max-w-[1432px]">
        <h2 className="type-section-heading mb-5">The Numbers</h2>

        <div style={{ backgroundColor: "var(--color-page)" }}>
          {!isCompact ? (
            <LineFrame columns={3} rows={2} crossConnectorSrc="/assets/connector-cross.svg" hideOuterVerticals>
              <div className="grid grid-cols-3">
                {stats.map((stat) => (
                  <DesktopStatCard key={stat.label} stat={stat} />
                ))}
              </div>
            </LineFrame>
          ) : (
            <LineFrame columns={2} rows={3} crossConnectorSrc="/assets/connector-cross.svg" hideOuterVerticals rowDividerOffsets={compactRowOffsets}>
              <div ref={compactGridRef} className="grid grid-cols-2">
                {stats.map((stat, index) => (
                  <CompactStatCard key={stat.label} stat={stat} isLeftColumn={index % 2 === 0} />
                ))}
              </div>
            </LineFrame>
          )}
        </div>
      </div>
    </section>
  );
}
