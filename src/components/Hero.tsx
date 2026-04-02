import { useEffect, useState } from "react";
import GradientCanvas from "./GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "../gradientConfig";

function getViewportWidth() {
  return window.outerWidth || document.documentElement.clientWidth || window.innerWidth;
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => getViewportWidth() < 900);

  useEffect(() => {
    const fit = () => {
      const viewportW = getViewportWidth();
      setIsMobile(viewportW < 900);
    };

    fit();
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
    };
  }, []);

  const mobileHeadlineSize = "clamp(34px, 12vw, 52px)";
  const desktopHeadlineSize = "clamp(40px, 7.5vw, 112px)";

  return (
    <div
      id="hero-inner"
      className="relative flex-1 overflow-hidden"
      style={{ borderRadius: "5px", minHeight: 0 }}
    >
      <GradientCanvas className="absolute inset-0 h-full w-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />

      <div
        className="absolute inset-0 z-10 flex flex-col justify-end"
        style={
          isMobile
            ? { paddingBlock: "24px", paddingInline: "10px", gap: "18px" }
            : { padding: "40px" }
        }
      >
        {isMobile ? (
          <>
            <div className="flex flex-col" style={{ gap: 0 }}>
              <span
                className="font-heading uppercase text-white block"
                style={{ fontSize: mobileHeadlineSize, lineHeight: 0.92, margin: 0 }}
              >
                Unrivalled Results.
              </span>
              <span
                className="font-heading uppercase text-white block"
                style={{ fontSize: mobileHeadlineSize, lineHeight: 0.92, margin: 0 }}
              >
                Unmatched Network.
              </span>
              <span
                className="font-heading uppercase text-white block"
                style={{
                  fontSize: mobileHeadlineSize,
                  lineHeight: 0.92,
                  margin: 0,
                  textAlign: "right",
                  alignSelf: "stretch",
                }}
              >
                Always Bespoke.
              </span>
            </div>

            <p
              className="font-body text-white/90"
              style={{
                margin: 0,
                marginTop: 20,
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              16 years placing top finance talent
              <br />
              for cutting edge clients
            </p>
          </>
        ) : (
          <>
            <span
              className="font-heading uppercase text-white block"
              style={{ fontSize: desktopHeadlineSize, lineHeight: 0.92, whiteSpace: "nowrap" }}
            >
              Unrivalled Results. Unmatched Network.
            </span>

            <div
              className="flex items-end justify-between"
              style={{ marginTop: "16px" }}
            >
              <p
                className="font-body text-white/90"
                style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.1, margin: 0 }}
              >
                16 years placing top finance talent
                <br />
                for cutting edge clients
              </p>

              <span
                className="font-heading uppercase text-white"
                style={{ fontSize: desktopHeadlineSize, lineHeight: 0.92 }}
              >
                Always Bespoke.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
