/**
 * Campbell Brown Associates — Style Guide
 * Visit at /styleguide
 *
 * Covers:
 *  1. Typefaces
 *  2. Type scale
 *  3. ABC ROM weight specimens
 *  4. Colour palette
 *  5. Gradient
 *  6. UI components
 */

const GRADIENT = "linear-gradient(90deg, #ff0cf0 0%, #ffb103 50%, #00b5fc 100%)";

const colors = [
  { name: "Page",     token: "--color-page",           hex: "#f7f7f7", dark: false },
  { name: "Dark",     token: "--color-dark",            hex: "#131313", dark: true  },
  { name: "Muted",    token: "--color-dark-muted",      hex: "rgba(19,19,19,0.55)", dark: true  },
  { name: "Grey Line",token: "--color-grey-line",       hex: "rgba(201,201,201,0.3)", dark: false },
  { name: "Pink",     token: "--color-accent-pink",     hex: "#ff0cf0", dark: true  },
  { name: "Orange",   token: "--color-accent-orange",   hex: "#ffb103", dark: false },
  { name: "Blue",     token: "--color-accent-blue",     hex: "#00b5fc", dark: false },
  { name: "Gold",     token: "--color-accent-gold",     hex: "#f4c24f", dark: false },
  { name: "Teal",     token: "--color-accent-teal",     hex: "#00C4A7", dark: false },
  { name: "Salmon",   token: "--color-accent-salmon",   hex: "#FF6B4A", dark: true  },
  { name: "Magenta",  token: "--color-accent-magenta",  hex: "#E040FB", dark: true  },
  { name: "Red",      token: "--color-accent-red",      hex: "#ff0000", dark: true  },
];

