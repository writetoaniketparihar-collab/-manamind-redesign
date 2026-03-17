import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300";
  const variants = {
    primary:
      "bg-primary text-background hover:shadow-[0_0_20px_rgba(0,255,150,0.3)] hover:scale-105",
    outline:
      "border border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,255,150,0.15)]",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
