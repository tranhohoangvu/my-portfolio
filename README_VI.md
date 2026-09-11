# 🌐 Portfolio cá nhân — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-M%E1%BB%9F-success)](https://tranhohoangvu.github.io/my-portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-tranhohoangvu-181717?logo=github)](https://github.com/tranhohoangvu)

> 🎓 Sinh viên năm cuối ngành Computer Science tại Đại học Tôn Đức Thắng (TDTU)  
> 💼 Portfolio giới thiệu dự án, kỹ năng, chứng chỉ, hoạt động GitHub — và các phiên bản CV.

Website portfolio **tĩnh (static)** xây dựng bằng **HTML + Tailwind CSS + Vanilla JS**, hỗ trợ chế độ **Dark/Light mode** và chuyển đổi song ngữ **VI/EN**.

- 🔗 **Website trực tiếp:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **CV (PDF) trong repo:** `assets/cv/`
  - `assets/cv/TranHoHoangVu_BE.pdf` — Fresher Backend Developer
  - `assets/cv/TranHoHoangVu_AI.pdf` — AI Engineer Intern

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
  - **REST API Explorer**: Trình khám phá và kiểm thử endpoint trực quan phong cách Postman/Swagger (`GET /api/v1/profile`, `/skills`, `/projects`, `/health`, `POST /contact`), hiển thị HTTP status `200 OK`, thời gian phản hồi (latency), kích thước payload và JSON syntax highlighting kèm nút sao chép JSON 1-click.
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
- i18n VI / EN qua `data-i18n` (lưu trong `localStorage.lang`, cập nhật cả metadata và title trang).
- **Section CV với 2 bản PDF chuyên biệt + nút “View / Download”**:
  - *Fresher Backend Developer* (`assets/cv/TranHoHoangVu_BE.pdf`)
  - *AI Engineer Intern* (`assets/cv/TranHoHoangVu_AI.pdf`)
- **Section Chứng chỉ (Certificates)**:
  - Tiêu đề gradient + huy hiệu kicker + phụ đề hiện đại.
  - **Bố cục lưới 3 cột linh hoạt (Responsive 3-Column Grid)**: Tối ưu hiển thị 3 chứng chỉ/hàng trên laptop/desktop màn hình rộng (`@media (min-width: 1024px)`), 2 cột trên tablet và 1 cột trên mobile.
  - **Bộ lọc danh mục (Category Filter Tabs)**: Lọc nhanh theo `Tất cả`, `AI & Deep Learning`, `Phân tích dữ liệu`, `Quy trình & Agile`, `Ngoại ngữ` kèm huy hiệu số lượng động.
  - **Nút Xem thêm / Thu gọn thông minh (Show More / Collapse)**: Hiển thị trước 3 chứng chỉ mới nhất, nút `Xem thêm (X chứng chỉ) ↓` giúp tiết kiệm không gian và mở rộng mượt mà.
  - **Nhận diện thương hiệu & Đồng bộ màu sắc**: Toàn bộ các thẻ đều có vector logo chuẩn của đơn vị cấp và theme màu sắc riêng biệt (Techbase Đỏ, British Council Xanh Hoàng gia, Google Xanh, DeepLearning Đỏ-Cam, Gemini Tím, Linux Xanh Dương, Microsoft Xanh) kèm hiệu ứng hover phát sáng độc bản.
  - **Chứng chỉ Microsoft AI Product Manager** (Microsoft • Coursera): xem PDF trực tiếp + xác minh chứng chỉ gốc trực tuyến.
  - **Chứng chỉ Introduction to Linux LFS101** (The Linux Foundation): xem PDF trực tiếp + xác minh chứng chỉ gốc trực tuyến.
  - **Chứng chỉ Google Data Analytics Professional** (Google • Coursera): xem PDF trực tiếp + xác minh chứng chỉ gốc trực tuyến.
  - **Chứng chỉ Gemini Certified Educator** (Google for Education): xem PDF trực tiếp + xác minh chứng chỉ gốc trên Google Accredible.
  - **Chứng chỉ Gemini Certified Student** (Google for Education): xem PDF trực tiếp + xác minh chứng chỉ gốc trên Google Accredible.
  - **Chứng chỉ DeepLearning.AI TensorFlow Developer** (DeepLearning.AI • Coursera): xem PDF trực tiếp + xác minh chứng chỉ gốc trực tuyến.
  - **Chứng chỉ Agile & Scrum Framework 2024** (Techbase Viet Nam): logo 2 mũi tên vát chuẩn nhận diện + xem trực tiếp bản PDF chất lượng cao.
  - **Chứng chỉ Quốc tế Aptis ESOL** (British Council): biểu tượng 4 chấm tròn đặc trưng, thanh tiến trình điểm số (135/200, kích hoạt animation mượt mà khi cuộn tới qua IntersectionObserver) • Trình độ CEFR: B1.
  - **Bảo mật PII**: bản xem trước online được che mờ thông tin cá nhân (CCCD, mã QR), tích hợp **Form Modal Formspree** để nhà tuyển dụng gửi yêu cầu nhận bản gốc đối chiếu.
  - Cụm nút thao tác thiết kế cân đối, gọn đẹp kèm hiệu ứng hover tương tác.
