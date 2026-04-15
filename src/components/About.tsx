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
                  src="/assets/team-photo.webp"
                  alt="Campbell Brown team"
                  loading="lazy"
                  width={1302}
                  height={898}
                  className="w-full"
                />
              </div>

              <div className="pb-8">
                <div className="flex flex-col gap-[25px]">
                  <p className="type-body-lg">
                    Campbell Brown is a leading recruiter in its field, specialising
                    in senior financial, strategic, operational and non executive
                    appointments. Our principal expertise is within TV, publishing
                    and marketing services, with an increasing focus on the
                    technology and tech-enabled and branded consumer sectors.
                  </p>
                  <p className="type-body-lg">
                    We increasingly help clients build out Chair and NED benches.
                  </p>
                  <p className="type-body-lg">
                    Our footprint spans the org chart, from CFO to Financial
                    Accountant, via Financial Controller, Commercial Finance Manager
                    and everything in between.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="relative flex">
            <div className="w-1/2 px-8 py-8">
              <div className="flex flex-col gap-[25px]">
                <p className="type-body-lg">
                  Campbell Brown is a leading recruiter in its field, specialising
                  in senior financial, strategic, operational and non executive
                  appointments. Our principal expertise is within TV, publishing
                  and marketing services, with an increasing focus on the
                  technology and tech-enabled and branded consumer sectors.
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
                src="/assets/team-photo.webp"
                alt="Campbell Brown team"
                width={1302}
                height={898}
                className="w-full max-w-[90%] max-[1095px]:max-w-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
