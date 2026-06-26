import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-body font-medium rounded-lg cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-light active:scale-[0.98] shadow-lg shadow-accent/20",
    ghost:
      "text-muted hover:text-primary hover:bg-white/[0.05]",
    outline:
      "border border-white/[0.1] text-primary hover:border-white/[0.2] hover:bg-white/[0.03] active:scale-[0.98]",
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>{children}</Link>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
