import { useEffect, useState } from "react";
import GradientCanvas from "./components/GradientCanvas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "./gradientConfig";

const contacts = [
  {
    name: "Nick Brown",
    role: "Founder / Director",
    photo: "/assets/team-nick.webp",
    email: "nick@campbellbrown.co.uk",
    linkedin: "https://www.linkedin.com/in/nick-brown-6627244/",
  },
  {
    name: "Sophie Allen",
    role: "Account Director",
    photo: "/assets/team-sophie.webp",
    email: "sophie@campbellbrown.co.uk",
    linkedin: "https://www.linkedin.com/in/sophieallenrecruitment/",
  },
  {
    name: "Kirsten Wilson",
    role: "Account Director",
    photo: "/assets/team-kirsten.webp",
    email: "kirsten@campbellbrown.co.uk",
    linkedin: "https://www.linkedin.com/in/kirstenwilson1/?originalSubdomain=uk",
  },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169H6.65c.032.678 0 7.225 0 7.225h2.401z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="1" />
      <path d="M1 3l7 5 7-5" />
    </svg>
  );
}

function ContactCard({
  name,
  role,
  photo,
  email,
  linkedin,
}: {
  name: string;
  role: string;
  photo: string;
  email: string;
  linkedin: string;
}) {
  return (
    <div className="relative bg-[#F7F7F7]" style={{ paddingBlock: "20px", paddingInline: "18px" }}>
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <img src={photo} alt={name} style={{ width: 116, height: 116, objectFit: "cover", flexShrink: 0 }} />
          <div className="min-w-0 flex flex-1 flex-col justify-between" style={{ minHeight: 116 }}>
            <div>
              <p className="type-card-role" style={{ margin: 0 }}>{role}</p>
              <h3 className="type-card-name" style={{ margin: 0 }}>{name}</h3>
            </div>

            <div className="flex flex-wrap items-center gap-x-6" style={{ rowGap: 4 }}>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-3 font-body"
                style={{ color: "var(--color-dark)", textDecoration: "none", fontSize: 16, fontWeight: 700 }}
              >
                <EmailIcon />
                <span>Email</span>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 font-body"
                style={{ color: "#6AA7C2", textDecoration: "none", fontSize: 16, fontWeight: 700 }}
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GetInTouchPage() {
  const [viewportW, setViewportW] = useState(() => window.outerWidth || document.documentElement.clientWidth || window.innerWidth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formspreeEndpoint =
    (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ??
    "https://formspree.io/f/mwvwnopo";

  useEffect(() => {
    const updateViewport = () => {
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
      setViewportW(window.outerWidth || document.documentElement.clientWidth || window.innerWidth);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formspreeEndpoint) {
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
        }),
      });

      if (!response.ok) throw new Error("Formspree request failed");

      setForm({ name: "", email: "", phone: "", company: "", message: "" });
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <GradientCanvas className="h-full w-full" fixed seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
      </div>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `linear-gradient(to right,
            var(--color-page) 0px,
            var(--color-page) calc(50% - 756px),
            transparent calc(50% - 756px),
            transparent calc(50% + 756px),
            var(--color-page) calc(50% + 756px),
            var(--color-page) 100%)`,
        }}
      />

      <div
        className="fixed left-0 right-0 pointer-events-none"
        style={{ top: "-300px", height: "300px", backgroundColor: "var(--color-page)", zIndex: 1 }}
      />

      <Header />

      <div
        id="hero-section"
        className="bg-page"
        style={{ padding: "5px", height: "min(860px, calc(var(--app-height, 100svh) * 0.8))" }}
      >
        <div
          id="hero-inner"
          className="relative h-full overflow-hidden"
          style={{ borderRadius: 5 }}
        >
          <GradientCanvas className="absolute inset-0 h-full w-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
          <div
            className="absolute inset-0 z-10 flex flex-col justify-end"
            style={viewportW < 900 ? { paddingBlock: "24px", paddingInline: "10px", gap: "18px" } : { padding: "40px" }}
          >
            <span className="font-heading uppercase text-white block" style={{ fontSize: viewportW < 900 ? "clamp(34px, 12vw, 52px)" : "clamp(64px, 8vw, 112px)", lineHeight: 0.92 }}>
              Get In Touch.
            </span>
          </div>
        </div>
      </div>

      <main id="contact-page-main" className="bg-page">
        <section className="px-5 py-[80px] md:px-10">
          <div className="mx-auto max-w-[1432px]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
              <div className="flex flex-col gap-5">
                <p className="type-body-lg" style={{ margin: 0 }}>
                  Please write to let us know whether you’re thinking of looking for a new role, hiring for your team or just want our advice. You can also contact Sophie, Nick or Kirsten directly, using the email links below.
                </p>
              </div>

              <div className="relative bg-[#F7F7F7]" style={{ padding: viewportW < 900 ? "28px 20px 32px" : "32px 28px 36px" }}>
                <form className="relative z-10 flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="type-card-role" style={{ margin: 0 }}>Name</span>
                      <input
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="font-body"
                        style={{ height: 48, border: "1.5px solid #E9E9E9", backgroundColor: "var(--color-page)", padding: "0 14px", fontSize: 16, outline: "none" }}
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="type-card-role" style={{ margin: 0 }}>Email</span>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="font-body"
                        style={{ height: 48, border: "1.5px solid #E9E9E9", backgroundColor: "var(--color-page)", padding: "0 14px", fontSize: 16, outline: "none" }}
                        required
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="type-card-role" style={{ margin: 0 }}>Phone Number</span>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="font-body"
                        style={{ height: 48, border: "1.5px solid #E9E9E9", backgroundColor: "var(--color-page)", padding: "0 14px", fontSize: 16, outline: "none" }}
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="type-card-role" style={{ margin: 0 }}>Company</span>
                      <input
                        name="company"
                        value={form.company}
                        onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                        className="font-body"
                        style={{ height: 48, border: "1.5px solid #E9E9E9", backgroundColor: "var(--color-page)", padding: "0 14px", fontSize: 16, outline: "none" }}
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="type-card-role" style={{ margin: 0 }}>Message</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="font-body"
                      style={{ minHeight: 180, border: "1.5px solid #E9E9E9", backgroundColor: "var(--color-page)", padding: "14px", fontSize: 16, lineHeight: 1.5, resize: "vertical", outline: "none" }}
                      required
                    />
                  </label>

                  <div className="flex flex-wrap justify-end gap-4">
                    <button
                      type="submit"
                      disabled={submitState === "submitting"}
                      className="inline-flex items-center justify-center font-body text-white"
                      style={{
                        minWidth: 180,
                        height: 48,
                        padding: "0 18px",
                        border: 0,
                        borderRadius: 2,
                        fontSize: 16,
                        fontWeight: 700,
                        position: "relative",
                        overflow: "hidden",
                        cursor: submitState === "submitting" ? "default" : "pointer",
                        opacity: submitState === "submitting" ? 0.8 : 1,
                      }}
                    >
                      <span className="absolute inset-0">
                        <GradientCanvas className="h-full w-full" seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
                      </span>
                      <span className="relative z-10">
                        {submitState === "submitting" ? "Sending..." : "Send"}
                      </span>
                    </button>
                  </div>

                  {submitState === "success" && (
                    <p className="type-body" style={{ margin: 0, color: "var(--color-dark)" }}>
                      Thanks. Your message has been sent.
                    </p>
                  )}

                  {submitState === "error" && (
                    <p className="type-body" style={{ margin: 0, color: "var(--color-dark)" }}>
                      Something went wrong sending your message. Please try again.
                    </p>
                  )}
                </form>
              </div>

              <div className="lg:col-span-2" style={{ marginTop: 12 }}>
                <h2 className="type-section-heading mb-5">Speak To The Team</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {contacts.map((contact) => (
                    <ContactCard key={contact.name} {...contact} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
