"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Dishes" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white/70 backdrop-blur
                       dark:border-gray-800 dark:bg-black/70">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-white">
          Aayan Sharma
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-4 text-sm md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      "transition hover:text-black dark:hover:text-white " +
                      (active
                        ? "font-semibold text-black dark:text-white"
                        : "text-gray-800 dark:text-gray-300")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
