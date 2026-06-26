export default function Logo({
  size = 32,
  variant = "color",
}: {
  size?: number;
  variant?: "color" | "white";
}) {
  const outer = variant === "white" ? "#ffffff" : "#3055d9";
  const inner  = variant === "white" ? "#ffffff" : "#27b5e6";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 825.08 825.08"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ahmed Ashour logo"
    >
      <polygon
        fill={outer}
        points="412.54 217.64 706.83 725.19 793.07 725.19 412.54 68.89 32.01 725.19 118.26 725.19 412.54 217.64"
      />
      <polygon
        fill={inner}
        points="567.98 634.47 481.73 634.47 444.31 634.47 343.35 634.47 412.54 515.14 451.08 581.62 537.33 581.62 412.54 366.39 204.5 725.19 268.43 725.19 290.75 725.19 534.33 725.19 556.65 725.19 620.58 725.19 567.98 634.47"
      />
    </svg>
  );
}
