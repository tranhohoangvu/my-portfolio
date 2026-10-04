# 🎓 Graduation Invitation & Milestone Portfolio

> **Thời gian thực hiện:** Tháng 9, 2026 - Hiện tại  
> **Vai trò:** Fullstack Developer (Architecture, UI/UX Engineering, Performance Optimization & Cloud Integration)  
> **Demo / Repository:** [Live Demo](https://hoangvu-graduation-invitation.vercel.app) | [GitHub Repository](https://github.com/tranhohoangvu/hoangvu-graduation-invitation)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu dự án:**
  - Xây dựng nền tảng web thiệp mời tốt nghiệp cá nhân hóa kết hợp nhật ký hành trình 4 năm đại học (2022 - 2026) của thủ khoa / tân cử nhân **Trần Hồ Hoàng Vũ** (Ngành Khoa học Máy tính - Khóa K26, Đại học Tôn Đức Thắng - TDTU).
  - Giải quyết bài toán chuyển đổi số thiệp mời truyền thống: Mang đến trải nghiệm thị giác hoàng gia trang nhã (*Royal Academic Letterpress*), hỗ trợ tự động cá nhân hóa danh xưng người nhận qua URL query parameters mà không cần backend phức tạp, cung cấp cẩm nang di chuyển 4 phương tiện và tour thực tế ảo VR 360°, đồng thời thu thập danh sách xác nhận tham dự (RSVP) kèm lời chúc thời gian thực về Google Sheets.
- **Nghiệp vụ cốt lõi & Luồng người dùng:**
  - **Màn hình chào Mascot Preloader (2022 — 2026):** Trải nghiệm tải trang 1.5 giây với hình tượng Linh vật Cử nhân TDTU chạy dọc thanh tiến trình 4 năm đại học, tạo điểm nhấn thương hiệu cá nhân và cảm xúc trang trọng ngay từ giây đầu tiên.
  - **Cá nhân hóa thiệp mời tự động (URL Query Personalization):** Khách mời nhận đường dẫn riêng (ví dụ: `?to=Minh%20Vũ` hoặc `?name=Thầy%20Nam`); hệ thống tự động trích xuất và hiển thị danh xưng viết tay thư pháp (*Great Vibes*) trang trọng trên khung thiệp lụa hoàng gia, triệt tiêu hoàn toàn lỗi Hydration Mismatch.
  - **Thẻ sự kiện danh dự (Ceremony Plaque) & Lịch Save The Date:** Trình bày thời gian (`09:00 — 11:00`), địa điểm Hội trường A, tích hợp **Lịch mini Tháng 10/2026** với vòng tròn nét vẽ dạ đỏ thủ công (*Hand-drawn sketch circle*) bao quanh ngày 17/10/2026, nút thêm nhanh sự kiện vào **Google Calendar 1-Click** (chuẩn hóa RFC 3986) và dẫn đường Google Maps.
  - **Xác nhận tham dự thông minh & Gửi lời chúc mừng (Interactive RSVP & Wishes Flow):** Khách xác nhận tham dự và để lại lời nhắn chúc mừng; dữ liệu được ghi nhận vào `localStorage` (chống gửi trùng) và đồng bộ tức thời lên Google Sheets qua Serverless Route Handler; mở modal cảm ơn với hoạt họa Linh vật Mascot cử nhân TDTU chào mừng.
  - **Cẩm nang thông hành khuôn viên & Tour VR 360° (Campus Navigation):** Phân luồng chỉ dẫn di chuyển trực quan cho 4 loại phương tiện: Xe máy (Cổng 7-9), Ô tô (Cổng 9), Xe công nghệ (Cổng 1-2 đón trả gần Hội trường A) và Xe buýt (Tuyến 31 trong trường, tuyến 68/72/86 vỉa hè cổng 1); tích hợp bản đồ mặt bằng 3D, hệ thống Lightbox xem ảnh và liên kết VR Tour 360° của TDTU.
  - **Nhật ký hành trình & Thư viện 136 ảnh kỷ niệm (Story Timeline & Mosaic Memories):** Timeline 4 năm đại học và phòng trưng bày 136 ảnh kỷ niệm nén chuẩn WebP, chia thành 6 album chủ đề với tab lọc hoàng gia; hỗ trợ mở rộng / thu gọn 1 lượt linh hoạt và tự động cuộn thông minh.
  - **Đa kênh liên hệ nổi (Speed Dial FAB) & Nhạc nền Ambient:** Nút nổi Mascot cử nhân TDTU tương tác mở nhanh 3 kênh (Hotline gọi điện, Chat Zalo, Facebook Messenger); widget phát nhạc nền piano acoustic êm dịu góc màn hình; con trỏ chuột Native CSS viền vàng kim đạt độ trễ 0ms; công cụ tạo link mời cá nhân hóa ẩn ở chân trang.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Mô hình **Server-Driven Jamstack & Component-Driven Architecture** trên nền tảng **Next.js 16 (App Router, Turbopack, React 19)** kết hợp **Serverless Webhook Gateway**:
  - **Presentation Layer (Modular Section Hierarchy):** Trang đơn (*Single-Page Application*) gồm 9 section độc lập (`Hero`, `Details`, `Invitation`, `Campus`, `ImportantNotes`, `Story`, `Memories`, `Countdown`, `Final`) cùng các thành phần layout điều hướng (`Nav`, `Footer`) và các UI Primitives chuyên biệt (`MascotPreloader`, `AudioPlayer`, `RsvpModal`, `ShareModal`, `ImageLightbox`).
  - **State & Custom Hooks Layer:** Quản trị trạng thái độc lập qua custom hooks (`useInvitee` quản lý đồng bộ query param và chống SSR mismatch, hook kiểm soát trình phát nhạc và scroll spy listener chạy trên `requestAnimationFrame`).
  - **Data Layer (Single Source of Truth - SSOT):** Tách biệt toàn bộ dữ liệu nội dung, cấu hình sự kiện, timeline, thông tin liên hệ và danh mục 136 ảnh vào `src/data/graduation.ts`. Mọi nhãn hiển thị ngày tháng, thứ tiếng Việt đều được suy luận từ `ceremony.startISO` qua hàm tiện ích `src/lib/date.ts`.
  - **API & Integration Layer (Next.js Route Handlers):** Endpoint `/api/rsvp` đóng vai trò là một Reverse Proxy / API Gateway bảo mật, tiếp nhận payload RSVP từ client, xác thực dữ liệu đầu vào và chuyển tiếp bất đồng bộ sang Google Apps Script Webhook.
- **Triết lý và quyết định thiết kế kỹ thuật:**
  - **Tĩnh hóa tối đa (SSG / Pre-rendering First):** Tận dụng tối đa khả năng build tĩnh của Next.js App Router để đạt tốc độ phản hồi tức thì (TTFB < 50ms) trên Vercel Edge Network.
  - **Bảo toàn Hydration (Zero Hydration Mismatch):** Toàn bộ thao tác truy cập môi trường trình duyệt (`window`, `localStorage`, `document.location`) được cô lập nghiêm ngặt trong `useEffect` sau khi component đã mount.
  - **Thiết kế đồ họa Vector liền khối (Unified Vector Assets):** Rèm nhung hoàng gia (`RoyalCurtain.tsx`) và dải ruy băng cử nhân (`GraduationSash.tsx`) được lập trình 100% bằng SVG vector với gradient đa điểm, loại bỏ việc tải ảnh raster nặng nề, sắc nét tuyệt đối trên mọi độ phân giải màn hình.
  - **Chuyển động phần cứng tối ưu (Hardware-Accelerated 60-120 FPS):** Tận dụng `motion/react` và CSS transitions thuần GPU (`transform`, `opacity`), tránh hoàn toàn các thuộc tính gây Layout Thrashing trên CPU (`top`, `margin`, `height`).

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ cơ sở dữ liệu & Mô hình lưu trữ dữ liệu:**
  - **Google Sheets Database (Cloud Persistence via Webhook):** Sử dụng Google Sheets làm cơ sở dữ liệu phi máy chủ (Serverless Database) thông qua Google Apps Script Webhook API. Dữ liệu xác nhận tham dự (`guestName`, `wishes`, `timestamp`) được lưu trữ dạng append-only, cho phép chủ nhân buổi lễ theo dõi, trích xuất và lọc danh sách khách mời thời gian thực mà không phát sinh chi phí vận hành máy chủ CSDL.
  - **Client-Side Local Storage (State Persistence & Anti-Spam):** Sử dụng `localStorage` (`rsvp_confirmed_data`) để lưu vết trạng thái xác nhận và nội dung lời chúc của người dùng ngay trên trình duyệt, đảm bảo tính toàn vẹn dữ liệu khi F5/tải lại trang và ngăn chặn hành vi gửi lặp nhiều lần.
  - **Typed In-Memory Data Schema (SSOT):** Toàn bộ cấu trúc thực thể (`graduate`, `ceremony`, `contact`, `story`, `memories`) được định nghĩa bằng TypeScript với thuộc tính `as const` / strict types trong `src/data/graduation.ts`.
- **Kỹ thuật tối ưu hóa và xử lý dữ liệu:**
  - **Data Sanitization & Payload Validation:** Route handler `/api/rsvp` thực hiện chuẩn hóa chuỗi dữ liệu (cắt tỉa khoảng trắng, giới hạn `guestName <= 60 ký tự`, `wishes <= 500 ký tự`) và kiểm soát timeout bằng `AbortSignal.timeout(8000)` trước khi gửi lên webhook.
  - **WebP Image Processing Pipeline:** Toàn bộ 136 hình ảnh kỷ niệm và tài nguyên khuôn viên được chuyển đổi nén sang định dạng `.webp` với chất lượng 85%, giảm hơn 70% tổng dung lượng tài nguyên tĩnh so với ảnh gốc, cải thiện vượt bậc các chỉ số Core Web Vitals (LCP, CLS).
  - **RFC 3986 Standard URL Generation:** Xây dựng module `src/lib/calendar.ts` mã hóa chuẩn các tham số thời gian UTC (`YYYYMMDDTHHmmssZ`), địa điểm và mô tả sự kiện cho Google Calendar, tránh hoàn toàn lỗi vỡ liên kết do ký tự Unicode tiếng Việt có dấu.
  - **Date Derivation Engine:** Giải thuật tính toán ngày giờ tự động phân tích cú pháp chuỗi chuẩn ISO 8601 (`2026-10-17T09:00:00+07:00`) thành các nhãn ngày, thứ tiếng Việt và số giây đếm ngược, đảm bảo tính nhất quán 100% giữa Countdown, Plaque và Calendar.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Hiện tượng giật lag, rớt khung hình (Layout Thrashing) và xung đột kính mờ (Double Backdrop Filter) trên thiết bị di động (đặc biệt iOS Safari 120Hz ProMotion)**  
  *Thách thức:* Khi người dùng lướt trang hoặc nhấn mở menu điều hướng tròn trên iPhone, trình duyệt WebKit bị nghẽn compositor do các lớp `backdrop-filter: blur(...)` lồng nhau đa tầng giữa Header và Drawer, kết hợp animation thay đổi vị trí CPU (`top`) và các scroll listener liên tục gọi `getBoundingClientRect`, làm tốc độ khung hình tụt xuống dưới 30 FPS.  
  *Giải pháp:*  
  1. Loại bỏ hoàn toàn `backdrop-blur-lg` tại Menu Mobile Drawer và cụm nút nổi chân trang; thay thế bằng màu nền giấy đục tinh chỉnh `bg-paper/98` với viền mạ vàng mỏng, giải phóng GPU khỏi việc tái lấy mẫu pixel liên tục trên từng frame.  
  2. Chuyển đổi toàn bộ hoạt ảnh của nút Hamburger và Drawer sang các phép biến đổi hình học GPU thuần túy (`transform: translateY(...) rotate(...)`) với CSS transition 150-250ms, triệt tiêu 9 bộ đếm thời gian JavaScript `staggerChildren` của Framer Motion khi vừa chạm, đưa độ trễ phản hồi về mức 0ms.  
  3. Thao tác cuộn mượt mà không khựng: Gỡ bỏ khai báo `scroll-behavior: smooth` tĩnh trên `:root` HTML (nguyên nhân gây xung đột với cơ chế gia tốc quán tính ngón tay trên iOS), kích hoạt `-webkit-overflow-scrolling: touch;`, và kiểm soát nhịp các scroll listener bằng `requestAnimationFrame`.  
  4. Xây dựng tiện ích `scrollToSection` tính toán bù trừ chính xác chiều cao thanh Header cố định kết hợp sự kiện `scrollend` để khóa tạm thời Scroll Spy, ngăn ngừa thanh chỉ mục nhấp nháy qua các mục trung gian.

- **Bài toán 2: Khắc phục triệt để lỗi Hydration Mismatch và giật xô lệch bố cục (Cumulative Layout Shift - CLS) khi cá nhân hóa giao diện và chuyển trạng thái Navigation**  
  *Thách thức:* Việc render SSR/SSG tên khách mời từ query parameter (`?to=`), đọc trạng thái RSVP từ `localStorage`, đồng bộ Countdown và đổi kiểu chữ sang in đậm (`font-bold`) khi active menu trên Navbar gây ra sự chênh lệch cấu trúc DOM giữa Server và Client, dẫn đến lỗi React Hydration Mismatch nghiêm trọng và hiện tượng Navbar bị giật phình to chiều rộng (CLS).  
  *Giải pháp:*  
  1. Xây dựng Custom Hook `useInvitee` với cơ chế Client-Mounting Guard: Quá trình đọc `window.location.search` và `localStorage` được hoãn lại bên trong `useEffect` sau khi hydration đã hoàn tất. Phía server render sẵn giá trị fallback mặc định trang nhã ("Bạn"), sau đó client thực hiện re-render mềm mại mà không làm vỡ DOM tree.  
  2. Kỹ thuật Zero Layout Shift trên Navbar: Thiết kế một thẻ span ẩn có sẵn thuộc tính `invisible font-bold select-none` nằm đè cùng vị trí để cố định sẵn chiều rộng tối đa của từng nhãn mục, loại bỏ hoàn toàn tình trạng nút bấm bị phình to làm xô lệch các phần tử xung quanh khi kích hoạt trạng thái active.  
  3. Tiền tính toán hằng số ở module-level: Toàn bộ giá trị lượng giác `Math.cos`/`Math.sin` của SVG rèm hoàng gia và chuỗi thời gian được tính toán sẵn từ đầu, ngăn ngừa sai số làm tròn số thực giữa môi trường Node.js server và trình duyệt client.

- **Bài toán 3: Tối ưu hóa hiệu năng tải và hiển thị thư viện 136 ảnh kỷ niệm cùng đồ họa Vector phức tạp (SVG Royal Curtain & Mascot) mà vẫn giữ dung lượng bundle siêu nhẹ**  
  *Thách thức:* Trang web tích hợp khối lượng tài nguyên thị giác lớn gồm 136 ảnh kỷ niệm sinh viên, 4 ảnh khuôn viên TDTU độ nét cao, cùng cấu trúc rèm nhung hoàng gia SVG có nhiều đường cong Bézier, tua rua ngọc trai và linh vật Mascot cử nhân. Nếu nạp đồng loạt sẽ gây tắc nghẽn băng thông, làm cạn kiệt bộ nhớ DOM và làm giảm mạnh chỉ số LCP.  
  *Giải pháp:*  
  1. Đồ họa Vector thuần mã (Code-based SVG Rendering): Lập trình toàn bộ `RoyalCurtain.tsx` bằng 100% mã SVG vector với 2 path nửa vòm và cánh rèm đối xứng liền khối, dùng gradient đa điểm mô phỏng chiều sâu nhung xanh navy (`#060d1e` → `#22387a`), hiển thị siêu nét trên màn hình Retina mà không tốn bất kỳ lượt request HTTP tải ảnh nào.  
  2. Kiến trúc hiển thị ảnh 2 cấp (Two-tier Gallery Display): Phân loại 136 ảnh vào 6 album chuyên biệt; mỗi album chỉ hiển thị mặc định 6 ảnh đầu tiên (1 hàng trên desktop, 2 hàng trên mobile). Tích hợp cơ chế Toggle 1 chạm: Mở toàn bộ ảnh còn lại khi nhấn "Xem thêm" và thu gọn tức thì về 6 ảnh kèm tự động cuộn mượt về đầu danh mục khi nhấn "Thu gọn".  
  3. Áp dụng chuẩn nén WebP kết hợp `loading="lazy"` và `decoding="async"` trên toàn bộ thẻ ảnh; tách các modal tương tác nặng (`RsvpModal`, `ImageLightbox`) thành Dynamic Components thông qua `next/dynamic` (`ssr: false`) để chỉ tải JavaScript bundle khi người dùng thực sự kích hoạt.

---

## 5. Công nghệ & Thư viện sử dụng
- **Ngôn ngữ & Nền tảng:** TypeScript 5, Node.js (>= 18.18.0 / LTS v20.x).
- **Frontend Framework:** Next.js 16.3.7 (App Router, Turbopack, React 19.2.8).
- **Styling & Design System:** Tailwind CSS v4 (`@tailwindcss/postcss`, CSS Variables & `@theme`), Native CSS Hardware-accelerated Custom Cursor (`0ms latency`).
- **Typography:** Google Fonts (`Fraunces` Variable Serif cho tiêu đề trang trọng, `Great Vibes` Cursive cho tên khách mời viết tay, `Inter` cho nội dung và số liệu kỹ thuật).
- **Animation & Micro-interactions:** `motion` (`motion/react` v13.4.6, Framer Motion API), GPU-accelerated CSS Transforms (`translateY`, `rotate`, `scaleY`), `useReducedMotion` Accessibility.
- **Backend & Cloud Services:** Next.js Serverless Route Handlers (`/api/rsvp`), Google Apps Script API (Google Sheets Webhook), LocalStorage Client Caching.
- **DevOps & Công cụ phát triển:** ESLint 9, PostCSS, Vercel Edge Platform Deployment, Git, WebP Image Compression Pipeline.
