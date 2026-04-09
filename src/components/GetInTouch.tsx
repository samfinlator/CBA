import { useState } from "react";
import GradientMirror from "./GradientMirror";

function ConnectorFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img src="/assets/left-connector-down.svg" alt="" className="absolute" style={{ top: 0, left: 0, width: 11, height: 12 }} />
      <img src="/assets/right-connector-down.svg" alt="" className="absolute" style={{ top: 0, right: 0, width: 12, height: 12 }} />
      <img src="/assets/left-connector-up.svg" alt="" className="absolute" style={{ bottom: 0, left: 0, width: 11, height: 12 }} />
      <img src="/assets/right-connector-up.svg" alt="" className="absolute" style={{ bottom: 0, right: 0, width: 11, height: 12 }} />
      <div className="absolute" style={{ top: 0, left: 21, right: 21, height: 1.5, backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ bottom: 0, left: 21, right: 21, height: 1.5, backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ left: 0, top: 22, bottom: 22, width: 1.5, backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ right: 0, top: 22, bottom: 22, width: 1.5, backgroundColor: "#E9E9E9" }} />
    </div>
  );
}

function ButtonFrame({ width, height, active }: { width: number; height: number; active: boolean }) {
  const verticalInset = active ? 10 : 22;
  const horizontalInset = active ? 10 : 21;
  const connectorLeft = active ? -1 : 0;
  const connectorRight = active ? -1 : 0;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width,
        height,
        transform: "translate(-50%, -50%)",
        transition: "width 320ms ease, height 320ms ease",
        zIndex: 20,
      }}
    >
      <img src="/assets/left-connector-down.svg" alt="" className="absolute" style={{ top: 0, left: connectorLeft, width: 11, height: 12, zIndex: 2 }} />
      <img src="/assets/right-connector-down.svg" alt="" className="absolute" style={{ top: 0, right: connectorRight, width: 12, height: 12, zIndex: 2 }} />
      <img src="/assets/left-connector-up.svg" alt="" className="absolute" style={{ bottom: 0, left: connectorLeft, width: 11, height: 12, zIndex: 2 }} />
      <img src="/assets/right-connector-up.svg" alt="" className="absolute" style={{ bottom: 0, right: connectorRight, width: 11, height: 12, zIndex: 2 }} />
      <div className="absolute" style={{ top: 0, left: horizontalInset, right: horizontalInset, height: 1.5, backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ bottom: 0, left: horizontalInset, right: horizontalInset, height: 1.5, backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ left: 0, top: verticalInset, bottom: verticalInset, width: 1.5, backgroundColor: "#E9E9E9" }} />
      <div className="absolute" style={{ right: 0, top: verticalInset, bottom: verticalInset, width: 1.5, backgroundColor: "#E9E9E9" }} />
    </div>
  );
}

function CtaButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/get-in-touch"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative inline-flex items-center justify-center"
      style={{
        width: 316,
        height: 98,
        textDecoration: "none",
      }}
    >
      <ButtonFrame width={hovered ? 208 : 228} height={hovered ? 48 : 68} active={hovered} />

      <span
        className="relative z-10 inline-flex items-center justify-center overflow-hidden font-body text-white"
        style={{
          width: 208,
          height: 48,
          borderRadius: 2,
          fontSize: 16,
          fontWeight: 700,
          transition: "transform 320ms ease",
        }}
      >
        <span className="absolute inset-0" style={{ borderRadius: 2, overflow: "hidden" }}>
          <GradientMirror className="absolute inset-0 h-full w-full" />
        </span>
        <span className="relative z-10">Get In Touch</span>
      </span>
    </a>
  );
}

export default function GetInTouch() {
  return (
    <section id="contact" className="px-5 py-[80px] md:px-10">
      <div className="mx-auto max-w-[1512px] overflow-x-clip">
        <div
          id="contact-cta-box"
          className="relative"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            backgroundColor: "#F7F7F7",
            padding: "64px 48px 76px",
          }}
        >
          <ConnectorFrame />

          <div
            className="relative z-10 flex flex-col items-center text-center"
            style={{ gap: 44 }}
          >
            <h3
              className="font-heading uppercase text-dark"
              style={{
                margin: 0,
                fontSize: "clamp(3rem, 7vw, 96px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              IT&rsquo;S NEVER JUST BUSINESS,
              <br />
              IT&rsquo;S ALWAYS PERSONAL.
            </h3>

            <CtaButton />
          </div>
        </div>
      </div>
    </section>
  );
}
