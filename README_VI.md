# 🌐 Portfolio cá nhân — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-M%E1%BB%9F-success)](https://tranhohoangvu.github.io/my-portfolio/)

> 🎓 Sinh viên năm cuối ngành Computer Science tại Đại học Tôn Đức Thắng (TDTU)  
> 💼 Portfolio giới thiệu dự án, kỹ năng, chứng chỉ, GitHub activity — và các phiên bản CV.

Website portfolio **tĩnh (static)** xây dựng bằng **HTML + Tailwind CSS + Vanilla JS**, có **Dark/Light mode** và chuyển ngôn ngữ **VI/EN**.

- 🔗 **Website:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **CV (PDF) trong repo:** `assets/`
  - `assets/TranHoHoangVu_BE.pdf`
  - `assets/TranHoHoangVu_AI.pdf`
- 📄 **Link trực tiếp (sau khi deploy):**
  - `.../assets/TranHoHoangVu_BE.pdf`
  - `.../assets/TranHoHoangVu_AI.pdf`

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

- **Thẩm mỹ Kỹ sư Phần mềm Hiện đại**: Nền tối Deep Obsidian sang trọng (`#070b14`), kính mờ glassmorphism với viền kim loại mảnh, và hiệu ứng quầng sáng aurora chuyển động sống động.
- **Interactive Terminal & REST API Console Widget (Signature Feature)**:
  - **CLI Terminal (`vu-cli v2.4`)**: Shell dòng lệnh phong cách Linux/macOS hỗ trợ tự động hoàn thành (<kbd>Tab</kbd>), duyệt lịch sử lệnh (<kbd>↑</kbd>/<kbd>↓</kbd>), và cụm chip lệnh nhanh 1-click tiện lợi cho người dùng mobile. Hỗ trợ đầy đủ các lệnh: `vu --help`, `vu --bio`, `vu --skills [--json]`, `vu --fetch-projects [--cat=X] [--id=Y]`, `vu --contact`, `vu --cv`, `curl <endpoint>`, `theme`, `lang`, `clear`, `history`, `date`, `matrix`, `sudo`.
  - **REST API Explorer**: Trình khám phá và kiểm thử endpoint trực quan phong cách Postman/Swagger (`GET /api/v1/profile`, `/skills`, `/projects`, `/health`, `POST /contact`), hiển thị HTTP status `200 OK`, thời gian phản hồi (latency), kích thước payload và JSON syntax highlighting kèm nút sao chép JSON.
  - **Điều khiển cửa sổ macOS**: Thu nhỏ, xóa màn hình, phóng to toàn màn hình (Fullscreen) và sao chép toàn bộ output.
- **Tương tác liên kết Kỹ năng ↔ Dự án 2 chiều (Interactive Skill Linking)**:
  - **Kỹ năng ➔ Dự án**: Click vào bất kỳ kỹ năng nào có huy hiệu trong mục Kỹ năng sẽ tự động cuộn lên Dự án, hiển thị thanh **Active Skill Filter Banner**, làm sáng viền các dự án áp dụng công nghệ đó (`.is-skill-matched`) và tự động trượt Carousel đến đúng dự án.
  - **Dự án ➔ Kỹ năng**: Click vào các tag công nghệ trên thẻ dự án hoặc trong modal chi tiết sẽ cuộn ngay xuống Kỹ năng và kích hoạt hiệu ứng nhấp nháy phát sáng (**Pulsing Focus Highlight**) để định vị tức thì.
- **Khu vực Dự án Nâng cao**:
  - **Bộ lọc danh mục đa dạng**: `Tất cả` | `Full-Stack` | `Backend` | `AI`.
  - **Carousel có giới hạn (Bounded Slider)**: Vuốt chạm cảm ứng mượt mà trên mobile, thanh điều hướng và chỉ số trang đồng bộ.
  - **Modal Chi tiết Kỹ thuật chuyên sâu**: Xem kiến trúc hệ thống (System Architecture), cấu trúc cơ sở dữ liệu và các bài toán kỹ thuật hóc búa đã giải quyết cho từng dự án.
- **Tái cấu trúc Kỹ năng theo 4 Trụ cột Kỹ thuật**: *Ngôn ngữ cốt lõi*, *Kiến trúc Backend & API*, *Cơ sở dữ liệu & Tối ưu*, và *AI, DevOps & Công cụ*.
- **Thanh tác vụ nổi (FAB) & Hệ thống Toast Notification**: Sao chép email 1-click kèm thông báo Toast tức thì, mở nhanh LinkedIn/GitHub và tải CV tiện lợi.
- Giao diện responsive (mobile-first) với animation mềm mại khi cuộn trang.
- Dark / Light mode (lưu trong `localStorage`, fallback theo hệ điều hành).
- i18n VI / EN qua `data-i18n` (lưu trong `localStorage.lang`, cập nhật cả metadata và title).
- **Section CV với 2 bản PDF chuyên biệt + nút “View / Download”**:
  - *Fresher Backend Developer* (`assets/TranHoHoangVu_BE.pdf`)
  - *AI Engineer Intern* (`assets/TranHoHoangVu_AI.pdf`)
