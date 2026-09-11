# 🚀 Bảng Tối Ưu Hiệu Năng & Kế Hoạch Thực Hiện (Duy Nhất)

> **Nguyên tắc sắp xếp**: Toàn bộ các hạng mục **CHƯA LÀM** được đưa lên đầu bảng theo mức độ ảnh hưởng. Toàn bộ các mục đã hoàn thành (bao gồm Phase 1-6, WebP, Tách Projects, Tối ưu CSS/GPU, SW v14, Scroll Observer) được tổng hợp chi tiết ở nửa dưới bảng.

---

## 📊 BẢNG TỔNG HỢP DUY NHẤT

| STT | Tên Hạng Mục & Vấn Đề Giải Quyết | Mức độ | Trạng thái | Việc kỹ thuật cụ thể cần làm | File liên quan |
|:---:|---|:---:|:---:|---|---|
| **01** | **Đóng gói Bundle & Nén JavaScript**<br>*(18 file script riêng lẻ gây phân mảnh HTTP requests)* | 🟠 **TRUNG BÌNH** | ❓ **CẦN BẠN DUYỆT** *(Có / Không)* | Thiết lập build script cực nhẹ bằng `esbuild` gom 18 module thành 1 file duy nhất `bundle.min.js`. Giảm tối đa roundtrip mạng trên thiết bị di động (nếu không gộp thì vẫn giữ `defer` an toàn). | Thư mục `js/` |
| **02** | **Dọn dẹp CSS thừa & Backdrop-filter**<br>*(tailwind.css 53KB, backdrop-filter ở 20+ chỗ)* | 🟠 **TRUNG BÌNH** | ⏳ **CHƯA LÀM** | Giảm bớt độ mờ `backdrop-filter: blur()` trên thiết bị màn hình nhỏ / di động để tránh tụt FPS khi cuộn; purge bớt các CSS class không dùng. | `css/tailwind.css`<br>`css/styles.css` |
| --- | --- | --- | --- | --- | --- |
| **03** | **Tối ưu CSS & Giảm tải GPU (Phase 4 cũ)** | 🟠 **TRUNG BÌNH** | ✅ **ĐÃ XONG** | • Xóa `scroll-behavior: smooth` xung đột trong `tokens.css`.<br>• Cách ly layer Aurora Orbs (`contain: strict`, `isolation: isolate`, `filter: blur(60px)`) trong `animations.css`.<br>• Tạo `performance.css` kích hoạt `content-visibility: auto` cho sections below-the-fold và import vào `styles.css`. | [`css/base/tokens.css`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/css/base/tokens.css)<br>[`css/base/animations.css`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/css/base/animations.css)<br>[`css/base/performance.css`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/css/base/performance.css)<br>[`css/styles.css`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/css/styles.css) |
| **04** | **Nâng cấp Service Worker & Cache PWA (Phase 5 cũ)** | 🟡 **THẤP** | ✅ **ĐÃ XONG** | • Nâng `sw.js` lên **`v14`**, cập nhật đầy đủ toàn bộ 19 file CSS modules và 14 file JS modules vào danh sách `PRECACHE`.<br>• Đổi `Date.now()` trong `github-stats.js` sang hash phiên theo giờ để trình duyệt cache được SVG stats. | [`sw.js`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/sw.js)<br>[`js/modules/github-stats.js`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/js/modules/github-stats.js) |
| **05** | **Tối ưu mượt cuộn trang (Phase 6 cũ)** | 🟡 **THẤP** | ✅ **ĐÃ XONG** | Áp dụng `ResizeObserver` cho thanh tiến trình cuộn `initScrollProgressBar()` trong `ui-interactions.js`, bắt kịp mọi thay đổi chiều cao DOM khi tải ảnh lười và loại bỏ hiện tượng tính sai tỷ lệ cuộn. | [`js/modules/ui-interactions.js`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/js/modules/ui-interactions.js) |
| **06** | **Chuyển đổi toàn bộ ảnh sang WebP & Xóa PNG thừa** | 🔴 **CAO** | ✅ **ĐÃ XONG** | • Convert 12 ảnh sang `.webp` (giảm **84.1%**, từ 7.9 MB xuống còn 1.26 MB).<br>• Đã xóa 11 file PNG/JPG nặng, giải phóng **7.90 MB** dung lượng repo.<br>• Giữ lại `og-image-v2.png` cho bot mạng xã hội và `icons/` cho PWA. | Thư mục `assets/`<br>[`index.html`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/index.html) |
| **07** | **Tách HTML Dự án (Projects Showcase)** | 🔴 **CAO** | ✅ **ĐÃ XONG** | Đã tách 479 dòng HTML tĩnh của 7 dự án sang engine render động trong `projects.data.js`, ép `index.html` từ 167 KB xuống còn **136 KB** (tổng giảm ~60 KB từ ban đầu 195 KB). | [`index.html`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/index.html)<br>[`js/data/projects.data.js`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/js/data/projects.data.js) |
| **08** | **Tối ưu nạp ảnh cơ bản (Phase 1 cũ)** | 🔴 **CAO** | ✅ **ĐÃ XONG** | Đã thêm `preload` + `fetchpriority="high"` cho Hero, `loading="lazy"` + `decoding="async"` cho toàn bộ ảnh còn lại. | [`index.html`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/index.html) |
| **09** | **Script Defer & Tách Certs HTML (Phase 3 cũ)** | 🔴 **CAO** | ✅ **ĐÃ XONG** | Đã gắn `defer` cho toàn bộ `<script>`; tách dữ liệu 8 chứng chỉ sang `certs.data.js` (giảm HTML thêm ~35 KB ban đầu). | [`index.html`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/index.html)<br>[`js/data/certs.data.js`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/js/data/certs.data.js) |
| **10** | **Trì hoãn nạp hiệu ứng Hạt Particles.js** | 🟠 TB | ✅ **ĐÃ XONG (Lazy)** | Đã chuyển sang nạp động sau khi trang tải xong (`window.onload`), không còn block render ban đầu. | [`index.html`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/index.html) |
| **11** | **Resource Hints & Preload Fonts (Phase 2 cũ)** | 🟡 Thấp | ✅ **ĐÃ XONG** | Đã thêm `preload` cho `styles.css`, `preconnect` cho Google Fonts, `font-display: swap`. | [`index.html`](file:///d:/CODE/2025/PORTFOLIO/my-portfolio/index.html) |

---

## 🧭 TỔNG KẾT TIẾN ĐỘ

* **Đã hoàn thành**: **9 / 11** hạng mục (đạt **~82%** tổng kế hoạch tối ưu).
* **Còn lại**:
  1. **Mục 01 (Bundle JS)**: Quyết định có muốn gộp 18 module thành 1 file bundle không.
  2. **Mục 02 (Purge CSS)**: Dọn dẹp class dư thừa trong `tailwind.css`.
