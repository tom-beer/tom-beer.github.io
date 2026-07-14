# tom-beer.github.io

Personal website of Tom Beer, built with [Astro](https://astro.build) using the
[astro-nano](https://github.com/markhorn-dev/astro-nano) starter (Astro 5 +
Tailwind + TypeScript).

## Structure

- `src/content/blog/` — blog posts (Markdown bundle folders). Images live in `public/blog/<slug>/`.
- `src/content/publications/` — publication records (front-matter: title, authors, date, doi, abstract, venue, url_pdf, url_code).
- `src/consts.ts` — site name, email, social links, homepage counts.
- `src/pages/` — home, blog, publications routes.

## Develop

```sh
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # preview the build
```

## Content authoring notes

- **Images are not colocated with posts.** Markdown is in
  `src/content/blog/<slug>/index.md`; images go in `public/blog/<slug>/`.
  Reference them with absolute paths, e.g. `![alt](/blog/<slug>/pic.png)`.
- **Keep content files as `.md`** (not `.mdx`). LaTeX math and raw HTML in the
  posts break under MDX. Math is rendered by KaTeX via the `markdown` config in
  `astro.config.mjs`. Use `$...$` for inline and `$$...$$` for display math.

See [CLAUDE.md](./CLAUDE.md) for the full set of conventions.

## Deploy (GitHub Pages)

The site auto-deploys on every push to `master` via
`.github/workflows/deploy.yml` (build with `withastro/action` → publish to
Pages). No manual build/upload needed.

### First-time setup

This is a **user site**, so the repo must be named `tom-beer.github.io` to serve
at the root domain.

```sh
# 1. Create the repo on GitHub named exactly: tom-beer.github.io
gh repo create tom-beer.github.io --public --source=. --remote=origin

# 2. Push master (triggers the deploy workflow)
git push -u origin master
```

Then, one time, in the GitHub repo:
**Settings → Pages → Build and deployment → Source: "GitHub Actions".**

The first Actions run publishes the site to **https://tom-beer.github.io**.
Watch progress under the repo's **Actions** tab. After that, every
`git push` to `master` redeploys automatically.

### Cutover note

The current live site is the old Hugo build. Point the domain at this new build
only when you're ready — see the migration plan for cutover options.
