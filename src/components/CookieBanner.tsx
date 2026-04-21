import { useEffect, useState } from "react";

const STORAGE_KEY = "cba-cookie-banner-dismissed";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) !== "true");
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[70] w-[420px] max-w-[calc(100vw-32px)] bg-page"
      style={{ border: "1.5px solid #E9E9E9", padding: "14px 14px 12px", borderRadius: 4 }}
    >
      <div className="flex justify-between gap-4">
        <p className="type-ui" style={{ margin: 0, color: "var(--color-dark)", fontWeight: 400, flex: 1, minWidth: 0 }}>
          We use cookies to help this site work properly. Read our <a href="/cookies-policy" className="font-semibold hover:underline">Cookies Policy</a>.
        </p>
        <span
          role="button"
          tabIndex={0}
          onClick={dismiss}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") dismiss();
          }}
          className="type-ui"
          style={{ color: "var(--color-dark)", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", alignSelf: "center" }}
        >
          OK
        </span>
      </div>
    </div>
  );
}
