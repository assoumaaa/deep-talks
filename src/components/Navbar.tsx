import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="relative z-20 flex h-16 items-center justify-center px-6">
      <Link href="/" className="group flex items-center gap-2">
        <span className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-primary md:text-2xl">
          deep<span className="italic text-primary">talks</span>
        </span>
      </Link>
    </nav>
  );
};
