# Hoang Vu Math Portal (Cổng Thông Tin Học Thuật & Tuyển Sinh Toán THCS)

> **Thời gian:** 08/2026 - 09/2026  
> **Vai trò:** Fullstack / Frontend Lead & UI/UX Designer  
> **Demo / Repository:** [Live Demo](https://hoangvumathcenter.vercel.app/) | [GitHub Repository](https://github.com/tranhohoangvu/hoangvu-math-portal)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi

### Bối cảnh & Mục tiêu dự án
**Hoang Vu Math Portal** là nền tảng web tuyển sinh và cổng thông tin học thuật trực tuyến của **Trung tâm Bồi dưỡng Kiến thức Trần Hoàng Vũ** (Ea Kiết, Đắk Lắk), do **cô Hồ Thị Hoa** (Giáo viên môn Toán tại Trường TH & THCS Hoàng Văn Thụ) trực tiếp phụ trách giảng dạy. Dự án giải quyết bài toán số hóa quy trình tuyển sinh, tư vấn lộ trình học tập Toán THCS (lớp 6, 7, 8, 9, ôn thi vào lớp 10 và bồi dưỡng Học sinh giỏi) và kết nối tức thì giữa giáo viên với phụ huynh học sinh vùng địa phương mà không phụ thuộc vào hạ tầng backend cồng kềnh.

### Luồng nghiệp vụ & Tính năng người dùng cốt lõi
- **Chương trình học chuẩn hóa (Curriculum Catalog):** Trình bày chi tiết mục tiêu, chuẩn kiến thức GDPT mới và lộ trình đào tạo theo từng khối lớp (Lớp 6 - Nền tảng, Lớp 7 - Tư duy, Lớp 8 - Bứt phá, Lớp 9 - Về đích, Lớp ôn thi vào 10 chuyên sâu và lớp Học sinh giỏi).
- **Client-Side Smart Enrollment Engine:** Biểu mẫu đăng ký học tập đa tiêu chí (chọn khối lớp, mục tiêu học tập: lấy gốc / nâng cao / vào 10 / HSG, thời gian học mong muốn). Hệ thống tự động biên soạn nội dung tin nhắn có cấu trúc chuẩn hóa (`composeMessage`) để chuyển tiếp sang Zalo cá nhân của giáo viên, đi kèm nút làm mới biểu mẫu (Reset Form) và mã QR Zalo trực quan.
- **Thanh liên hệ nổi đa kênh (Floating Action Bar - FAB):** Cụm công cụ tương tác cố định trên màn hình (Hotline & Zalo) tích hợp hiệu ứng rung chuông mô phỏng cuộc gọi (`animate-phone-ring`), cho phép gọi trực tiếp trên thiết bị di động hoặc kích hoạt modal quét mã QR Zalo tiện lợi trên máy tính để bàn.
- **Widget Toán học tương tác (Interactive Math Quiz):** Module giải toán tương tác client-side cho từng khối lớp, cho phép học sinh xem câu hỏi hàng ngày, mở gợi ý phương pháp giải và đối chiếu kết quả tức thì.
- **Định vị & Bản đồ số (Embedded Interactive Google Maps):** Tích hợp khung bản đồ tương tác vệ tinh/giao thông tại cơ sở dạy học (Thôn Tân An / Thôn 8 cũ, Ea Kiết), hỗ trợ tra cứu lộ trình đưa đón con thuận tiện.
- **Triết lý giáo dục & Cam kết chất lượng:** Trình bày minh bạch thông tin giáo viên chính quy, phương pháp giảng dạy lấy bản chất làm trọng tâm, cam kết lớp nhỏ kèm sát và cơ chế giải đáp thắc mắc thường gặp (FAQ Accordion).

---

## 2. Kiến trúc Hệ thống (System Architecture)

### Mô hình kiến trúc tổng thể
Hệ thống được xây dựng theo kiến trúc **Modern Jamstack / Edge-Rendered SPA** kết hợp với **TanStack Start** và **Nitro Engine**, tối ưu hóa cho tốc độ phản hồi tức thì (Sub-second FCP/LCP) và triển khai trên hạ tầng mạng biên (Edge/Serverless):

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User Client / Browser                           │
│  (Mobile Web, Desktop Browsers, Zalo In-App Browser, PWA Ready)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 Edge Routing & Presentation Layer                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  TanStack Router v1 (100% Strict Type-Safe Route Trees)           │  │
│  │  - File-Based Routing (`src/routes/__root.tsx`, `index.tsx`)     │  │
│  │  - Type-safe auto-generated route manifest (`routeTree.gen.ts`)   │  │
│  │  - Declarative Error Boundaries & 404 Fallback Handlers          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Atomic UI & Design System Layer                                 │  │
│  │  - Radix UI Headless Primitives (Slot, Label, Dialog, Accordion) │  │
│  │  - CVA (Class Variance Authority) Multi-variant Buttons          │  │
│  │  - Tailwind CSS v4 CSS-First Engine (@theme OKLab Color Space)   │  │
│  │  - GPU-accelerated Keyframe Micro-animations                     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Client Interaction & State Orchestration Layer                  │  │
│  │  - React 19 Concurrent Features & Strict State Management        │  │
│  │  - Payload Composer Engine (`composeMessage`)                    │  │
│  │  - On-the-Fly Dynamic QR Code Generator                         │  │
│  │  - Math Widget State (Step-by-step hint & solution toggle)       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Build, Deployment & Distribution Layer                   │
│  - Vite 8.x + LightningCSS Bundler & HMR Engine                       │
│  - Nitro Server Engine (Target: Vercel Serverless / Edge Function)     │
│  - Static Asset Pipeline (SVG Icons, WebP/Optimized JPG Assets)        │
│  - External Integrations: Zalo Open URI Protocol, Google Maps Embed   │
└────────────────────────────────────────────────────────────────────────┘
```

### Triết lý và Quyết định Thiết kế Kỹ thuật
1. **Zero-Database Serverless Architecture:** Thay vì duy trì một hệ thống backend cơ sở dữ liệu tốn kém chi phí vận hành và tiềm ẩn nguy cơ lộ thông tin liên hệ của học sinh, toàn bộ dữ liệu đăng ký được mã hóa và tổng hợp client-side thành payload tin nhắn chuẩn hóa gửi trực tiếp đến Zalo của giáo viên.
2. **Type Safety End-to-End:** Sử dụng TypeScript 5.7 kết hợp cây định tuyến tự động sinh (`routeTree.gen.ts`) của TanStack Router, loại bỏ hoàn toàn rủi ro runtime URL mismatches hoặc broken navigation.
3. **Academic Editorial Design System:** Xây dựng giao diện đậm chất học thuật truyền thống pha lẫn công nghệ hiện đại thông qua font chữ Fraunces (Academic Serif), kết hợp bảng màu tương phản cổ điển (Deep Navy `#081f45`, Classic Gold `#c4961a`, Cream `#f3ede0` và Paper `#faf7f1`) định nghĩa trực tiếp bằng CSS Variables trong `@theme`.
4. **WAI-ARIA & Accessibility First:** Tích hợp các headless primitives từ Radix UI giúp giao diện đạt chuẩn tiếp cận cho người dùng khiếm thị, hỗ trợ bàn phím đầy đủ (keyboard navigation) và focus trapping an toàn trên các modal hộp thoại.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)

