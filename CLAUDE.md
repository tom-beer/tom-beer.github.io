# CLAUDE.md

Guidance for AI agents working in this repo. Read this first.

## What this is

Personal website of Tom Beer — Astro 5 + Tailwind + TypeScript, built on the
[astro-nano](https://github.com/markhorn-dev/astro-nano) starter. Near-zero
client JS, static output, deployed to GitHub Pages. Migrated from a Hugo
Academic site.

## Commands

```sh
npm install
npm run dev        # dev server at localhost:4321 (HMR; hard-refresh if CSS looks stale)
npm run build      # astro check + astro build -> dist/
npm run preview    # serve the built dist/
```

Always run `npm run build` after content or config changes — it type-checks the
content collections against their schemas and catches broken image paths.

## Layout of the code

- `src/content/blog/<slug>/index.md` — blog posts. One folder per post.
- `src/content/publications/<slug>/index.md` — publications (discovery, annals).
- `src/content/config.ts` — **the schemas**. Front-matter must match these or the
  build fails. `blog`: title, description, date, tags?, featured?, thumb?, draft?.
  `publications`: title, authors[], date, doi?, abstract?, venue?, url_pdf?,
  url_code?, url_project?, featured?.
- `src/consts.ts` — site name, email, `SOCIALS` array, homepage item counts.
- `src/pages/` — routes: `index.astro` (home), `blog/`, `publications/`.
- `src/layouts/PageLayout.astro` — wraps every page; renders `Header` + `Footer`.
- `src/components/` — `Container` (width wrapper), `Header`, `ArrowCard` (list
  cards), `SocialIcon`, `Link`, etc.
- `src/styles/global.css` — global element styles + the dark-mode palette usage.
- `tailwind.config.mjs` — custom fonts + dark-mode color tokens.

## Conventions and gotchas (important)

- **Images are NOT colocated with posts.** Markdown lives in
  `src/content/blog/<slug>/index.md`, but images live in `public/blog/<slug>/`.
  Reference them with **absolute paths**: `![alt](/blog/<slug>/img.png)` and
  `<img src="/blog/<slug>/img.png">`. A relative path like `![](img.png)` makes
  Astro try to resolve it as a local asset import and **the build fails**.
  Keep every image under `public/blog/<slug>/` (subfolders are fine), and give
  it real alt text.

- **Raw HTML in posts needs blank lines around it.** A line of text directly
  after an `<img>`/`<div>` line is swallowed into the HTML block (renders as
  unstyled sans text, or as literal CSS for pandas `<style scoped>` blocks).
  Editorial notes use `<p class="note">…</p>` (links inside as `<a>`), not `>`
  blockquotes — blockquotes are styled as real quotations.

- **Verify rendering, not just the build.** `npm run build` passing says nothing
  about how posts look; check pages in the browser in both themes and at phone
  width (math, tables and code blocks are the usual overflow culprits).

- **Math requires `.md`, not `.mdx`.** Posts contain LaTeX (`$...$`, `$$...$$`)
  and raw HTML with unquoted attrs (e.g. `<img src="x.png" width=250>`). MDX
  parses those as JSX and breaks. The math plugins (`remark-math` +
  `rehype-katex`) are wired into Astro's top-level `markdown` config in
  `astro.config.mjs` (NOT into `mdx()`), so they apply to `.md` files. **Keep
  content files as `.md`.** KaTeX CSS is imported at the top of `global.css`
  (must precede the `@tailwind` directives).

- **Both themes use a warm editorial palette**, not default gray. Tokens in
  `tailwind.config.mjs` — light: `paper` (bg), `ink` (text), `taupe`
  (secondary text); dark: `espresso` (bg), `peat` (cards), `cream` (headings/
  strong text), `sand` (body text). Accent: `accent` / `accent-dark` (amber,
  links); `rust` / `rust-dark` for small flourishes (`.accent-mark`). Use these
  tokens, not raw Tailwind grays.

- **Container widths** come from `Container.astro`: `sm`, `base` (max-w-3xl),
  `md` (max-w-4xl). The home page uses one wide container with inner
  `max-w-3xl` on header/bio to keep a shared left edge.

- **Header:** the right side shows Blog / Publications nav links, except on
  post/publication detail pages, which pass `backHref` + `backLabel` to
  `PageLayout` to render a back link there instead. See
  `src/pages/blog/[...slug].astro`. The home page hides the header entirely.

- **Social previews:** blog posts pass their `thumb` as `image` to
  `PageLayout` (used for `og:image`); pages without one fall back to the
  avatar with a small Twitter card.

- Fonts: Fraunces (display/headings), Lora (body serif), Inter (UI sans).

## Deploy (GitHub Pages)

- Deployed via `.github/workflows/deploy.yml`: every push to `main` builds
  with `withastro/action@v3` and publishes to Pages. Node 20+.
- `astro.config.mjs` sets `site: "https://tom-beer.github.io"`, no `base`
  (root user-site).
- One-time repo setting: **Settings → Pages → Source: "GitHub Actions".**

See the README for first-push setup steps.
