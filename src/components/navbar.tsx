import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex h-16 items-center justify-center  p-6 font-title text-4xl text-primary">
      <Link href="/">
        <span>Deep Talks</span>
      </Link>
    </nav>
  );
};
