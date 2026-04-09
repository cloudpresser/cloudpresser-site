import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  series?: string;
  seriesPart?: number;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

// ---------------------------------------------------------------------------
// Series definition: Control Systems for Intelligent Software
// ---------------------------------------------------------------------------

export const SERIES_NAME = "Control Systems for Intelligent Software";

export interface SeriesEntry {
  part: number;
  layer: string;
  slug: string;
  title: string;
  description: string;
  isBoundary: boolean;
}

/**
 * The canonical series definition.
 * Parts 1-5 form the core stack. Part 6 is a boundary condition / capstone.
 */
export const SERIES_DEFINITION: SeriesEntry[] = [
  {
    part: 1,
    layer: "Execution",
    slug: "bash-is-all-you-need",
    title: "Bash Is All You Need — Until It Isn't",
    description:
      "Bash is the perfect execution layer. But execution is one box in a much larger pipeline.",
    isBoundary: false,
  },
  {
    part: 2,
    layer: "Verification",
    slug: "smart-model-reviewer-is-backwards",
    title: "Why the Smart Model Reviewer Pattern Is Backwards",
    description:
      "Strong models should generate. Verification should be pushed toward constrained, cheaper, more deterministic mechanisms.",
    isBoundary: false,
  },
  {
    part: 3,
    layer: "Architecture",
    slug: "ai-agents-are-control-systems",
    title: "AI Agents Are Control Systems",
    description:
      "The architecture that robotics solved decades ago is the same architecture AI agents need.",
    isBoundary: false,
  },
  {
    part: 4,
    layer: "Observability",
    slug: "observability-for-ai-agents",
    title: "Observability for AI Agents",
    description:
      "AI systems fail in ways that look like success. You need traces, not chat logs.",
    isBoundary: false,
  },
  {
    part: 5,
    layer: "Interface",
    slug: "why-ai-needs-control-surfaces",
    title: "Why AI Needs Control Surfaces, Not Just Chat",
    description:
      "Chat interfaces are a bottleneck. Purpose-built control surfaces turn telemetry into human decisions.",
    isBoundary: false,
  },
  {
    part: 6,
    layer: "Boundary Condition",
    slug: "why-coherence-doesnt-scale-with-capability",
    title: "Why Coherence Doesn't Scale with Capability",
    description:
      "Capability is scaling faster than coherence. The supervision layer isn't a workaround — it's part of the design.",
    isBoundary: true,
  },
];

export interface SeriesEntryWithStatus extends SeriesEntry {
  isPublished: boolean;
}

/**
 * Returns the full series definition enriched with published status.
 * A post is "published" if its .md file exists in content/posts/.
 */
export function getSeriesPosts(): SeriesEntryWithStatus[] {
  const publishedSlugs = new Set(getAllPostSlugs());
  return SERIES_DEFINITION.map((entry) => ({
    ...entry,
    isPublished: publishedSlugs.has(entry.slug),
  }));
}

/**
 * Returns the previous and next published posts adjacent to the given slug
 * in series order. Does NOT skip over unpublished posts — if the immediate
 * neighbor isn't published, that direction returns null.
 */
export function getAdjacentSeriesPosts(slug: string): {
  prev: SeriesEntryWithStatus | null;
  next: SeriesEntryWithStatus | null;
} {
  const series = getSeriesPosts();
  const currentIndex = series.findIndex((entry) => entry.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // Look at the immediate previous entry — only link if published
  const prevEntry = currentIndex > 0 ? series[currentIndex - 1] : null;
  const prev = prevEntry?.isPublished ? prevEntry : null;

  // Look at the immediate next entry — only link if published
  const nextEntry =
    currentIndex < series.length - 1 ? series[currentIndex + 1] : null;
  const next = nextEntry?.isPublished ? nextEntry : null;

  return { prev, next };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostMeta(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostMeta(slug: string): PostMeta {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    series: data.series,
    seriesPart: data.seriesPart,
  };
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    series: data.series,
    seriesPart: data.seriesPart,
    contentHtml,
  };
}
