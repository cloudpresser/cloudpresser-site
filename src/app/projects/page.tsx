"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProjectsRedirect() {
  useEffect(() => {
    window.location.replace("/systems");
  }, []);

  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/systems" />
      <div className="pt-20 text-center space-y-4">
        <p className="text-muted-foreground">
          This page has moved to Systems. Redirecting&hellip;
        </p>
        <Link
          href="/systems"
          className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
        >
          Go to Systems
        </Link>
      </div>
    </>
  );
}