### Mô hình hóa dữ liệu (Static Schemas & Config-Driven Data)
Hệ thống áp dụng mô hình **Config-Driven Architecture**, tập trung toàn bộ dữ liệu cấu hình, nghiệp vụ, thông tin giảng viên và ngân hàng bài tập tại module `src/lib/site.ts` dưới dạng `const assertions` bất biến (Immutable Data Structures):

- **`SITE` & `TEACHER_INFO`:** Định nghĩa profile giảng viên, số điện thoại hotline, đường dẫn định danh Zalo, tọa độ bản đồ Google Maps và địa chỉ hành chính song song (Thôn Tân An mới & Thôn 8 cũ).
- **`PROGRAMS` Schema:** Cấu trúc phân cấp các chương trình đào tạo theo khối lớp (`grade: "6" | "7" | "8" | "9" | "HSG" | "10"`), tiêu đề trọng tâm và nội dung chuẩn đầu ra.
- **`PROBLEMS` Math Bank:** Cấu trúc bài tập tương tác gồm đề bài, biểu thức đại số, gợi ý tư duy logic (`hint`) và đáp án chi tiết (`answer`).
- **`LEARNING_GOALS` & `TIME_PREFERENCES`:** Danh mục định sẵn các mục tiêu bồi dưỡng và khung thời gian hỗ trợ phụ huynh tick chọn nhanh.

### Pipeline Xử lý Dữ liệu Tuyển sinh Client-Side
```typescript
export function composeMessage(input: {
  parent: string;
  student: string;
  program: string;
  goal?: string;
  timeSlot?: string;
  phone: string;
  note: string;
}): string {
  const lines = [
    `Dạ cô Hoa, em muốn đăng ký học Toán tại Trung tâm Trần Hoàng Vũ.`,
    input.student ? `Học sinh: ${input.student}.` : "",
    input.program ? `Khóa học: ${input.program}.` : "",
    input.goal ? `Mục tiêu: ${input.goal}.` : "",
    input.timeSlot ? `Thời gian mong muốn: ${input.timeSlot}.` : "",
    input.parent ? `Phụ huynh: ${input.parent}.` : "",
    input.phone ? `SĐT: ${input.phone}.` : "",
    input.note ? `Ghi chú: ${input.note}.` : "",
  ].filter(Boolean);
  return lines.join(" ");
}
```
Dữ liệu biểu mẫu được làm sạch, loại bỏ các trường rỗng và sinh chuỗi truy vấn chuẩn hóa. Khi kích hoạt gửi tin, client tự động tạo liên kết URI `zalo.me` hoặc sao chép nhanh vào clipboard kèm thông báo trực quan từ **Sonner Toast**.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)

