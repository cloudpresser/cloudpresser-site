import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://cloudpresser.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function parseArgs(argv) {
  const urls = [];
  let sitemapUrl = `${SITE_URL}/sitemap.xml`;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--sitemap-url") {
      sitemapUrl = argv[index + 1];
      index += 1;
      continue;
    }

    urls.push(arg);
  }

  return { sitemapUrl, urls };
}

async function readKey() {
  const publicDirectory = path.join(process.cwd(), "public");
  const entries = await fs.readdir(publicDirectory);
  const keyFiles = entries.filter((entry) => entry !== "robots.txt" && entry.endsWith(".txt"));

  if (keyFiles.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file in public/, found ${keyFiles.length}.`,
    );
  }

  const keyFile = keyFiles[0];
  const keyPath = path.join(publicDirectory, keyFile);
  const key = (await fs.readFile(keyPath, "utf8")).trim();
  const fileStem = path.basename(keyFile, ".txt");

  if (key !== fileStem) {
    throw new Error(`IndexNow key file contents must match filename: ${keyFile}`);
  }

  return { key, keyFile };
}

async function fetchSitemapUrls(sitemapUrl) {
  const response = await fetch(sitemapUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  const urls = matches.map((match) => match[1].trim()).filter(Boolean);

  if (urls.length === 0) {
    throw new Error(`No URLs found in sitemap: ${sitemapUrl}`);
  }

  return urls;
}

async function submitUrls(urls, key, keyFile) {
  const payload = {
    host: new URL(SITE_URL).host,
    key,
    keyLocation: `${SITE_URL}/${keyFile}`,
    urlList: urls,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `IndexNow submission failed: ${response.status} ${response.statusText}\n${responseText}`,
    );
  }

  console.log(`Submitted ${urls.length} URL(s) to IndexNow.`);
  console.log(`HTTP ${response.status}${responseText ? `: ${responseText}` : ""}`);
}

async function main() {
  const { sitemapUrl, urls: argUrls } = parseArgs(process.argv.slice(2));
  const { key, keyFile } = await readKey();
  const urls = argUrls.length > 0 ? argUrls : await fetchSitemapUrls(sitemapUrl);

  await submitUrls(urls, key, keyFile);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
