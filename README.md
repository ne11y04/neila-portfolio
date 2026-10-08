# Neila — portfolio

Personal portfolio built with React and Vite.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Editing content

Everything shown on the page lives in `src/data.js`:

- `links` — GitHub, LinkedIn and email (used everywhere on the page)
- `fields` — the eight cards around the N in the hero
- `facts`, `skillGroups`, `projects`, `certs` — the About, Skills, Projects and Certifications sections

Project thumbnails are drawn in `src/Thumbs.jsx`. Styles and colour tokens are at the top of `src/index.css`.
