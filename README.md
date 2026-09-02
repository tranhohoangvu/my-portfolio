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

- Responsive UI (mobile-first)
- Dark / Light mode (persisted in `localStorage`, falls back to OS preference)
- VI / EN i18n via `data-i18n` (saved in `localStorage.lang`, includes page metadata)
- Projects showcase with images and quick links
- Skills & Certificates sections
- **CV section with 2 PDF versions + “View / Download” buttons**
- **Hero “Download CV” dropdown** to pick the CV version
- GitHub section
  - Contributions heatmap SVG auto-generated (Light/Dark) and auto-committed by GitHub Actions
  - Activity Graph rendered via `github-readme-activity-graph`
- Contact form via Formspree (no backend required)
- Smooth scroll + section reveal animations + back-to-top button
- SEO essentials: meta tags + OG image, plus `robots.txt`, `sitemap.xml`, and a custom `404.html`

---

## 🧰 Tech Stack

| Tech | Usage |
|---|---|
| HTML5 | Page structure |
| Tailwind CSS (CLI) & Vanilla CSS | Styling + responsive layout |
| Vanilla JavaScript | Interactions, theme toggle, i18n |
| GitHub Actions | GitHub Pages deploy + daily SVG updates |
| Formspree | Contact form handling |

---

## 📄 CV Versions

This portfolio includes **two PDF CV variants** (both in the CV section and the dropdown):

1) **Backend Developer Intern (PDF)**  
   - File: `assets/TranHoHoangVu_BE.pdf`  
   - Targeted for Backend Developer / Software Engineer Intern roles (REST APIs, databases, architecture)

2) **AI Engineer Intern (PDF)**  
   - File: `assets/TranHoHoangVu_AI.pdf`  
   - Targeted for AI Engineer Intern roles (ML/DL, NLP/CV, AI pipelines)

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
├─ index.html
├─ assets/
│  ├─ projects/
│  ├─ github-contrib-light.svg
│  ├─ github-contrib-dark.svg
│  ├─ profile1.jpg
│  ├─ profile2.png
│  ├─ TranHoHoangVu_BE.pdf
│  ├─ TranHoHoangVu_AI.pdf
│  ├─ og-image-v2.png
│  └─ favicon.*
├─ css/
│  ├─ tailwind-input.css
│  ├─ tailwind.css
│  └─ styles.css
├─ js/
│  ├─ scripts.js
│  └─ build_github_contrib_svgs.py
├─ .github/workflows/
│  ├─ static.yml
│  └─ update-github-contrib.yml
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
