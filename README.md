# Micko Alberto — Portfolio

Personal portfolio of Micko Alberto ("Amekou"), an IT student in Pampanga,
Philippines, focused on front-end development and SEO.

**Live:** https://amekou-dev.vercel.app

Projects, an About page with a stack ledger and certifications, a blog, a
résumé viewer, and a contact form.

---

## Stack

- **Angular 21**: standalone components, lazy-loaded routes
- **Prerendered** with `@angular/ssr`: every route is built to static HTML,
  so pages and their SEO tags exist without JavaScript
- **Vercel** for hosting, deployed from `master`
- **EmailJS** for the contact form
- **Vitest** for unit tests

Fonts: JetBrains Mono (body) and Fraunces (display), loaded through a single
request that Angular inlines at build time.

---

## Running it

Requires Node 20+ (developed on 22) and npm.

```bash
npm install
npm start          # dev server at http://localhost:4200
npm run build      # production build into dist/webdev-portfolio
npm test           # unit tests (see the note below)
```

### What `npm run build` does

1. `ng build` compiles the app and prerenders every route, including one
   page per blog post.
2. `postbuild:404` copies the client-rendered shell to `404.html`, which
   `vercel.json` serves for unknown URLs.
3. `postbuild:sitemap` runs `scripts/generate-sitemap.mjs`, which writes
   `sitemap.xml` from the prerendered output. It is never edited by hand:
   adding a page or a post adds it to the sitemap automatically. Blog dates
   come from each post's `BlogPosting` structured data.

Vercel runs `npm run build`, so these steps also run on every deploy.

### Tests and folder names

`npm test` finds **no tests** if any folder in the project's path contains
parentheses, such as `New folder (3)`. Angular passes the test paths to
Vitest unescaped, and the `(` and `)` are read as pattern syntax. Keep the
project in a folder without parentheses and the tests run normally.

---

## Editing content

Most content lives in plain TypeScript data files, not in templates:

| What | Where |
|---|---|
| Projects (cards, home page "Selected work", stack ledger credits) | `src/app/data/projects.ts` |
| Blog posts | `src/app/data/blog.ts` |
| Certifications and the stack ledger | `src/app/pages/about/about.ts` |

- **Projects:** the home page shows the first 3 entries marked
  `featured: true`. Each project needs a `liveUrl`, a `repoUrl`, or both.
  Without a live site, the card links to the source instead.
- **Stack ledger:** the projects listed next to each tool are derived from
  each project's `tools`. A tool name must match exactly (`'Vue.js'`, not
  `'Vue'`) or it credits nothing.
- **Certifications:** grouped automatically by `issuer`. Certificates past
  their `expires` date are hidden by themselves.

---

## Design notes

- Global design tokens (colors, spacing, type, depth) live in
  `src/styles.css`. Pages reuse them rather than adding new values.
- Controls are black on white, and selected or primary actions are white on
  navy. Depth comes from shared shadow tokens, all lit from the top-left.
- **Dark mode is switched off, not removed.** Set `DARK_MODE_ENABLED` to
  `true` in both `src/app/core/services/theme.service.ts` and the
  pre-paint script in `src/index.html`, and restore the dark `theme-color`
  meta tag there.

---

## Repo conventions

- Line endings are LF, pinned by `.gitattributes` and `.editorconfig`.
- Commits follow Conventional Commits (`feat:`, `fix:`, `perf:` and so on).
