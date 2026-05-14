import Link from "next/link";
import type { MouseEventHandler } from "react";

interface ButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  fontSize?: string;
  variant?: "primary" | "ghost";
}

export default function Button({
  href,
  onClick,
  title,
  fontSize = "text-base",
  variant = "primary",
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const classes = [
    "group relative inline-flex h-12 min-w-[8rem] items-center justify-center rounded-full px-7 font-medium tracking-tight transition-all duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-bg",
    isPrimary
      ? "bg-primary text-bg shadow-glow hover:shadow-glowSoft hover:-translate-y-0.5"
      : "glass text-ink hover:bg-white/10",
    fontSize,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {title}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={classes}>
      {title}
    </button>
  );
}
