# 🌐 My Portfolio — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-success)](https://tranhohoangvu.github.io/my-portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-tranhohoangvu-181717?logo=github)](https://github.com/tranhohoangvu)

> 🎓 Final-year Computer Science student at Ton Duc Thang University (TDTU)  
> 💼 Personal portfolio showcasing projects, skills, certificates, GitHub activity — and CVs.

A **static** portfolio website built with **HTML + Tailwind CSS + Vanilla JS**, featuring **Dark/Light mode** and **VI/EN** language toggle.

- 🔗 **Live site:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **CVs (PDF) in repo:** `assets/cv/`
  - `assets/cv/TranHoHoangVu_BE.pdf` — Fresher Backend Developer
  - `assets/cv/TranHoHoangVu_AI.pdf` — AI Engineer Intern

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
- **CV section with 2 targeted PDF versions + "View / Download" buttons**:
  - *Fresher Backend Developer* (`assets/cv/TranHoHoangVu_BE.pdf`)
  - *AI Engineer Intern* (`assets/cv/TranHoHoangVu_AI.pdf`)
- **Hero "Download CV" dropdown** to pick the CV version directly.
- **Certificates Section**:
  - Gradient headline + kicker badge + subtitle header.
  - Issuer icon bubbles (Techbase Agile • British Council • Google).
  - Aptis ESOL **score progress bar** (135/200, animated on scroll via IntersectionObserver) • Overall CEFR level: B1.
  - **Privacy protection**: online preview has sensitive PII (National ID, QR) redacted, with an interactive **Formspree Modal Request** for recruiters to request the original verified scan.
  - Techbase Agile certificate available via direct high-res PDF preview.
  - **Google Data Analytics Professional Certificate** (Google • Coursera) with dual actions: direct PDF preview + live credential verification.
  - Balanced, sleek action buttons with micro-interaction hover feedback.
- **GitHub Activity Section** (redesigned):
  - Quick Stats Bar: **16 repos · 22 stars** · Top languages (Python, TypeScript, JavaScript, Java) — fetched from GitHub API.
  - Auto-generated contributions heatmap SVG (Light/Dark) committed daily via GitHub Actions.
  - Dynamic Activity Graph with **skeleton shimmer** loading state & fade-in on load.
  - Dark-mode GitHub CTA pill button with Octocat icon.
- **Contact Section** (redesigned):
  - Kicker badge + multi-gradient headline + bilingual subtitle.
  - **Availability & Work Info Card**: live pulsing status (`Available for Hire`), location (`HCMC, Vietnam UTC+7`), work mode (`On-site • Hybrid • Remote`), and 24h response time indicator.
  - **Connect Cards**: "Fastest / Preferred" badge on Email & LinkedIn + hover slide-arrow micro-interaction.
  - **Smart Contact Form**: 1-click Quick Topic Chips (Backend, AI Intern, Project, Other) mapping to Formspree subject, icon-adorned input fields, real-time message character counter (500 max), and send button with animated paper plane and loading spinner.
- **Scroll Performance Optimized**:
  - All scroll listeners throttled via `requestAnimationFrame`.
  - Layout metrics cached on `resize` to prevent forced reflow on scroll.
  - CSS `contain: layout style paint` + `transform: translateZ(0)` on aurora orbs for GPU compositing.
  - `prefers-reduced-motion` support for all heavy animations.
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
   - File: `assets/cv/TranHoHoangVu_BE.pdf`  
   - Targeted for Backend Developer / Software Engineer roles (Node.js, Express, Laravel, PostgreSQL raw SQL, RESTful APIs, JWT RBAC).

2) **AI Engineer Intern (PDF)**  
   - File: `assets/cv/TranHoHoangVu_AI.pdf`  
   - Targeted for AI / Data / Machine Learning roles (PyTorch, Deep Learning OCR, Transformers, NLP translation, time-series forecasting).

### i18n keys used (JS)

