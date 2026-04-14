"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/systems", label: "Systems" },
  { href: "/writing", label: "Writing" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-full max-w-[840px] mx-auto px-6 sm:px-10 pt-6 sm:pt-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-[1.1rem] font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Luiz Ozorio
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.9375rem] transition-colors ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
