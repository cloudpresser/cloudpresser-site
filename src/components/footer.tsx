"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const maxWidthClass = isHome
    ? "max-w-[840px] lg:max-w-4xl xl:max-w-5xl"
    : "max-w-[840px]";

  return (
    <footer
      className={cn(
        "w-full mx-auto px-6 sm:px-10 pb-8 pt-8 transition-all duration-300",
        maxWidthClass
      )}
    >
      <div className="border-t border-border pt-6 text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p>Luiz Ozorio &middot; Raleigh, NC</p>
          <div className="flex items-center gap-5">
            <Link
              href="https://github.com/cloudpresser"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/luiz-ozorio/"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:luiz@cloudpresser.com"
              className="hover:text-foreground transition-colors"
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
