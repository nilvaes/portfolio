# Ömer Savas — Portfolio

Personal portfolio site showcasing projects, experience, and contact info. Built with React, TypeScript, and Tailwind CSS, deployed to GitHub Pages.

**Live site:** [portfolio.savasbuilds.com](https://portfolio.savasbuilds.com/)

## Features

- Bilingual UI (DE / EN)
- Animated hero with morphing text and light rays
- About section with tech stack and interactive cards
- Timeline / journey section
- Projects with hover previews
- Contact form (EmailJS)

## Tech stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Motion (animations)
- EmailJS (contact form)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to GitHub Pages (`gh-pages-2` branch) |

## Deploy

The site is served at [portfolio.savasbuilds.com](https://portfolio.savasbuilds.com/) via GitHub Pages (`gh-pages-2` branch) and Cloudflare DNS.

Deploy with:

```bash
npm run deploy
```

`public/CNAME` is copied into the build so each deploy keeps the custom domain.

## Project structure

```
src/
  sections/     # Page sections (Hero, About, Projects, etc.)
  components/   # Reusable UI components
  i18n.tsx      # Translations (DE / EN)
  constants/    # Timeline / experience data
public/assets/  # Images, logos, project screenshots
```
