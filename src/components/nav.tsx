"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/systems", label: "Systems" },
  { href: "/writing", label: "Writing" },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const maxWidthClass = isHome
    ? "max-w-[840px] lg:max-w-4xl xl:max-w-5xl"
    : "max-w-[840px]";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Glass effect when scrolled past top
      setIsScrolled(currentScrollY > 20);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/70 backdrop-blur-md border-b border-border/40 shadow-sm py-4"
          : "bg-transparent py-6 sm:py-8",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div
        className={cn(
          "w-full mx-auto px-6 sm:px-10 flex items-center justify-between transition-all duration-300",
          maxWidthClass
        )}
      >
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
                className={cn(
                  "text-[0.9375rem] transition-colors relative group",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full transition-transform duration-300 origin-left",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