The CV section + dropdown text is controlled by `data-i18n` keys in `js/data/i18n.data.js`:

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
├─ data/                          # Machine-readable JSON data stores
│  ├─ projects.json               # Projects dataset (bilingual VI/EN, architecture, challenges)
│  └─ skills.json                 # Technical skills & project mapping dataset
├─ assets/
│  ├─ projects/                   # Screenshots for 7 portfolio projects
│  ├─ cv/                         # Career CVs (Backend Developer & AI Engineer PDFs)
│  ├─ certificates/               # Verified certificates (Aptis PDF, Techbase Agile PDF & Google Data Analytics PDF)
│  ├─ profile/                    # Personal avatar & profile photos
│  ├─ icons/                      # Favicons (SVG, PNG) & PWA app icons
│  ├─ github/                     # Auto-generated daily contribution & activity graph SVGs
│  └─ og-image-v2.png             # Open Graph social preview banner
├─ css/
│  ├─ tailwind-input.css          # Tailwind CLI input config
│  ├─ tailwind.css                # Compiled Tailwind CSS
│  ├─ styles.css                  # Entry point — @import only (no styles here)
│  ├─ base/
│  │  ├─ tokens.css               # Design tokens, CSS variables, body, back-to-top
│  │  └─ animations.css           # Global animation classes, keyframes & aurora orbs
│  ├─ layout/
│  │  ├─ navbar.css               # Navbar, mobile menu, responsive breakpoints
│  │  └─ nav-rail.css             # Floating section navigation rail (desktop)
│  ├─ sections/
│  │  ├─ hero.css                 # Hero section, aurora orbs, buttons, CV dropdown
│  │  ├─ projects.css             # Filter tabs, carousel, cards, modal, skill linking
│  │  ├─ skills.css               # Skills cards, dark mode, lang toggle
│  │  ├─ contact.css              # Contact cards, email copy badge, footer
│  │  ├─ cv.css                   # CV section cards & actions
│  │  ├─ about.css                # Avatar aura, about content, social buttons
│  │  ├─ certs.css                # Certificates section: cards v2, score bar, issuer icons
│  │  ├─ github.css               # GitHub section: stats bar, panels, skeleton, CTA button
│  │  └─ terminal.css             # Interactive terminal & REST API console widget
│  └─ components/
│     ├─ shared-cards.css         # Unified hover effect (projects, skills, github cards)
│     ├─ toast.css                # Glassmorphic toast notification system
│     └─ fab.css                  # Floating Action Bar & quick contact cluster
├─ scripts/                       # Automation & build scripts
│  └─ build_github_contrib_svgs.py # Python script for GitHub GraphQL contribution SVG
├─ js/
│  ├─ data/                       # Independent client data modules (Single Source of Truth)
│  │  ├─ i18n.data.js             # Bilingual VI/EN dictionary dataset
│  │  ├─ projects.data.js         # Window.PROJECTS_DATA store & filter helpers
│  │  └─ skills.data.js           # Window.SKILLS_DATA store & 2-way linking helpers
│  ├─ modules/                    # Modular feature controllers
│  │  ├─ i18n.js                  # Language switching & DOM translation logic
│  │  ├─ theme.js                 # Dark/Light mode & navbar scroll background
│  │  ├─ carousel.js              # Projects carousel slider & category filter
│  │  ├─ modal.js                 # Project deep-dive details modal & architecture tabs
│  │  ├─ skill-linking.js         # 2-way interactive Skill ↔ Project linking
│  │  ├─ terminal.js              # Interactive Terminal CLI & REST API Console
│  │  ├─ fab.js                   # Floating Action Bar (FAB) & Toast notifications
│  │  ├─ section-nav.js           # Desktop floating section navigation rail
│  │  ├─ cert-modal.js            # Aptis score animation & Formspree cert request modal
│  │  ├─ email-copy.js            # 1-Click email clipboard copy with toast feedback
│  │  ├─ contact-form.js          # Topic chips, character counter & Formspree AJAX
│  │  ├─ github-stats.js          # GitHub activity graph SVGs & dynamic theming
│  │  └─ ui-interactions.js       # Stats counter ticker, 3D profile flip, CV counter, typewriter
│  └─ scripts.js                  # Master Application Orchestrator & core coordinator
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
├─ README.md                      # English documentation (this file)
├─ README_VI.md                   # Vietnamese documentation
├─ site.webmanifest               # PWA configuration
├─ sitemap.xml                    # SEO sitemap
├─ sw.js                          # Offline Service Worker cache controller
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
Edit in `js/modules/github-stats.js`:
```js
const GITHUB_USERNAME = "tranhohoangvu";
```

### 2) Translations / i18n
Edit the language dictionary in `js/data/i18n.data.js` (`window.I18N_DATA`).

### 2) GitHub Stats chips
The stats bar values (repos, stars) in the GitHub section are set directly in `index.html`.
Update them manually or automate via GitHub Actions reading from the API.

### 3) Contact form (Formspree)
Edit in `index.html`:
```html
<form action="https://formspree.io/f/xxxxxxx" method="POST">
```

### 4) CV / displayed labels
- Replace PDFs under `assets/cv/`
- Update dropdown links in `index.html` (CV menu)
- Update i18n in `js/scripts.js` (I18N object)

### 5) Social links / other content
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
- Uses GitHub GraphQL API in `scripts/build_github_contrib_svgs.py`
- Updates:
  - `assets/github/github-contrib-light.svg`
  - `assets/github/github-contrib-dark.svg`
  - `assets/github/github-activity-light.svg`
  - `assets/github/github-activity-dark.svg`
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

- All scroll listeners are throttled via `requestAnimationFrame` — no layout thrashing.
- Layout metrics (scroll height, offsets) are cached and only re-read on `resize`.
- Aurora orbs use CSS `contain: layout style paint` + `transform: translateZ(0)` for GPU promotion.
- `prefers-reduced-motion` disables heavy animations on low-end devices.
- Compress images (Squoosh/TinyPNG) and prefer modern formats.
- Keep hero images under ~300–500KB.
- Verify `og-image-v2.png` and meta tag links.
- Run Lighthouse to audit performance, SEO, accessibility.
- (Optional) Add analytics for traffic tracking.

---

## 🛠️ Updating Content

1. Edit `index.html` (text/sections/projects)
2. Update translations in `js/scripts.js` (I18N + `data-i18n`)
3. Update assets/CVs in `assets/`
4. (Optional) Rebuild Tailwind
5. Commit & push:
```bash
git add .
git commit -m "feat: describe your change"
git push origin main
```

---

## 📫 Contact

- 🐙 GitHub: https://github.com/tranhohoangvu
- 🌐 Website: https://tranhohoangvu.github.io/my-portfolio/

---

> Updated: September 2026
