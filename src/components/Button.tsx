import Link from "next/link";
import type { MouseEventHandler } from "react";

interface ButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  fontSize?: string;
}

export default function Button({
  href,
  onClick,
  title,
  fontSize = "text-lg",
}: ButtonProps) {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`relative flex h-full w-full items-center justify-center rounded-md bg-white p-2 font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0 ${fontSize}`}
    >
      {title}
    </button>
  );

  const exteriorStyle =
    "group relative flex h-14 w-1/2 overflow-hidden rounded-lg bg-secondary p-0.5 focus:outline-none focus:ring-4 focus:ring-secondary group-hover:bg-secondary-dark dark:text-white dark:focus:ring-secondary-darker";

  if (href) {
    return (
      <Link href={href} className={exteriorStyle}>
        {buttonContent}
      </Link>
    );
  } else {
    return <div className={exteriorStyle}>{buttonContent}</div>;
  }
}
