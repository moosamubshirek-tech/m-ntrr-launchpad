interface WavyDividerProps {
  nextBg?: "white" | "lavender" | "blush";
  flip?: boolean;
}

export default function WavyDivider({ nextBg = "lavender", flip = false }: WavyDividerProps) {
  const fills: Record<string, string> = {
    white: "%23FFFFFF",
    lavender: "%23F0F0FF",
    blush: "%23FFF0F3",
  };
  const fill = fills[nextBg];

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-[40px] sm:h-[60px]"
      >
        <path
          d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z"
          fill={decodeURIComponent(fill)}
        />
      </svg>
    </div>
  );
}