### Bài toán 1: Tối ưu hóa Chuyển đổi Tuyển sinh Đa kênh (Zero-Loss Lead Generation)
- **Thách thức:** Phần lớn phụ huynh tại khu vực địa phương tiếp cận thông tin trên thiết bị di động, nhưng biểu mẫu web truyền thống lưu vào database thường có độ trễ lớn trong việc phản hồi, dễ dẫn đến mất học viên tiềm năng do giáo viên không kịp kiểm tra email hay CMS quản trị.
- **Giải pháp kỹ thuật:** 
  - Triển khai cơ chế **Direct Channel Bridging**: Tự động chuyển đổi dữ liệu form thành tin nhắn chuẩn hóa gửi trực tiếp đến Zalo cá nhân giáo viên.
  - Xây dựng **Dynamic QR Code Engine** tích hợp trong modal máy tính để bàn: Phụ huynh xem trên laptop/PC có thể dùng camera điện thoại quét mã QR Zalo kết bạn và nhắn tin tức thì.
  - Thiết kế **Floating Contact Bar (FAB)** với hiệu ứng mô phỏng rung chuông điện thoại (`animate-phone-ring`) và hào quang lan tỏa (`animate-pulse-ring`) thu hút ánh nhìn nhưng tự động dừng khi hover (`pause on hover`) để tránh gây khó chịu thị giác.

### Bài toán 2: Đảm bảo Type Safety Tuyệt đối và Khả năng Tương thích với React 19 & Tailwind CSS v4
- **Thách thức:** Việc kết hợp hệ sinh thái mới nhất gồm **React 19**, **Tailwind CSS v4** (chuyển đổi từ `tailwind.config.js` sang cấu hình thuần CSS `@theme`) và **TanStack Router v1** thường xuyên gặp lỗi không tương thích về kiểu dữ liệu và build tooling.
- **Giải pháp kỹ thuật:**
  - Cấu hình kiến trúc file-based routing với plugin `@tanstack/router-plugin` của Vite, tự động phân tích và sinh file `routeTree.gen.ts` đạt mức an toàn kiểu dữ liệu 100% khi compile.
  - Sử dụng `@tailwindcss/vite` với bộ parser CSS LightningCSS, chuyển đổi toàn bộ token thiết kế (màu sắc OKLab, độ giãn chữ, timing functions) vào thẻ `@theme` của file `styles.css`.
  - Tách biệt ranh giới Error Boundary và 404 Fallback component chuyên biệt (`RouterErrorComponent`, `RouterNotFoundComponent`) giúp ứng dụng tự phục hồi mà không bao giờ bị sập trắng trang.

### Bài toán 3: Tối ưu Tốc độ Tải trang (Core Web Vitals) & Tiếp cận Học thuật (Accessibility)
- **Thách thức:** Trang web học thuật yêu cầu nhiều typography trang trọng, hình ảnh tư liệu lớp học và widget tương tác, nếu không xử lý tốt sẽ gây layout shift (CLS cao) và tốc độ tải trang chậm trên mạng 3G/4G nông thôn.
- **Giải pháp kỹ thuật:**
  - **Font & Asset Preloading:** Preload Google Fonts (`Fraunces` & `Inter`) với thuộc tính `font-display: swap`, nén toàn bộ tài nguyên hình ảnh (`og.jpg`, `classroom.jpg`, `co-hoa.jpg`) tối ưu kích thước và sử dụng thẻ `<link rel="preload">`.
  - **Component Level Code Splitting & Pure CSS Animations:** Chuyển đổi toàn bộ hiệu ứng chuyển động phức tạp (shimmer button, floating math symbols, pulsing ring) sang pure CSS keyframes tăng tốc phần cứng qua GPU (`transform: translate3d`), đạt chỉ số Lighthouse Performance > 95 và CLS = 0.
  - **Tuân thủ chuẩn WAI-ARIA:** Sử dụng Radix UI primitives (`Slot`, `Dialog`, `Label`) với thuộc tính `aria-expanded`, `aria-controls` và focus management hoàn chỉnh cho thanh menu mobile và modal QR.

---

## 5. Công nghệ & Thư viện sử dụng

- **Core Framework & Language:** React 19.2 (Concurrent Features, React Hooks), TypeScript 5.7 (Strict Type Checking).
- **Build Tool & Routing:** Vite 8.2, TanStack Router v1.170, TanStack Start v1.168, TanStack Router Plugin.
- **Styling & Design System:** Tailwind CSS v4.3, LightningCSS, Class Variance Authority (CVA), `clsx`, `tailwind-merge`.
- **UI Primitives & Icons:** Radix UI Headless Primitives (`@radix-ui/react-slot`, `dialog`, `label`), Lucide React Icons (Tree-shakeable SVG).
- **Interactive Components & Feedback:** Sonner (Toast Notifications), Dynamic Zalo QR Integration, Google Maps Embed API.
- **Code Quality & Tooling:** ESLint 9 (Flat Config), Prettier 3.4, TypeScript-ESLint 8.56.
- **Deployment & DevOps:** Nitro Engine 3.0, Vercel Edge/Serverless Platform, GitHub Actions.
