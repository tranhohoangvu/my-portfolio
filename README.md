# 🌐 My Portfolio — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-success)](https://tranhohoangvu.github.io/my-portfolio/)

> 🎓 Final-year Computer Science student at Ton Duc Thang University (TDTU)  
> 💼 Personal portfolio showcasing projects, skills, certificates, GitHub activity — and multiple CV versions.

A **static** portfolio website built with **HTML + Tailwind CSS + Vanilla JS**, featuring **Dark/Light mode** and **VI/EN** language toggle.

- 🔗 **Live site:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **CVs (PDF) in repo:** `assets/`
  - `assets/TranHoHoangVu_AI.pdf`
  - `assets/TranHoHoangVu_SE.pdf`
  - `assets/TranHoHoangVu_General.pdf`
- 📄 **CVs (direct links):**
  - `.../assets/TranHoHoangVu_AI.pdf`
  - `.../assets/TranHoHoangVu_SE.pdf`
  - `.../assets/TranHoHoangVu_General.pdf`

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
- **CV section with 3 PDF versions + “View / Download” buttons**
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
| Tailwind CSS (CLI) | Styling + responsive layout |
| Vanilla JavaScript | Interactions, theme toggle, i18n |
| GitHub Actions | GitHub Pages deploy + daily SVG updates |
| Formspree | Contact form handling |

---

## 📄 CV Versions

This portfolio includes **three PDF CV variants** (both in the CV section and the dropdown):

1) **AI Engineer Intern (PDF)**  
   - File: `assets/TranHoHoangVu_AI.pdf`  
   - Use when applying for AI/ML/DL/NLP/CV roles

2) **Software Engineer Intern — LaTeX version (PDF)**  
   - File: `assets/TranHoHoangVu_SE.pdf`  
   - Use when applying for Software Engineer Intern roles (LaTeX-styled format)

3) **Software Engineer Intern — General (PDF)**  
   - File: `assets/TranHoHoangVu_General.pdf`  
   - General-purpose version for most SE intern job descriptions

### i18n keys used (JS)

The CV section + dropdown text is controlled by `data-i18n` keys in `js/scripts.js`, typically:

- Card titles/descriptions:  
  `cv_ai_title`, `cv_ai_desc`  
  `cv_se_latex_title`, `cv_se_latex_desc`  
  `cv_se_general_title`, `cv_se_general_desc`
- Dropdown labels:  
  `cv_menu_ai_title`, `cv_menu_ai_meta`  
  `cv_menu_se_latex_title`, `cv_menu_se_latex_meta`  
  `cv_menu_se_general_title`, `cv_menu_se_general_meta`

---

## 📁 Project Structure

```txt
my-portfolio/
├─ index.html
├─ assets/
│  ├─ projects/
│  ├─ github-contrib-light.svg
│  ├─ github-contrib-dark.svg
│  ├─ profile.jpg
│  ├─ TranHoHoangVu_AI.pdf
│  ├─ TranHoHoangVu_SE.pdf
│  ├─ TranHoHoangVu_General.pdf
│  ├─ og-image.jpg
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

> Tip: VS Code **Live Server** also works well.

---

## ⚙️ Quick Customize

### 1) GitHub username
Update in `js/scripts.js`:
```js
const GITHUB_USERNAME = "tranhohoangvu";
```

### 2) Contact form (Formspree)
In `index.html`, update:
```html
<form action="https://formspree.io/f/xxxxxxx" method="POST">
```

### 3) CV files / labels
- Replace PDFs under `assets/` (keep filenames to avoid changing HTML)
- Update dropdown links in `index.html` (CV menu)
- Update i18n text in `js/scripts.js` (I18N object)

### 4) Social links / content
Edit directly in `index.html` and translations in `js/scripts.js`.

---

## 🎨 Tailwind Build (Optional)

Compiled CSS is already committed at `css/tailwind.css`.

Rebuild:
```bash
npm install
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
```

Watch:
```bash
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --watch
```

---

## 🤖 GitHub Contributions SVG (Auto Update)

Workflow: `.github/workflows/update-github-contrib.yml`

- Runs daily (00:00 UTC)
- Uses GitHub GraphQL API in `js/build_github_contrib_svgs.py`
- Updates:
  - `assets/github-contrib-light.svg`
  - `assets/github-contrib-dark.svg`
- Commits changes back to the repo automatically

If you fork/clone, ensure Actions are enabled and workflows have permission to write contents.

---

## 🌍 Deploy to GitHub Pages

Deployment is handled by `.github/workflows/static.yml` (GitHub Pages official workflow).

1. Push to branch `main`
2. Go to **Settings → Pages**
3. Set Pages to deploy from **GitHub Actions**
4. After the workflow completes, your site is live at:
   - `https://<username>.github.io/<repo>/`

✅ Live: https://tranhohoangvu.github.io/my-portfolio/

---

## 🧠 Performance & SEO Tips

- Compress images (Squoosh/TinyPNG) and prefer modern formats when possible
- Keep hero images under ~300–500KB
- Make sure `og-image.jpg` exists and is referenced in meta tags
- Run Lighthouse to check performance/SEO/accessibility
- (Optional) Add analytics if you want traffic insights

---

## 🛠️ Updating Content

1. Edit `index.html` for text/sections/projects
2. Update translations in `js/scripts.js` (I18N object + `data-i18n` keys)
3. Replace images/CVs under `assets/`
4. (Optional) rebuild Tailwind
5. Commit & push:
```bash
git add .
git commit -m "feat(cv): update CV files, section content, dropdown and i18n"
git push origin main
```

---

## 📫 Contact

- 🐙 GitHub: https://github.com/tranhohoangvu
- 🌐 Live site: https://tranhohoangvu.github.io/my-portfolio/

---

> Last updated: December 2025
