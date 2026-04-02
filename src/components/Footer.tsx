import GradientCanvas from "./GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "../gradientConfig";

export default function Footer() {
  return (
    <footer className="bg-page px-[5px] py-[5px] pt-[120px] md:pt-[120px]">
      <div
        className="relative overflow-hidden px-[10px] pt-[48px] pb-0 md:px-[35px]"
        style={{ borderRadius: "5px" }}
      >
        {/* Local gradient canvas — clipped by the border-radius */}
        <GradientCanvas className="absolute inset-0 w-full h-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />

        {/* Content sits above the canvas */}
        <div className="relative z-10">
        {/* Bottom row — links + copyright */}
        <div className="flex flex-col gap-6 px-0 py-2.5 md:flex-row md:items-center md:justify-between md:gap-7">
          {/* Legal links */}
          <div className="flex flex-col gap-2 md:flex-1 md:flex-row md:gap-8">
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
          <p className="type-ui" style={{ color: "rgba(255,255,255,0.9)", margin: 0 }}>
            &copy; 2026 Campbell Brown Associates. All Rights Reserved.
          </p>
        </div>
        </div>{/* end relative z-10 */}
      </div>
    </footer>
  );
}
