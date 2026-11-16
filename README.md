# tom.beer

Personal website of Tom Beer at **https://tom.beer**, built with [Astro](https://astro.build) using the
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

The site auto-deploys on every push to `main` via
`.github/workflows/deploy.yml` (build with `withastro/action` → publish to
Pages). No manual build/upload needed.

### First-time setup

This is a **user site**, so the repo must be named `tom-beer.github.io` to serve
at the root domain.

```sh
# 1. Create the repo on GitHub named exactly: tom-beer.github.io
gh repo create tom-beer.github.io --public --source=. --remote=origin

# 2. Push main (triggers the deploy workflow)
git push -u origin main
```

Then, one time, in the GitHub repo:
**Settings → Pages → Build and deployment → Source: "GitHub Actions".**

The first Actions run publishes the site to **https://tom-beer.github.io**.
Watch progress under the repo's **Actions** tab. After that, every
`git push` to `main` redeploys automatically.

### Custom domain (tom.beer)

The domain is registered at Cloudflare, which also hosts its DNS:

| Type  | Name  | Content |
|-------|-------|---------|
| A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA  | `@`   | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `tom-beer.github.io` |
| TXT   | `_github-pages-challenge-tom-beer` | GitHub domain-verification code |

All records are **DNS only** (grey cloud) so GitHub can issue the HTTPS
certificate. The domain is set under the repo's **Settings → Pages → Custom
domain** with **Enforce HTTPS** on. No `CNAME` file is needed: Actions deploys
ignore it. tom-beer.github.io redirects to tom.beer.
