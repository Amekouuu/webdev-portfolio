// scripts/generate-sitemap.mjs
//
// Writes sitemap.xml from the prerendered build output.
//
// Why the build output rather than app.routes.ts + data/blog.ts: those are
// TypeScript, so reading them from a plain Node script means either parsing TS
// or regex-scraping it. The prerenderer has already resolved every route —
// including the ones getPrerenderParams() generates per blog slug — into a
// directory tree of index.html files. That tree IS the set of pages that exist,
// so deriving from it cannot drift from what actually shipped.
//
// lastmod for a blog post comes from the BlogPosting JSON-LD that SeoService
// emits, so the date in the sitemap and the date in the structured data are
// physically the same value and cannot disagree.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://amekou-dev.vercel.app';
const ROOT = 'dist/webdev-portfolio/browser';

/** Per-route hints. Anything unlisted (i.e. a blog post) uses BLOG_DEFAULTS. */
const ROUTE_META = {
  '/':         { changefreq: 'monthly', priority: '1.0' },
  '/projects': { changefreq: 'monthly', priority: '0.9' },
  '/about':    { changefreq: 'monthly', priority: '0.8' },
  '/blog':     { changefreq: 'weekly',  priority: '0.8' },
  '/resume':   { changefreq: 'monthly', priority: '0.7' },
  '/contact':  { changefreq: 'yearly',  priority: '0.6' },
};
const BLOG_DEFAULTS = { changefreq: 'yearly', priority: '0.6' };

const today = new Date().toISOString().slice(0, 10);

/**
 * Every prerendered page under `dir`.
 *
 * Only files literally named index.html count, which is what excludes
 * 404.html, index.csr.html and the Search Console verification file —
 * none of those are pages a crawler should be pointed at.
 */
async function findPages(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findPages(full, base)));
      continue;
    }
    if (entry.name !== 'index.html') continue;

    // dist/.../browser/blog/some-post/index.html -> /blog/some-post
    const rel = path.relative(base, path.dirname(full)).split(path.sep).join('/');
    out.push({ route: rel === '' ? '/' : `/${rel}`, file: full });
  }
  return out;
}

/**
 * The post's own publish date, read back out of the BlogPosting JSON-LD.
 * Null for pages that carry no article schema.
 */
function publishedDate(html) {
  const match = html.match(/"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})"/);
  return match ? match[1] : null;
}

const pages = await findPages(ROOT);

const entries = await Promise.all(
  pages.map(async ({ route, file }) => {
    const html = await readFile(file, 'utf8');
    const meta = ROUTE_META[route] ?? BLOG_DEFAULTS;
    return { loc: `${BASE_URL}${route}`, lastmod: publishedDate(html) ?? today, ...meta };
  }),
);

// Highest priority first, then alphabetical — stable output, so a rebuild with
// no content change produces a byte-identical file and a clean git diff.
entries.sort((a, b) => Number(b.priority) - Number(a.priority) || a.loc.localeCompare(b.loc));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  GENERATED at build time by scripts/generate-sitemap.mjs from the prerendered
  output. Do not hand-edit: the next build overwrites it. To change what is
  listed, add or remove a route or blog post in the app itself.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    e => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

await writeFile(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
console.log(`wrote sitemap.xml (${entries.length} routes)`);
