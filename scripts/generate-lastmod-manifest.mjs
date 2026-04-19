import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = process.cwd();
const postsDirectory = path.join(repoRoot, "content", "posts");
const outputPath = path.join(repoRoot, "generated", "lastmod.json");

async function getPublishedPostFiles() {
  try {
    const entries = await fs.readdir(postsDirectory);
    return entries
      .filter((entry) => entry.endsWith(".md"))
      .sort()
      .map((entry) => path.join("content", "posts", entry));
  } catch {
    return [];
  }
}

function getLastModified(paths) {
  if (paths.length === 0) {
    return null;
  }

  try {
    const output = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    return output || null;
  } catch {
    return null;
  }
}

async function main() {
  const publishedPostFiles = await getPublishedPostFiles();
  const manifest = {};

  const routeDependencies = {
    "/": ["src/app/page.tsx"],
    "/control-systems-for-ai": [
      "src/app/control-systems-for-ai/page.tsx",
      "src/lib/posts.ts",
      ...publishedPostFiles,
    ],
    "/systems": ["src/app/systems/page.tsx"],
    "/writing": ["src/app/writing/page.tsx", "src/lib/posts.ts", ...publishedPostFiles],
  };

  for (const route of Object.keys(routeDependencies).sort()) {
    const lastModified = getLastModified(routeDependencies[route]);

    if (lastModified) {
      manifest[route] = lastModified;
    }
  }

  for (const postFile of publishedPostFiles) {
    const slug = path.basename(postFile, ".md");
    const lastModified = getLastModified([postFile]);

    if (lastModified) {
      manifest[`/writing/${slug}`] = lastModified;
    }
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
