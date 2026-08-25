type IconProps = { className?: string };

const base = "h-4 w-4 shrink-0";

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? base}>
      <path
        d="M3.5 20.5 4.8 16.4A8.2 8.2 0 1 1 7.9 19.4L3.5 20.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 8.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3-.1.5.3.6 1.3 1.7 2.3 2.1.2.1.4.1.5 0l.5-.5c.2-.2.3-.2.5-.1l1.5.8c.3.2.4.3.4.5v.5c0 .3-.2.6-.5.8-.4.3-.9.4-1.4.3-1-.1-2.6-.8-3.9-2.1-1.3-1.3-2-2.8-2.1-3.8-.1-.5 0-1 .3-1.4l.1-.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? base}>
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="m3.6 6.4 8.4 6.2 8.4-6.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? base}>
      <path
        d="M7.6 3.5H4.9c-.8 0-1.4.7-1.4 1.5C3.8 12.8 10.4 19.6 18.3 20c.8 0 1.5-.6 1.5-1.4v-2.7l-4-1.6-1.7 2.1a13 13 0 0 1-5.1-5.2L11 9.5 7.6 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? base}>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M3.5 9.6h17M8 3.4v3.2M16 3.4v3.2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect x="7.2" y="12.4" width="3" height="2.6" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? base}>
      <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className ?? base}>
      <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