- **Section Hoạt động GitHub** (được thiết kế lại):
  - Thanh thống kê nhanh (Quick Stats Bar): **16 repos · 22 stars** · Các ngôn ngữ hàng đầu (Python, TypeScript, JavaScript, Java) — số liệu trực tiếp từ GitHub API.
  - Bản đồ đóng góp (SVG heatmap) tự động tạo (Light/Dark) và commit hằng ngày qua GitHub Actions.
  - Biểu đồ hoạt động động (Dynamic Activity Graph) với trạng thái tải **skeleton shimmer** & hiệu ứng mờ dần (fade-in) khi tải xong.
  - Nút CTA GitHub bo tròn phong cách dark-mode kèm biểu tượng Octocat.
- **Section Liên hệ (Contact)** (được thiết kế lại):
  - Tiêu đề gradient đa sắc + huy hiệu kicker + phụ đề song ngữ định vị tìm kiếm việc làm.
  - **Thẻ trạng thái sẵn sàng làm việc (Availability & Work Info)**: Chấm xanh neon nhấp nháy (`Sẵn sàng nhận việc ngay`), vị trí (`TP.HCM, UTC+7`), hình thức (`On-site • Hybrid • Remote`), và cam kết phản hồi trong 24h.
  - **Thẻ kết nối**: Badge `Nhanh nhất / Ưu tiên` cho Email & LinkedIn + hiệu ứng mũi tên trượt `→` khi hover.
  - **Smart Contact Form**: Cụm chip chọn nhanh chủ đề liên hệ (`Tuyển dụng Backend`, `Tuyển dụng AI Intern`, `Hợp tác dự án`, `Khác`) tự động truyền vào subject Formspree, input fields có icon đại diện, bộ đếm ký tự tin nhắn thời gian thực (tối đa 500 ký tự), và nút gửi máy bay giấy kèm loading spinner xoay mượt mà.
- **Tối ưu hóa hiệu năng cuộn trang (Scroll Performance)**:
  - Toàn bộ trình lắng nghe sự kiện cuộn (scroll listeners) được điều tiết qua `requestAnimationFrame`.
  - Các chỉ số kích thước layout được lưu bộ đệm (cache) khi `resize`, ngăn ngừa hiện tượng cưỡng bức reflow (layout thrashing).
  - Sử dụng CSS `contain: layout style paint` + `transform: translateZ(0)` cho các quầng sáng aurora orbs để GPU render trực tiếp.
  - Hỗ trợ `prefers-reduced-motion` tự động tắt hiệu ứng chuyển động nặng đối với thiết bị ưu tiên giảm chuyển động.
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
   - File: `assets/cv/TranHoHoangVu_BE.pdf`  
   - Dùng khi ứng tuyển Backend Developer / Software Engineer (Node.js, Express, Laravel, PostgreSQL raw SQL, RESTful APIs, JWT RBAC).

2) **AI Engineer Intern (PDF)**  
   - File: `assets/cv/TranHoHoangVu_AI.pdf`  
   - Dùng khi ứng tuyển AI / Data / Machine Learning (PyTorch, Deep Learning OCR, Transformers, dịch máy NLP, dự báo chuỗi thời gian).

### Key i18n đang dùng (JS)

