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

## Deploy

Pushes to `master` are built and published to GitHub Pages via
`.github/workflows/deploy.yml`. Enable Pages → Source: "GitHub Actions" in the
repo settings.
