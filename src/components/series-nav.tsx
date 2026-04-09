import Link from "next/link";
import {
  SERIES_NAME,
  getSeriesPosts,
  type SeriesEntryWithStatus,
} from "@/lib/posts";

interface SeriesNavProps {
  currentSlug: string;
}

function EntryRow({
  entry,
  isCurrent,
}: {
  entry: SeriesEntryWithStatus;
  isCurrent: boolean;
}) {
  const number = entry.isBoundary ? null : entry.part;
  const layerLabel = entry.layer;

  // Current post: highlighted, not a link
  if (isCurrent) {
    return (
      <li className="flex items-baseline gap-3 text-sm">
        <span className="font-mono text-xs text-primary w-4 shrink-0 text-right">
          {number ?? ""}
        </span>
        <span className="font-mono text-xs text-primary w-[7rem] shrink-0">
          {layerLabel}
        </span>
        <span className="text-primary font-medium">{entry.title}</span>
      </li>
    );
  }

  // Published: linked
  if (entry.isPublished) {
    return (
      <li className="flex items-baseline gap-3 text-sm">
        <span className="font-mono text-xs text-muted-foreground w-4 shrink-0 text-right">
          {number ?? ""}
        </span>
        <span className="font-mono text-xs text-muted-foreground w-[7rem] shrink-0">
          {layerLabel}
        </span>
        <Link
          href={`/writing/${entry.slug}`}
          className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          {entry.title}
        </Link>
      </li>
    );
  }

  // Not yet published: muted, no link
  return (
    <li className="flex items-baseline gap-3 text-sm">
      <span className="font-mono text-xs text-muted-foreground/40 w-4 shrink-0 text-right">
        {number ?? ""}
      </span>
      <span className="font-mono text-xs text-muted-foreground/40 w-[7rem] shrink-0">
        {layerLabel}
      </span>
      <span className="text-muted-foreground/40">{entry.title}</span>
    </li>
  );
}

export function SeriesNav({ currentSlug }: SeriesNavProps) {
  const series = getSeriesPosts();
  const coreEntries = series.filter((e) => !e.isBoundary);
  const boundaryEntries = series.filter((e) => e.isBoundary);

  return (
    <nav
      aria-label="Series navigation"
      className="border border-border rounded-lg px-5 py-5 sm:px-6 sm:py-6 space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        This post is part of a series on
      </p>
      <p className="font-serif text-lg font-semibold text-foreground tracking-tight">
        <Link
          href="/control-systems-for-ai"
          className="hover:text-primary transition-colors"
        >
          {SERIES_NAME}
        </Link>
      </p>

      <ul className="space-y-2.5 pt-1">
        {coreEntries.map((entry) => (
          <EntryRow
            key={entry.slug}
            entry={entry}
            isCurrent={entry.slug === currentSlug}
          />
        ))}
      </ul>

      {boundaryEntries.length > 0 && (
        <>
          <div className="border-t border-dashed border-border" />
          <ul className="space-y-2.5">
            {boundaryEntries.map((entry) => (
              <EntryRow
                key={entry.slug}
                entry={entry}
                isCurrent={entry.slug === currentSlug}
              />
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}
