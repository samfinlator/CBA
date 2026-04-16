interface Value {
  label: string;
  color: string;
  description: string;
}

const values: Value[] = [
  {
    label: "Empathy",
    color: "#0073FF",
    description:
      "We support every candidate with sensitivity and counsel, particularly those missing out on roles they set their hearts on.",
  },
  {
    label: "Tenacity",
    color: "#0073FF",
    description:
      "We keep the process moving. Re-engaging candidates, managing dropouts and solving problems until the role is filled.",
  },
  {
    label: "Flexibility",
    color: "#53B2A8",
    description:
      "No two briefs are the same. We adapt to your process, your timeline and your priorities. Without compromising quality.",
  },
  {
    label: "Integrity",
    color: "#E53333",
    description:
      "Honest with clients, honest with candidates. We give it to you straight even when it's not what you want to hear.",
  },
  {
    label: "Intuition",
    color: "#D900D9",
    description:
      "Pattern recognition built over decades. Knowing which candidate will thrive before anyone else does.",
  },
];

function ValueCard({ value }: { value: Value }) {
  return (
    <div className="snap-start" style={{ paddingRight: 26 }}>
      <div className="flex h-full flex-col gap-4">
        <div
          style={{
            width: "100%",
            aspectRatio: "9 / 8",
            background: `linear-gradient(180deg, ${value.color} 0%, rgba(255,255,255,0) 100%)`,
          }}
        />

        <div className="flex flex-col gap-3">
          <h3 className="type-card-name" style={{ margin: 0, fontSize: 20 }}>
            {value.label}
          </h3>
          <p className="type-body" style={{ margin: 0 }}>
            {value.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhatMakesUs() {
  return (
    <section className="px-5 py-[80px] md:px-10">
      <div className="mx-auto max-w-[1432px]">
        <h2 className="type-section-heading mb-5">What Makes Us</h2>

        <div className="relative bg-page">
          <div className="grid gap-6 py-6 lg:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.55fr)] lg:gap-8">
            <div className="flex flex-col gap-8 lg:pr-2">
              <p className="type-body-lg" style={{ margin: 0 }}>
                Our personal, face-to-face approach sets us apart from other firms.
              </p>
              <p className="type-body-lg" style={{ margin: 0 }}>
                Executive search is becoming increasingly automated, but there is a real demand for personal, human qualities. This is the service we provide to client and candidate alike.
              </p>
            </div>

            <div
              className="hide-scrollbar overflow-x-auto overflow-y-hidden snap-x snap-mandatory md:snap-none"
              style={{
                marginRight: "calc(50% - 50vw)",
                paddingRight: "calc(20px + 50vw - 50%)",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div style={{ display: "flex", gap: 0, width: "max-content", minWidth: "100%" }}>
                {values.map((value) => (
                  <div key={value.label} style={{ width: 320, flex: "0 0 auto" }}>
                    <ValueCard value={value} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
