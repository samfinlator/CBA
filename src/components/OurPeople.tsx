import { useState, useRef, useEffect } from "react";

interface TeamMember {
  id: "nick" | "sophie" | "kirsten";
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  email: string;
  bio: string;
}

const DEFAULT_BIO =
  "We believe that great service is personal. We take time to understand your goals, provide straightforward guidance, and deliver work you can rely on. Our clients choose us for our attention to detail, clear communication, and commitment to doing things properly — every time.";

const T = 500; // transition duration ms
const CARD_W = 220;
const DESKTOP_BREAKPOINT = 1024;
const DESKTOP_HEIGHT_BREAKPOINT = 1180;
const DESKTOP_STACK_HEIGHT = 340;

function getViewportWidth() {
  return window.outerWidth || document.documentElement.clientWidth || window.innerWidth;
}

const team: TeamMember[] = [
  {
    id: "nick",
    name: "Nick Brown",
    role: "Founder / Director",
    photo: "/assets/team-nick.webp",
    linkedin: "https://www.linkedin.com/in/nick-brown-6627244/",
    email: "nick@campbellbrown.co.uk",
    bio: "Nick founded Campbell Brown Associates in 2010, following 13 years running the media practice at a leading London search firm. He was part of the management team that successfully exited in 2005. Before that, he qualified as a chartered accountant at PWC. Up until 2023, Nick operated alone, placing hundreds of senior finance professionals, principally into media and technology. Over time, he has built an enviable reputation across the space and it's a real challenge to find someone in the field who isn't connected to him. Nick also advises businesses on finance leadership and board composition.",
  },
  {
    id: "sophie",
    name: "Sophie Allen",
    role: "Account Director",
    photo: "/assets/team-sophie.webp",
    linkedin: "https://www.linkedin.com/in/sophieallenrecruitment/",
    email: "sophie@campbellbrown.co.uk",
    bio: "Sophie has been hiring senior finance roles within the media and marketing sector for 25 years – predominantly in the UK, but also including a 2 year stint in Australia. Her accumulated knowledge, in the media space, is second to none. Her clients will confirm her ability to fill any job, at pace. But it's not all about filling roles – her empathic approach fits the CBA ethos perfectly, treating all her candidates with the same care and attention as the clients they will one day become.",
  },
  {
    id: "kirsten",
    name: "Kirsten Wilson",
    role: "Account Director",
    photo: "/assets/team-kirsten.webp",
    linkedin: "https://www.linkedin.com/in/kirstenwilson1/?originalSubdomain=uk",
    email: "kirsten@campbellbrown.co.uk",
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


/* ── Person Card (desktop) ─────────────────────────────────────── */

function PersonCard({
  member,
  isActive,
  bioVisible,
  bioW,
  cardW,
  onHover,
}: {
  member: TeamMember;
  isActive: boolean;
  bioVisible: boolean;
  bioW: number;
  cardW: number;
  onHover: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      style={{
        display: "flex",
        flexDirection: "row",
        flex: "0 0 auto",
        paddingTop: 20,
        paddingBottom: 30,
        minWidth: 0,
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Photo + label */}
      <div
        style={{
          width: cardW,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          style={{
            width: cardW,
            height: cardW,
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
              href={`mailto:${member.email}`}
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
          width: isActive ? bioW : 0,
          minWidth: 0,
          flex: "0 0 auto",
          transition: `width ${T}ms ease-in-out`,
          flexShrink: 0,
        }}
      >
        <div style={{ width: bioW, paddingTop: 5, paddingLeft: 20 }}>
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

function FixedSpacer({ width }: { width: number }) {
  return (
    <div
      style={{
        width,
        flexShrink: 0,
        transition: `width ${T}ms ease-in-out`,
      }}
    />
  );
}

/* ── Mobile Person Row ─────────────────────────────────────────── */

function MobilePersonRow({
  member,
  isOpen,
  onToggle,
}: {
  member: TeamMember;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      {/* Header row — tap to toggle */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingTop: 16,
          paddingBottom: 16,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            filter: "grayscale(1)",
            flexShrink: 0,
            display: "block",
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="type-card-role" style={{ margin: 0 }}>
            {member.role}
          </p>
          <p className="type-card-name" style={{ margin: "4px 0 8px" }}>
            {member.name}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4A9AAF" }}
              onClick={e => e.stopPropagation()}
              aria-label={`${member.name} LinkedIn`}
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${member.email}`}
              style={{ color: "#4A9AAF" }}
              onClick={e => e.stopPropagation()}
              aria-label={`Email ${member.name}`}
            >
              <EmailIcon />
            </a>
          </div>
        </div>
        <img
          src="/assets/connector-cross.svg"
          alt=""
          aria-hidden="true"
          style={{
            width: 20,
            height: 20,
            flexShrink: 0,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: `transform ${T}ms ease-in-out`,
          }}
        />
      </div>

      {/* Bio — expands below on tap */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? 600 : 0,
          transition: `max-height ${T}ms ease-in-out`,
        }}
      >
        <p
          className="type-body"
          style={{
            margin: 0,
            paddingBottom: 20,
            opacity: isOpen ? 1 : 0,
            transition: `opacity 300ms ease ${isOpen ? "200ms" : "0ms"}`,
          }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────── */

export default function OurPeople() {
  // Desktop state
  const [hovered, setHovered] = useState<TeamMember["id"] | null>(null);
  const [bioVisible, setBioVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevHoveredRef = useRef<TeamMember["id"] | null>(null);

  // Mobile state
  const [tapped, setTapped] = useState<TeamMember["id"] | null>(null);

  // Responsive
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRowRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1200);
  const [windowW, setWindowW] = useState(() => getViewportWidth());
  const [desktopTooTall, setDesktopTooTall] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
    ro.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => setWindowW(getViewportWidth());
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setDesktopTooTall(false);
  }, [windowW]);

  const isMobile   = windowW < DESKTOP_BREAKPOINT || (windowW < DESKTOP_HEIGHT_BREAKPOINT && desktopTooTall);
  const isHovering = hovered !== null;
  // 190px cards below full desktop, 220px at full desktop (≥1350px)
  const cardW      = windowW >= 1350 ? CARD_W : 190;
  const fixedW     = isHovering
    ? 3 * cardW + 4 * 20
    : 3 * cardW + 5 * 20;
  const bioW       = Math.max(220, containerW - fixedW);

  useEffect(() => {
    const el = desktopRowRef.current;
    if (!el || windowW < DESKTOP_BREAKPOINT || windowW >= DESKTOP_HEIGHT_BREAKPOINT) return;

    const updateHeight = () => setDesktopTooTall(el.getBoundingClientRect().height >= DESKTOP_STACK_HEIGHT);
    const ro = new ResizeObserver(() => updateHeight());

    updateHeight();
    ro.observe(el);
    return () => ro.disconnect();
  }, [windowW, bioW, isHovering]);

  // Desktop hover timing
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

  return (
    <section
      className="py-10"
      style={{ paddingLeft: isMobile ? 20 : 40, paddingRight: isMobile ? 20 : 40 }}
      onMouseLeave={!isMobile ? () => setHovered(null) : undefined}
    >
      <div ref={containerRef} className="mx-auto max-w-[1432px]">
        <h2 className="type-section-heading mb-5">Our People</h2>

        {isMobile ? (
          /* ── Mobile: vertical stack ──────────────────────────── */
          <div style={{ position: "relative", backgroundColor: "var(--color-page)" }}>
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
              <p className="type-body" style={{ margin: 0 }}>
                {DEFAULT_BIO}
              </p>
            </div>
            <div>
              {team.map((member) => (
                <div key={member.id}>
                  <MobilePersonRow
                    member={member}
                    isOpen={tapped === member.id}
                    onToggle={() => setTapped(tapped === member.id ? null : member.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Desktop: horizontal hover layout ────────────────── */
          <div
            ref={desktopRowRef}
            className="relative"
            style={{ display: "flex", backgroundColor: "var(--color-page)" }}
          >
            {/* Person cards */}
            {team.map((member, i) => (
              <div key={member.id} style={{ display: "contents" }}>
                {i > 0 && (
                  <FixedSpacer width={20} />
                )}
                <PersonCard
                  member={member}
                  isActive={hovered === member.id}
                  bioVisible={bioVisible && hovered === member.id}
                  bioW={bioW}
                  cardW={cardW}
                  onHover={() => setHovered(member.id)}
                />
              </div>
            ))}

            {/* Default bio panel — collapses when someone is hovered */}
            <FixedSpacer width={isHovering ? 0 : 20} />
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                overflow: "visible",
                flexShrink: 0,
                width: isHovering ? 0 : bioW,
                transition: `width ${T}ms ease-in-out`,
              }}
            >
              {/* Default bio text */}
              <div style={{ width: bioW, paddingTop: 25, paddingBottom: 30, paddingLeft: 20, flexShrink: 0 }}>
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
        )}
      </div>
    </section>
  );
}
