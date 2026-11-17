# Portfolio Web — Keisya Rizkyka

Personal portfolio website built with Vite + Tailwind CSS v4 + Vanilla JS + GSAP.

## Tech Stack

- **Build tool**: Vite 8
- **CSS**: Tailwind CSS v4 (`@tailwindcss/vite` plugin, `@theme` tokens in CSS)
- **JS**: Vanilla ES Modules
- **Animation**: GSAP (ScrollTrigger, Draggable)
- **Deployment**: Vercel (static)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the dev server at `http://localhost:5173`.

### Build

```bash
npm run build
```

Output is placed in `/dist`.

### Preview build locally

```bash
npm run preview
```

## Deploy to Vercel

1. Push your repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite. Confirm:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

## Project Structure

```
├── index.html
├── vite.config.js
├── public/
│   └── assets/          # Static images, icons
└── src/
    ├── main.js           # Entry point; GSAP registration; nav logic
    ├── styles/
    │   └── main.css      # Tailwind import, @theme tokens, base + utilities
    ├── data/
    │   └── content.js    # All portfolio content (placeholder data)
    └── js/
        ├── hero.js       # Hero section module (Phase 2+)
        ├── marquee.js    # Top-strip marquee module (Phase 2+)
        └── folders.js    # Project folder UI module (Phase 2+)
```
