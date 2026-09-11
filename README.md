# 🌐 My Portfolio — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-success)](https://tranhohoangvu.github.io/my-portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-tranhohoangvu-181717?logo=github)](https://github.com/tranhohoangvu)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 🎓 Computer Science Graduate at Ton Duc Thang University (TDTU)  
> 💼 Personal portfolio showcasing backend architectures, machine learning pipelines, technical skills, verified certifications, and career CVs.

A modern, high-performance **static web application** crafted with **HTML5, Tailwind CSS (v4 CLI), and Vanilla JavaScript (ES6+)**, featuring seamless **Dark / Light dual themes** and **Bilingual (VI / EN)** localization.

- 🔗 **Live Production Site:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **Targeted Career CVs (PDF):**
  - `assets/cv/TranHoHoangVu_BE.pdf` — Fresher Backend Developer
  - `assets/cv/TranHoHoangVu_AI.pdf` — AI Engineer Intern

> 🇻🇳 Phiên bản Tiếng Việt: [`README_VI.md`](./README_VI.md)

---

## 📌 Table of Contents

- [✨ Core Highlights](#-core-highlights)
- [🧰 Tech Stack & Architecture](#-tech-stack--architecture)
- [📁 Project Structure](#-project-structure)
- [📄 Career CV Variants](#-career-cv-variants)
- [🚀 Local Development & Build Pipeline](#-local-development--build-pipeline)
- [⚙️ Configuration & Customization](#️-configuration--customization)
- [🤖 Automated Workflows & CI/CD](#-automated-workflows--cicd)
- [🌍 Deployment Guide](#-deployment-guide)
- [🧠 Performance & SEO Architecture](#-performance--seo-architecture)
- [📫 Contact & Socials](#-contact--socials)

---

## ✨ Core Highlights

### 1. Dual-Theme Design System (Deep Obsidian & Light Zebra)
- **Dark Mode (Deep Obsidian)**: Built upon an ultra-dark obsidian foundation (`#070b14` and `#0b101d`) layered with glassmorphic cards, crisp borders (`rgba(255,255,255,0.1)`), and ambient moving mesh aurora orbs (Neon Indigo `#6366f1`, Cyan `#06b6d4`, Emerald `#10b981`).
- **Light Mode (Zebra Striping & Cool Slate)**: Employs an alternating zebra band rhythm across sections (`bg-white` vs `bg-slate-100` / `#f1f5f9`), enriched with cool-slate card fills (`#f8fafc` / `#f1f5f9`), crisp slate borders (`#cbd5e1`), and multi-layer drop shadows to eliminate washed-out white-on-white fatigue and ensure high legibility.
- **Theme Persistence**: Theme state is saved in `localStorage.theme` and synchronizes with system preference (`prefers-color-scheme`).

### 2. Interactive Terminal CLI & REST API Console (`vu-cli v2.4`)
- **Unix-style CLI Terminal**:
  - Command auto-completion via <kbd>Tab</kbd> key.
  - Command history navigation via <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys.
  - Mobile-friendly 1-click quick command chips bar (`vu --bio`, `vu --skills`, `vu --fetch-projects`, `vu --contact`, `vu --cv`, `matrix`, `clear`).
  - Native window controls: Minimize, clear, fullscreen/maximize overlay, and complete terminal output copy.
- **REST API Explorer (Swagger / Postman Style)**:
  - Interactive endpoint tester supporting `GET /api/v1/profile`, `/skills`, `/projects`, `/health`, and `POST /contact`.
  - Visual response metrics: simulated HTTP `200 OK`, latency timer (ms), payload byte size, and syntax-highlighted JSON with 1-click clipboard copy.

### 3. Two-Way Interactive Skill ↔ Project Linking
- **Skill ➔ Project**: Clicking any badged skill in the Skills section smoothly scrolls up to the Projects section, activates the **Active Skill Filter Banner**, highlights matching projects with an electric pulse ring (`.is-skill-matched`), and slides the Carousel to that specific card.
- **Project ➔ Skill**: Clicking any interactive tech pill on project cards or inside the Project Details Modal jumps directly down to the Skills section with a focused pulsing highlight animation (`@keyframes skillPulseFocus`).

### 4. Advanced Projects Showcase
- **Category Filter Tabs**: 1-click filtering across `All`, `Full-Stack`, `Backend`, and `AI` with dynamic count badges.
- **Bounded Carousel Slider**: Touch-swipe enabled for mobile, keyboard accessible, with boundary controls (auto-disables arrows at ends) and pagination indicator dots.
- **Engineering Deep-Dive Modal**: Inspect full system architecture, database design, and key engineering challenges with their concrete solutions for 7 projects.

### 5. Technical Skills Categorized by 4 Pillars
- **Core Languages**: C, C#, Java, Python, JavaScript, PHP.
- **Backend Architecture & APIs**: Node.js, Express.js, Laravel, RESTful API, .NET, React.
- **Databases & Storage**: PostgreSQL, MySQL, MongoDB, SQL Server, Raw SQL Optimization.
- **AI, DevOps & Tools**: PyTorch, TensorFlow, Docker, Docker Compose, Nginx, Git, CI/CD.

### 6. Verified Certificates Showcase (8 Professional Credentials)
- **Responsive 3-Column Grid**: 3 cards per row on desktop/laptop, 2 on tablets, and 1 on mobile.
- **Dynamic Category Filter**: `All`, `AI & Deep Learning`, `Data Analytics`, `Software & Agile`, `Language`.
- **Smart Expand & Collapse ("Show More")**: Shows the top 3 newest certificates initially with a compact toggle button.
- **Authentic Brand Theme & Icons**: Issuer vector badges and hover glows for Microsoft, The Linux Foundation, Google, DeepLearning.AI, Google for Education, Techbase, and British Council.
- **Interactive Score Bar**: Aptis ESOL score progress bar (135/200, CEFR B1) animated via `IntersectionObserver`.
- **PII Privacy Protection**: Online preview redacts sensitive personal IDs, providing an AJAX modal form for verified scan requests.

### 7. About Me & Personal Brand
- **3 Key Pillars**: Education & Foundation (TDTU Computer Science), Hands-on Experience (Software Engineer Intern), Target Roles (Fresher Backend Developer & AI Engineer Intern).
- **4 Dynamic Counter Stats**: 7+ Projects, 16+ GitHub Repositories, 8 Verified Certificates, 100% Work Readiness.
- **3D Interactive Profile Flip**: Smooth 3D flip card revealing secondary portrait photo on hover / tap.
- **Integrated Action Dock**: Quick email copy badge with instant toast alert, CV jump, Contact jump, and verified social links.

### 8. GitHub Activity & Live Stats
- **Quick Stats Bar**: 16 repos, 22 stars, and top languages fetched from GitHub API.
- **Daily Automated Heatmap**: SVG heatmaps (Light & Dark) automatically generated and committed daily via GitHub Actions GraphQL workflow.
- **Dynamic Activity Graph**: Includes skeleton shimmer loading state and fade-in transitions.

### 9. Smart Contact Form & Availability Status
- **Availability Card**: Live pulsating status (`Available for Hire`), location (`HCMC, Vietnam UTC+7`), work mode (`On-site • Hybrid • Remote`), and 24h response time indicator.
- **1-Click Topic Chips**: Topic selector (`Backend Developer`, `AI Intern`, `Project Collaboration`, `Other`) pre-filling the Formspree subject.
- **Real-Time Validation**: 500-character counter, icon-adorned inputs, loading spinner, and success/error feedback.

---

## 🧰 Tech Stack & Architecture

| Layer | Technologies | Purpose |
|---|---|---|
| **Structure** | HTML5 (Semantic, SEO-ready) | Accessible landmark structure, Open Graph metadata, JSON-LD |
| **Styling** | Tailwind CSS v4 CLI, Vanilla CSS | Design tokens, glassmorphism, responsive grid, zebra striping |
| **Logic & State** | Vanilla JavaScript (ES6+) | 19 modular controllers, Carousel, Skill-linking, Terminal CLI, Modal |
| **Bundling** | Node.js Script + esbuild | Dependency concatenation and production JS minification (`bundle.min.js`) |
| **Typography & Icons**| Devicon, Heroicons, Google Fonts | Inter (UI) & JetBrains Mono (Terminal/Code), brand SVGs |
| **Automation & CI/CD**| GitHub Actions, Python GraphQL | Automated deployment to GitHub Pages, daily contribution SVG update |
| **Forms** | Formspree | Serverless contact form handling and certificate access requests |

---

## 📁 Project Structure

```txt
my-portfolio/
├─ index.html                     # Main single-page application entry point
├─ 404.html                       # Custom 404 error page
├─ site.webmanifest               # Progressive Web App (PWA) manifest
├─ sitemap.xml                    # Search Engine Sitemap
├─ robots.txt                     # Search engine crawler instructions
├─ sw.js                          # Service Worker for offline asset caching
├─ package.json                   # Project scripts and developer dependencies
├─ assets/
│  ├─ cv/                         # Career CVs (BE Developer & AI Intern PDFs)
│  ├─ certificates/               # Verified certificate PDFs
│  ├─ projects/                   # High-resolution screenshots for 7 showcase projects
│  ├─ profile/                    # Personal portraits (profile.jpg, profile2.jpg)
│  ├─ icons/                      # Favicon suite (SVG, PNG) and PWA app icons
│  ├─ github/                     # Automated contribution heatmaps (light/dark SVGs)
│  └─ og-image-v2.png             # Open Graph preview card for social sharing
├─ css/
│  ├─ tailwind-input.css          # Tailwind CSS v4 entry file with theme tokens
│  ├─ tailwind.css                # Compiled and minified Tailwind utilities
│  ├─ styles.css                  # Master CSS index importing modular styles
│  ├─ base/
│  │  ├─ tokens.css               # Design tokens, CSS variables, body, scrollbars
│  │  └─ animations.css           # Keyframe animations, aurora mesh, hover effects
│  ├─ layout/
│  │  ├─ navbar.css               # Navigation header, glassmorphism, mobile menu
│  │  └─ nav-rail.css             # Floating section navigation rail for desktop
│  ├─ sections/
│  │  ├─ hero.css                 # Hero typography, aurora orbs, CV dropdown
│  │  ├─ about.css                # 3 Key pillars, 4 counter stats, 3D profile flip
│  │  ├─ cv.css                   # CV showcase cards, badges, and action buttons
│  │  ├─ projects.css             # Filter tabs, carousel, project cards, details modal
│  │  ├─ skills.css               # 4 Pillar technical skills cards, skill icon tiles
│  │  ├─ certs.css                # Certificate cards v2, score progress bar, filter tabs
│  │  ├─ github.css               # GitHub stats bar, panels, activity graphs
│  │  ├─ terminal.css             # Terminal CLI window and REST API explorer widget
│  │  └─ contact.css              # Availability card, contact cards, and topic form
│  └─ components/
│     ├─ shared-cards.css         # Unified card hover and lighting effects
│     ├─ toast.css                # Glassmorphic toast alert system
│     └─ fab.css                  # Floating Action Bar (FAB) & speed dial
├─ js/
│  ├─ bundle.min.js               # Production bundled and minified script (175 KB)
│  ├─ scripts.js                  # Master application orchestrator
│  ├─ data/                       # Structured single source of truth datasets
│  │  ├─ i18n.data.js             # Bilingual dictionary (VI / EN)
│  │  ├─ projects.data.js         # Complete dataset for 7 showcase projects
│  │  ├─ skills.data.js           # Skills catalog & bidirectional project mappings
│  │  └─ certs.data.js            # 8 Verified certificate definitions and credentials
│  └─ modules/                    # Feature controllers
│     ├─ i18n.js                  # Internationalization engine
│     ├─ theme.js                 # Dark / Light theme switcher
│     ├─ carousel.js              # Projects carousel slider & swipe mechanics
│     ├─ modal.js                 # Project deep-dive details modal
│     ├─ skill-linking.js         # Interactive 2-way skill ↔ project linker
│     ├─ terminal.js              # vu-cli shell & REST API console emulator
│     ├─ fab.js                   # Floating Action Bar controller
│     ├─ section-nav.js           # Desktop floating rail active spy
│     ├─ cert-modal.js            # Certificate request modal & score animation
│     ├─ cert-filter.js           # Certificates filter tabs & show more toggle
│     ├─ email-copy.js            # 1-click email copy with toast alert
│     ├─ contact-form.js          # Topic chips, character counter & AJAX submission
│     ├─ github-stats.js          # Dynamic GitHub stats fetching & SVG theming
│     └─ ui-interactions.js       # Number counters, 3D profile flip, typewriter
├─ scripts/
│  ├─ build-js.js                 # Concatenates 19 modules and minifies with esbuild
│  └─ build_github_contrib_svgs.py# Python GraphQL script for GitHub contribution SVG
├─ projects-docs/                 # Comprehensive engineering docs for all 7 projects
└─ .github/workflows/
   ├─ static.yml                  # GitHub Pages automated build & deploy pipeline
   └─ update-github-contrib.yml   # Scheduled cron workflow for daily GitHub SVGs
```

---

## 📄 Career CV Variants

The repository maintains two targeted PDF resumes in `assets/cv/`:

1. **Fresher Backend Developer** (`assets/cv/TranHoHoangVu_BE.pdf`)
   - **Focus**: Node.js, Express.js, Laravel, RESTful API architecture, PostgreSQL (Raw SQL & Query Optimization), NoSQL MongoDB, Redis caching, JWT RBAC, Docker, and CI/CD pipelines.
2. **AI Engineer Intern** (`assets/cv/TranHoHoangVu_AI.pdf`)
   - **Focus**: PyTorch, Deep Learning, Transformer architectures, OCR pipelines (ResNet + Spatial Attention), Vietnamese NLP translation, and ML stock forecasting.

---

## 🚀 Local Development & Build Pipeline

### Prerequisites
- Node.js (v18 or higher recommended)
- Python 3 (optional, for local HTTP server)

### 1. Clone Repository
```bash
git clone https://github.com/tranhohoangvu/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build Production Assets
To compile both Tailwind CSS and the bundled JavaScript:
```bash
npm run build
```

Individual sub-tasks:
- **Build CSS**: `npm run build:css` (compiles `css/tailwind-input.css` to `css/tailwind.css`)
- **Watch CSS**: `npm run watch:css` (rebuilds Tailwind utilities on file save)
- **Build JS**: `npm run build:js` (concatenates 19 JS modules and minifies with esbuild to `js/bundle.min.js`)

### 4. Run Locally
```bash
# Using Python
python -m http.server 5500

# Or using Node.js npx serve
npx serve . -l 5500
```
Open your browser at: `http://localhost:5500`

---

## ⚙️ Configuration & Customization

1. **Personal Info & Bio**: Update text content in `index.html` and matching translation keys in `js/data/i18n.data.js`.
2. **Projects Data**: Modify or append project definitions in `js/data/projects.data.js`.
3. **Skills Catalog**: Update skill items and project relations in `js/data/skills.data.js`.
4. **Certificates**: Configure credentials, preview PDFs, and verify URLs in `js/data/certs.data.js`.
5. **Contact Form Target**: Replace the Formspree endpoint in `index.html`:
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```
6. **GitHub Username**: Update the constant in `js/modules/github-stats.js`:
   ```javascript
   const GITHUB_USERNAME = "tranhohoangvu";
   ```

---

## 🤖 Automated Workflows & CI/CD

- **GitHub Pages Deployment (`.github/workflows/static.yml`)**:
  - Automatically triggers on every push to the `main` branch.
  - Deploys static assets directly to GitHub Pages.
- **Daily Contribution SVG Sync (`.github/workflows/update-github-contrib.yml`)**:
  - Runs daily via cron schedule (`00:00 UTC`).
  - Executes `scripts/build_github_contrib_svgs.py` using GitHub GraphQL API.
  - Commits updated light and dark contribution graphs directly into `assets/github/`.

---

## 🌍 Deployment Guide

The portfolio is hosted on **GitHub Pages**:

1. Push all changes to branch `main`.
2. In your repository, navigate to **Settings ➔ Pages**.
3. Under **Build and deployment ➔ Source**, select **GitHub Actions**.
4. The deployment pipeline will trigger and deploy the live site to:
   `https://<username>.github.io/<repo>/`

---

## 🧠 Performance & SEO Architecture

- **Rendering Performance**:
  - Scroll listeners are throttled using `requestAnimationFrame` to avoid layout thrashing.
  - Layout metrics are cached and only recalculated on viewport `resize`.
  - Ambient aurora mesh orbs utilize `contain: layout style paint` and `transform: translateZ(0)` for hardware GPU promotion.
  - Heavy animations automatically respect `prefers-reduced-motion: reduce`.
- **Bundle Optimization**:
  - All 19 JS modules are concatenated in dependency order and minified into a single non-blocking bundle (`js/bundle.min.js`, ~175 KB).
  - External non-critical scripts (e.g. `particles.js`) are deferred until browser idle.
- **Search Engine Optimization (SEO)**:
  - Canonical URL tags, descriptive meta descriptions, and rich Open Graph (`og:*`) / Twitter card tags.
  - Structured XML sitemap (`sitemap.xml`) and crawler configuration (`robots.txt`).
  - Custom branded `404.html` maintaining full navbar, theme, and return links.

---

## 📫 Contact & Socials

- **Full Name**: Trần Hồ Hoàng Vũ
- **Email**: [hoangvu2k4cmg@gmail.com](mailto:hoangvu2k4cmg@gmail.com)
- **LinkedIn**: [linkedin.com/in/tranhohoangvu](https://linkedin.com/in/tranhohoangvu/)
- **GitHub**: [github.com/tranhohoangvu](https://github.com/tranhohoangvu)
- **Portfolio**: [tranhohoangvu.github.io/my-portfolio](https://tranhohoangvu.github.io/my-portfolio/)

---

<p align="center">
  <b>Designed & Developed with Passion by Trần Hồ Hoàng Vũ © 2026</b>
</p>
