import LineFrame from "./LineFrame";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
}

const stats: Stat[][] = [
  [
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
      icon: "/assets/stat-grid.svg",
      iconWidth: 85,
      iconHeight: 85,
    },
  ],
  [
    {
      value: "76",
      label: "Years industry experience",
      icon: "/assets/stat-ring.svg",
      iconWidth: 104,
      iconHeight: 104,
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
  ],
];

export default function TheNumbers() {
  const flatStats = stats.flat();

  return (
    <section className="px-10 py-[80px]">
      <div className="mx-auto max-w-[1432px]">
        <h2
          className="type-section-heading mb-5"
        >
          The Numbers
        </h2>

        <div style={{ backgroundColor: "var(--color-page)" }}>
          <LineFrame columns={3} rows={2} crossConnectorSrc="/assets/connector-cross.svg" hideOuterVerticals>
          <div className="grid grid-cols-3">
            {flatStats.map((stat, i) => (
              <div key={i} className="flex items-center gap-5 p-5">
                <div
                  className="flex flex-shrink-0 items-center justify-center"
                  style={{
                    width: "116px",
                    height: "116px",
                  }}
                >
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

                <div className="pt-4" style={{ gap: "15px", display: "flex", flexDirection: "column" }}>
                  <p
                    className="font-heading text-dark uppercase"
                    style={{
                      fontSize: "64px",
                      lineHeight: 1.1,
                      letterSpacing: "-1.6px",
                    }}
                  >
                    {stat.value}
                    {stat.suffix && (
                      <span style={{ fontSize: "0.55em", verticalAlign: "super" }}>
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                  <p className="type-stat-label whitespace-pre-line">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </LineFrame>
        </div>
      </div>
    </section>
  );
}
