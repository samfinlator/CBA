import { useEffect, useRef } from "react";
import { PREFERS_REDUCED_MOTION } from "../utils/deviceCapability";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  text: string;
}

/* ── Copy ────────────────────────────────────────────────────── */

const row1: Testimonial[] = [
  {
    name: "Nik Holgate",
    role: "CFO",
    company: "YSC",
    avatar: "/assets/testimonial-nik.png",
    text: "Campbell Brown is the best connected recruiter among finance professionals. They have only ever approached me with potential roles that are extremely relevant to my own experience and well suited to me personally.",
  },
  {
    name: "Andrew Parker",
    role: "Serial tech CFO / COO",
    company: "Evolv AI",
    avatar: "/assets/testimonial-andrew.png",
    text: "I've worked with Nick over the last 9 years across 3 businesses using him for 2 CFOs and 2 FD positions. He's the best I've worked with at finding the required deep experience, cultural fit and technical skillset too often missing in a top finance search.",
  },
  {
    name: "Dan Yardley",
    role: "CFO",
    company: "MSQ",
    avatar: "/assets/testimonial-dan.png",
    text: "The best-connected headhunter in the advertising / communications sector for senior roles. They understood the brief, quickly produced an excellent long-list of relevant candidates, often challenging me with a variety of backgrounds and skill sets.",
  },
  {
    name: "Caroline Matthews",
    role: "Founder",
    company: "Koto",
    avatar: "/assets/testimonial-caroline.png",
    text: "Campbell Brown was hugely responsive throughout and gave us guidance when we asked. We were left to make our own decision and never felt we were at the mercy of an agenda that was outside of our control. Within a month we had found our new CFO and couldn't be happier.",
  },
  {
    name: "Radhika Radhakrishnan",
    role: "Global CFO",
    company: "S4 Capital Group PLC",
    avatar: "/assets/testimonial-radhika.png",
    text: "Campbell Brown has been nothing short of excellent. Nick, Kirsten and Sophie have delivered at pace, sourcing and recommending fantastic candidates across the globe. It's been a real pleasure working with them — responsive, timely and fun.",
  },
  {
    name: "Oliver Boughton",
    role: "CFO",
    company: "Forever",
    avatar: "/assets/testimonial-oliver.png",
    text: "Between Sophie and Nick, there is a deep understanding of the senior finance market, extending well beyond CFO-level searches. They combine strong networks with thoughtful, personal service and are a pleasure to work with. I would recommend them highly.",
  },
  {
    name: "Mark Bentley",
    role: "CFO & NED",
    company: "",
    avatar: "/assets/testimonial-mark-bentley.png",
    text: "Nick has been my longstanding recruitment partner over many years and many projects. He has an exceptional network of candidates and consistently matches talent to culture. Working at speed, he truly understands fit, which sets him apart in the industry.",
  },
  {
    name: "Michael Wolfson",
    role: "Founder COO",
    company: "Untold Studios",
    avatar: "/assets/testimonial-michael.png",
    text: "Nick has been my go-to recruiter for over 20 years. He has a unique talent for matching candidates to roles they will excel in. He doesn't waste time padding a short list. Quite frankly he's the best there is.",
  },
];

