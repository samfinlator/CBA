import { useState, useRef, useEffect } from "react";

interface TeamMember {
  id: "nick" | "sophie" | "kirsten";
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  bio: string;
}

const DEFAULT_BIO =
  "We believe that great service is personal. We take time to understand your goals, provide straightforward guidance, and deliver work you can rely on. Our clients choose us for our attention to detail, clear communication, and commitment to doing things properly — every time.";

const T = 500; // transition duration ms
const CARD_W = 220;

const team: TeamMember[] = [
  {
    id: "nick",
    name: "Nick Brown",
    role: "Founder / Director",
    photo: "/assets/team-nick.webp",
    linkedin: "https://www.linkedin.com/in/nick-brown-6627244/",
    bio: "Nick founded Campbell Brown Associates in 2010, following 13 years running the media practice at a leading London search firm. He was part of the management team that successfully exited in 2005. Before that, he qualified as a chartered accountant at PWC. Up until 2023, Nick operated alone, placing hundreds of senior finance professionals, principally into media and technology. Over time, he has built an enviable reputation across the space and it's a real challenge to find someone in the field who isn't connected to him.",
  },
  {
    id: "sophie",
    name: "Sophie Allen",
    role: "Account Director",
    photo: "/assets/team-sophie.webp",
    linkedin: "https://www.linkedin.com/in/sophieallenrecruitment/",
    bio: "Sophie has been hiring senior finance roles within the media and marketing sector for 25 years – predominantly in the UK, but also including a 2 year stint in Australia. Her accumulated knowledge, in the media space, is second to none. Her clients will confirm her ability to fill any job, at pace. But it's not all about filling roles – her empathic approach fits the CBA ethos perfectly, treating all her candidates with the same care and attention as the clients they will one day become.",
  },
  {
    id: "kirsten",
    name: "Kirsten Wilson",
    role: "Account Director",
    photo: "/assets/team-kirsten.webp",
    linkedin: "https://www.linkedin.com/in/kirstenwilson1/?originalSubdomain=uk",
    bio: "Kirsten spent 12 years heading up a successful 'Interim and Contract' team, specialising in media finance before moving to the South Coast where she gained experience placing accountants across a more diverse client base. She is a huge asset to CBA, working quickly and relentlessly across a range of roles, instinctively leveraging her network, both in and out of the media and tech spaces.",
  },
];

/* ── Icons ─────────────────────────────────────────────────────── */

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169H6.65c.032.678 0 7.225 0 7.225h2.401z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="1" y="3" width="14" height="10" rx="1" />
      <path d="M1 3l7 5 7-5" />
    </svg>
  );
}

/* ── Vertical Divider with T-Connectors ────────────────────────── */

function VerticalDivider({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: 1.5,
        opacity,
        transition: `opacity ${T}ms ease`,
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          bottom: 20,
          width: "100%",
          backgroundColor: "#E9E9E9",
        }}
      />
      {/* Mask strips — 40px wide (10px gap + 20px arm + 10px gap) to match TrackRecord breathing room */}
      <div style={{ position: "absolute", top: 0,    left: -20, width: 40, minWidth: 40, height: 1.5, backgroundColor: "var(--color-page)", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 0, left: -20, width: 40, minWidth: 40, height: 1.5, backgroundColor: "var(--color-page)", zIndex: 2 }} />
      {/* T-connector images sit on top of the mask strips */}
      <img
        src="/assets/connector-t-down.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: -10,
          width: 20,
          minWidth: 20,
          height: 12,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      <img
        src="/assets/connector-t-up.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: -10,
          width: 20,
          minWidth: 20,
          height: 12,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </div>
  );
}

/* ── Person Card ───────────────────────────────────────────────── */

function PersonCard({
  member,
  isActive,
  bioVisible,
  onHover,
}: {
  member: TeamMember;
  isActive: boolean;
  bioVisible: boolean;
  onHover: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      style={{
        display: "flex",
        flexDirection: "row",
        /* Active card takes remaining space; inactive cards stay at photo width */
        flex: "0 0 auto",
        paddingTop: 20,
        paddingBottom: 30,
        minWidth: 0,
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Photo + label — always CARD_W wide */}
      <div
        style={{
          width: CARD_W,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <img
          src={member.photo}
          alt={member.name}
          style={{
            width: CARD_W,
            height: CARD_W,
            objectFit: "cover",
            filter: "grayscale(1)",
            display: "block",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <p className="type-card-role" style={{ margin: 0 }}>
              {member.role}
            </p>
            <p className="type-card-name" style={{ margin: 0 }}>
              {member.name}
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, paddingTop: 2 }}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4A9AAF" }}
              className="hover:opacity-70"
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedInIcon />
            </a>
            <a
              href="#"
              style={{ color: "#4A9AAF" }}
              className="hover:opacity-70"
              aria-label={`Email ${member.name}`}
            >
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Bio — slides open with max-width so text never squishes to 0 width */}
      <div
        style={{
          overflow: "hidden",
          maxWidth: isActive ? 800 : 0,
          transition: `max-width ${T}ms ease-in-out`,
          flexShrink: 0,
        }}
      >
        <div style={{ width: 600, paddingTop: 5, paddingLeft: 20 }}>
          <p
            className="type-body"
            style={{
              margin: 0,
              opacity: isActive && bioVisible ? 1 : 0,
              transition: `opacity 300ms ease`,
            }}
          >
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────── */

export default function OurPeople() {
  const [hovered, setHovered] = useState<TeamMember["id"] | null>(null);
  const [bioVisible, setBioVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevHoveredRef = useRef<TeamMember["id"] | null>(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    setBioVisible(false);

    if (hovered !== null) {
      const wasDefault = prevHoveredRef.current === null;
      const delay = wasDefault ? T : 200;
      timerRef.current = setTimeout(() => setBioVisible(true), delay);
    }

    prevHoveredRef.current = hovered;
    return () => clearTimeout(timerRef.current);
  }, [hovered]);

  const isHovering = hovered !== null;

  return (
    <section
      className="bg-page px-10 py-10"
      onMouseLeave={() => setHovered(null)}
    >
      <div className="mx-auto max-w-[1432px]">
        <h2 className="type-section-heading mb-5">Our People</h2>

        <div
          className="relative"
          style={{ display: "flex", gap: 20 }}
        >
          {/* Top horizontal line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1.5,
              backgroundColor: "#E9E9E9",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          {/* Bottom horizontal line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1.5,
              backgroundColor: "#E9E9E9",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Person cards with dividers */}
          {team.map((member, i) => (
            <div key={member.id} style={{ display: "contents" }}>
              {i > 0 && <VerticalDivider />}
              <PersonCard
                member={member}
                isActive={hovered === member.id}
                bioVisible={bioVisible && hovered === member.id}
                onHover={() => setHovered(member.id)}
              />
            </div>
          ))}

          {/* Divider before default bio */}
          <VerticalDivider opacity={isHovering ? 0 : 1} />

          {/* Default bio panel — shrinks to 0 when someone is hovered */}
          <div
            style={{
              overflow: "hidden",
              maxWidth: isHovering ? 0 : 700,
              flex: "1 1 auto",
              transition: `max-width ${T}ms ease-in-out`,
              paddingTop: 25,
              paddingBottom: 30,
              minWidth: 0,
            }}
          >
            {/* Fixed-width inner div prevents text squishing to 0 width during collapse */}
            <div style={{ width: 600 }}>
              <p
                className="type-body"
                style={{
                  margin: 0,
                  opacity: isHovering ? 0 : 1,
                  transition: `opacity 200ms ease`,
                }}
              >
                {DEFAULT_BIO}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
