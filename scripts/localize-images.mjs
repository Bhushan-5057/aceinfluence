import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sources = [
  { file: "data/services.json", folder: "services" },
  { file: "data/pages.json", folder: "content" },
  { file: "data/testimonials.json", folder: "testimonials" },
];
const downloaded = new Map();

function imageId(url) {
  return url.match(/photo-[\w-]+/)?.[0] || `image-${Buffer.from(url).toString("hex").slice(0, 16)}`;
}

async function localize(url, folder) {
  const id = imageId(url);
  const publicPath = `/assets/images/${folder}/${id}.jpg`;
  const cacheKey = `${folder}:${id}`;
  if (downloaded.has(cacheKey)) return downloaded.get(cacheKey);

  const destination = path.join(root, "public", "assets", "images", folder, `${id}.jpg`);
  await mkdir(path.dirname(destination), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to download ${url}: ${response.status}`);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  downloaded.set(cacheKey, publicPath);
  return publicPath;
}

async function walk(value, folder) {
  if (Array.isArray(value)) return Promise.all(value.map((item) => walk(item, folder)));
  if (value && typeof value === "object") {
    const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await walk(item, folder)]));
    return Object.fromEntries(entries);
  }
  if (typeof value === "string" && value.startsWith("https://images.unsplash.com/")) return localize(value, folder);
  return value;
}

for (const source of sources) {
  const absolutePath = path.join(root, source.file);
  const data = JSON.parse(await readFile(absolutePath, "utf8"));
  const localized = await walk(data, source.folder);
  await writeFile(absolutePath, `${JSON.stringify(localized, null, 2)}\n`);
}

const cssPath = path.join(root, "app", "globals.css");
let css = await readFile(cssPath, "utf8");
const cssUrls = [...css.matchAll(/https:\/\/images\.unsplash\.com\/[^"')]+/g)].map((match) => match[0]);
for (const url of new Set(cssUrls)) css = css.replaceAll(url, await localize(url, "hero"));
await writeFile(cssPath, css);

console.log(`Localized ${downloaded.size} image assets.`);
