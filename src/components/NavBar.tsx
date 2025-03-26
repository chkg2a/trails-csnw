"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const PiHamburger = dynamic(() => import("react-icons/pi").then(mod => mod.PiHamburger), { ssr: false });

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--primary)] shadow-md mt-4 rounded-lg">
      <div className="flex justify-between items-center mx-auto font-semibold">
        <div className="bg-[var(--secondary)] p-3 rounded-l">
          <Link href="/" className="text-xl font-bold text-[var(--text-color)]">
            Trails-CSNW.com
          </Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <PiHamburger />
        </button>

        <ul className="hidden md:flex space-x-6 text-[var(--text-color)] font-medium px-4">
          <li><Link href="/characters" className="hover:text-blue-600">Characters</Link></li>
          <li><Link href="/tier-list" className="hover:text-blue-600">Tier List</Link></li>
          <li><Link href="/sim/gacha" className="hover:text-blue-600">Gacha Sim</Link></li>
          <li><Link href="/codes" className="hover:text-blue-600">Codes</Link></li>
        </ul>
      </div>

      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-3 text-center text-[var(--text-color)] font-medium">
          <li><Link href="/characters" className="block p-2 hover:text-blue-600">Characters</Link></li>
          <li><Link href="/tier-list" className="block p-2 hover:text-blue-600">Tier List</Link></li>
          <li><Link href="/sim/gacha" className="block p-2 hover:text-blue-600">Gacha Sim</Link></li>
          <li><Link href="/codes" className="block p-2 hover:text-blue-600">Codes</Link></li>
        </ul>
      )}
    </nav>
  );
}
