type TagProps = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dim";
};

export default function Tag({ children, variant = "default" }: TagProps) {
  const styles = {
    default: "border-white/[0.08] text-muted",
    accent:  "border-accent/30 text-accent-light bg-accent/5",
    dim:     "border-white/[0.05] text-dim",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-medium uppercase tracking-wider font-body ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
