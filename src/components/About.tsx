export default function About() {
  return (
    <section className="px-10 py-[80px]">
      <div className="mx-auto max-w-[1432px]">

        {/* Two columns with top line + centre divider matching TrackRecord style */}
        <div className="relative flex">

          {/* Top horizontal line — 10px gap each side of the connector */}
          <div className="pointer-events-none absolute"
            style={{ top: 0, left: 20, right: "calc(50% + 20px)", height: 1.5, backgroundColor: "#E9E9E9" }} />
          <div className="pointer-events-none absolute"
            style={{ top: 0, left: "calc(50% + 20px)", right: 20, height: 1.5, backgroundColor: "#E9E9E9" }} />

          {/* Vertical centre divider — starts 20px below top line */}
          <div id="about-center-divider" className="pointer-events-none absolute"
            style={{ top: 20, bottom: 0, left: "50%", width: 1.5, backgroundColor: "#E9E9E9" }} />

          {/* T-connector — top aligned with grey line */}
          <img
            src="/assets/connector-t-down.svg" alt=""
            className="pointer-events-none absolute"
            style={{ top: 0, left: "calc(50% - 10px)", width: 20, height: 12 }}
          />

          {/* Text column */}
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

          {/* Image column */}
          <div className="w-1/2 flex items-start justify-end px-8 py-5 overflow-hidden">
            <img
              src="/assets/team-photo.jpg"
              alt="Campbell Brown team"
              className="w-full max-w-[90%] max-[1095px]:max-w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
