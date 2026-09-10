# 🌐 My Portfolio — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-success)](https://tranhohoangvu.github.io/my-portfolio/)

> 🎓 Final-year Computer Science student at Ton Duc Thang University (TDTU)  
> 💼 Personal portfolio showcasing projects, skills, certificates, GitHub activity — and CVs.

A **static** portfolio website built with **HTML + Tailwind CSS + Vanilla JS**, featuring **Dark/Light mode** and **VI/EN** language toggle.

- 🔗 **Live site:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **CVs (PDF) in repo:** `assets/`
  - `assets/TranHoHoangVu_BE.pdf`
  - `assets/TranHoHoangVu_AI.pdf`
- 📄 **CVs (direct links):**
  - `.../assets/TranHoHoangVu_BE.pdf`
  - `.../assets/TranHoHoangVu_AI.pdf`

> Vietnamese version: `README_VI.md`

---

## 📌 Table of Contents

- [✨ Highlights](#-highlights)
- [🧰 Tech Stack](#-tech-stack)
- [📄 CV Versions](#-cv-versions)
- [📁 Project Structure](#-project-structure)
- [🚀 Run Locally](#-run-locally)
- [⚙️ Quick Customize](#️-quick-customize)
- [🎨 Tailwind Build](#-tailwind-build-optional)
- [🤖 GitHub Contributions SVG](#-github-contributions-svg-auto-update)
- [🌍 Deploy to GitHub Pages](#-deploy-to-github-pages)
- [🧠 Performance & SEO Tips](#-performance--seo-tips)
- [🛠️ Updating Content](#️-updating-content)
- [📫 Contact](#-contact)

---

## ✨ Highlights

- **Modern Software Engineer Aesthetic**: Deep Obsidian dark theme (`#070b14`), glassmorphism with subtle borders, and ambient moving aurora mesh.
- **Interactive Terminal & REST API Console Widget (Signature Feature)**:
  - **CLI Terminal (`vu-cli v2.4`)**: Linux/macOS shell supporting <kbd>Tab</kbd> auto-completion, command history (<kbd>↑</kbd>/<kbd>↓</kbd>), and 1-click quick command chips for mobile users. Full command set: `vu --help`, `vu --bio`, `vu --skills [--json]`, `vu --fetch-projects [--cat=X] [--id=Y]`, `vu --contact`, `vu --cv`, `curl <endpoint>`, `theme`, `lang`, `clear`, `history`, `date`, `matrix`, `sudo`.
  - **REST API Explorer**: Visual Swagger/Postman-style endpoint tester (`GET /api/v1/profile`, `/skills`, `/projects`, `/health`, `POST /contact`) displaying simulated `200 OK` status, latency timer, payload byte size, and syntax-highlighted JSON with 1-click copy.
  - **macOS Window Controls**: Minimize, clear, fullscreen/maximize overlay, and complete output copy.
- **Interactive Skill ↔ Project Linking (2-Way)**:
  - **Skill ➔ Project**: Click any badged skill in the Skills section to smoothly scroll up, display the **Active Skill Filter Banner**, highlight applied projects with an electric glow ring, and automatically slide the Carousel to the matching project.
  - **Project ➔ Skill**: Click any interactive tech tag on project cards or within the details modal to jump directly down to the Skills section with a focused pulsing highlight animation.
- **Advanced Projects Showcase**:
  - **Category Filter Tabs**: Filter across `All`, `Full-Stack`, `Backend`, and `AI`.
  - **Bounded Carousel Slider**: Touch-swipe enabled with pagination indicators and boundary control.
  - **Engineering Deep-Dive Modal**: Click any project to inspect system architecture, database design, and key engineering challenges & solutions.
- **4 Technical Skill Pillars**: Categorized into *Core Languages*, *Backend Architecture & APIs*, *Databases & Optimization*, and *AI, DevOps & Tools*.
- **Floating Action Bar (FAB) & Toast Notifications**: Quick 1-click email copy with instant toast alert, social links, and CV download.
- Responsive UI (mobile-first) with smooth reveal animations.
- Dark / Light mode (persisted in `localStorage`, falls back to OS preference).
- VI / EN i18n via `data-i18n` (saved in `localStorage.lang`, includes page metadata).
- **CV section with 2 targeted PDF versions + “View / Download” buttons**:
  - *Fresher Backend Developer* (`assets/TranHoHoangVu_BE.pdf`)
  - *AI Engineer Intern* (`assets/TranHoHoangVu_AI.pdf`)
- **Hero “Download CV” dropdown** to pick the CV version directly.
- **GitHub Activity Section**:
  - Auto-generated contributions heatmap SVG (Light/Dark) committed daily via GitHub Actions.
  - Dynamic Activity Graph rendered via `github-readme-activity-graph`.
- Contact form via Formspree (no backend server needed).
- SEO essentials: meta tags, OG image, `robots.txt`, `sitemap.xml`, and custom `404.html`.

---

## 🧰 Tech Stack

| Category | Technologies / Tools | Usage |
|---|---|---|
| **Structure & Logic** | HTML5, Vanilla JavaScript (ES6+) | Core architecture, 2-way skill linking, carousel, modal, i18n |
| **Styling & Theme** | Tailwind CSS (v4 CLI), Vanilla CSS | Deep Obsidian theme, glassmorphism, responsive grid |
| **Icons & Typography** | Devicon, Heroicons SVG, Google Fonts | Tech icons, interface icons, Poppins & Inter typography |
| **Automation & CI/CD** | GitHub Actions, Python (GraphQL script) | GitHub Pages deploy, daily contributions SVG auto-commits |
| **Integrations** | Formspree | Contact form handling |

---

## 📄 CV Versions

This portfolio includes **two PDF CV variants** (both in the CV section and the dropdown):

1) **Fresher Backend Developer (PDF)**  
   - File: `assets/TranHoHoangVu_BE.pdf`  
   - Targeted for Backend Developer / Software Engineer roles (Node.js, Express, Laravel, PostgreSQL raw SQL, RESTful APIs, JWT RBAC).

2) **AI Engineer Intern (PDF)**  
   - File: `assets/TranHoHoangVu_AI.pdf`  
   - Targeted for AI / Data / Machine Learning roles (PyTorch, Deep Learning OCR, Transformers, NLP translation, time-series forecasting).

### i18n keys used (JS)

The CV section + dropdown text is controlled by `data-i18n` keys in `js/scripts.js`:

- Card titles/descriptions:  
  `cv_be_title`, `cv_be_desc`  
  `cv_ai_title`, `cv_ai_desc`  
- Dropdown labels:  
  `cv_menu_be_title`, `cv_menu_be_meta`  
  `cv_menu_ai_title`, `cv_menu_ai_meta`  

---

## 📁 Project Structure

```txt
my-portfolio/
├─ index.html                     # Main single-page application entry
├─ assets/
│  ├─ projects/                   # Screenshots for 7 portfolio projects
│  ├─ github-contrib-light.svg    # Auto-generated daily contribution map (light)
│  ├─ github-contrib-dark.svg     # Auto-generated daily contribution map (dark)
│  ├─ TranHoHoangVu_BE.pdf        # Backend Developer CV
│  ├─ TranHoHoangVu_AI.pdf        # AI Engineer CV
│  ├─ og-image-v2.png             # Open Graph preview image
│  └─ favicon.*
├─ css/
│  ├─ tailwind-input.css          # Tailwind CLI input config
│  ├─ tailwind.css                # Compiled Tailwind CSS
│  └─ styles.css                  # Custom theme, animations, carousel, modal, skills
├─ js/
│  ├─ scripts.js                  # App controller, i18n, carousel, modal, 2-way skill linking
│  └─ build_github_contrib_svgs.py # Python script for GitHub GraphQL contribution SVG
├─ projects-docs/                 # Comprehensive documentation for 7 projects
│  ├─ 01-coursehub-lms.md
│  ├─ 02-ecommerce-platform.md
│  ├─ 03-vietnamese-ocr.md
│  ├─ 04-nlp-translation.md
│  ├─ 05-stock-forecasting-ml.md
│  ├─ 06-warehouse-ma.md
│  └─ 07-pos-system.md
├─ .github/workflows/
│  ├─ static.yml                  # GitHub Pages automated deployment
│  └─ update-github-contrib.yml   # Daily cron job for contribution SVG
├─ UI_UX_ANALYSIS.md              # UI/UX improvement report and feature roadmap
├─ README.md                      # English documentation
├─ README_VI.md                   # Vietnamese documentation
├─ package.json
└─ package-lock.json
```

---

## 🚀 Run Locally

### Option 1: Open directly
Open `index.html` in your browser.

### Option 2: Local server (recommended)
```bash
python -m http.server 5500
```
Visit: `http://localhost:5500`

> Tip: VS Code **Live Server** extension works great too.

---

## ⚙️ Quick Customize

### 1) GitHub username
Edit in `js/scripts.js`:
```js
const GITHUB_USERNAME = "tranhohoangvu";
```

### 2) Contact form (Formspree)
Edit in `index.html`:
```html
<form action="https://formspree.io/f/xxxxxxx" method="POST">
```

### 3) CV / displayed labels
- Replace PDFs under `assets/`
- Update dropdown links in `index.html` (CV menu)
- Update i18n in `js/scripts.js` (I18N object)

### 4) Social links / other content
Edit directly in `index.html` and translations in `js/scripts.js`.

---

## 🎨 Tailwind Build (Optional)

CSS is pre-built at `css/tailwind.css`.

To rebuild:
```bash
npm install
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
```

Watch mode:
```bash
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --watch
```

---

## 🤖 GitHub Contributions SVG (Auto-update)

Workflow: `.github/workflows/update-github-contrib.yml`

- Runs daily (00:00 UTC)
- Uses GitHub GraphQL API in `js/build_github_contrib_svgs.py`
- Updates:
  - `assets/github-contrib-light.svg`
  - `assets/github-contrib-dark.svg`
- Automatically commits back to repository

If you fork/clone, enable Actions and grant workflow write permissions.

---

## 🌍 Deploy to GitHub Pages

Deploy via `.github/workflows/static.yml` (official GitHub Pages workflow).

1. Push to `main` branch
2. Go to **Settings → Pages**
3. Select build and deployment source: **GitHub Actions**
4. Once workflow completes, site is live at:
   - `https://<username>.github.io/<repo>/`

✅ Live: https://tranhohoangvu.github.io/my-portfolio/

---

## 🧠 Performance & SEO Tips

- Compress images (Squoosh/TinyPNG) and prefer modern formats
- Keep hero images under ~300–500KB
- Verify `og-image-v2.png` and meta tag links
- Run Lighthouse to audit performance, SEO, accessibility
- (Optional) Add analytics for traffic tracking

---

## 🛠️ Updating Content

1. Edit `index.html` (text/sections/projects)
2. Update translations in `js/scripts.js` (I18N + `data-i18n`)
3. Update assets/CVs in `assets/`
4. (Optional) Rebuild Tailwind
5. Commit & push:
```bash
git add .
git commit -m "feat(cv): update to 2 CVs (Backend and AI)"
git push origin main
```

---

## 📫 Contact

- 🐙 GitHub: https://github.com/tranhohoangvu
- 🌐 Website: https://tranhohoangvu.github.io/my-portfolio/

---

> Updated: 2026
