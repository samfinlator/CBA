/**
 * LineFrame — reusable border + T-connector overlay.
 * Renders a 1px border around children with vertical dividers and
 * connector SVGs at the intersections.
 *
 * Props:
 * - columns: number of equal-width columns (dividers appear between them)
 * - className: additional classes on the outer wrapper
 * - children: the content inside
 */
export default function LineFrame({
  columns,
  rows = 1,
  className = "",
  crossConnectorSrc,
  hideOuterVerticals = false,
  children,
}: {
  columns: number;
  rows?: number;
  className?: string;
  crossConnectorSrc?: string;
  hideOuterVerticals?: boolean;
  children: React.ReactNode;
}) {
  // Generate divider positions as percentages
  const dividers: number[] = [];
  for (let i = 1; i < columns; i++) {
    dividers.push((i / columns) * 100);
  }

  const rowDividers: number[] = [];
  for (let i = 1; i < rows; i++) {
    rowDividers.push((i / rows) * 100);
  }

  return (
    <div className={`relative ${className}`}>
      {/* Outer border */}
      {hideOuterVerticals ? (
        <>
          <div
            className="pointer-events-none absolute left-0 right-0 top-0"
            style={{ height: 1.5, backgroundColor: "rgba(201, 201, 201, 0.3)" }}
          />
          <div
            className="pointer-events-none absolute left-0 right-0 bottom-0"
            style={{ height: 1.5, backgroundColor: "rgba(201, 201, 201, 0.3)" }}
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 0 1.5px rgba(201, 201, 201, 0.3)" }}
        />
      )}

      {/* Vertical divider lines */}
      {dividers.map((pos) => (
        <div key={pos}>
          <div
            className="pointer-events-none absolute bg-grey-line"
            style={{ left: `${pos}%`, top: 22, bottom: 22, width: 1.5, transform: "translateX(-50%)" }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              left: `${pos}%`,
              top: 0,
              width: 1.5,
              height: 22,
              backgroundColor: "var(--color-page)",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              left: `${pos}%`,
              bottom: 0,
              width: 1.5,
              height: 22,
              backgroundColor: "var(--color-page)",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
          />
        </div>
      ))}

      {/* Horizontal divider lines */}
      {rowDividers.map((pos) => (
        <div
          key={`row-${pos}`}
          className="pointer-events-none absolute left-0 right-0 bg-grey-line"
          style={{ top: `${pos}%`, height: 1.5, transform: "translateY(-50%)" }}
        />
      ))}

      {/* Top T-connectors */}
      {dividers.map((pos) => (
        <div key={`top-${pos}`}>
          <div
            className="pointer-events-none absolute top-0"
            style={{ left: `${pos}%`, transform: "translateX(-50%)", width: 40, height: 1.5, backgroundColor: "var(--color-page)", zIndex: 1 }}
          />
          <div
            className="pointer-events-none absolute top-0"
            style={{ left: `${pos}%`, transform: "translateX(-50%)", zIndex: 2 }}
          >
            <img src="/assets/connector-t-down.svg" alt="" style={{ width: 20, height: 12, display: "block" }} />
          </div>
        </div>
      ))}

      {/* Bottom T-connectors */}
      {dividers.map((pos) => (
        <div key={`bot-${pos}`}>
          <div
            className="pointer-events-none absolute bottom-0"
            style={{ left: `${pos}%`, transform: "translateX(-50%)", width: 40, height: 1.5, backgroundColor: "var(--color-page)", zIndex: 1 }}
          />
          <div
            className="pointer-events-none absolute bottom-0"
            style={{ left: `${pos}%`, transform: "translateX(-50%)", zIndex: 2 }}
          >
            <img src="/assets/connector-t-up.svg" alt="" style={{ width: 20, height: 12, display: "block" }} />
          </div>
        </div>
      ))}

      {/* Middle cross connectors */}
      {crossConnectorSrc &&
        rowDividers.flatMap((rowPos) =>
          dividers.map((colPos) => (
            <div key={`cross-${rowPos}-${colPos}`}>
              <div
                className="pointer-events-none absolute"
                style={{
                  left: `${colPos}%`,
                  top: `${rowPos}%`,
                  width: 40,
                  height: 1.5,
                  backgroundColor: "var(--color-page)",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              />
              <div
                className="pointer-events-none absolute"
                style={{
                  left: `${colPos}%`,
                  top: `${rowPos}%`,
                  width: 1.5,
                  height: 42,
                  backgroundColor: "var(--color-page)",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              />
              <div
                className="pointer-events-none absolute"
                style={{ left: `${colPos}%`, top: `${rowPos}%`, transform: "translate(-50%, -50%)", zIndex: 2 }}
              >
                <img src={crossConnectorSrc} alt="" style={{ width: 20, height: 22 }} />
              </div>
            </div>
          ))
        )}

      {/* Content */}
      {children}
    </div>
  );
}
