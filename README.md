# Mohanad Harbi — Portfolio

Personal site for **Mohanad Abdulsattar Harbi**: IT manager, network specialist, and hospitality IT work in Erbil, with projects, photos, skills, and CV.

Live after GitHub Pages is on: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

## Run locally

```bash
cd website
npm install
npm run dev
```

## Publish on GitHub Pages

1. Create a GitHub repository (for a clean profile URL, name it `YOUR-USERNAME.github.io`).
2. Upload **this `website` folder as the repo root** (the folder that contains `package.json`).
3. In the repo: **Settings → Pages → Source: GitHub Actions**.
4. Push to `main`. The workflow builds the site and publishes `dist/`.

If the site is a project page (`username.github.io/repo-name/`) and images 404, set `base` in `vite.config.ts` to `'/repo-name/'`.

## What’s inside

- Home, About, Experience, Skills, Projects (with photo galleries), Contact
- Your CV PDF and photos
- Dark **Portfolio Pro** tokens from 21st.dev
- Magic UI (particles, marquee, blur fade, shine border, number ticker, border beam)
- Eldora UI (live button, blur-in text, browser frame)
- Originkit spotlight text on the name
- shadcn-style buttons and layout
