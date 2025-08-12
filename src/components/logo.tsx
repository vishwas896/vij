export function Logo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M11.25 21V11.5H12.75V21H11.25Z"
        fill="#FF4136"
        stroke="hsl(var(--primary))"
        strokeWidth="0.5"
      />
      <path
        d="M10.5 21H13.5V22H10.5V21Z"
        fill="#FF4136"
        stroke="hsl(var(--primary))"
        strokeWidth="0.5"
      />
      <path
        d="M10.5 10.5H13.5V11.5H10.5V10.5Z"
        fill="#FF4136"
        stroke="hsl(var(--primary))"
        strokeWidth="0.5"
      />
      <path
        d="M12 11C10.6626 10.0651 10.5 8.62934 10.5 7.5C10.5 5.5 12 2 12 2C12 2 13.5 5.5 13.5 7.5C13.5 8.62934 13.3374 10.0651 12 11Z"
        fill="url(#flameGradient)"
      />
      <path
        d="M12 8.5C11.6667 8 11.5 7.5 11.5 7C11.5 6.5 11.6667 6 12 5.5C12.3333 6 12.5 6.5 12.5 7C12.5 7.5 12.3333 8 12 8.5Z"
        fill="white"
      />
    </svg>
  );
}
