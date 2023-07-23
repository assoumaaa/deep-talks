import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="flex h-16 items-center p-6 font-title text-4xl text-primary">
      <Link href="/">
        <span>Deep Talks</span>
      </Link>
    </div>
  );
};