const abcWeights = [
  { weight: 50,  label: "Thin" },
  { weight: 80,  label: "ExtraLight" },
  { weight: 120, label: "Light" },
  { weight: 160, label: "Book" },
  { weight: 400, label: "Regular" },
  { weight: 700, label: "Bold" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "80px" }}>
      <div
        style={{
          borderBottom: "1px solid rgba(201,201,201,0.4)",
          marginBottom: "40px",
          paddingBottom: "12px",
          display: "flex",
          alignItems: "baseline",
          gap: "16px",
        }}
      >
        <h2
          className="font-body"
          style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", margin: 0 }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "32px", marginBottom: "24px" }}>
      {label && (
        <span
          className="font-body"
          style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.35)", minWidth: "120px", flexShrink: 0 }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export default function StyleGuide() {
  return (
    <div
      className="font-body"
      style={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        color: "#131313",
      }}
    >
      {/* Page header */}
      <div
        style={{
          borderBottom: "1px solid rgba(201,201,201,0.4)",
          padding: "40px",
          marginBottom: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            className="font-body"
            style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "8px" }}
          >
            Campbell Brown Associates
          </p>
          <h1
            className="font-heading uppercase"
            style={{ fontSize: "48px", lineHeight: 1, letterSpacing: "-1px", margin: 0 }}
          >
            Style Guide
          </h1>
        </div>
        <a
          href="/"
          className="font-body"
          style={{ fontSize: "13px", fontWeight: 700, color: "rgba(19,19,19,0.5)", textDecoration: "none" }}
        >
          ← Back to site
        </a>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 40px" }}>

        {/* ── 1. Typefaces ── */}
        <Section title="01 — Typefaces">
          {/* Display face */}
          <div style={{ marginBottom: "48px" }}>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "20px" }}
            >
              NGT Vina Sans Neue — Display
            </p>
            <p
              className="font-heading uppercase"
              style={{ fontSize: "96px", lineHeight: 0.92, letterSpacing: "-2px", margin: 0 }}
            >
              Aa Bb Cc
            </p>
            <p
              className="font-heading uppercase"
              style={{ fontSize: "48px", lineHeight: 1, letterSpacing: "-1px", margin: "12px 0 0" }}
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </p>
            <p
              className="font-heading uppercase"
              style={{ fontSize: "28px", lineHeight: 1.1, letterSpacing: "-0.5px", margin: "8px 0 0", color: "rgba(19,19,19,0.5)" }}
            >
              Used for hero headlines, pull quotes, the CTA panel, and stat figures.
            </p>
          </div>

          {/* Body face */}
          <div>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "20px" }}
            >
              ABC ROM Variable — Body
            </p>
            <p
              className="font-body"
              style={{ fontSize: "96px", fontWeight: 400, lineHeight: 0.92, margin: 0 }}
            >
              Aa Bb Cc
            </p>
            <p
              className="font-body"
              style={{ fontSize: "24px", fontWeight: 400, lineHeight: 1.2, margin: "12px 0 0" }}
            >
              abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </p>
            <p
              className="font-body"
              style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.75, margin: "8px 0 0", color: "rgba(19,19,19,0.5)" }}
            >
              Used for all body copy, section headings, labels, navigation, and captions. Variable axis spans weight 50–210.
            </p>
          </div>
        </Section>

        {/* ── 2. Type Scale ── */}
        <Section title="02 — Type Scale">
          {/* Vina Sans scale */}
          <div style={{ marginBottom: "48px" }}>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "24px" }}
            >
              NGT Vina Sans Neue
            </p>

            <Row label="Hero / CTA">
              <div>
                <p
                  className="font-heading uppercase"
                  style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, letterSpacing: "-2.4px" }}
                >
                  Unrivalled Results.
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "6px" }}>
                  clamp(48px, 7vw, 96px) · lh 1.0 · ls −2.4px
                </p>
              </div>
            </Row>

            <Row label="Pull Quote">
              <div>
                <p
                  className="font-heading uppercase"
                  style={{ fontSize: "64px", lineHeight: 1.1, letterSpacing: "-1.28px" }}
                >
                  Best Connected.
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "6px" }}>
                  64px · lh 1.1 · ls −1.28px
                </p>
              </div>
            </Row>

            <Row label="Stat Figure">
              <div>
                <p
                  className="font-heading uppercase"
                  style={{ fontSize: "64px", lineHeight: 1.1, letterSpacing: "-1.6px" }}
                >
                  94<span style={{ fontSize: "0.55em", verticalAlign: "super" }}>%</span>
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "6px" }}>
                  64px · lh 1.1 · ls −1.6px · superscript suffix at 0.55em
                </p>
              </div>
            </Row>
          </div>

          {/* ABC ROM scale */}
          <div>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "24px" }}
            >
              ABC ROM Variable
            </p>

            <Row label="Section Heading">
              <div>
                <p className="font-body" style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.1 }}>
                  Our People
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "4px" }}>
                  22px · 700 · lh 1.1
                </p>
              </div>
            </Row>

            <Row label="Body — Large">
              <div>
                <p className="font-body" style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.75, maxWidth: "560px" }}>
                  Campbell Brown is the leading recruiter in its field. We specialise in senior financial, strategic, operational and executive appointments.
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "4px" }}>
                  18px · 400 · lh 1.75
                </p>
              </div>
            </Row>

            <Row label="Card Name">
              <div>
                <p className="font-body" style={{ fontSize: "18px", fontWeight: 700 }}>
                  Nick Brown
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "4px" }}>
                  18px · 700
                </p>
              </div>
            </Row>

            <Row label="Card Role">
              <div>
                <p className="font-body" style={{ fontSize: "14px", fontWeight: 400, color: "rgba(19,19,19,0.55)" }}>
                  Founder / Director
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "4px" }}>
                  14px · 400 · muted
                </p>
              </div>
            </Row>

            <Row label="Attribution">
              <div>
                <p className="font-body" style={{ fontSize: "16px", fontWeight: 700 }}>
                  Dan Yardley — CFO, MSQ
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "4px" }}>
                  16px · 700
                </p>
              </div>
            </Row>

            <Row label="Body — Base">
              <div>
                <p className="font-body" style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}>
                  Fill rate, retained
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "4px" }}>
                  16px · 400 · lh 1.6
                </p>
              </div>
            </Row>
          </div>
        </Section>

        {/* ── 3. Weight Specimens ── */}
        <Section title="03 — ABC ROM Weight Axis">
          <p
            className="font-body"
            style={{ fontSize: "16px", fontWeight: 400, color: "rgba(19,19,19,0.55)", marginBottom: "32px", lineHeight: 1.6 }}
          >
            ABC ROM Variable spans a continuous axis from weight 50 to 210. Only select steps are used on the site.
          </p>
          {abcWeights.map(({ weight, label }) => (
            <div
              key={weight}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "32px",
                borderBottom: "1px solid rgba(201,201,201,0.25)",
                padding: "20px 0",
              }}
            >
              <span
                className="font-body"
                style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.35)", minWidth: "120px" }}
              >
                {weight} — {label}
              </span>
              <p
                className="font-body"
                style={{ fontSize: "32px", fontWeight: weight, lineHeight: 1, margin: 0 }}
              >
                Campbell Brown Associates
              </p>
            </div>
          ))}
        </Section>

        {/* ── 4. Colour Palette ── */}
        <Section title="04 — Colour Palette">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
            {colors.map(({ name, token, hex }) => (
              <div key={token}>
                <div
                  style={{
                    height: "80px",
                    backgroundColor: hex,
                    borderRadius: "4px",
                    border: hex === "#f7f7f7" ? "1px solid rgba(201,201,201,0.5)" : "none",
                    marginBottom: "10px",
                  }}
                />
                <p className="font-body" style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 2px" }}>
                  {name}
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.45)", margin: "0 0 1px", fontFamily: "monospace" }}>
                  {hex}
                </p>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.35)", margin: 0, fontFamily: "monospace" }}>
                  {token}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 5. Gradient ── */}
        <Section title="05 — Brand Gradient">
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                height: "120px",
                background: GRADIENT,
                borderRadius: "6px",
                marginBottom: "16px",
              }}
            />
            <p className="font-body" style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 4px" }}>
              Static reference
            </p>
            <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.45)", fontFamily: "monospace" }}>
              linear-gradient(90deg, #ff0cf0 0%, #ffb103 50%, #00b5fc 100%)
            </p>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <div
              className="gradient-text"
              style={{ fontSize: "80px", fontWeight: 700, lineHeight: 1, marginBottom: "16px" }}
            >
              Gradient Text
            </div>
            <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.45)" }}>
              .gradient-text — animated background-clip: text, 4s shift cycle
            </p>
          </div>

          <div>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "16px" }}
            >
              Live WebGL canvas (local instance)
            </p>
            <div style={{ height: "200px", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: GRADIENT,
                  opacity: 0.15,
                }}
              />
              <p
                className="font-body"
                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "rgba(19,19,19,0.45)", margin: 0 }}
              >
                WebGL canvas renders on the live site — see Hero &amp; Footer
              </p>
            </div>
          </div>
        </Section>

        {/* ── 6. UI Components ── */}
        <Section title="06 — UI Components">

          {/* Buttons */}
          <div style={{ marginBottom: "48px" }}>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "24px" }}
            >
              Buttons
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <a
                  href="#"
                  className="font-body"
                  style={{
                    display: "inline-block",
                    borderRadius: "9999px",
                    background: GRADIENT,
                    padding: "14px 40px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Get In Touch
                </a>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "8px" }}>
                  Primary — gradient pill
                </p>
              </div>
              <div>
                <a
                  href="#"
                  className="font-body"
                  style={{
                    display: "inline-block",
                    borderRadius: "9999px",
                    border: "1.5px solid rgba(19,19,19,0.2)",
                    padding: "14px 40px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#131313",
                    textDecoration: "none",
                  }}
                >
                  Learn More
                </a>
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)", marginTop: "8px" }}>
                  Secondary — outlined pill
                </p>
              </div>
            </div>
          </div>

          {/* Logo mark */}
          <div style={{ marginBottom: "48px" }}>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "24px" }}
            >
              Logo Mark
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 40,
                    height: 26,
                    background: GRADIENT,
                    WebkitMaskImage: "url('/assets/campbell-brown-logo.svg')",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: "url('/assets/campbell-brown-logo.svg')",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    marginBottom: "8px",
                  }}
                />
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(19,19,19,0.4)" }}>Gradient (scrolled)</p>
              </div>
              <div style={{ background: "#131313", padding: "16px 20px", borderRadius: "6px", textAlign: "center" }}>
                <div
                  style={{
                    width: 40,
                    height: 26,
                    background: "white",
                    WebkitMaskImage: "url('/assets/campbell-brown-logo.svg')",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: "url('/assets/campbell-brown-logo.svg')",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    marginBottom: "8px",
                  }}
                />
                <p className="font-body" style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>White (on hero)</p>
              </div>
            </div>
          </div>

          {/* Connector frame */}
          <div style={{ marginBottom: "48px" }}>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "24px" }}
            >
              Connector Frame
            </p>
            <div style={{ position: "relative", border: "none", width: "400px", height: "120px" }}>
              {/* Corner SVGs */}
              <img src="/assets/left-connector-down.svg"  alt="" style={{ position: "absolute", top: 0,    left: 0,   width: 11, height: 12 }} />
              <img src="/assets/right-connector-down.svg" alt="" style={{ position: "absolute", top: 0,    right: 0,  width: 12, height: 12 }} />
              <img src="/assets/left-connector-up.svg"    alt="" style={{ position: "absolute", bottom: 0, left: 0,   width: 11, height: 12 }} />
              <img src="/assets/right-connector-up.svg"   alt="" style={{ position: "absolute", bottom: 0, right: 0,  width: 11, height: 12 }} />
              {/* Lines */}
              <div style={{ position: "absolute", top: 0,    left: 21, right: 21, height: "1.5px", backgroundColor: "#E9E9E9" }} />
              <div style={{ position: "absolute", bottom: 0, left: 21, right: 21, height: "1.5px", backgroundColor: "#E9E9E9" }} />
              <div style={{ position: "absolute", left: 0,   top: 22, bottom: 22, width: "1.5px", backgroundColor: "#E9E9E9" }} />
              <div style={{ position: "absolute", right: 0,  top: 22, bottom: 22, width: "1.5px", backgroundColor: "#E9E9E9" }} />
              <p
                className="font-body"
                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "rgba(19,19,19,0.35)", margin: 0 }}
              >
                Corner connectors + edge lines
              </p>
            </div>
          </div>

          {/* Spacing */}
          <div>
            <p
              className="font-body"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(19,19,19,0.4)", marginBottom: "24px" }}
            >
              Section Spacing
            </p>
            {[
              { label: "Section vertical padding", value: "80px", px: 80 },
              { label: "Section horizontal padding", value: "40px", px: 40 },
              { label: "Inner content max-width", value: "1432px", px: null },
              { label: "Page max-width", value: "1512px", px: null },
              { label: "Card internal padding", value: "24px (p-6)", px: 24 },
              { label: "Heading → content gap", value: "20px (mb-5)", px: 20 },
              { label: "Paragraph gap", value: "20px", px: 20 },
            ].map(({ label, value, px }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  borderBottom: "1px solid rgba(201,201,201,0.25)",
                  padding: "12px 0",
                }}
              >
                <span className="font-body" style={{ fontSize: "13px", fontWeight: 400, minWidth: "260px" }}>{label}</span>
                <span className="font-body" style={{ fontSize: "13px", fontWeight: 700, fontFamily: "monospace", minWidth: "80px" }}>{value}</span>
                {px && (
                  <div
                    style={{
                      height: "8px",
                      width: `${Math.min(px * 2, 200)}px`,
                      background: GRADIENT,
                      borderRadius: "2px",
                      opacity: 0.6,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
