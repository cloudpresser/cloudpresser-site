"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const maxWidthClass = isHome
    ? "max-w-[840px] lg:max-w-4xl xl:max-w-5xl"
    : "max-w-[840px]";
  const ptClass = isHome ? "pt-12 sm:pt-16 lg:pt-20" : "pt-28 sm:pt-32";

  return (
    <main
      className={cn(
        "flex-1 w-full mx-auto px-6 sm:px-10 pb-12 transition-all duration-300",
        maxWidthClass,
        ptClass
      )}
    >
      {children}
    </main>
  );
}