const row2: Testimonial[] = [
  {
    name: "Suzanne Burns",
    role: "HR & Comms Director",
    company: "STV",
    avatar: "/assets/testimonial-suzanne.png",
    text: "We appreciated Campbell Brown's down to business approach, combined with their deep market knowledge and extensive network, delivering a strong short-list and a great appointment.",
  },
  {
    name: "Mark Fisher",
    role: "Founder",
    company: "FIECON",
    avatar: "/assets/testimonial-mark.png",
    text: "We recently engaged Nick to source a new CFO — it turned out to be a great decision. We hired a superb candidate in double quick time at a far lower cost than search firms operating at this level.",
  },
  {
    name: "Bart Yates",
    role: "CEO",
    company: "BlinkInk",
    avatar: "/assets/testimonial-bart.png",
    text: "We all enjoyed working with the team at CBA. Our brief was quite specific and we wanted to explore a broad range of options, but they honed in quickly on who we would eventually hire.",
  },
  {
    name: "Duncan McWilliam",
    role: "Founder CEO",
    company: "Outpost VFX",
    avatar: "/assets/testimonial-duncan.png",
    text: "After being underwhelmed by two London-based C-Suite recruitment companies, we engaged with Nick who went on to shortlist a far higher quality of candidates across each role. His process, fees and network are of a higher calibre and he offers a much more personalised service.",
  },
  {
    name: "Marcus Anselm",
    role: "Partner",
    company: "Clarity",
    avatar: "/assets/testimonial-marcus.png",
    text: "I first met Nick in the early days of CBA. I have since introduced him to a dozen or so contacts in need of a CFO / COO. No matter the founder, Nick always manages to strike the right note and has never let me down. Super well connected, always available.",
  },
  {
    name: "Steve Martin",
    role: "",
    company: "DMG Media",
    avatar: "/assets/testimonial-steve.png",
    text: "In a highly competitive industry, it's refreshing to work with a headhunter that genuinely understands the market and the role. This team doesn't rely on a numbers game — they consistently demonstrate real insight and judgment, and instinctively know who the right person is.",
  },
  {
    name: "Adrian Talbot",
    role: "CFO",
    company: "Miroma",
    avatar: "/assets/testimonial-adrian.png",
    text: "Campbell Brown have now sourced multiple mid-level candidates for us at Miroma. CB have brought the same unique ability to match candidates to client cultures as they have demonstrated for years at the Executive level.",
  },
  {
    name: "Jaime Morgan Hitchcock",
    role: "Founder and COO",
    company: "SurrealDB",
    avatar: "/assets/testimonial-jaime.png",
    text: "SurrealDB is one of the fastest-growing database companies of all time. Finding the right people quickly matters enormously to us. Kirsten delivered exactly that, recently placing our new Director of Finance. The quality of the search, the candidates and the process throughout was excellent.",
  },
];

/* ── Avatar ──────────────────────────────────────────────────── */

function Avatar({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="flex-shrink-0 object-cover grayscale"
        style={{ width: 44, height: 44, borderRadius: 2 }}
      />
    );
  }
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center font-body"
      style={{
        width: 44, height: 44, borderRadius: 2,
        backgroundColor: "rgba(19,19,19,0.08)",
        fontSize: 13, fontWeight: 700, color: "rgba(19,19,19,0.4)",
      }}
    >
      {initials}
    </div>
  );
}

/* ── Card ────────────────────────────────────────────────────── */

function TestimonialCard({ t, showBottomLine = true }: { t: Testimonial; showBottomLine?: boolean }) {
  return (
    <div
      className="relative flex-shrink-0 flex flex-col"
      style={{ width: 380, padding: "20px 20px 20px" }}
    >
      <div className="absolute pointer-events-none"
        style={{ left: 20, right: 20, top: -1.5, height: "1.5px", backgroundColor: "#E9E9E9" }} />
      {showBottomLine && (
        <div className="absolute pointer-events-none"
          style={{ left: 20, right: 20, bottom: -1.5, height: "1.5px", backgroundColor: "#E9E9E9" }} />
      )}
      <div className="absolute pointer-events-none"
        style={{ right: 0, top: 20, bottom: 21, width: "1.5px", backgroundColor: "#E9E9E9" }} />
      <img src="/assets/connector-t-down.svg" alt=""
        style={{ position: "absolute", pointerEvents: "none", top: -1.5, right: -10, width: 20, height: 12, zIndex: 10 }} />
      <img src="/assets/connector-t-up.svg" alt=""
        style={{ position: "absolute", pointerEvents: "none", bottom: showBottomLine ? -1.5 : 0, right: -10, width: 20, height: 12, zIndex: 10 }} />

      <div className="flex items-center mb-4" style={{ gap: 12 }}>
        <Avatar src={t.avatar} name={t.name} />
        <div>
          <p className="type-card-role">{[t.role, t.company].filter(Boolean).join(", ")}</p>
          <p className="type-card-name">{t.name}</p>
        </div>
      </div>
      <p className="type-body" style={{ fontSize: 16 }}>{t.text}</p>
    </div>
  );
}

