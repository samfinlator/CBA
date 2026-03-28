import GradientCanvas from "./GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "../gradientConfig";

export default function Footer() {
  return (
    <footer className="px-[5px] pt-[120px] py-[5px] bg-page">
      <div
        className="relative overflow-hidden px-[35px] pt-5 pb-0"
        style={{ borderRadius: "5px" }}
      >
        {/* Local gradient canvas — clipped by the border-radius */}
        <GradientCanvas className="absolute inset-0 w-full h-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />

        {/* Content sits above the canvas */}
        <div className="relative z-10">
        {/* Top row — logo */}
        <div className="flex items-center mb-5">
          <img
            src="/assets/campbell-brown-logo.svg"
            alt="Campbell Brown Associates"
            className="h-10 brightness-0 invert"
          />
        </div>

        {/* Bottom row — links + copyright */}
        <div
          className="flex items-center justify-between px-0 py-2.5"
          style={{ gap: "20px" }}
        >
          {/* Legal links */}
          <div className="flex flex-1" style={{ gap: "40px" }}>
            <a href="#" className="type-ui hover:underline" style={{ color: "white" }}>
              Terms &amp; conditions
            </a>
            <a href="#" className="type-ui hover:underline" style={{ color: "white" }}>
              Privacy policy
            </a>
            <a href="#" className="type-ui hover:underline" style={{ color: "white" }}>
              Equality policy
            </a>
          </div>

          {/* Copyright */}
          <p className="type-ui" style={{ color: "rgba(255,255,255,0.9)" }}>
            &copy; 2026 Campbell Brown Associates. All Rights Reserved.
          </p>
        </div>
        </div>{/* end relative z-10 */}
      </div>
    </footer>
  );
}
