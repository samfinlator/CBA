import { useEffect, useState } from "react";

function getViewportWidth() {
  return window.outerWidth || document.documentElement.clientWidth || window.innerWidth;
}

export default function About() {
  const [isMobile, setIsMobile] = useState(() => getViewportWidth() < 900);

  useEffect(() => {
    const updateViewport = () => setIsMobile(getViewportWidth() < 900);
    window.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return (
    <section
      className={isMobile ? "px-5 py-[80px]" : "px-10 py-[80px]"}
      style={{ WebkitTextSizeAdjust: "none", textSizeAdjust: "none" }}
    >
      <div className="mx-auto max-w-[1432px]">
        {isMobile ? (
          <div className="relative">
            <div className="flex flex-col">
              <div className="overflow-hidden pb-6">
                <img
                  src="/assets/team-photo.jpg"
                  alt="Campbell Brown team"
                  className="w-full"
                />
              </div>

              <div className="pb-8">
                <div className="flex flex-col gap-[25px]">
                  <p className="type-body-lg">
                    Campbell Brown is the leading recruiter in its field. We specialise
                    in senior financial, strategic, operational and &ldquo;non&rdquo;
                    executive appointments. Our principal expertise is within TV,
                    publishing and marketing services, with an increasing focus on the
                    technology and tech-enabled / branded consumer sectors.
                  </p>
                  <p className="type-body-lg">
                    Our footprint spans the org chart, from CFO to Financial
                    Accountant, via Financial Controller, Commercial Finance Manager
                    and everything in between.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute"
              style={{ bottom: 0, left: 0, right: "calc(50% + 10px)", height: 1.5, backgroundColor: "#E9E9E9" }}
            />
            <div
              className="pointer-events-none absolute"
              style={{ bottom: 0, left: "calc(50% + 10px)", right: 0, height: 1.5, backgroundColor: "#E9E9E9" }}
            />
            <div
              id="about-center-divider"
              className="pointer-events-none absolute"
              style={{ top: "calc(100% + 10px)", left: "50%", width: 0, height: 0 }}
            />
            <img
              src="/assets/connector-t-down.svg"
              alt=""
              className="pointer-events-none absolute"
              style={{ bottom: -10, left: "50%", width: 20, height: 12, transform: "translateX(-9px)" }}
            />
          </div>
        ) : (
          <div className="relative flex">
            <div
              className="pointer-events-none absolute"
              style={{ top: 0, left: 20, right: "calc(50% + 10px)", height: 1.5, backgroundColor: "#E9E9E9" }}
            />
            <div
              className="pointer-events-none absolute"
              style={{ top: 0, left: "calc(50% + 10px)", right: 20, height: 1.5, backgroundColor: "#E9E9E9" }}
            />

            <div
              id="about-center-divider"
              className="pointer-events-none absolute"
              style={{ top: 20, bottom: 0, left: "50%", width: 1.5, backgroundColor: "#E9E9E9" }}
            />

            <img
              src="/assets/connector-t-down.svg"
              alt=""
              className="pointer-events-none absolute"
              style={{ top: 0, left: "50%", width: 20, height: 12, transform: "translateX(-10px)" }}
            />

            <div className="w-1/2 px-8 py-8">
              <div className="flex flex-col gap-[25px]">
                <p className="type-body-lg">
                  Campbell Brown is the leading recruiter in its field. We specialise
                  in senior financial, strategic, operational and &ldquo;non&rdquo;
                  executive appointments. Our principal expertise is within TV,
                  publishing and marketing services, with an increasing focus on the
                  technology and tech-enabled / branded consumer sectors.
                </p>
                <p className="type-body-lg">
                  Our footprint spans the org chart, from CFO to Financial
                  Accountant, via Financial Controller, Commercial Finance Manager
                  and everything in between.
                </p>
              </div>
            </div>

            <div className="flex w-1/2 items-start justify-end overflow-hidden px-8 py-5">
              <img
                src="/assets/team-photo.jpg"
                alt="Campbell Brown team"
                className="w-full max-w-[90%] max-[1095px]:max-w-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
