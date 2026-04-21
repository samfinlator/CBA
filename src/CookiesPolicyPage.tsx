import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import GradientCanvas from "./components/GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "./gradientConfig";

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-[#E9E9E9] pt-6">
      <h2 className="font-body" style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.15 }}>
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

export default function CookiesPolicyPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-0">
        <GradientCanvas className="h-full w-full" fixed seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
      </div>

      <Header />

      <main className="bg-page px-5 pb-[80px] pt-[140px] md:px-10">
        <div className="mx-auto flex max-w-[880px] flex-col gap-8">
          <header className="flex flex-col gap-3">
            <p className="type-ui" style={{ margin: 0, color: "rgba(24,24,24,0.6)" }}>Policy</p>
            <h1 className="type-section-heading" style={{ margin: 0 }}>Cookies Policy</h1>
            <p className="type-body-lg" style={{ margin: 0, maxWidth: 720 }}>
              This Cookies Policy explains how Campbell Brown Associates Ltd uses cookies and similar technologies on this website.
            </p>
          </header>

          <div className="flex flex-col gap-6">

          <PolicySection title="Who we are">
            <p className="type-body" style={{ margin: 0 }}>
              This website is operated by Campbell Brown Associates Ltd. For more information about us, please see our <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>.
            </p>
          </PolicySection>

          <PolicySection title="What are cookies?">
            <p className="type-body" style={{ margin: 0 }}>
              Cookies are small text files placed on your device when you visit a website. They help websites function properly, improve performance, remember preferences and provide information about how a site is being used.
            </p>
          </PolicySection>

          <PolicySection title="How we use cookies">
            <p className="type-body" style={{ margin: 0 }}>
              We use cookies and similar technologies to support the operation of the site, understand how it is being used and improve the experience for visitors.
            </p>
            <ul className="type-body list-disc pl-6" style={{ margin: 0 }}>
              <li>Strictly necessary cookies to enable core site functionality.</li>
              <li>Performance and analytics cookies to help us understand traffic and improve the site.</li>
              <li>Preference-based technologies where needed to remember settings or choices.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Third-party services">
            <p className="type-body" style={{ margin: 0 }}>
              Some parts of the site may rely on third-party services or embedded technologies which may also set cookies or collect technical information about your visit. These providers process data in line with their own privacy and cookie policies.
            </p>
          </PolicySection>

          <PolicySection title="Managing cookies">
            <p className="type-body" style={{ margin: 0 }}>
              Most browsers allow you to control cookies through browser settings. You can usually block or delete cookies if you prefer. Please note that disabling certain cookies may affect how the website functions.
            </p>
          </PolicySection>

          <PolicySection title="Changes to this policy">
            <p className="type-body" style={{ margin: 0 }}>
              We may update this Cookies Policy from time to time to reflect changes in law, guidance or the way the site operates.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p className="type-body" style={{ margin: 0 }}>
              If you have any questions about this Cookies Policy, please contact <a href="mailto:nick@campbellbrown.co.uk" className="hover:underline">nick@campbellbrown.co.uk</a>.
            </p>
          </PolicySection>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
