# 🌐 Portfolio cá nhân — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-M%E1%BB%9F-success)](https://tranhohoangvu.github.io/my-portfolio/)

> 🎓 Sinh viên năm cuối ngành Computer Science tại Đại học Tôn Đức Thắng (TDTU)  
> 💼 Portfolio giới thiệu dự án, kỹ năng, chứng chỉ, GitHub activity — và nhiều phiên bản CV.

Website portfolio **tĩnh (static)** xây dựng bằng **HTML + Tailwind CSS + Vanilla JS**, có **Dark/Light mode** và chuyển ngôn ngữ **VI/EN**.

- 🔗 **Website:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **CV (PDF) trong repo:** `assets/`
  - `assets/TranHoHoangVu_AI.pdf`
  - `assets/TranHoHoangVu_SE.pdf`
  - `assets/TranHoHoangVu_General.pdf`
- 📄 **Link trực tiếp (sau khi deploy):**
  - `.../assets/TranHoHoangVu_AI.pdf`
  - `.../assets/TranHoHoangVu_SE.pdf`
  - `.../assets/TranHoHoangVu_General.pdf`

> English version: `README.md`

---

## 📌 Mục lục

- [✨ Điểm nổi bật](#-điểm-nổi-bật)
- [🧰 Công nghệ](#-công-nghệ)
- [📄 Các phiên bản CV](#-các-phiên-bản-cv)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [🚀 Chạy local](#-chạy-local)
- [⚙️ Tùy biến nhanh](#️-tùy-biến-nhanh)
- [🎨 Build Tailwind](#-build-tailwind-tùy-chọn)
- [🤖 SVG GitHub Contributions](#-svg-github-contributions-tự-động-cập-nhật)
- [🌍 Deploy lên GitHub Pages](#-deploy-lên-github-pages)
- [🧠 Gợi ý hiệu năng & SEO](#-gợi-ý-hiệu-năng--seo)
- [🛠️ Cập nhật nội dung](#️-cập-nhật-nội-dung)
- [📫 Liên hệ](#-liên-hệ)

---

## ✨ Điểm nổi bật

- Giao diện responsive (mobile-first)
- Dark / Light mode (lưu trong `localStorage`, fallback theo OS)
- i18n VI / EN qua `data-i18n` (lưu trong `localStorage.lang`, có cả metadata)
- Showcase Projects (ảnh + link nhanh)
- Skills & Certificates
- **Section CV với 3 bản PDF + nút “View / Download”**
- **Dropdown “Download CV” ở hero** để chọn đúng phiên bản CV
- GitHub section
  - SVG contributions heatmap auto-generate (Light/Dark) và auto-commit bằng GitHub Actions
  - Activity Graph hiển thị bằng `github-readme-activity-graph`
- Contact form qua Formspree (không cần backend)
- Smooth scroll + reveal animation + back-to-top button
- SEO cơ bản: meta tags + OG, kèm `robots.txt`, `sitemap.xml`, và `404.html`

---

## 🧰 Công nghệ

| Công nghệ | Mục đích |
|---|---|
| HTML5 | Cấu trúc trang |
| Tailwind CSS (CLI) | Styling + responsive |
| Vanilla JavaScript | Tương tác, theme toggle, i18n |
| GitHub Actions | Deploy Pages + update SVG hằng ngày |
| Formspree | Xử lý form liên hệ |

---

## 📄 Các phiên bản CV

Portfolio có **3 phiên bản CV dạng PDF** (hiển thị ở section CV và dropdown):

1) **AI Engineer Intern (PDF)**  
   - File: `assets/TranHoHoangVu_AI.pdf`  
   - Dùng khi ứng tuyển AI/ML/DL/NLP/CV

2) **Software Engineer Intern — bản LaTeX (PDF)**  
   - File: `assets/TranHoHoangVu_SE.pdf`  
   - Dùng khi ứng tuyển Software Engineer Intern (format gọn, kiểu LaTeX)

3) **Software Engineer Intern — bản General (PDF)**  
   - File: `assets/TranHoHoangVu_General.pdf`  
   - Bản tổng quan, phù hợp đa số JD SE intern

### Key i18n đang dùng (JS)

Text của section CV + dropdown được điều khiển qua `data-i18n` trong `js/scripts.js`, thường gồm:

- Title/desc của card:  
  `cv_ai_title`, `cv_ai_desc`  
  `cv_se_latex_title`, `cv_se_latex_desc`  
  `cv_se_general_title`, `cv_se_general_desc`
- Label của dropdown:  
  `cv_menu_ai_title`, `cv_menu_ai_meta`  
  `cv_menu_se_latex_title`, `cv_menu_se_latex_meta`  
  `cv_menu_se_general_title`, `cv_menu_se_general_meta`

---

## 📁 Cấu trúc thư mục

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

## 🚀 Chạy local

### Cách 1: Mở trực tiếp
Mở `index.html` bằng trình duyệt.

### Cách 2: Dùng local server (khuyến nghị)
```bash
python -m http.server 5500
```
Truy cập: `http://localhost:5500`

> Gợi ý: VS Code **Live Server** cũng rất tiện.

---

## ⚙️ Tùy biến nhanh

### 1) GitHub username
Sửa trong `js/scripts.js`:
```js
const GITHUB_USERNAME = "tranhohoangvu";
```

### 2) Contact form (Formspree)
Sửa trong `index.html`:
```html
<form action="https://formspree.io/f/xxxxxxx" method="POST">
```

### 3) CV / nhãn hiển thị
- Thay PDF trong `assets/` (giữ tên file để khỏi phải sửa HTML)
- Update link dropdown trong `index.html` (CV menu)
- Update i18n trong `js/scripts.js` (object I18N)

### 4) Social links / nội dung khác
Sửa trực tiếp trong `index.html` và phần dịch trong `js/scripts.js`.

---

## 🎨 Build Tailwind (Tùy chọn)

File CSS build sẵn ở `css/tailwind.css`.

Build lại:
```bash
npm install
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
```

Watch:
```bash
npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./css/tailwind.css --watch
```

---

## 🤖 SVG GitHub Contributions (Tự động cập nhật)

Workflow: `.github/workflows/update-github-contrib.yml`

- Chạy hằng ngày (00:00 UTC)
- Dùng GitHub GraphQL API trong `js/build_github_contrib_svgs.py`
- Cập nhật:
  - `assets/github-contrib-light.svg`
  - `assets/github-contrib-dark.svg`
- Auto commit lại vào repo

Nếu bạn fork/clone, nhớ bật Actions và cấp quyền workflow ghi vào repo.

---

## 🌍 Deploy lên GitHub Pages

Deploy bằng `.github/workflows/static.yml` (workflow chính thức của GitHub Pages).

1. Push lên nhánh `main`
2. Vào **Settings → Pages**
3. Chọn deploy bằng **GitHub Actions**
4. Sau khi workflow chạy xong, site sẽ ở:
   - `https://<username>.github.io/<repo>/`

✅ Site: https://tranhohoangvu.github.io/my-portfolio/

---

## 🧠 Gợi ý hiệu năng & SEO

- Nén ảnh (Squoosh/TinyPNG) và ưu tiên định dạng hiện đại nếu có
- Ảnh hero nên < ~300–500KB
- Đảm bảo có `og-image.jpg` và meta tags trỏ đúng
- Dùng Lighthouse để check performance/SEO/accessibility
- (Tùy chọn) thêm analytics nếu muốn theo dõi traffic

---

## 🛠️ Cập nhật nội dung

1. Sửa `index.html` (text/sections/projects)
2. Sửa phần dịch trong `js/scripts.js` (I18N + `data-i18n`)
3. Thay ảnh/CV trong `assets/`
4. (Tùy chọn) build lại Tailwind
5. Commit & push:
```bash
git add .
git commit -m "feat(cv): update CV files, section content, dropdown and i18n"
git push origin main
```

---

## 📫 Liên hệ

- 🐙 GitHub: https://github.com/tranhohoangvu
- 🌐 Website: https://tranhohoangvu.github.io/my-portfolio/

---

> Cập nhật: Tháng 12/2025
