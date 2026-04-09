import { useEffect, useRef, useState } from "react";
import { PREFERS_REDUCED_MOTION } from "../utils/deviceCapability";

const logos = [
  { src: "/logos/logo-msq.webp", alt: "MSQ", width: 240, height: 48 },
  { src: "/logos/logo-amplify.webp", alt: "Amplify", width: 240, height: 48 },
  { src: "/logos/logo-hawkstone.webp", alt: "Hawkstone", width: 240, height: 48 },
  { src: "/logos/logo-zincmediagroup.webp", alt: "Zinc Media Group", width: 240, height: 48 },
  { src: "/logos/logo-mother.webp", alt: "Mother", width: 240, height: 48 },
  { src: "/logos/logo-talon.webp", alt: "Talon", width: 240, height: 48 },
  { src: "/logos/logo-outpost.webp", alt: "Outpost", width: 240, height: 48 },
  { src: "/logos/logo-surrealdb.webp", alt: "SurrealDB", width: 240, height: 48 },
  { src: "/logos/logo-trinnylondon.webp", alt: "Trinny London", width: 240, height: 48 },
  { src: "/logos/logo-snoop.webp", alt: "Snoop", width: 240, height: 48 },
  { src: "/logos/logo-passionpictures.webp", alt: "Passion Pictures", width: 240, height: 48 },
  { src: "/logos/logo-next15.webp", alt: "Next 15", width: 240, height: 48 },
  { src: "/logos/logo-monterosa.webp", alt: "Monterosa", width: 240, height: 48 },
  { src: "/logos/logo-mhpcommunications.webp", alt: "MHP Communications", width: 240, height: 48 },
  { src: "/logos/logo-mailonline.webp", alt: "Mail Online", width: 240, height: 48 },
  { src: "/logos/logo-jellyfish.webp", alt: "Jellyfish", width: 240, height: 48 },
  { src: "/logos/logo-ipgmediabrands.webp", alt: "IPG Mediabrands", width: 240, height: 48 },
  { src: "/logos/logo-envelopinsurtech.webp", alt: "Envelop Insurtech", width: 240, height: 48 },
  { src: "/logos/logo-bbh.webp", alt: "BBH", width: 240, height: 48 },
  { src: "/logos/logo-unicef.webp", alt: "UNICEF", width: 240, height: 48 },
  { src: "/logos/logo-bafta.webp", alt: "BAFTA", width: 240, height: 48 },
  { src: "/logos/logo-cassart.webp", alt: "Cass Art", width: 240, height: 48 },
  { src: "/logos/logo-royalacademy.webp", alt: "Royal Academy", width: 240, height: 48 },
  { src: "/logos/logo-stvstudio.webp", alt: "STV Studios", width: 240, height: 48 },
  { src: "/logos/logo-thameshudson.webp", alt: "Thames & Hudson", width: 240, height: 48 },
  { src: "/logos/logo-untold.webp", alt: "Untold", width: 240, height: 48 },
  { src: "/logos/logo-workingtitle.webp", alt: "Working Title", width: 240, height: 48 },
];

const SPEED = 40; // px per second

function getViewportWidth() {
  return window.outerWidth || document.documentElement.clientWidth || window.innerWidth;
}

export default function LogoTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTRef = useRef<number | undefined>(undefined);
  const lastWidthRef = useRef(0);
  const [isMobile, setIsMobile] = useState(() => getViewportWidth() < 900);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const images = Array.from(track.querySelectorAll("img"));
    let cancelled = false;

    const stop = () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
      lastTRef.current = undefined;
    };

    const start = () => {
      if (cancelled) return;
      stop();

      const singleLen = group.getBoundingClientRect().width;
      if (!singleLen) return;

      posRef.current = 0;
      track.style.transform = "translate3d(0px, 0, 0)";

      const tick = (now: number) => {
        if (cancelled) return;
        const dt = lastTRef.current !== undefined ? now - lastTRef.current : 0;
        lastTRef.current = now;

        posRef.current -= (SPEED * dt) / 1000;

        if (posRef.current <= -singleLen) {
          posRef.current += singleLen;
        }

        track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const waitForImages = async () => {
      await Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
                return;
              }
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
        )
      );
      if (!PREFERS_REDUCED_MOTION) start();
    };

    const handleResize = () => {
      const nextWidth = getViewportWidth();
      const widthChanged = Math.abs(nextWidth - lastWidthRef.current) > 1;
      setIsMobile(nextWidth < 900);

      if (!widthChanged) return;

      lastWidthRef.current = nextWidth;
      start();
    };

    lastWidthRef.current = getViewportWidth();
    waitForImages();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      stop();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex items-center overflow-hidden bg-page h-[46px] md:h-[57px]"
      aria-label="Our clients"
    >
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap w-max"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            className="flex items-center flex-shrink-0"
            style={{ gap: isMobile ? "48px" : "80px", paddingRight: isMobile ? "48px" : "80px" }}
          >
            {logos.map((logo) => (
              <img
                key={`${copy}-${logo.alt}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-5 md:h-6 max-w-[92px] md:max-w-[120px] object-contain opacity-60 grayscale flex-shrink-0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
