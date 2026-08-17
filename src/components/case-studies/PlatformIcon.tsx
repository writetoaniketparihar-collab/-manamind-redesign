import type { Platform } from "@/data/case-studies";

export function PlatformIcon({ platform, className = "h-4 w-4" }: { platform: Platform; className?: string }) {
  switch (platform) {
    case "Windows":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M2.5 4.6 10.4 3.5v7.6H2.5V4.6Zm9-1.3L21.5 2v9.1h-10V3.3ZM2.5 12.2h7.9v7.6l-7.9-1.1v-6.5Zm9 0h10v9.1l-10-1.4v-7.7Z" />
        </svg>
      );
    case "iOS":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fontSize="13"
            fontWeight="700"
            letterSpacing="-0.5"
            fill="currentColor"
          >
            iOS
          </text>
        </svg>
      );
    case "Android":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
        </svg>
      );
    case "PC":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
          <rect x="2" y="4" width="20" height="13" rx="1.5" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "PS5":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fontSize="11"
            fontWeight="800"
            letterSpacing="-1"
            fill="currentColor"
          >
            PS5
          </text>
        </svg>
      );
    case "Xbox Series":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.93 0 3.7.62 5.16 1.65-1.49.83-3.32 2.36-5.16 4.66-1.84-2.3-3.67-3.83-5.16-4.66A8.94 8.94 0 0112 4zm-7.27 3.34c1.05.36 3.27 1.49 5.5 4.06-2.5 3.04-4.45 6.79-5.43 9.21A8.95 8.95 0 013 12c0-1.7.48-3.29 1.31-4.66h.42zm14.54 0h.42A8.93 8.93 0 0121 12a8.95 8.95 0 01-1.8 5.41c-.98-2.42-2.93-6.17-5.43-9.21 2.23-2.57 4.45-3.7 5.5-4.06zM12 11.04c1.71 2.05 4.27 5.6 5.85 9.04A8.93 8.93 0 0112 22a8.93 8.93 0 01-5.85-1.92c1.58-3.44 4.14-6.99 5.85-9.04z" />
        </svg>
      );
    case "Switch":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
          <rect x="3" y="3" width="8" height="18" rx="2" />
          <rect x="13" y="3" width="8" height="18" rx="2" />
          <circle cx="7" cy="8" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="17" cy="16" r="1" />
        </svg>
      );
    case "Mobile":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
          <rect x="6" y="2" width="12" height="20" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
      );
    case "VR":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
          <path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-3.5l-2-2.5a2 2 0 00-3 0L8.5 17H5a2 2 0 01-2-2V9z" />
          <circle cx="8" cy="12" r="1" fill="currentColor" />
          <circle cx="16" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
