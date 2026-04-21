import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import GradientCanvas from "./components/GradientCanvas";
import { GRADIENT_SEED, GRADIENT_START_TIME } from "./gradientConfig";

const rights = [
  {
    title: "The right to be informed.",
    body: "You have the right to be provided with clear, transparent and easily understandable information about how we use your information and your rights. This is why we are providing you with the information in this Policy.",
  },
  {
    title: "The right of access.",
    body: "If we are processing your information, you have the right to obtain access to your information, and certain other information (similar to that provided in this Privacy Policy). This is so you are aware and can check that we are using your information in accordance with data protection law.",
  },
  {
    title: "The right to rectification.",
    body: "You are entitled to have your information corrected if it is inaccurate or incomplete.",
  },
  {
    title: "The right to erasure.",
    body: "This is also known as the right to be forgotten and, in simple terms, enables you to request the deletion or removal of your information where there is no compelling reason for us to keep using it. This is not a general right to erasure; there are exceptions.",
  },
  {
    title: "The right to restrict.",
    body: "You have rights to block or suppress further use of your processing information. When processing is restricted, we can still store your information but may not use it further. We keep lists of people who have asked for further use of their information to be blocked to make sure the restriction is respected in future.",
  },
  {
    title: "The right to data portability.",
    body: "You have rights to obtain and reuse your personal data for your own purposes across different services. For example, if you decide to switch to a new provider, this enables you to move, copy or transfer your information easily between our IT systems and theirs safely and securely, without affecting its usability.",
  },
  {
    title: "The right to object to processing.",
    body: "You have the right to object to certain types of processing, including processing for direct marketing, for example if you no longer want to be contacted in regard to potential opportunities.",
  },
  {
    title: "The right to lodge a complaint.",
    body: "You have the right to lodge a complaint about the way we handle or process your personal data with your national data protection regulator.",
  },
  {
    title: "The right to withdraw consent.",
    body: "If you have given your consent to anything we do with your personal data, you have the right to withdraw your consent at any time, although if you do so, it does not mean that anything we have done with your personal data with your consent up to that point is unlawful. This includes your right to withdraw consent from us to use your personal data for marketing purposes.",
  },
];

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="type-card-name" style={{ margin: 0 }}>{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-0">
        <GradientCanvas className="h-full w-full" fixed seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
      </div>

      <Header />

      <main className="bg-page px-5 pb-[80px] pt-[140px] md:px-10">
        <div className="mx-auto flex max-w-[960px] flex-col gap-10">
          <header className="flex flex-col gap-4">
            <h1 className="type-section-heading" style={{ margin: 0 }}>Privacy Policy</h1>
            <p className="type-body-lg" style={{ margin: 0 }}>
              Campbell Brown Associates Ltd takes your personal data seriously.
            </p>
          </header>

          <PolicySection title="Information about us">
            <p className="type-body" style={{ margin: 0 }}>
              <a href="https://www.campbellbrown.co.uk" className="hover:underline">www.campbellbrown.co.uk</a> is a site operated by Campbell Brown Associates Ltd ("Campbell Brown", "CBA", "we", "us" or "our"). We are a limited company, registered in England and Wales under company number 7121066 and have our registered office at Old Hall, Old Mansion Drive, Bredon, Gloucestershire, GL20 7JZ. Our VAT number is 985429764. Our ICO registration number is ZA388011.
            </p>
          </PolicySection>

          <PolicySection title="What personal data do we collect about you?">
            <p className="type-body" style={{ margin: 0 }}>
              We collect information necessary to identify appropriate opportunities for you and any further information needed to assess your eligibility through the different stages of the executive search process. This information may include identification and visa documents, CVs and work history, educational records and checks, psychometric assessments, salary data, employment references, commentary on fit to role and, where applicable, commentary on progress in role once placed.
            </p>
          </PolicySection>

          <PolicySection title="Where do we collect personal data about you from?">
            <ul className="type-body list-disc pl-6" style={{ margin: 0 }}>
              <li>Directly from you. This is information you provide when searching for a new opportunity and/or during the different recruitment stages.</li>
              <li>From an agent or third party acting on your behalf.</li>
              <li>By reference or word of mouth. For example, you may be recommended by a friend, a former employer, a former colleague or a present employer.</li>
              <li>Through publicly available sources, for example LinkedIn, company websites or the internet.</li>
            </ul>
          </PolicySection>

          <PolicySection title="How and why do we use your personal data?">
            <p className="type-body" style={{ margin: 0 }}>
              We use your personal data to match your skills, experience and education with a potential employer. We will initially collect basic information on you such as contact details, job role and experience and pass this on to the client in search of personnel. If you are suitably qualified and interested in proceeding, we will, with your agreement, collect more information from you as you progress through the process, for example to our interview stage and then to client interview stage.
            </p>
          </PolicySection>

          <PolicySection title="How long do we keep your personal data for?">
            <ul className="type-body list-disc pl-6" style={{ margin: 0 }}>
              <li>Candidate data: 6 years</li>
              <li>Interim Manager data: 6 years</li>
              <li>Client contact details: 6 years</li>
            </ul>
          </PolicySection>

          <PolicySection title="Who do we share your personal data with?">
            <p className="type-body" style={{ margin: 0 }}>
              Your personal data is shared with the client who initiates a search for staff, to ascertain whether you might be a fit for the position. We may also conduct checks on you to verify the information you have provided.
            </p>
          </PolicySection>

          <PolicySection title="What legal basis do we have for using your information?">
            <p className="type-body" style={{ margin: 0 }}>
              For prospective candidates, interim managers, referees and clients, our processing is necessary for our legitimate interests in that we need the information in order to assess suitability for potential roles, to find potential candidates and to contact clients and referees.
            </p>
            <p className="type-body" style={{ margin: 0 }}>
              For clients, we may also rely on our processing being necessary to enable us to fulfil a contractual obligation to you.
            </p>
          </PolicySection>

          <PolicySection title="What happens if you do not provide us with the information we request or ask that we stop processing your information?">
            <p className="type-body" style={{ margin: 0 }}>
              If you do not provide the personal data necessary, or request that we stop processing your personal data, we may not be able to match you with available job and career opportunities.
            </p>
          </PolicySection>

          <PolicySection title="Do we make automated decisions concerning you?">
            <p className="type-body" style={{ margin: 0 }}>
              No, we do not carry out automated profiling.
            </p>
          </PolicySection>

          <PolicySection title="Do we transfer your data outside the EEA?">
            <p className="type-body" style={{ margin: 0 }}>
              To better match your employee profile with current opportunities we may transfer your personal data to clients and partners in countries outside the EEA. These countries' privacy laws may be different from those in your home country. Where we transfer data to a country which has not been deemed to provide adequate data protection standards, we always have security measures and approved model clauses in place to protect your personal data.
            </p>
          </PolicySection>

          <PolicySection title="What rights do you have in relation to the data we hold on you?">
            <p className="type-body" style={{ margin: 0 }}>
              By law, you have a number of rights when it comes to your personal data. Further information and advice about your rights can be obtained from the data protection regulator in your country.
            </p>
            <ol className="flex flex-col gap-4" style={{ margin: 0, paddingLeft: 18 }}>
              {rights.map((right, index) => (
                <li key={right.title} className="type-body">
                  <strong>{index + 1}. {right.title}</strong> {right.body}
                </li>
              ))}
            </ol>
            <p className="type-body" style={{ margin: 0 }}>
              We usually act on requests and provide information free of charge, but may charge a reasonable fee to cover our administrative costs of providing the information for baseless or excessive or repeated requests, or for further copies of the same information.
            </p>
            <p className="type-body" style={{ margin: 0 }}>
              Alternatively, we may be entitled to refuse to act on the request. Please consider your request responsibly before submitting it. We will respond as soon as we can. Generally, this will be within one month from when we receive your request but, if the request is going to take longer to deal with, we will come back to you and let you know.
            </p>
          </PolicySection>

          <PolicySection title="How will we contact you?">
            <p className="type-body" style={{ margin: 0 }}>
              We may contact you by phone, email or social media. If you prefer a particular contact method over another, please just let us know.
            </p>
          </PolicySection>

          <PolicySection title="How can you contact us?">
            <p className="type-body" style={{ margin: 0 }}>
              If you are unhappy with how we have handled your information, or have further questions on the processing of your personal data, contact us at <a href="mailto:nick@campbellbrown.co.uk" className="hover:underline">nick@campbellbrown.co.uk</a>.
            </p>
          </PolicySection>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
