# 🌐 Portfolio cá nhân — Trần Hồ Hoàng Vũ

[![Live Demo](https://img.shields.io/badge/Live%20Demo-M%E1%BB%9F-success)](https://tranhohoangvu.github.io/my-portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-tranhohoangvu-181717?logo=github)](https://github.com/tranhohoangvu)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 🎓 Tốt nghiệp ngành Khoa học Máy tính tại Đại học Tôn Đức Thắng (TDTU)  
> 💼 Portfolio cá nhân showcase kiến trúc backend, pipeline trí tuệ nhân tạo, kỹ năng công nghệ, chứng chỉ quốc tế đã xác thực và hồ sơ năng lực (CV).

Ứng dụng web tĩnh hiện đại, hiệu năng cao được xây dựng bằng **HTML5, Tailwind CSS (v4 CLI), và Vanilla JavaScript (ES6+)**, hỗ trợ chuyển đổi linh hoạt **Dark / Light dual-theme** và hệ thống bản ngữ song ngữ **VI / EN**.

- 🔗 **Website trực tiếp:** https://tranhohoangvu.github.io/my-portfolio/
- 📄 **Hồ sơ năng lực chuyên biệt (PDF):**
  - `assets/cv/TranHoHoangVu_BE.pdf` — Fresher Backend Developer
  - `assets/cv/TranHoHoangVu_AI.pdf` — AI Engineer Intern

> 🇬🇧 English version: [`README.md`](./README.md)

---

## 📌 Mục lục

- [✨ Điểm nổi bật cốt lõi](#-điểm-nổi-bật-cốt-lõi)
- [🧰 Công nghệ & Kiến trúc](#-công-nghệ--kiến-trúc)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [📄 Các phiên bản CV chuyên biệt](#-các-phiên-bản-cv-chuyên-biệt)
- [🚀 Chạy local & Quy trình Build](#-chạy-local--quy-trình-build)
- [⚙️ Cấu hình & Tùy biến nhanh](#️-cấu-hình--tùy-biến-nhanh)
- [🤖 Luồng tự động hóa & CI/CD](#-luồng-tự-động-hóa--cicd)
- [🌍 Hướng dẫn Deploy](#-hướng-dẫn-deploy)
- [🧠 Tối ưu hiệu năng & SEO](#-tối-ưu-hiệu-năng--seo)
- [📫 Thông tin liên hệ](#-thông-tin-liên-hệ)

---

## ✨ Điểm nổi bật cốt lõi

### 1. Hệ thống thiết kế Dual-Theme (Deep Obsidian & Light Zebra)
- **Dark Mode (Deep Obsidian)**: Nền tối Deep Obsidian sang trọng (`#070b14` và `#0b101d`), kính mờ glassmorphism với viền kim loại mảnh phản quang (`rgba(255,255,255,0.1)`), và quầng sáng aurora mesh chuyển động mượt mà (Neon Indigo `#6366f1`, Cyan `#06b6d4`, Emerald `#10b981`).
- **Light Mode (Zebra Striping & Cool Slate)**: Cấu trúc luân phiên nền sọc ngựa vằn giữa các section (`bg-white` xen kẽ `bg-slate-100` / `#f1f5f9`). Thẻ card và thành phần con mang màu xám Slate vững chãi (`#f8fafc` / `#f1f5f9`), viền xám `#cbd5e1` cùng đổ bóng đa lớp, triệt tiêu hoàn toàn hiện tượng chói mắt "trắng lẫn vào trắng" và nâng cao độ tương phản thông tin.
- **Lưu trữ trạng thái**: Tự động lưu theme tại `localStorage.theme` và đồng bộ với cài đặt hệ điều hành (`prefers-color-scheme`).

### 2. Interactive Terminal CLI & REST API Console (`vu-cli v2.4`)
- **CLI Terminal phong cách Unix**:
  - Tự động hoàn thành lệnh bằng phím <kbd>Tab</kbd>.
  - Điều hướng lịch sử lệnh đã nhập bằng phím mũi tên <kbd>↑</kbd> và <kbd>↓</kbd>.
  - Cụm chip lệnh nhanh 1-click tối ưu cho thiết bị di động (`vu --bio`, `vu --skills`, `vu --fetch-projects`, `vu --contact`, `vu --cv`, `matrix`, `clear`).
  - Cụm điều khiển cửa sổ macOS: Thu nhỏ, làm sạch màn hình, phóng to toàn màn hình (Fullscreen) và sao chép toàn bộ output.
- **REST API Explorer (phong cách Swagger / Postman)**:
  - Trình kiểm thử endpoint trực quan: `GET /api/v1/profile`, `/skills`, `/projects`, `/health`, và `POST /contact`.
  - Hiển thị chỉ số phản hồi thực tế: HTTP `200 OK`, đồng hồ đo độ trễ (latency ms), kích thước dữ liệu (bytes), cú pháp JSON tô màu syntax highlighting và nút sao chép JSON 1-click.

### 3. Liên kết Kỹ năng ↔ Dự án 2 chiều tương tác (Interactive Skill Linking)
- **Kỹ năng ➔ Dự án**: Nhấp vào bất kỳ kỹ năng nào có huy hiệu số lượng dự án trong mục Kỹ năng sẽ tự động cuộn lên Dự án, hiển thị thanh **Active Skill Filter Banner**, làm sáng viền các dự án liên quan bằng hiệu ứng xung điện (`.is-skill-matched`) và trượt Carousel đến đúng thẻ dự án.
- **Dự án ➔ Kỹ năng**: Nhấp vào các tag công nghệ trên thẻ dự án hoặc trong modal chi tiết sẽ cuộn ngay xuống mục Kỹ năng và kích hoạt hiệu ứng nhấp nháy phát sáng (**Pulsing Focus Highlight**) để định vị tức thì.

### 4. Showcase Dự án Chuyên sâu
- **Bộ lọc danh mục**: Lọc nhanh 1-click theo `Tất cả`, `Full-Stack`, `Backend`, và `AI` kèm huy hiệu đếm số lượng dự án động.
- **Carousel trượt có giới hạn (Bounded Slider)**: Hỗ trợ vuốt chạm cảm ứng mượt mà trên mobile, bàn phím máy tính, tự vô hiệu hóa nút chuyển khi chạm mép và hệ thống chấm tròn chỉ số trang.
- **Modal Kiến trúc Kỹ thuật sâu**: Khám phá sơ đồ kiến trúc hệ thống, thiết kế cơ sở dữ liệu và các thách thức kỹ thuật hóc búa kèm giải pháp xử lý thực tế cho 7 dự án.

### 5. Kỹ năng Công nghệ phân loại theo 4 Trụ cột
- **Ngôn ngữ cốt lõi**: C, C#, Java, Python, JavaScript, PHP.
- **Kiến trúc Backend & API**: Node.js, Express.js, Laravel, RESTful API, .NET, React.
- **Cơ sở dữ liệu & Lưu trữ**: PostgreSQL, MySQL, MongoDB, SQL Server, Tối ưu Raw SQL & Indexing.
- **AI, DevOps & Công cụ**: PyTorch, TensorFlow, Docker, Docker Compose, Nginx, Git, CI/CD.

### 6. Chứng chỉ Chuyên môn Đã xác thực (8 Chứng chỉ Quốc tế)
- **Lưới hiển thị 3 cột chuẩn Desktop**: 3 thẻ/hàng trên laptop/desktop, 2 trên tablet và 1 trên mobile.
- **Bộ lọc danh mục động**: `Tất cả`, `AI & Deep Learning`, `Phân tích dữ liệu`, `Quy trình & Agile`, `Ngoại ngữ`.
- **Nút Xem thêm / Thu gọn thông minh**: Hiển thị trước 3 chứng chỉ tiêu biểu mới nhất để tối ưu chiều dài trang, mở rộng mượt mà khi cần.
- **Theme & Vector Logo thương hiệu chuẩn**: Vector badge và hiệu ứng màu nhận diện cho Microsoft, The Linux Foundation, Google, DeepLearning.AI, Google for Education, Techbase, và British Council.
- **Thanh tiến trình điểm số**: Chứng chỉ Aptis ESOL hiển thị thanh điểm trực quan (135/200, CEFR B1) chạy hoạt ảnh mượt mà khi cuộn tới qua `IntersectionObserver`.
- **Bảo vệ dữ liệu cá nhân (PII)**: Bản xem trước online che mờ thông tin nhạy cảm, tích hợp form AJAX modal để nhà tuyển dụng gửi yêu cầu nhận bản gốc đối chiếu.

### 7. Giới thiệu Bản thân & Thương hiệu Cá nhân
- **3 Trụ cột cốt lõi**: Học vấn & Nền tảng (Tốt nghiệp CS - TDTU), Kinh nghiệm Thực chiến (Software Engineer Intern), Vị trí Ứng tuyển (Fresher Backend Developer & AI Engineer Intern).
- **4 Thẻ số liệu đếm động**: 7+ Dự án hoàn chỉnh, 16+ GitHub Repositories, 8 Chứng chỉ quốc tế, 100% Sẵn sàng làm việc.
- **Ảnh thẻ 3D lật 2 mặt tương tác**: Hiệu ứng 3D Profile Flip hiển thị chân dung thứ hai khi hover/chạm, bao quanh bởi radar xanh neon phát xung liên tục (`Available for Hire`).
- **Action Dock tích hợp**: Nút sao chép email 1-click kèm thông báo Toast, chuyển nhanh đến CV, Liên hệ và mạng xã hội cá nhân.

### 8. Hoạt động GitHub & Thống kê Thời gian thực
- **Thanh thống kê nhanh**: 16 repos, 22 stars và các ngôn ngữ lập trình hàng đầu được truy xuất từ GitHub API.
- **SVG Heatmap tự động hằng ngày**: Heatmap đóng góp (chế độ Sáng & Tối) được render và commit tự động hằng ngày thông qua GitHub Actions GraphQL workflow.
- **Biểu đồ hoạt động động**: Hiệu ứng khung tải trước skeleton shimmer và hiệu ứng mờ dần (fade-in) khi tải xong.

### 9. Biểu mẫu Liên hệ Thông minh & Trạng thái Sẵn sàng
- **Thẻ trạng thái công việc**: Chấm xanh neon nhấp nháy (`Sẵn sàng nhận việc ngay`), vị trí (`TP.HCM, UTC+7`), hình thức (`On-site • Hybrid • Remote`), và cam kết phản hồi trong 24h.
- **Chip chọn nhanh chủ đề**: Nút chọn chủ đề 1-click (`Tuyển dụng Backend`, `Tuyển dụng AI Intern`, `Hợp tác dự án`, `Khác`) tự động điền tiêu đề form Formspree.
- **Xác thực thời gian thực**: Bộ đếm 500 ký tự tin nhắn, ô nhập có icon đại diện, spinner loading và thông báo trạng thái gửi thành công/thất bại tức thì.

---

## 🧰 Công nghệ & Kiến trúc

| Tầng | Công nghệ | Mục đích sử dụng |
|---|---|---|
| **Cấu trúc** | HTML5 (Semantic, SEO-ready) | Thẻ ngữ nghĩa chuẩn accessibility, Open Graph metadata, JSON-LD |
| **Giao diện** | Tailwind CSS v4 CLI, Vanilla CSS | Design tokens, glassmorphism, lưới responsive, nhịp sọc zebra |
| **Logic & Trạng thái** | Vanilla JavaScript (ES6+) | 19 modular controller, Carousel, Skill-linking, Terminal CLI, Modal |
| **Đóng gói Bundle** | Node.js Script + esbuild | Nối chuỗi dependency và nén file JS production (`bundle.min.js`) |
| **Typography & Icon** | Devicon, Heroicons, Google Fonts | Font Inter & Poppins, JetBrains Mono cho terminal, icon SVG chính hãng |
| **Tự động hóa & CI/CD**| GitHub Actions, Python GraphQL | Tự động deploy GitHub Pages, cron job cập nhật heatmap SVG hằng ngày |
| **Biểu mẫu** | Formspree | Xử lý gửi biểu mẫu liên hệ và yêu cầu xem chứng chỉ gốc không cần backend server |

---

## 📁 Cấu trúc thư mục

```txt
my-portfolio/
├─ index.html                     # Điểm vào ứng dụng đơn trang (SPA)
├─ 404.html                       # Trang lỗi 404 tùy biến
├─ site.webmanifest               # Cấu hình Progressive Web App (PWA)
├─ sitemap.xml                    # Sơ đồ trang web phục vụ SEO
├─ robots.txt                     # Chỉ thị dành cho trình thu thập dữ liệu (bot)
├─ sw.js                          # Service Worker lưu bộ nhớ đệm (cache) offline
├─ package.json                   # Cấu hình scripts và dependencies
├─ assets/
│  ├─ cv/                         # Các bản CV định dạng PDF (BE Developer & AI Intern)
│  ├─ certificates/               # File PDF chứng chỉ đã xác thực
│  ├─ projects/                   # Ảnh chụp giao diện độ phân giải cao cho 7 dự án
│  ├─ profile/                    # Ảnh đại diện cá nhân (profile.jpg, profile2.jpg)
│  ├─ icons/                      # Bộ favicon (SVG, PNG) và biểu tượng PWA
│  ├─ github/                     # Heatmap đóng góp tự động hằng ngày (SVG sáng/tối)
│  └─ og-image-v2.png             # Ảnh xem trước Open Graph khi chia sẻ mạng xã hội
├─ css/
│  ├─ tailwind-input.css          # File cấu hình Tailwind CSS v4 và design tokens
│  ├─ tailwind.css                # File CSS Tailwind đã biên dịch và nén nhỏ
│  ├─ styles.css                  # File CSS gốc import các module thành phần
│  ├─ base/
│  │  ├─ tokens.css               # Design tokens, biến CSS, thẻ body, thanh cuộn
│  │  └─ animations.css           # Keyframe animation, hiệu ứng aurora mesh
│  ├─ layout/
│  │  ├─ navbar.css               # Thanh điều hướng, hiệu ứng kính mờ, mobile menu
│  │  └─ nav-rail.css             # Thanh điều hướng section dạng ray nổi (desktop)
│  ├─ sections/
│  │  ├─ hero.css                 # Typography khu vực Hero, quầng sáng, dropdown CV
│  │  ├─ about.css                # 3 Trụ cột, 4 số liệu counter, ảnh lật 3D
│  │  ├─ cv.css                   # Thẻ hiển thị hồ sơ CV, huy hiệu và nút tải
│  │  ├─ projects.css             # Bộ lọc tab, carousel dự án, modal chi tiết
│  │  ├─ skills.css               # 4 Trụ cột kỹ năng, khối nút bấm kỹ năng
│  │  ├─ certs.css                # Thẻ chứng chỉ v2, thanh tiến trình điểm, tab lọc
│  │  ├─ github.css               # Thống kê GitHub, panel, biểu đồ hoạt động
│  │  ├─ terminal.css             # Cửa sổ Terminal CLI và widget REST API explorer
│  │  └─ contact.css              # Thẻ trạng thái làm việc, form liên hệ theo chủ đề
│  └─ components/
│     ├─ shared-cards.css         # Hiệu ứng hover và chiếu sáng viền dùng chung
│     ├─ toast.css                # Hệ thống thông báo toast nổi kính mờ
│     └─ fab.css                  # Nút tác vụ nổi (FAB) và menu liên hệ nhanh
├─ js/
│  ├─ bundle.min.js               # File script production đã gộp và nén (175 KB)
│  ├─ scripts.js                  # Bộ điều phối và khởi tạo toàn bộ ứng dụng
│  ├─ data/                       # Dữ liệu độc lập đóng vai trò Single Source of Truth
│  │  ├─ i18n.data.js             # Bộ từ điển song ngữ (VI / EN)
│  │  ├─ projects.data.js         # Dữ liệu đầy đủ của 7 dự án tiêu biểu
│  │  ├─ skills.data.js           # Danh mục kỹ năng và liên kết 2 chiều với dự án
│  │  └─ certs.data.js            # Dữ liệu của 8 chứng chỉ quốc tế đã xác thực
│  └─ modules/                    # Các controller chức năng theo module
│     ├─ i18n.js                  # Bộ máy chuyển đổi ngôn ngữ
│     ├─ theme.js                 # Bộ chuyển đổi Dark / Light mode
│     ├─ carousel.js              # Slider carousel dự án và cử chỉ vuốt
│     ├─ modal.js                 # Modal xem chi tiết kiến trúc dự án
│     ├─ skill-linking.js         # Liên kết tương tác 2 chiều Kỹ năng ↔ Dự án
│     ├─ terminal.js              # Trình giả lập dòng lệnh vu-cli và REST API console
│     ├─ fab.js                   # Điều khiển thanh tác vụ nổi (FAB)
│     ├─ section-nav.js           # Scrollspy cho thanh điều hướng ray nổi desktop
│     ├─ cert-modal.js            # Modal yêu cầu đối chiếu chứng chỉ & thanh điểm
│     ├─ cert-filter.js           # Bộ lọc chứng chỉ & nút Xem thêm / Thu gọn
│     ├─ email-copy.js            # Sao chép email 1-click kèm thông báo toast
│     ├─ contact-form.js          # Chip chủ đề, đếm ký tự & gửi form AJAX
│     ├─ github-stats.js          # Lấy số liệu GitHub API & đổi màu SVG theo theme
│     └─ ui-interactions.js       # Đồng hồ số đếm tăng dần, lật thẻ 3D, hiệu ứng gõ chữ
├─ scripts/
│  ├─ build-js.js                 # Script nối 19 file JS và nén bằng esbuild
│  └─ build_github_contrib_svgs.py# Script Python GraphQL lấy SVG đóng góp GitHub
├─ projects-docs/                 # Tài liệu kỹ thuật chi tiết cho từng dự án
└─ .github/workflows/
   ├─ static.yml                  # Pipeline tự động build & deploy lên GitHub Pages
   └─ update-github-contrib.yml   # Cron job tự động cập nhật SVG GitHub hằng ngày
```

---

## 📄 Các phiên bản CV chuyên biệt

Kho mã nguồn duy trì 2 bản CV chuyên nghiệp định dạng PDF trong `assets/cv/`:

1. **Fresher Backend Developer** (`assets/cv/TranHoHoangVu_BE.pdf`)
   - **Trọng tâm**: Node.js, Express.js, Laravel, Kiến trúc RESTful API, PostgreSQL (Raw SQL & Tối ưu hóa truy vấn), NoSQL MongoDB, Redis cache, JWT RBAC, Docker, và luồng tự động hóa CI/CD.
2. **AI Engineer Intern** (`assets/cv/TranHoHoangVu_AI.pdf`)
   - **Trọng tâm**: PyTorch, Deep Learning, Kiến trúc Transformers, Pipeline OCR (ResNet + Spatial Attention), Dịch máy ngôn ngữ tự nhiên Tiếng Việt (NLP), và Mô hình Machine Learning dự báo tài chính.

---

## 🚀 Chạy local & Quy trình Build

### Yêu cầu môi trường
- Node.js (khuyến nghị v18 trở lên)
- Python 3 (tùy chọn, dùng để mở máy chủ HTTP cục bộ)

### 1. Clone Kho mã nguồn
```bash
git clone https://github.com/tranhohoangvu/my-portfolio.git
cd my-portfolio
```

### 2. Cài đặt Thư viện
```bash
npm install
```

### 3. Build Tài nguyên Production
Để biên dịch cả Tailwind CSS và nén mã nguồn JavaScript:
```bash
npm run build
```

Các lệnh thực thi thành phần:
- **Build CSS**: `npm run build:css` (biên dịch `css/tailwind-input.css` sang `css/tailwind.css`)
- **Watch CSS**: `npm run watch:css` (tự động theo dõi và build lại Tailwind khi sửa CSS)
- **Build JS**: `npm run build:js` (gộp 19 file module JS và nén bằng esbuild thành `js/bundle.min.js`)

### 4. Chạy Web Cục bộ
```bash
# Dùng Python
python -m http.server 5500

# Hoặc dùng Node.js npx serve
npx serve . -l 5500
```
Mở trình duyệt tại địa chỉ: `http://localhost:5500`

---

## ⚙️ Cấu hình & Tùy biến nhanh

1. **Thông tin cá nhân & Tiểu sử**: Chỉnh sửa văn bản trong `index.html` và cặp key tương ứng trong `js/data/i18n.data.js`.
2. **Dữ liệu Dự án**: Thêm hoặc sửa danh sách dự án trong `js/data/projects.data.js`.
3. **Danh mục Kỹ năng**: Cập nhật kỹ năng và ánh xạ dự án trong `js/data/skills.data.js`.
4. **Chứng chỉ**: Cấu hình liên kết xác thực và đường dẫn PDF trong `js/data/certs.data.js`.
5. **Endpoint Formspree**: Thay thế mã Formspree trong `index.html`:
   ```html
   <form action="https://formspree.io/f/ma-form-cua-ban" method="POST">
   ```
6. **GitHub Username**: Thay đổi tên tài khoản trong `js/modules/github-stats.js`:
   ```javascript
   const GITHUB_USERNAME = "tranhohoangvu";
   ```

---

## 🤖 Luồng tự động hóa & CI/CD

- **Triển khai GitHub Pages (`.github/workflows/static.yml`)**:
  - Tự động kích hoạt mỗi khi có commit mới được push lên nhánh `main`.
  - Triển khai toàn bộ mã nguồn tĩnh trực tiếp lên môi trường GitHub Pages.
- **Đồng bộ Heatmap GitHub hằng ngày (`.github/workflows/update-github-contrib.yml`)**:
  - Chạy tự động mỗi ngày theo lịch trình cron (`00:00 UTC`).
  - Chạy `scripts/build_github_contrib_svgs.py` kết nối GitHub GraphQL API.
  - Commit trực tiếp biểu đồ SVG đóng góp mới nhất vào thư mục `assets/github/`.

---

## 🌍 Hướng dẫn Deploy

Dự án được cấu hình triển khai sẵn trên **GitHub Pages**:

1. Push toàn bộ thay đổi lên nhánh `main`.
2. Tại trang repo trên GitHub, truy cập **Settings ➔ Pages**.
3. Tại mục **Build and deployment ➔ Source**, chọn **GitHub Actions**.
4. Luồng Actions sẽ chạy và xuất bản website trực tuyến tại:
   `https://<username>.github.io/<repo>/`

---

## 🧠 Tối ưu hiệu năng & SEO

- **Hiệu năng Render**:
  - Toàn bộ trình lắng nghe cuộn trang (scroll listener) được điều tiết qua `requestAnimationFrame` để triệt tiêu hiện tượng giật lag layout thrashing.
  - Các chỉ số kích thước layout (scroll offset, chiều cao phần tử) được lưu bộ đệm (cache) và chỉ tính toán lại khi màn hình `resize`.
  - Quầng sáng aurora orbs dùng thuộc tính CSS `contain: layout style paint` kết hợp `transform: translateZ(0)` để GPU trực tiếp tăng tốc phần cứng.
  - Tự động tôn trọng cấu hình hệ thống `prefers-reduced-motion: reduce` để tắt bớt hiệu ứng chuyển động nặng.
- **Tối ưu hóa Bundle**:
  - Toàn bộ 19 file JS được nối chuỗi theo đúng thứ tự phụ thuộc và nén thành 1 bundle duy nhất (`js/bundle.min.js`, ~175 KB), không gây nghẽn render.
  - Các thư viện ngoài không thiết yếu (như `particles.js`) được trì hoãn tải (lazy load) khi trình duyệt rảnh rỗi.
- **Chuẩn hóa SEO**:
  - Đầy đủ thẻ canonical URL, mô tả meta description rõ ràng, thẻ Open Graph (`og:*`) và Twitter Card.
  - Tích hợp sơ đồ trang web (`sitemap.xml`) và hướng dẫn bot tìm kiếm (`robots.txt`).
  - Trang lỗi `404.html` đồng bộ giao diện nhận diện thương hiệu, theme và điều hướng quay về trang chủ.

---

## 📫 Thông tin liên hệ

- **Họ và tên**: Trần Hồ Hoàng Vũ
- **Email**: [hoangvu2k4cmg@gmail.com](mailto:hoangvu2k4cmg@gmail.com)
- **LinkedIn**: [linkedin.com/in/tranhohoangvu](https://linkedin.com/in/tranhohoangvu/)
- **GitHub**: [github.com/tranhohoangvu](https://github.com/tranhohoangvu)
- **Website Portfolio**: [tranhohoangvu.github.io/my-portfolio](https://tranhohoangvu.github.io/my-portfolio/)

---

<p align="center">
  <b>Thiết kế & Xây dựng với Tâm huyết bởi Trần Hồ Hoàng Vũ © 2026</b>
</p>
