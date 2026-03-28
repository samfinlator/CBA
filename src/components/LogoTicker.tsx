import { useEffect, useRef } from "react";

const logos = [
  { src: "/logos/logo-msq.webp", alt: "MSQ" },
  { src: "/logos/logo-amplify.webp", alt: "Amplify" },
  { src: "/logos/logo-hawkstone.webp", alt: "Hawkstone" },
  { src: "/logos/logo-zincmediagroup.webp", alt: "Zinc Media Group" },
  { src: "/logos/logo-mother.webp", alt: "Mother" },
  { src: "/logos/logo-talon.webp", alt: "Talon" },
  { src: "/logos/logo-outpost.webp", alt: "Outpost" },
  { src: "/logos/logo-surrealdb.webp", alt: "SurrealDB" },
  { src: "/logos/logo-trinnylondon.webp", alt: "Trinny London" },
  { src: "/logos/logo-snoop.webp", alt: "Snoop" },
  { src: "/logos/logo-passionpictures.webp", alt: "Passion Pictures" },
  { src: "/logos/logo-next15.webp", alt: "Next 15" },
  { src: "/logos/logo-monterosa.webp", alt: "Monterosa" },
  { src: "/logos/logo-mhpcommunications.webp", alt: "MHP Communications" },
  { src: "/logos/logo-mailonline.webp", alt: "Mail Online" },
  { src: "/logos/logo-jellyfish.webp", alt: "Jellyfish" },
  { src: "/logos/logo-ipgmediabrands.webp", alt: "IPG Mediabrands" },
  { src: "/logos/logo-envelopinsurtech.webp", alt: "Envelop Insurtech" },
  { src: "/logos/logo-bbh.webp", alt: "BBH" },
  { src: "/logos/logo-unicef.webp", alt: "UNICEF" },
  { src: "/logos/logo-bafta.webp", alt: "BAFTA" },
  { src: "/logos/logo-cassart.webp", alt: "Cass Art" },
  { src: "/logos/logo-royalacademy.webp", alt: "Royal Academy" },
  { src: "/logos/logo-stvstudio.webp", alt: "STV Studios" },
  { src: "/logos/logo-thameshudson.webp", alt: "Thames & Hudson" },
  { src: "/logos/logo-untold.webp", alt: "Untold" },
  { src: "/logos/logo-workingtitle.webp", alt: "Working Title" },
];

const SPEED = 40; // px per second

export default function LogoTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef<number | undefined>(undefined);
  const lastTRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for all images to load so scrollWidth is accurate
    const images = Array.from(track.querySelectorAll("img"));
    let loaded = 0;

    const start = () => {
      // singleLen = width of one copy of the logos strip
      const singleLen = track.scrollWidth / 2;

      const tick = (now: number) => {
        const dt = lastTRef.current !== undefined ? now - lastTRef.current : 0;
        lastTRef.current = now;

        posRef.current -= (SPEED * dt) / 1000;

        // Loop back seamlessly when one full copy has scrolled past
        if (posRef.current <= -singleLen) {
          posRef.current += singleLen;
        }

        track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const onLoad = () => {
      loaded++;
      if (loaded >= images.length) start();
    };

    if (images.every(img => img.complete)) {
      start();
    } else {
      images.forEach(img => {
        if (img.complete) { loaded++; }
        else { img.addEventListener("load", onLoad, { once: true }); }
      });
      if (loaded >= images.length) start();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="overflow-hidden flex items-center bg-page"
      style={{ height: "57px" }}
      aria-label="Our clients"
    >
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap w-max"
        style={{ gap: "80px", willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-6 max-w-[120px] object-contain opacity-60 grayscale flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