- **Dropdown “Download CV” ở Hero** để tải nhanh phiên bản CV mong muốn.
- **GitHub section**:
  - SVG contributions heatmap auto-generate (Light/Dark) và tự động commit hằng ngày qua GitHub Actions.
  - Activity Graph hiển thị trực quan thông qua `github-readme-activity-graph`.
- Contact form qua Formspree (không cần backend server).
- Tối ưu SEO: meta tags, Open Graph, `robots.txt`, `sitemap.xml`, và trang `404.html` tùy biến.

---

## 🧰 Công nghệ

| Phân loại | Công nghệ / Công cụ | Mục đích sử dụng |
|---|---|---|
| **Cấu trúc & Logic** | HTML5, Vanilla JavaScript (ES6+) | Kiến trúc lõi, liên kết 2 chiều Kỹ năng ↔ Dự án, carousel, modal, i18n |
| **Giao diện & Thẩm mỹ** | Tailwind CSS (v4 CLI), Vanilla CSS | Theme Deep Obsidian, glassmorphism, hiệu ứng chuyển động, layout responsive |
| **Icon & Typography** | Devicon, Heroicons SVG, Google Fonts | Icon công nghệ lập trình, icon giao diện, font chữ Poppins & Inter |
| **Tự động hóa & CI/CD** | GitHub Actions, Python (GraphQL script) | Tự động deploy GitHub Pages, cron job commit SVG contribution hằng ngày |
| **Tích hợp** | Formspree | Xử lý gửi biểu mẫu liên hệ |

---

## 📄 Các phiên bản CV

Portfolio có **2 phiên bản CV dạng PDF** (hiển thị ở section CV và dropdown):

1) **Fresher Backend Developer (PDF)**  
   - File: `assets/TranHoHoangVu_BE.pdf`  
   - Dùng khi ứng tuyển Backend Developer / Software Engineer (Node.js, Express, Laravel, PostgreSQL raw SQL, RESTful APIs, JWT RBAC).

2) **AI Engineer Intern (PDF)**  
   - File: `assets/TranHoHoangVu_AI.pdf`  
   - Dùng khi ứng tuyển AI / Data / Machine Learning (PyTorch, Deep Learning OCR, Transformers, dịch máy NLP, dự báo chuỗi thời gian).

### Key i18n đang dùng (JS)

Text của section CV + dropdown được điều khiển qua `data-i18n` trong `js/scripts.js`:

- Title/desc của card:  
  `cv_be_title`, `cv_be_desc`  
  `cv_ai_title`, `cv_ai_desc`  
- Label của dropdown:  
  `cv_menu_be_title`, `cv_menu_be_meta`  
  `cv_menu_ai_title`, `cv_menu_ai_meta`  

---

## 📁 Cấu trúc thư mục

```txt
my-portfolio/
├─ index.html                     # Trang chính giao diện Single-Page Application
├─ assets/
│  ├─ projects/                   # Ảnh chụp màn hình 7 dự án portfolio
│  ├─ github-contrib-light.svg    # Bản đồ đóng góp GitHub tự động (giao diện sáng)
│  ├─ github-contrib-dark.svg     # Bản đồ đóng góp GitHub tự động (giao diện tối)
│  ├─ TranHoHoangVu_BE.pdf        # File CV Fresher Backend Developer
│  ├─ TranHoHoangVu_AI.pdf        # File CV AI Engineer Intern
│  ├─ og-image-v2.png             # Ảnh xem trước Open Graph khi chia sẻ mạng xã hội
│  └─ favicon.*
├─ css/
│  ├─ tailwind-input.css          # File cấu hình Tailwind CLI input
│  ├─ tailwind.css                # File CSS Tailwind đã biên dịch
│  └─ styles.css                  # Toàn bộ styles tùy biến, animation, carousel, modal, skills
├─ js/
│  ├─ scripts.js                  # Controller chính, i18n, carousel slider, modal, liên kết kỹ năng
│  └─ build_github_contrib_svgs.py # Script Python tạo SVG heatmap từ GitHub GraphQL API
├─ projects-docs/                 # Tài liệu kỹ thuật chi tiết cho 7 dự án
│  ├─ 01-coursehub-lms.md
│  ├─ 02-ecommerce-platform.md
│  ├─ 03-vietnamese-ocr.md
│  ├─ 04-nlp-translation.md
│  ├─ 05-stock-forecasting-ml.md
│  ├─ 06-warehouse-ma.md
│  └─ 07-pos-system.md
├─ .github/workflows/
│  ├─ static.yml                  # Workflow GitHub Actions tự động deploy GitHub Pages
│  └─ update-github-contrib.yml   # Workflow cron job tự động cập nhật SVG đóng góp hằng ngày
├─ UI_UX_ANALYSIS.md              # Báo cáo phân tích UI/UX & lộ trình nâng cấp tính năng
├─ README.md                      # Tài liệu tiếng Anh
├─ README_VI.md                   # Tài liệu tiếng Việt
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
- Đảm bảo có `og-image-v2.png` và meta tags trỏ đúng
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
git commit -m "feat(cv): update to 2 CVs (Backend and AI)"
git push origin main
```

---

## 📫 Liên hệ

- 🐙 GitHub: https://github.com/tranhohoangvu
- 🌐 Website: https://tranhohoangvu.github.io/my-portfolio/

---

> Cập nhật: 2026