/* ── Ticker row ──────────────────────────────────────────────── */

const CARD_W = 380;

function TickerRow({
  testimonials,
  reverse = false,
  showBottomLine = false,
}: {
  testimonials: Testimonial[];
  reverse?: boolean;
  showBottomLine?: boolean;
}) {
  const singleLen = testimonials.length * CARD_W;
  const SPEED = reverse ? 27.6 : 30.4; // px / second
  const DECEL_TC = 0.55; // deceleration time constant (seconds) — higher = longer coast
  const ACCEL_TC = 0.25; // acceleration time constant (seconds)

  const doubled = [...testimonials, ...testimonials];

  const trackRef     = useRef<HTMLDivElement>(null);
  const outerRef     = useRef<HTMLDivElement>(null);
  const posRef       = useRef(reverse ? -singleLen : 0);
  const lastTRef     = useRef<number | undefined>(undefined);
  const speedMultRef = useRef(1); // 0 = stopped, 1 = full speed
  const isPausedRef  = useRef(false);
  const isDragRef    = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartPos = useRef(0);
  const rafRef       = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Skip animation entirely if user prefers reduced motion
    if (PREFERS_REDUCED_MOTION) return;

    function tick(t: number) {
      const dt = lastTRef.current !== undefined ? (t - lastTRef.current) / 1000 : 0;
      lastTRef.current = t;

      // Exponential ease toward target speed (0 when paused/dragging, 1 when running)
      const target = isPausedRef.current || isDragRef.current ? 0 : 1;
      const tc = speedMultRef.current > target ? DECEL_TC : ACCEL_TC;
      if (dt > 0) {
        speedMultRef.current += (target - speedMultRef.current) * (1 - Math.exp(-dt / tc));
      }

      // Apply velocity (skip during active drag — position set directly)
      if (!isDragRef.current && dt > 0) {
        posRef.current += (reverse ? SPEED : -SPEED) * speedMultRef.current * dt;
        if (!reverse && posRef.current <= -singleLen) posRef.current += singleLen;
        if (reverse  && posRef.current >= 0)          posRef.current -= singleLen;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragRef.current = true;
    dragStartX.current   = e.clientX;
    dragStartPos.current = posRef.current;
    if (outerRef.current) outerRef.current.style.cursor = "grabbing";
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragRef.current) return;
    const delta = e.clientX - dragStartX.current;
    posRef.current = dragStartPos.current + delta;
    // Soft wrap so content stays in view
    while (posRef.current > 0)          posRef.current -= singleLen;
    while (posRef.current < -singleLen) posRef.current += singleLen;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  }

  function onPointerUp() {
    if (!isDragRef.current) return;
    isDragRef.current = false;
    if (outerRef.current) outerRef.current.style.cursor = "grab";
  }

  return (
    <div
      ref={outerRef}
      style={{
        position: "relative",
        zIndex: showBottomLine ? 1 : 2,
        overflowX: "clip",
        overflowY: "visible",
        cursor: "grab",
        userSelect: "none",
      }}
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={trackRef}
        className="flex w-max"
        style={{ transform: `translateX(${posRef.current}px)` }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} showBottomLine={showBottomLine} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */

export default function TrackRecord() {
  return (
    <section className="px-5 py-[80px] md:px-10">
      <div className="mx-auto mb-5 max-w-[1432px]">
        <h2 className="type-section-heading">What People Are Saying</h2>
      </div>

      <div style={{ marginLeft: "-20px", marginRight: "-20px" }}>
        <div className="testimonial-ticker flex flex-col" style={{ gap: 0, backgroundColor: "var(--color-page)", overflowX: "clip" }}>
        <TickerRow testimonials={row1} reverse={false} showBottomLine={false} />
        <TickerRow testimonials={row2} reverse={true}  showBottomLine={true}  />
        </div>
      </div>
    </section>
  );
}
