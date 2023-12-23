import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-center p-6 font-serif text-2xl text-primary">
      <Link href="/">
        <Image
          src={"/logo.png"}
          alt="hero"
          width={110}
          height={100}
          priority={true}
        />
      </Link>
    </nav>
  );
}