Text của section CV + dropdown được điều khiển qua `data-i18n` trong `js/data/i18n.data.js`:

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
├─ data/                          # Thư mục dữ liệu chuẩn định dạng JSON máy đọc
│  ├─ projects.json               # Dữ liệu 7 dự án (song ngữ VI/EN, kiến trúc, database, thách thức)
│  └─ skills.json                 # Dữ liệu 4 nhóm kỹ năng & bảng liên kết kỹ năng ↔ dự án
├─ assets/
│  ├─ projects/                   # Ảnh chụp màn hình 7 dự án portfolio
│  ├─ cv/                         # Hồ sơ ứng tuyển (CV Fresher Backend & AI Engineer PDF)
│  ├─ certificates/               # Chứng chỉ chuyên môn (Microsoft AI, Linux Foundation, Google Data Analytics, Google Gemini, DeepLearning.AI TensorFlow, Techbase Agile & Aptis PDFs)
│  ├─ profile/                    # Ảnh đại diện cá nhân (profile1.jpg, profile2.png)
│  ├─ icons/                      # Biểu tượng favicon (SVG, PNG) & App icon PWA
│  ├─ github/                     # Bản đồ đóng góp & đồ thị hoạt động GitHub tự động (SVG)
│  └─ og-image-v2.png             # Ảnh xem trước Open Graph khi chia sẻ mạng xã hội
├─ css/
│  ├─ tailwind-input.css          # File cấu hình Tailwind CLI input
│  ├─ tailwind.css                # File CSS Tailwind đã biên dịch
│  ├─ styles.css                  # Entry point — chỉ chứa @import (không có styles)
│  ├─ base/
│  │  ├─ tokens.css               # Design tokens, CSS variables, body, back-to-top
│  │  └─ animations.css           # Các class animation toàn cục, keyframes & aurora orbs
│  ├─ layout/
│  │  ├─ navbar.css               # Navbar, mobile menu, responsive breakpoints
│  │  └─ nav-rail.css             # Thanh điều hướng section nổi (desktop)
│  ├─ sections/
│  │  ├─ hero.css                 # Hero section, aurora orbs, buttons, CV dropdown
│  │  ├─ projects.css             # Filter tabs, carousel, cards, modal, skill linking
│  │  ├─ skills.css               # Skills cards, dark mode, lang toggle
│  │  ├─ contact.css              # Contact cards, email copy badge, footer
│  │  ├─ cv.css                   # CV section cards & actions
│  │  ├─ about.css                # Avatar aura, about content, social buttons
│  │  ├─ certs.css                # Section chứng chỉ: cards v2, thanh điểm số, icon đơn vị cấp
│  │  ├─ github.css               # Section GitHub: thanh thống kê, panels, skeleton, nút CTA
│  │  └─ terminal.css             # Interactive terminal & REST API console widget
│  └─ components/
│     ├─ shared-cards.css         # Hiệu ứng hover thống nhất (projects, skills, github)
│     ├─ toast.css                # Hệ thống toast notification glassmorphic
│     └─ fab.css                  # Floating Action Bar & quick contact cluster
├─ scripts/                       # Thư mục chứa automation & build scripts
│  └─ build_github_contrib_svgs.py # Script Python tạo SVG heatmap từ GitHub GraphQL API
├─ js/
│  ├─ data/                       # Module dữ liệu phía client (Single Source of Truth)
│  │  ├─ i18n.data.js             # Từ điển song ngữ VI / EN độc lập
│  │  ├─ projects.data.js         # Kho dữ liệu window.PROJECTS_DATA & hàm tra cứu/lọc
│  │  └─ skills.data.js           # Kho dữ liệu window.SKILLS_DATA & hàm liên kết 2 chiều
│  ├─ modules/                    # Các module tính năng giao diện độc lập
│  │  ├─ i18n.js                  # Logic chuyển đổi ngôn ngữ & cập nhật DOM i18n
│  │  ├─ theme.js                 # Quản lý Dark/Light mode & nền navbar khi cuộn
│  │  ├─ carousel.js              # Projects carousel slider & bộ lọc danh mục
│  │  ├─ modal.js                 # Project deep-dive details modal & các tab kiến trúc
│  │  ├─ skill-linking.js         # Liên kết tương tác 2 chiều Kỹ năng ↔ Dự án
│  │  ├─ terminal.js              # Widget Interactive Terminal CLI & REST API Console
│  │  ├─ fab.js                   # Floating Action Bar (FAB) & hệ thống Toast
│  │  ├─ section-nav.js           # Thanh điều hướng section nổi trên desktop
│  │  ├─ cert-modal.js            # Animation thanh điểm Aptis & Modal Formspree chứng chỉ
│  │  ├─ cert-filter.js           # Bộ lọc danh mục chứng chỉ & tính năng Xem thêm / Thu gọn
│  │  ├─ email-copy.js            # Cơ chế 1-click copy email clipboard kèm toast thông báo
│  │  ├─ contact-form.js          # Topic chips, bộ đếm ký tự & Formspree AJAX
│  │  ├─ github-stats.js          # Đồ thị đóng góp SVG & dynamic theming
│  │  └─ ui-interactions.js       # Bộ đếm Counter, lật 3D profile card, CV counter, typewriter
│  └─ scripts.js                  # Điều phối ứng dụng chính (Master Application Orchestrator)
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
├─ README_VI.md                   # Tài liệu tiếng Việt (file này)
├─ site.webmanifest               # Cấu hình PWA
├─ sitemap.xml                    # Sơ đồ trang web SEO
├─ sw.js                          # Trình quản lý bộ nhớ đệm offline Service Worker
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
Sửa trong `js/modules/github-stats.js`:
```js
const GITHUB_USERNAME = "tranhohoangvu";
```

