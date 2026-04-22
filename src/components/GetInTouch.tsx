import GradientMirror from "./GradientMirror";

function CtaButton() {
  return (
    <a
      href="/get-in-touch"
      className="relative inline-flex items-center justify-center"
      style={{
        width: 316,
        height: 98,
        textDecoration: "none",
      }}
    >
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
          }}
        >
          <div
            className="relative z-10 flex flex-col items-center text-center"
            style={{ gap: 20 }}
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
