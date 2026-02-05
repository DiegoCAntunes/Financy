export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="currentColor"
          className="text-primary"
        >
          $$
        </text>
      </svg>
      <span className="text-2xl font-bold tracking-tight text-primary">FINANCY</span>
    </div>
  );
}