### 2) Dịch thuật song ngữ / i18n
Chỉnh sửa từ điển ngôn ngữ trong `js/data/i18n.data.js` (`window.I18N_DATA`).

### 3) Chip thống kê GitHub (Stats chips)
Các giá trị trong thanh thống kê (repos, stars) của section GitHub được đặt trực tiếp trong `index.html`.
Bạn có thể cập nhật thủ công hoặc tự động hóa qua GitHub Actions đọc từ API.

### 4) Contact form (Formspree)
Sửa trong `index.html`:
```html
<form action="https://formspree.io/f/xxxxxxx" method="POST">
```

### 5) CV / nhãn hiển thị
- Thay PDF trong `assets/cv/`
- Cập nhật link dropdown trong `index.html` (CV menu)
- Cập nhật bản dịch trong `js/data/i18n.data.js` (object `I18N_DATA`)

### 6) Social links / nội dung khác
Sửa trực tiếp trong `index.html` và phần dịch trong `js/data/i18n.data.js`.

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
- Dùng GitHub GraphQL API trong `scripts/build_github_contrib_svgs.py`
- Cập nhật:
  - `assets/github/github-contrib-light.svg`
  - `assets/github/github-contrib-dark.svg`
  - `assets/github/github-activity-light.svg`
  - `assets/github/github-activity-dark.svg`
- Tự động commit lại vào repo

Nếu bạn fork/clone, nhớ bật Actions và cấp quyền workflow ghi vào repo.

---

## 🌍 Deploy lên GitHub Pages

Deploy bằng `.github/workflows/static.yml` (workflow chính thức của GitHub Pages).

1. Push lên nhánh `main`
2. Vào **Settings → Pages**
3. Chọn deploy bằng **GitHub Actions**
4. Sau khi workflow chạy xong, website sẽ trực tuyến tại:
   - `https://<username>.github.io/<repo>/`

✅ Live: https://tranhohoangvu.github.io/my-portfolio/

---

## 🧠 Gợi ý hiệu năng & SEO

- Toàn bộ trình lắng nghe cuộn (scroll listeners) được điều tiết qua `requestAnimationFrame` — loại bỏ giật lag do layout thrashing.
- Các chỉ số kích thước layout (chiều cao cuộn, offsets) được cache và chỉ tính toán lại khi `resize`.
- Các quầng sáng aurora dùng CSS `contain: layout style paint` + `transform: translateZ(0)` để GPU trực tiếp xử lý và tăng tốc phần cứng.
- Tự động tôn trọng `prefers-reduced-motion` để vô hiệu hóa animation phức tạp trên thiết bị yếu.
- Nén ảnh (Squoosh/TinyPNG) và ưu tiên định dạng hiện đại.
- Ảnh hero nên < ~300–500KB.
- Đảm bảo có `og-image-v2.png` và meta tags trỏ đúng.
- Dùng Lighthouse để kiểm tra hiệu năng, SEO và khả năng tiếp cận (accessibility).
- (Tùy chọn) Thêm công cụ analytics nếu muốn theo dõi lưu lượng truy cập.

---

## 🛠️ Cập nhật nội dung

1. Sửa `index.html` (text/sections/projects)
2. Sửa phần dịch trong `js/scripts.js` (I18N + `data-i18n`)
3. Thay ảnh/CV trong `assets/`
4. (Tùy chọn) build lại Tailwind
5. Commit & push:
```bash
git add .
git commit -m "feat: mô tả thay đổi của bạn"
git push origin main
```

---

## 📫 Liên hệ

- 🐙 GitHub: https://github.com/tranhohoangvu
- 🌐 Website: https://tranhohoangvu.github.io/my-portfolio/

---

> Cập nhật: Tháng 9 năm 2026
