/**
 * ==============================================================================
 * Projects Data Module (Tab: Projects)
 * Independent client-side data store for projects showcase, modal & terminal
 * ==============================================================================
 */
(function (global) {
  "use strict";

  const rawProjects = [
    {
      id: "graduation-invitation",
      alt: "Ảnh dự án Graduation Invitation & Milestone Portfolio",
      i18nKeys: { meta: "p_gi_meta", title: "p_gi_title", desc: "p_gi_desc" },
      cardTechs: [
        { skill: "react", label: "Next.js 16", title: "Next.js 16 App Router & React 19" },
        { skill: "javascript", label: "TypeScript", title: "TypeScript 5 & Tailwind CSS v4" },
        { skill: "react", label: "Framer Motion", title: "motion/react GPU Transformations" }
      ],
      num: "#01",
      isLatest: true,
      categories: ["frontend"],
      image: "assets/projects/graduation-invitation.webp",
      tags: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
        "Serverless Route Handlers",
        "Google Sheets Webhook",
        "WebP Pipeline",
        "SVG Vector"
      ],
      links: [
        {
          labelVi: "Xem Live Demo →",
          labelEn: "Live Demo →",
          url: "https://hoangvu-graduation-invitation.vercel.app",
          type: "accent"
        },
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/hoangvu-graduation-invitation",
          type: "primary"
        }
      ],
      vi: {
        title: "Graduation Invitation",
        meta: "Tháng 9, 2026 - Hiện tại • Nền tảng Thiệp mời Tốt nghiệp & Portfolio Cá nhân hóa",
        summary: "Nền tảng thiệp mời tốt nghiệp cá nhân hóa & portfolio cột mốc Next.js 16 & React 19: phong cách Royal Academic Letterpress, tự động trích xuất danh xưng qua URL, cẩm nang 4 phương tiện, VR 360°, RSVP thời gian thực và thư viện 136 ảnh WebP.",
        subtitle: "Tháng 9, 2026 - Hiện tại • Thiệp mời Tốt nghiệp & Portfolio Cột mốc (Next.js 16 + React 19)",
        desc: "Graduation Invitation & Milestone Portfolio là nền tảng web thiệp mời tốt nghiệp cá nhân hóa kết hợp nhật ký hành trình 4 năm đại học (2022 - 2026) của thủ khoa / tân cử nhân Trần Hồ Hoàng Vũ (Khoa học Máy tính - K26, Đại học Tôn Đức Thắng). Dự án mang phong cách hoàng gia trang nhã (Royal Academic Letterpress), tự động cá nhân hóa danh xưng người nhận qua URL query parameters không cần backend, cẩm nang di chuyển 4 phương tiện và tour VR 360°, hệ thống RSVP ghi nhận thời gian thực về Google Sheets và thư viện 136 ảnh kỷ niệm chuẩn nén WebP.",
        arch: "Kiến trúc Server-Driven Jamstack & Component-Driven trên nền Next.js 16 (App Router, Turbopack, React 19) phân tầng: Presentation Layer 9 section độc lập, State Layer với custom hooks (useInvitee chống hydration mismatch, scroll spy tối ưu requestAnimationFrame), Data Layer SSOT định kiểu chặt chẽ trong graduation.ts, và API Layer serverless route handler /api/rsvp chuyển tiếp webhook bảo mật.",
        data: "Mô hình lưu trữ Serverless Database với Google Sheets qua Google Apps Script Webhook API (append-only) kết hợp client-side localStorage lưu vết chống gửi lặp. Typed In-Memory Data Schema (SSOT) bằng TypeScript as const. Pipeline nén 136 ảnh kỷ niệm sang WebP chất lượng 85% giảm 70% dung lượng, và Date Derivation Engine tính toán ngày giờ tự động chuẩn ISO 8601.",
        challenges: [
          {
            title: "1. Khắc phục nghẽn compositor & rớt FPS trên iOS WebKit (Double Backdrop Blur & Layout Thrashing):",
            solution: "Loại bỏ hoàn toàn backdrop-filter đa tầng tại Mobile Menu Drawer và cụm nút nổi; thay bằng màu nền giấy đục bg-paper/98 viền mạ vàng. Chuyển toàn bộ hoạt ảnh sang CSS GPU transforms thuần túy (translateY, rotate) với độ trễ 0ms, gỡ bỏ smooth-scroll tĩnh xung đột gia tốc quán tính iOS và kiểm soát scroll listener bằng requestAnimationFrame."
          },
          {
            title: "2. Triệt tiêu hoàn toàn lỗi Hydration Mismatch & giật xô lệch bố cục (CLS):",
            solution: "Xây dựng hook useInvitee với cơ chế Client-Mounting Guard (chỉ đọc query param và localStorage sau khi mount, render fallback 'Bạn' trang nhã trên server). Kỹ thuật Zero Layout Shift trên Navbar dùng thẻ span ẩn cố định sẵn chiều rộng tối đa, tiền tính toán hằng số lượng giác SVG và thời gian ở module-level."
          },
          {
            title: "3. Tối ưu tải thư viện 136 ảnh kỷ niệm & đồ họa Vector phức tạp giữ bundle siêu nhẹ:",
            solution: "Lập trình RoyalCurtain bằng 100% mã SVG vector với 2 path nửa vòm và cánh rèm đối xứng dùng gradient đa điểm (0 lượt request HTTP). Kiến trúc hiển thị ảnh 2 cấp (Two-tier Gallery) hiển thị mặc định 6 ảnh/album với cơ chế toggle 1 chạm, chuẩn nén WebP với lazy loading và tách modal nặng qua next/dynamic (ssr: false)."
          }
        ]
      },
      en: {
        title: "Graduation Invitation",
        meta: "Sep 2026 - Present • Personalized Graduation Invitation & Milestone Portfolio",
        summary: "Personalized graduation invitation platform & milestone portfolio built with Next.js 16 & React 19: Royal Academic Letterpress aesthetics, dynamic URL query recipient personalization, 4-vehicle campus navigation, VR 360° tour, real-time Google Sheets RSVP, and 136 WebP memories gallery.",
        subtitle: "Sep 2026 - Present • Graduation Invitation & Milestone Portfolio (Next.js 16 + React 19)",
        desc: "Graduation Invitation & Milestone Portfolio is a personalized graduation web platform and 4-year university milestone journal (2022 - 2026) for valedictorian / graduate Tran Ho Hoang Vu (Computer Science - K26, Ton Duc Thang University). Features Royal Academic Letterpress visual styling, zero-backend dynamic URL query recipient personalization, 4-vehicle campus navigation guide with VR 360° tour, real-time RSVP capture via Google Sheets Webhook, and an optimized 136-photo WebP memories showcase.",
        arch: "Server-Driven Jamstack & Component-Driven Architecture on Next.js 16 (App Router, Turbopack, React 19): 9 modular sections, state management via custom hooks (useInvitee with hydration guard, requestAnimationFrame scroll spy), strictly typed SSOT data layer in graduation.ts, and secure Next.js serverless route handler /api/rsvp webhook proxy.",
        data: "Serverless persistence via Google Sheets (Google Apps Script Webhook API, append-only) paired with client-side localStorage anti-spam state caching. Typed In-Memory Data Schema (SSOT) via TypeScript strict types. Automated WebP image compression pipeline for 136 photos achieving >70% size reduction, and RFC 3986 standard URL generation for Google Calendar.",
        challenges: [
          {
            title: "1. Resolving iOS WebKit Compositor Bottlenecks & Frame Drops (Double Backdrop Filter Thrashing):",
            solution: "Eliminated multi-layered backdrop-blur-lg from Mobile Drawer and floating action buttons; replaced with refined opaque paper bg-paper/98 and hairline gold borders. Replaced Framer Motion staggering with GPU-accelerated CSS transforms (translateY, rotate) with 0ms latency, resolved iOS touch inertial conflicts, and throttled scroll listeners via requestAnimationFrame."
          },
          {
            title: "2. Zero Hydration Mismatch & Cumulative Layout Shift (CLS) Elimination:",
            solution: "Built custom hook useInvitee with Client-Mounting Guard (deferring search params and localStorage reads until post-hydration with graceful 'Bạn' fallback). Implemented Zero Layout Shift on Navbar using invisible static width-reservation spans, and precomputed SVG trigonometric constants at module initialization."
          },
          {
            title: "3. High-Performance 136-Image Showcase & Complex Vector Assets with Ultralight Bundle:",
            solution: "Authored RoyalCurtain in 100% pure SVG code with multi-stop gradients (zero raster HTTP requests). Engineered a Two-Tier Gallery display showing 6 initial photos per album with 1-tap expansion and smart auto-scroll, coupled with 85% WebP compression, native lazy loading, and next/dynamic code splitting for heavy interactive modals."
          }
        ]
      }
    },
    {
      id: "schoolops",
      alt: "Ảnh dự án SchoolOps — Nền tảng Quản lý Vận hành Trường học (Next.js 16 + Express)",
      i18nKeys: { meta: "p_so_meta", title: "p_so_title", desc: "p_so_desc" },
      cardTechs: [
        { skill: "react", label: "Next.js 16", title: "Next.js 16 App Router" },
        { skill: "javascript", label: "TypeScript", title: "TypeScript 5.8" },
        { skill: "postgresql", label: "PostgreSQL 16", title: "PostgreSQL 16 (Neon Serverless & Native pg)" }
      ],
      num: "#01",
      isLatest: true,
      categories: ["frontend", "backend", "fullstack"],
      image: "assets/projects/schoolops.webp",
      tags: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "Node.js",
        "Express.js",
        "PostgreSQL 16",
        "Neon Serverless",
        "Native pg (No ORM)",
        "JWT RBAC",
        "Vitest"
      ],
      links: [
        {
          labelVi: "Xem Live Demo →",
          labelEn: "Live Demo →",
          url: "https://schoolops-platform.vercel.app/",
          type: "accent"
        },
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/school-ops",
          type: "primary"
        }
      ],
      vi: {
        title: "SchoolOps",
        meta: "Tháng 9, 2026 - Hiện tại • Nền tảng Quản lý Vận hành Trường học",
        summary: "Nền tảng quản lý vận hành trường THCS enterprise-grade Monorepo Next.js 16 & Express: ma trận RBAC động theo từng lớp, sơ đồ chỗ ngồi thông minh Fisher-Yates, thời khóa biểu 2 ca chống xung đột giáo viên và 110 unit tests.",
        subtitle: "Tháng 9, 2026 - Hiện tại • Hệ thống Quản lý Vận hành Trường THCS (Next.js 16 + Express)",
        desc: "SchoolOps là nền tảng quản lý vận hành trường học cấp doanh nghiệp dành cho trường THCS (mô hình chuẩn THCS Nguyễn Tất Thành 2026-2027) với kiến trúc Monorepo Next.js 16 (Frontend) + Express/TypeScript (Backend). Quản lý 16 lớp học, 480 học sinh, 24 giáo viên với phân quyền RBAC động theo lớp, sơ đồ 20 bàn/40 chỗ ngồi tương tác dual-perspective, điểm danh thời gian thực và tự động phát hiện xung đột lịch dạy.",
        arch: "Monorepo chuẩn hóa với kiến trúc phân tầng: Controller → Service → Repository (Backend Express Serverless) và Page/Component → Context/Service Layer → API Client (Frontend Next.js 16). Pipeline 7 SQL migrations tuần tự (001→007). API Proxy Rewrite loại bỏ CORS friction.",
        data: "PostgreSQL 16 (Neon Serverless với PgBouncer connection pooling) chuẩn hóa 12 bảng quan hệ với native pg connection pool (không ORM). Composite indexes tối ưu truy vấn thời khóa biểu và điểm danh, stored procedures kiểm tra xung đột lịch dạy, triggers tự động cập nhật timestamp và deterministic seed data cho 480 học sinh.",
        challenges: [
          {
            title: "1. Ma trận Dynamic Per-Class RBAC — Phân quyền động theo ngữ cảnh từng lớp:",
            solution: "Thiết kế ClassContext ở Frontend làm dynamic role resolver tra cứu teacher_assignments mỗi khi chuyển lớp; Backend rbac.middleware.ts (requireClassAccess) độc lập xác minh lại quyền tại mỗi endpoint, hoàn toàn không phụ thuộc client-side state."
          },
          {
            title: "2. Thời khóa biểu 2 ca & Phát hiện xung đột giáo viên school-wide:",
            solution: "Migration 007_timetable_rules.sql tạo partial index xung đột (teacher_id, period, day_of_week) trên PostgreSQL; stored procedure kiểm tra xung đột trước khi INSERT; TimetableService wrap logic trong database transaction đảm bảo tính nguyên tử tuyệt đối."
          },
          {
            title: "3. Sơ đồ chỗ ngồi 20 bàn/40 chỗ — Dual-perspective & Live Attendance Overlay:",
            solution: "Encode tọa độ theo chỉ số tuyệt đối desk index 0-19; component SeatingGrid đảo ngược thứ tự render bằng CSS transform + reverse mapping khi đổi góc nhìn giữa cuối lớp và bục giảng; attendance overlay render độc lập bằng badge layer không làm re-render toàn bộ grid."
          },
          {
            title: "4. Chuyển đổi mô hình Serverless trên Vercel & Neon Cloud:",
            solution: "Đóng gói backend Express chạy dạng Serverless Function qua backend/vercel.json và entrypoint api/index.js; kết nối Neon Postgres qua PgBouncer connection pooler; cấu hình frontend build dependencies đảm bảo tương thích 100% trên Vercel."
          }
        ]
      },
      en: {
        title: "SchoolOps",
        meta: "Sep 2026 - Present • Secondary School Operations Platform",
        summary: "Enterprise-grade secondary school operations platform with Monorepo Next.js 16 & Express: dynamic per-class RBAC matrix, Fisher-Yates intelligent seating grid, 2-shift timetable with automatic teacher conflict detection, and 110 unit tests.",
        subtitle: "Sep 2026 - Present • Secondary School Operations Management System (Next.js 16 + Express)",
        desc: "SchoolOps is an enterprise-grade school management platform for Nguyen Tat Thanh Secondary School (2026-2027), structured as a Monorepo with Next.js 16 (Frontend) and Node.js/Express/TypeScript (Backend). Manages 16 classes, 480 students, 24 teachers with dynamic per-class RBAC, dual-perspective seating grid, real-time period attendance, and automatic timetable conflict detection.",
        arch: "Layered Monorepo architecture: Controller → Service → Repository (Express Serverless Backend) and Page/Component → Context/Service Layer → API Client (Next.js 16 Frontend). Automated 7-step SQL migration pipeline (001→007). Next.js API proxy rewrites eliminate CORS friction.",
        data: "PostgreSQL 16 relational schema across 12 normalized tables with native node-postgres connection pooling on Neon Serverless (no ORM). Composite indexes accelerate attendance lookups, stored procedures enforce timetable conflict prevention, triggers automate updated_at timestamps, and deterministic seed data for 480 students.",
        challenges: [
          {
            title: "1. Dynamic Per-Class RBAC Matrix — Contextual permissions per classroom:",
            solution: "Implemented ClassContext as a dynamic role resolver looking up teacher_assignments on every class switch; Backend rbac.middleware.ts independently enforces requireClassAccess at every API route, ensuring zero trust in client state."
          },
          {
            title: "2. 2-Shift Timetable & School-Wide Teacher Conflict Detection:",
            solution: "Created partial conflict indexes (teacher_id, period, day_of_week) via migration 007; enforced pre-insert stored procedure conflict validation; wrapped schedule persistence inside atomic PostgreSQL transactions."
          },
          {
            title: "3. 20-Desk / 40-Seat Grid — Dual-Perspective Rendering & Live Attendance Overlay:",
            solution: "Encoded coordinates via absolute desk index 0-19; SeatingGrid component flips perspectives via CSS transform and reverse mapping without modifying state; decoupled live attendance indicators into a distinct badge overlay layer."
          },
          {
            title: "4. Serverless Transition with Vercel Functions & Neon Cloud:",
            solution: "Packaged Express backend into Vercel Serverless Function via vercel.json and api/index.js entrypoint; pooled PostgreSQL connections using Neon PgBouncer pooler; resolved Linux binary dependencies for seamless Vercel deployment."
          }
        ]
      }
    },
    {
      id: "bookingcare",
      alt: "Ảnh dự án BookingCare Healthcare Platform",
      i18nKeys: { "meta": "p_bc_meta", "title": "p_bc_title", "desc": "p_bc_desc" },
      cardTechs: [
        { "skill": "react", "label": "Next.js 15", "title": "Next.js 15 App Router" },
        { "skill": "javascript", "label": "TypeScript", "title": "TypeScript" },
        { "skill": "postgresql", "label": "Supabase / PostgreSQL", "title": "PostgreSQL & RLS" }
      ],
      num: "#02",
      isLatest: true,
      categories: ["backend", "fullstack"],
      image: "assets/projects/bookingcare.webp",
      tags: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Supabase",
        "PostgreSQL",
        "Row Level Security (RLS)",
        "Database Triggers",
        "Atomic Updates",
        "RBAC"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/booking-care",
          type: "primary"
        }
      ],
      vi: {
        title: "BookingCare",
        meta: "Tháng 9, 2026 - Hiện tại • Nền tảng Y tế Full-Stack",
        summary: "Nền tảng đặt lịch khám bệnh trực tuyến full-stack Next.js 15 & Supabase: phân quyền RBAC 3 cấp, chống đặt trùng lịch bằng atomic PostgreSQL update, Bulk Schedule Generator và mã QR check-in.",
        subtitle: "Tháng 9, 2026 - Hiện tại • Nền tảng Đặt lịch Khám bệnh Trực tuyến (Next.js 15 & Supabase)",
        desc: "BookingCare là nền tảng y tế số hóa đặt lịch khám bệnh trực tuyến hiện đại kết nối bệnh nhân, bác sĩ chuyên khoa và ban quản trị. Hệ thống triển khai kiến trúc Server Components & Actions trong Next.js 15, phân quyền RBAC 3 vai trò (Patient, Doctor, Admin), tích hợp thuật toán sinh lịch khám hàng loạt (Bulk Schedule Generator), bộ giả lập Offline Mock Engine và xuất biên nhận điện tử kèm mã QR check-in.",
        arch: "Next.js 15 App Router phân tầng module hóa với Service Layer chuyên biệt (`src/lib/services/`). Route Guarding bảo mật đa cấp thông qua Supabase SSR Session Middleware tại Edge và Row Level Security (RLS) ở mức cơ sở dữ liệu.",
        data: "Cơ sở dữ liệu PostgreSQL (Supabase Cloud) chuẩn hóa quan hệ giữa bệnh nhân, bác sĩ, lịch khám, hồ sơ bệnh án và đánh giá. Sử dụng Database Triggers đồng bộ `auth.users`, partial unique constraints và truy vấn cập nhật nguyên tử ngăn ngừa race conditions.",
        challenges: [
          {
            title: "1. Chống đặt trùng lịch đồng thời (Anti-Race Condition Concurrency Booking):",
            solution: "Triển khai truy vấn cập nhật nguyên tử (Atomic UPDATE WHERE status = 'AVAILABLE') kết hợp partial unique constraints; bảo đảm chỉ một giao dịch chiếm giữ slot thành công dưới tải truy cập đồng thời cao."
          },
          {
            title: "2. Quản lý lịch khám quy mô lớn với Bulk Schedule Generator:",
            solution: "Thiết kế thuật toán sinh slot theo mảng ngày và ca làm việc (Sáng/Chiều) với batch upsert an toàn vào PostgreSQL, tự động bảo lưu trạng thái các slot đã có người đặt trước (BOOKED)."
          },
          {
            title: "3. Phân quyền đa cấp bảo mật sâu kết hợp SSR Session & RLS:",
            solution: "Kết hợp Next.js Middleware kiểm tra session cookies với các chính sách Row Level Security (RLS) trên PostgreSQL, đảm bảo bệnh nhân chỉ xem hồ sơ của mình và bác sĩ chỉ thao tác trên ca được phân công."
          }
        ]
      },
      en: {
        title: "BookingCare",
        meta: "Sep 2026 - Present • Full-Stack Healthcare Platform",
        summary: "Full-stack digital healthcare appointment booking platform with Next.js 15 & Supabase: 3-tier RBAC, anti-race condition booking via atomic PostgreSQL updates, bulk schedule generator, and QR check-in.",
        subtitle: "Sep 2026 - Present • Digital Healthcare Appointment Booking Platform (Next.js 15)",
        desc: "BookingCare is a production-grade digital healthcare appointment platform connecting patients, medical specialists, and administrators. Built on Next.js 15 Server Components & Actions, featuring 3-tier RBAC (Patient, Doctor, Admin), bulk doctor availability generator, offline mock fallback engine, and electronic booking receipts with QR check-in codes.",
        arch: "Layered Next.js 15 App Router architecture with dedicated service layer (`src/lib/services/`). Enforces defense-in-depth authorization through Supabase SSR session middleware at the Edge and database-level Row Level Security (RLS).",
        data: "PostgreSQL (Supabase Cloud) relational schema normalizing patients, doctors, schedules, medical records, and verified reviews. Features automated database triggers syncing `auth.users`, partial unique constraints, and atomic conditional updates.",
        challenges: [
          {
            title: "1. Anti-Race Condition Concurrency Booking Protection:",
            solution: "Implemented atomic conditional PostgreSQL updates (UPDATE WHERE status = 'AVAILABLE') paired with partial unique constraints, preventing double booking during high concurrent patient traffic."
          },
          {
            title: "2. Doctor Schedule Management & Bulk Slot Generator:",
            solution: "Engineered a batch upsert slot generator supporting multi-day date ranges and morning/afternoon shifts, safely preserving pre-existing booked appointments."
          },
          {
            title: "3. Multi-Tier Security with SSR Session Guard & PostgreSQL RLS:",
            solution: "Coupled Next.js edge route guards with fine-grained PostgreSQL Row Level Security policies, preventing unauthorized clinical record access across doctor and patient accounts."
          }
        ]
      }
    },
    {
      id: "math-portal",
      alt: "Ảnh dự án Hoang Vu Math Portal (Cổng Thông Tin Học Thuật & Tuyển Sinh)",
      i18nKeys: { meta: "p_mp_meta", title: "p_mp_title", desc: "p_mp_desc" },
      cardTechs: [
        { skill: "react", label: "React 19", title: "React 19 Concurrent & Strict State" },
        { skill: "javascript", label: "TypeScript", title: "TypeScript 5.7 Strict" },
        { skill: "vite", label: "TanStack", title: "TanStack Router & Nitro Engine" },
        { skill: "tailwindcss", label: "Tailwind v4", title: "Tailwind CSS v4 @theme" }
      ],
      num: "#03",
      isLatest: false,
      categories: ["frontend"],
      image: "assets/projects/math-portal.webp",
      tags: [
        "React 19",
        "TypeScript",
        "TanStack Router",
        "Tailwind CSS v4",
        "Vite 8",
        "Nitro Engine",
        "Radix UI",
        "Smart Enrollment",
        "Zero-DB Serverless",
        "Sub-second FCP"
      ],
      links: [
        {
          labelVi: "Xem Live Demo →",
          labelEn: "Live Demo →",
          url: "https://hoangvumathcenter.vercel.app/",
          type: "accent"
        },
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/hoangvu-math-portal",
          type: "primary"
        }
      ],
      vi: {
        title: "Hoang Vu Math Portal",
        meta: "Tháng 8, 2026 - Tháng 9, 2026 • Cổng Thông Tin Học Thuật & Tuyển Sinh Toán THCS",
        summary: "Cổng thông tin học thuật và tuyển sinh trực tuyến Toán THCS kiến trúc Jamstack / Edge-Rendered SPA: TanStack Router type-safe 100%, bộ soạn tin nhắn Zalo thông minh, widget giải toán tương tác và chuẩn tiếp cận WAI-ARIA.",
        subtitle: "Tháng 8, 2026 - Tháng 9, 2026 • Cổng Tuyển Sinh & Học Thuật Toán THCS (React 19 + TanStack)",
        desc: "Hoang Vu Math Portal là nền tảng web tuyển sinh và cổng thông tin học thuật Toán THCS trực tuyến cho Trung tâm Bồi dưỡng Kiến thức Trần Hoàng Vũ (cô Hồ Thị Hoa phụ trách). Xây dựng trên kiến trúc Modern Jamstack / Edge-Rendered SPA với TanStack Start, Nitro Engine và React 19. Tích hợp động cơ đăng ký Smart Enrollment chuyển tiếp Zalo không cần backend database, widget tương tác giải toán, bản đồ số Google Maps và hệ thống nhận diện học thuật cổ điển (Academic Editorial) với font Fraunces.",
        arch: "Kiến trúc Modern Jamstack / Edge-Rendered SPA triển khai trên mạng biên Vercel Edge qua Nitro Engine. Tầng định tuyến sử dụng TanStack Router v1 strictly type-safe theo file-based routing (src/routes/__root.tsx, index.tsx), tự động sinh routeTree.gen.ts. Tầng UI áp dụng Tailwind CSS v4 CSS-First (@theme OKLab), Radix UI Headless Primitives (Dialog, Accordion, Slot) và CVA multi-variant styling.",
        data: "Mô hình Config-Driven Architecture tập trung toàn bộ dữ liệu nghiệp vụ, profile giáo viên, ngân hàng bài toán tương tác và lộ trình đào tạo tại module src/lib/site.ts dưới dạng const assertions bất biến. Pipeline composeMessage tổng hợp và làm sạch dữ liệu biểu mẫu client-side, sinh payload có cấu trúc đẩy trực tiếp sang Zalo API / URL URI scheme mà không cần lưu trữ database.",
        challenges: [
          {
            title: "1. Chuyển đổi tuyển sinh đa kênh tức thì (Zero-Loss Lead Generation):",
            solution: "Triển khai Direct Channel Bridging tự động định dạng form thành tin nhắn Zalo chuẩn hóa; tích hợp Dynamic QR Code Engine trong modal desktop để phụ huynh quét mã nhắn tin ngay; thiết kế Floating Action Bar (FAB) mô phỏng chuông reo thu hút tương tác mà không gây khó chịu."
          },
          {
            title: "2. Type Safety 100% với React 19, Tailwind CSS v4 và TanStack Router:",
            solution: "Cấu hình plugin @tanstack/router-plugin tự sinh manifest định tuyến an toàn tuyệt đối lúc build; chuyển đổi toàn bộ token màu OKLab vào @theme với LightningCSS parser; thiết lập Error Boundary và 404 Fallback component chuyên biệt chống sập trang."
          },
          {
            title: "3. Tối ưu Core Web Vitals & Tiếp cận Học thuật (WAI-ARIA):",
            solution: "Preload Google Fonts (Fraunces & Inter) kèm font-display: swap; nén toàn bộ media sang WebP; chuyển hóa chuyển động phức tạp sang GPU-accelerated CSS keyframes đạt CLS = 0 và Lighthouse Performance > 95; tích hợp Radix UI primitives bảo đảm focus trapping và hỗ trợ điều hướng bàn phím hoàn chỉnh."
          }
        ]
      },
      en: {
        title: "Hoang Vu Math Portal",
        meta: "Aug 2026 - Sep 2026 • Academic & Enrollment Portal for Secondary Math",
        summary: "Academic enrollment and secondary math education portal on Jamstack / Edge-Rendered SPA: 100% type-safe TanStack Router, client-side smart Zalo enrollment engine, interactive math quiz widget, and WAI-ARIA accessibility.",
        subtitle: "Aug 2026 - Sep 2026 • Secondary Math Academic & Enrollment Web Platform (React 19 + TanStack)",
        desc: "Hoang Vu Math Portal is an academic information and enrollment web platform for Tran Hoang Vu Math Education Center (led by Teacher Ho Thi Hoa). Built with a modern Jamstack / Edge-Rendered SPA architecture using TanStack Start, Nitro Engine, and React 19. Features a zero-database client-side smart enrollment engine forwarding structured payloads directly to Zalo, interactive math quiz widgets, interactive Google Maps, and an Academic Editorial design system using the Fraunces typeface.",
        arch: "Modern Jamstack / Edge-Rendered SPA deployed to Vercel Edge network via Nitro Engine. Edge routing powered by TanStack Router v1 with strict type-safe file-based routing auto-generating routeTree.gen.ts. Presentation layer uses Tailwind CSS v4 CSS-First engine (@theme OKLab color space), Radix UI headless primitives, and CVA multi-variant styling.",
        data: "Config-Driven Architecture storing all business schemas, teacher profiles, interactive math banks, and curriculum taxonomies in src/lib/site.ts as immutable const assertions. The composeMessage pipeline sanitizes input client-side and compiles structured URI payloads directly into Zalo without database overhead.",
        challenges: [
          {
            title: "1. Zero-Loss Multi-Channel Enrollment Conversion:",
            solution: "Engineered Direct Channel Bridging compiling form inputs into structured Zalo message payloads; dynamic QR Code engine for desktop scans; floating action bar (FAB) with phone-ring animation that pauses on hover."
          },
          {
            title: "2. Full End-to-End Type Safety with React 19 & Tailwind CSS v4:",
            solution: "Configured @tanstack/router-plugin for compile-time verified route trees; mapped OKLab color tokens via Tailwind v4 @theme with LightningCSS; created declarative error boundaries preventing blank-screen crashes."
          },
          {
            title: "3. Core Web Vitals Optimization & WAI-ARIA Accessibility:",
            solution: "Preloaded academic Google Fonts (Fraunces & Inter) with swap display; converted media assets to lightweight WebP; offloaded micro-animations to GPU transforms (CLS = 0, Lighthouse > 95); integrated Radix UI accessible primitives."
          }
        ]
      }
    },
    {
      id: "pdf-vision-ocr",
      alt: "Ảnh dự án PDF Vision OCR",
      i18nKeys: { "meta": "p_pdf_meta", "title": "p_pdf_title", "desc": "p_pdf_desc" },
      cardTechs: [
        { "skill": "python", "label": "Python", "title": "Xem kỹ năng Python" },
        { "skill": "python", "label": "PaddleOCR", "title": "PaddleOCR Tiếng Việt" },
        { "skill": "python", "label": "Gemini Vision AI", "title": "Google Gemini Vision AI" }
      ],
      num: "#03",
      isLatest: true,
      categories: ["ai"],
      image: "assets/projects/pdf-vision-ocr.webp",
      tags: [
        "Python",
        "PaddleOCR",
        "Gemini Vision AI",
        "PyMuPDF",
        "OpenCV",
        "FastAPI",
        "Streamlit",
        "Docker",
        "Document Processing"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/pdf-vision-ocr",
          type: "primary"
        }
      ],
      vi: {
        title: "PDF Vision OCR",
        meta: "Tháng 8, 2026 - Hiện tại • Hệ thống Trích xuất & OCR Thông minh",
        summary: "Hệ thống trích xuất và nhận diện ký tự quang học (OCR) thông minh cho PDF tiếng Việt: tiền xử lý OpenCV (Deskew, khử bóng, CLAHE), hybrid Gemini Vision AI fallback, xuất Word/Excel/PDF/Markdown và giao diện kép Streamlit + FastAPI.",
        subtitle: "Tháng 8, 2026 - Hiện tại • Hệ Thống Trích Xuất & Nhận Dạng Tài Liệu Thông Minh",
        desc: "PDF Vision OCR là ứng dụng nhận diện ký tự quang học thông minh chuyên xử lý tài liệu PDF tiếng Việt (PDF scan, chụp nghiêng từ điện thoại và tài liệu số hóa). Hệ thống bảo toàn 100% tiếng Việt có dấu và cấu trúc bảng biểu, xuất đa định dạng (DOCX, XLSX, Searchable PDF, Markdown, Master ZIP) cùng hai giao diện song hành: Streamlit Web UI và FastAPI RESTful API.",
        arch: "Kiến trúc module hóa tách bạch giữa Image Preprocessor, OCR Engine Orchestrator, Exporters và Dual Interface. Render trực tiếp PDF sang ảnh trong bộ nhớ RAM qua PyMuPDF (`fitz`), loại bỏ hoàn toàn phụ thuộc vào Poppler ngoài và tối ưu hóa container Docker nhẹ.",
        data: "Pipeline tiền xử lý ảnh OpenCV: Auto-Deskew nắn thẳng góc nghiêng (Hough Lines / minAreaRect), khử bóng râm chiếu sáng qua hình thái học ảnh và tăng cường tương phản nét chữ CLAHE cục bộ.",
        challenges: [
          {
            title: "1. Bảo toàn toàn vẹn dấu tiếng Việt và cấu trúc bảng biểu phức tạp:",
            solution: "Tự động phát hiện Digital PDF để trích xuất text layer gốc; với tài liệu scan, kết hợp PaddleOCR tiếng Việt với thuật toán nhóm bounding box theo tọa độ để tái tạo bảng trên Word và Excel."
          },
          {
            title: "2. Nhận diện chữ viết tay mờ và tài liệu scan chất lượng kém:",
            solution: "Tích hợp mô hình Google Gemini 2.5 Flash Vision API với structured prompt trích xuất văn bản; thiết lập cơ chế tự động fallback về PaddleOCR khi gặp sự cố mạng hoặc quota."
          },
          {
            title: "3. Kiến trúc Dual-Interface & Container hóa Docker đa chế độ:",
            solution: "Xây dựng Dockerfile đa mục đích kết hợp entrypoint script điều phối linh hoạt qua biến môi trường APP_MODE (web, api, full) và Docker Compose profiles."
          }
        ]
      },
      en: {
        title: "PDF Vision OCR",
        meta: "Aug 2026 - Present • Intelligent Document Processing & OCR",
        summary: "Intelligent Vietnamese PDF OCR pipeline: adaptive OpenCV preprocessing (Auto-Deskew, shadow removal, CLAHE), hybrid Gemini Vision AI fallback, multi-format export (DOCX/XLSX/PDF/Markdown), and dual Streamlit + FastAPI interface.",
        subtitle: "Aug 2026 - Present • Intelligent Document Processing & OCR Pipeline",
        desc: "PDF Vision OCR is an intelligent optical character recognition system engineered for Vietnamese documents across scanned PDFs, mobile photo captures, and digital files. Preserves 100% Vietnamese diacritics and complex tabular layouts, offering multi-format export (DOCX, XLSX, Searchable PDF, Markdown, Master ZIP) with dual Streamlit Web UI and enterprise FastAPI REST API.",
        arch: "Modular architecture separating Image Preprocessing, OCR Engine Orchestration, Exporters, and Dual Delivery. Leverages in-memory PyMuPDF rendering eliminating external Poppler dependencies for lightweight Docker deployments.",
        data: "OpenCV image processing pipeline: Auto-Deskew alignment via Hough Lines / minAreaRect, morphological shadow removal, and CLAHE adaptive local contrast enhancement.",
        challenges: [
          {
            title: "1. Preserving Vietnamese Diacritics & Tabular Structural Integrity:",
            solution: "Auto-detects native text layers in digital PDFs; for scanned documents, combines Vietnamese-trained PaddleOCR with bounding box coordinate clustering to reconstruct table layouts in DOCX and XLSX."
          },
          {
            title: "2. Low-Quality Scans & Handwritten Document Extraction:",
            solution: "Integrated Google Gemini 2.5 Flash Vision API via structured prompting with automatic graceful fallback to local PaddleOCR during offline or quota events."
          },
          {
            title: "3. Dual-Interface Deployment & Multi-Mode Containerization:",
            solution: "Designed a multi-purpose Docker container dynamically managed by APP_MODE environment variables (web, api, full) and Docker Compose profiles."
          }
        ]
      }
    },
    {
      id: "coursehub",
      alt: "Ảnh dự án CourseHub LMS",
      i18nKeys: { "meta": "p4_meta", "title": "p4_title", "desc": "p4_desc" },
      cardTechs: [{ "skill": "react", "label": "React", "title": "Xem kỹ năng React" }, { "skill": "nodejs", "label": "Node.js", "title": "Xem kỹ năng Node.js" }, { "skill": "postgresql", "label": "PostgreSQL", "title": "Xem kỹ năng PostgreSQL" }],
      num: "#04",
      isLatest: false,
      categories: ["backend", "fullstack"],
      image: "assets/projects/coursehub.webp",
      tags: [
        "React 18",
        "Vite",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Native pg (No ORM)",
        "JWT RBAC",
        "RESTful API"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/coursehub-lms",
          type: "primary"
        },
        {
          labelVi: "Demo trực tiếp →",
          labelEn: "Live Demo →",
          url: "https://coursehub-lms-eight.vercel.app",
          type: "accent"
        }
      ],
      vi: {
        title: "CourseHub LMS",
        meta: "Tháng 4, 2026 - Tháng 6, 2026 • Dự án Full-Stack",
        summary: "Hệ thống Quản lý Học tập (LMS) full-stack: giao diện Udemy split-screen, phân quyền RBAC, tối ưu Raw SQL PostgreSQL (không dùng ORM), giỏ hàng lưu DB và bảng phân tích doanh thu.",
        subtitle: "Tháng 4, 2026 - Tháng 6, 2026 • Nền tảng Học tập Trực tuyến Full-Stack",
        desc: "CourseHub là hệ thống LMS full-stack thiết kế theo kiến trúc module hóa phục vụ vị trí Backend Developer. Hệ thống triển khai giao diện phòng học chuẩn phong cách Udemy (split-screen: giáo trình thu gọn bên phải, phát video YouTube bài giảng bên trái), đồng bộ URL query params để điều hướng mượt mà, giỏ hàng lưu database và bảng điều khiển phân tích doanh thu chi tiết.",
        arch: "Mô hình MVC phân tầng nghiêm ngặt (Controller - Service - Model / Data Access). Middleware xác thực stateless JWT, phân quyền RBAC 3 cấp độ (Admin, Instructor, Student) và lớp xử lý lỗi tập trung. Triết lý thiết kế: Loại bỏ hoàn toàn Docker và ORM cồng kềnh (như Prisma) nhằm tối ưu cold-start tức thì.",
        data: "Cơ sở dữ liệu PostgreSQL (Supabase) chuẩn hóa quan hệ 3NF với hơn 15 bảng. Toàn bộ thao tác truy vấn được viết bằng Raw SQL tối ưu thông qua native 'pg' client kết hợp connection pool; sử dụng SQL Transactions (BEGIN...COMMIT/ROLLBACK) khi thanh toán và ghi danh khóa học.",
        challenges: [
          {
            title: "1. Quản lý trạng thái học tập Udemy & Đồng bộ URL Navigation:",
            solution: "Thiết kế giao diện Workspace chia đôi màn hình kết hợp URL Query Params (/my-courses?courseId=...&lessonId=...), cho phép học viên dùng nút Back/Forward của trình duyệt mà không làm mất trạng thái bài giảng."
          },
          {
            title: "2. Tối ưu hóa truy vấn Raw SQL thay vì dùng ORM:",
            solution: "Loại bỏ hoàn toàn ORM để tránh N+1 query và overhead kết nối; viết truy vấn SQL tổng hợp tính toán tức thì tỷ lệ % hoàn thành khóa học theo từng học viên trong một query duy nhất với độ trễ dưới 2ms."
          },
          {
            title: "3. Phân quyền RBAC đa cấp & Ngăn ngừa leo thang đặc quyền:",
            solution: "Thiết lập middleware xác thực JWT claims kết hợp kiểm tra quyền sở hữu tài nguyên (Resource Ownership Verification) trước khi thực hiện CRUD, bảo vệ toàn vẹn đề cương bài giảng của Instructor."
          }
        ]
      },
      en: {
        title: "CourseHub LMS",
        meta: "Apr 2026 - Jun 2026 • Full-Stack LMS",
        summary: "Full-stack Learning Management System (LMS): Udemy-style split workspace, JWT RBAC authorization, optimized raw PostgreSQL SQL (no ORM), persistent cart, and revenue analytics.",
        subtitle: "Apr 2026 - Jun 2026 • Full-Stack Learning Management System (LMS)",
        desc: "CourseHub is a clean, high-performance Full-Stack LMS engineered as a Backend Developer showcase. Features a Udemy-style split-screen classroom workspace (collapsible syllabus sidebar on the right, active video/resource area on the left), URL query-synced navigation, persistent database cart & checkout, and comprehensive admin revenue analytics.",
        arch: "Strict layered MVC architecture in Node.js/Express. Enforces 3-tier Role-Based Access Control (Admin, Instructor, Student) via stateless JWT verification middleware and centralized error handling. Intentionally eliminates heavy ORMs (Prisma) and Docker to ensure rapid cold starts and raw database control.",
        data: "PostgreSQL (Supabase) relational schema normalized to 3NF across 15+ tables. All database interactions utilize handwritten, high-performance Raw SQL executed via native 'pg' driver with connection pooling, maintaining precise control over database transaction boundaries.",
        challenges: [
          {
            title: "1. Udemy-Style Workspace & URL-Synchronized Navigation:",
            solution: "Engineered a split-screen classroom interface mapped to URL query params (/my-courses?courseId=...&lessonId=...), enabling seamless native browser history navigation."
          },
          {
            title: "2. Native Raw SQL Optimization over Heavy ORMs:",
            solution: "Bypassed heavy ORMs to eliminate query overhead; crafted multi-table aggregate SQL joins to calculate student completion percentages in a single sub-millisecond roundtrip."
          },
          {
            title: "3. Multi-Role RBAC Authorization & Privilege Protection:",
            solution: "Constructed authorization middleware verifying JWT token claims and resource ownership, safeguarding Instructor curriculum management from unauthorized student requests."
          }
        ]
      }
    },
    {
      id: "ecommerce",
      alt: "Ảnh dự án E-commerce Platform",
      i18nKeys: { "meta": "p1_meta", "title": "p1_title", "desc": "p1_desc" },
      cardTechs: [{ "skill": "react", "label": "React", "title": "Xem kỹ năng React" }, { "skill": "nodejs", "label": "Node.js", "title": "Xem kỹ năng Node.js" }, { "skill": "mongodb", "label": "MongoDB", "title": "Xem kỹ năng MongoDB" }],
      num: "#05",
      isLatest: false,
      categories: ["backend", "fullstack"],
      image: "assets/projects/ecommerce.webp",
      tags: [
        "React 18",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "Socket.IO",
        "Gemini AI",
        "Docker",
        "VNPAY"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/E-Commerce-Website",
          type: "primary"
        }
      ],
      vi: {
        title: "Nền tảng E-commerce",
        meta: "Tháng 9, 2025 - Tháng 12, 2025 • Đồ án Web Full-Stack",
        summary: "Nền tảng thương mại điện tử full-stack tích hợp trợ lý ảo Gemini AI: giỏ hàng Zustand, cổng thanh toán VNPAY, cập nhật Socket.IO thời gian thực và triển khai Docker Compose CI/CD.",
        subtitle: "Tháng 9, 2025 - Tháng 12, 2025 • Nền tảng Bán lẻ Trực tuyến & Trợ lý Gemini AI",
        desc: "Nền tảng thương mại điện tử full-stack hiện đại tích hợp trợ lý ảo thông minh Gemini AI Chatbot hỗ trợ tư vấn sản phẩm thời gian thực. Hệ thống gồm đầy đủ tính năng: duyệt sản phẩm với bộ lọc đa tiêu chí, giỏ hàng Zustand, cổng thanh toán VNPAY Sandbox, tích điểm thành viên (Loyalty), gửi email qua Nodemailer/MailHog và dashboard thống kê trực quan Recharts.",
        arch: "Kiến trúc RESTful API module hóa với Node.js & Express. Giao tiếp hai chiều thời gian thực qua Socket.IO. Xác thực bảo mật hai lớp với JWT (Access Token 15 phút, Refresh Token 7 ngày) cùng Google OAuth. Xác thực dữ liệu đầu vào bằng Zod schema.",
        data: "Cơ sở dữ liệu NoSQL MongoDB kết hợp ODM Mongoose, tạo compound index phục vụ lọc sản phẩm tốc độ cao, lưu trữ cấu trúc embedded document cho snapshot chi tiết đơn hàng và lịch sử điểm thưởng.",
        challenges: [
          {
            title: "1. Tích hợp Trợ lý Gemini AI Chatbot thời gian thực & Bảo mật API Key:",
            solution: "Xây dựng widget chat phản hồi tức thì trên frontend React, định tuyến qua proxy backend bảo mật nhằm ẩn an toàn API key và xử lý ngữ cảnh câu hỏi sản phẩm của khách hàng."
          },
          {
            title: "2. Tích hợp cổng thanh toán VNPAY & Toàn vẹn tồn kho đồng thời:",
            solution: "Tích hợp VNPAY SDK với chữ ký số checksum (HMAC-SHA512); áp dụng toán tử nguyên tử ($inc có điều kiện) trong MongoDB để tránh hiện tượng trừ âm kho khi nhiều người cùng đặt hàng."
          },
          {
            title: "3. Container hóa đa dịch vụ & Tự động hóa CI/CD Pipeline:",
            solution: "Đóng gói toàn bộ hệ thống bằng Docker & Docker Compose (Frontend, Backend, Nginx reverse proxy, MongoDB, MailHog). Thiết lập GitHub Actions tự động build và push images lên Docker Hub."
          }
        ]
      },
      en: {
        title: "E-commerce Platform",
        meta: "Sep 2025 - Dec 2025 • Full-Stack Web Project",
        summary: "Full-stack e-commerce platform with integrated Gemini AI shopping assistant: Zustand cart, VNPAY sandbox payment, Socket.IO real-time events, and Docker Compose CI/CD.",
        subtitle: "Sep 2025 - Dec 2025 • Full-Stack E-Commerce & Gemini AI Assistant",
        desc: "Full-stack e-commerce application equipped with an integrated Gemini AI shopping assistant for real-time product queries. Features catalog filtering, Zustand state management, VNPAY sandbox payment gateway, loyalty rewards program, automated email notifications (Nodemailer/MailHog), and Recharts business analytics.",
        arch: "Modular RESTful backend on Node.js/Express. Dual-token JWT authentication (15m access, 7d refresh) paired with Google OAuth. Socket.IO for real-time order updates, strict payload validation using Zod schemas, and Nginx reverse proxy.",
        data: "MongoDB document store with Mongoose ODM. Features compound indexing on category/pricing fields and embedded sub-documents for tamper-proof order snapshots and loyalty points transactions.",
        challenges: [
          {
            title: "1. Real-Time Gemini AI Chatbot Integration & Key Protection:",
            solution: "Built an interactive client-side shopping widget communicating through a secure backend proxy, safeguarding Gemini API credentials while streaming real-time product answers."
          },
          {
            title: "2. VNPAY Payment Gateway & Atomic Stock Integrity:",
            solution: "Integrated VNPAY sandbox with HMAC-SHA512 checksum validation; used atomic MongoDB conditional updates ($inc with quantity checks) to prevent race conditions during peak flash sales."
          },
          {
            title: "3. Multi-Container Orchestration & Automated CI/CD:",
            solution: "Containerized frontend, backend, Nginx, MongoDB, and MailHog via Docker Compose; configured GitHub Actions workflow to automatically test, build, and publish Docker images to Docker Hub."
          }
        ]
      }
    },
    {
      id: "vietnamese-ocr",
      alt: "Ảnh dự án Vietnamese OCR",
      i18nKeys: { "meta": "p_ocr_meta", "title": "p_ocr_title", "desc": "p_ocr_desc" },
      cardTechs: [{ "skill": "python", "label": "Python", "title": "Xem kỹ năng Python" }, { "skill": "pytorch", "label": "PyTorch", "title": "Xem kỹ năng PyTorch" }, { "skill": "pytorch", "label": "CNN-Transformer", "title": "CNN-Transformer Attention" }],
      num: "#06",
      isLatest: false,
      categories: ["ai"],
      image: "assets/projects/vietnamese-ocr.webp",
      tags: [
        "Python",
        "PyTorch",
        "ResNet34",
        "Transformer Decoder",
        "Spatial Attention",
        "MCOCR",
        "BLEU"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Deep-Learning",
          type: "primary"
        }
      ],
      vi: {
        title: "Vietnamese OCR (Deep Learning)",
        meta: "Tháng 1, 2025 - Tháng 5, 2025 • Đồ án Deep Learning",
        summary: "Khảo sát các cơ chế Attention (Self/Flash/Linear/Sparse) và xây dựng mô hình OCR nhận diện chữ tiếng Việt từ ảnh MCOCR bằng backbone ResNet34 + Spatial Attention + Transformer Decoder.",
        subtitle: "Tháng 1, 2025 - Tháng 5, 2025 • Attention Mechanisms & Nhận dạng Chữ Tiếng Việt",
        desc: "Đồ án học sâu Deep Learning gồm 2 nội dung chính: (1) Khảo sát thực nghiệm các cơ chế Attention trong LLMs (Self-Attention, FlashAttention block-wise, Linear Attention và Sparse Attention); (2) Xây dựng mô hình OCR nhận diện văn bản tiếng Việt từ ảnh thực tế (Scene Text Recognition) trên tập dữ liệu MCOCR.",
        arch: "Kiến trúc Hybrid CNN + Transformer Decoder: Mạng backbone ResNet34 trích xuất bản đồ đặc trưng (feature map 2D), lớp Spatial Attention làm nổi bật các vùng chứa ký tự, và Transformer Decoder tự hồi quy (autoregressive) sinh chuỗi ký tự theo kỹ thuật Teacher Forcing với các token <start>, <end>, <pad>, <unk>.",
        data: "Tập dữ liệu MCOCR: Tiền xử lý chuẩn hóa ảnh về kích thước chuẩn (32, 128), kỹ thuật tăng cường dữ liệu (Random Rotation, Color Jitter), và xây dựng từ điển ký tự (character-level vocab) bao quát đầy đủ bảng chữ cái tiếng Việt có dấu.",
        challenges: [
          {
            title: "1. Khảo sát thực nghiệm & Mô phỏng cơ chế FlashAttention / Linear Attention:",
            solution: "Cài đặt và so sánh ma trận attention của Self-Attention, FlashAttention mô phỏng (tính toán theo khối block-wise giảm bộ nhớ) và Linear Attention (giảm độ phức tạp tính toán từ O(n²) xuống O(n))."
          },
          {
            title: "2. Nhận dạng chính xác các dấu thanh tiếng Việt nhỏ và dễ nhòe:",
            solution: "Tích hợp lớp Spatial Attention ngay sau backbone ResNet34 để tập trung vào các chi tiết dấu thanh nhỏ; mã hóa chuỗi nhãn theo ký tự đơn lẻ (character-level) với từ điển đầy đủ ký tự thanh điệu."
          },
          {
            title: "3. Đo lường chất lượng sinh chuỗi ký tự khách quan bằng BLEU Score:",
            solution: "Áp dụng kỹ thuật Teacher Forcing trong quá trình huấn luyện Transformer Decoder và đánh giá chất lượng nhận diện văn bản khách quan bằng chỉ số BLEU score."
          }
        ]
      },
      en: {
        title: "Vietnamese OCR (Deep Learning)",
        meta: "Jan 2025 - May 2025 • Deep Learning Project",
        summary: "Simulated Attention mechanisms (Self/Flash/Linear/Sparse) and built a Vietnamese scene text OCR model on MCOCR using ResNet34 CNN backbone, Spatial Attention, and Transformer Decoder.",
        subtitle: "Jan 2025 - May 2025 • Attention Mechanisms & Vietnamese Scene Text OCR",
        desc: "Deep Learning project covering two core domains: (1) Theoretical analysis & empirical simulation of Attention in LLMs (Self-Attention, block-wise FlashAttention, Linear Attention, Sparse Attention); (2) End-to-end Vietnamese Scene Text Recognition (OCR) pipeline on the MCOCR benchmark dataset.",
        arch: "Hybrid CNN + Transformer Decoder architecture: ResNet34 CNN backbone extracts visual spatial feature maps, a Spatial Attention module accentuates textual regions, and a Transformer Decoder autoregressively generates text sequences using Teacher Forcing with <start>, <end>, <pad>, and <unk> tokens.",
        data: "MCOCR dataset: Images resized to (32, 128) with data augmentations (Random Rotation, Color Jitter); character-level vocabulary encoding preserving all Vietnamese diacritics and accented tone variations.",
        challenges: [
          {
            title: "1. Simulating & Benchmarking Attention Formulations:",
            solution: "Implemented Self-Attention, simplified FlashAttention (block-wise tile processing minimizing GPU memory overhead), and Linear Attention reducing sequence complexity from O(n²) to O(n)."
          },
          {
            title: "2. Complex Vietnamese Diacritic Representation via Spatial Attention:",
            solution: "Augmented ResNet34 with Spatial Attention focusing on subtle tone markers; designed a comprehensive character-level vocabulary accommodating all accented variations."
          },
          {
            title: "3. Sequence Generation & Objective Evaluation via BLEU:",
            solution: "Employed Teacher Forcing for stable Transformer Decoder convergence, benchmarking character sequence predictions using BLEU scores against ground-truth text."
          }
        ]
      }
    },
    {
      id: "nlp-translation",
      alt: "Ảnh dự án EN-VI Machine Translation",
      i18nKeys: { "meta": "p_mt_meta", "title": "p_mt_title", "desc": "p_mt_desc" },
      cardTechs: [{ "skill": "python", "label": "Python", "title": "Xem kỹ năng Python" }, { "skill": "pytorch", "label": "PyTorch", "title": "Xem kỹ năng PyTorch" }, { "skill": "pytorch", "label": "Transformer", "title": "Transformer Attention" }],
      num: "#07",
      isLatest: false,
      categories: ["ai"],
      image: "assets/projects/nlp-translation.webp",
      tags: [
        "Python",
        "PyTorch",
        "Hugging Face",
        "TRL (RLHF/PPO)",
        "MarianMT",
        "SentencePiece",
        "SacreBLEU"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Natural-Language-Processing",
          type: "primary"
        }
      ],
      vi: {
        title: "EN-VI Machine Translation (NLP)",
        meta: "Tháng 1, 2025 - Tháng 5, 2025 • Đồ án NLP",
        summary: "Khảo sát căn chỉnh RLHF/PPO với Hugging Face TRL và thực nghiệm dịch máy Anh - Việt so sánh mô hình tự huấn luyện (Transformer/GPT + SentencePiece) và Pretrained (GPT-2, MarianMT).",
        subtitle: "Tháng 1, 2025 - Tháng 5, 2025 • RLHF (PPO) & Dịch máy Thần kinh Anh - Việt",
        desc: "Đồ án Xử lý Ngôn ngữ Tự nhiên (NLP) gồm 2 phần chuyên sâu: (1) Khảo sát Reinforcement Learning from Human Feedback (RLHF): cài đặt PPO trên CartPole-v1 và PPO tinh chỉnh mô hình ngôn ngữ nhân quả (Causal LM) với thư viện Hugging Face TRL; (2) So sánh toàn diện mô hình dịch máy Anh - Việt (EN↔VI) giữa phương pháp tự huấn luyện từ đầu (no-pretrain) và mô hình pretrained.",
        arch: "Mô hình đa dạng: Transformer seq2seq tự xây dựng từ đầu, GPT kiến trúc nhỏ kèm SentencePiece tokenizer; Mô hình Pretrained gồm GPT-2 tinh chỉnh với special tokens ([EN], [VI]) và MarianMT (Helsinki-NLP) tinh chỉnh chuyên sâu.",
        data: "Ngữ liệu song ngữ tiếng Anh - tiếng Việt (IWSLT'15 EN-VI): Làm sạch ký tự đặc biệt, lọc giới hạn độ dài câu, phân tách train/validation/test và đánh giá định lượng bằng SacreBLEU và ROUGE.",
        challenges: [
          {
            title: "1. Triển khai thuật toán PPO phục vụ căn chỉnh RLHF cho Causal LM:",
            solution: "Triển khai thuật toán Proximal Policy Optimization (PPO) kết hợp thư viện TRL, thiết lập policy/value network, advantage estimation và hàm mục tiêu clipping để điều chỉnh hành vi sinh văn bản của causal LM."
          },
          {
            title: "2. Giải quyết hiện tượng Out-of-Vocabulary (OOV) khi tự huấn luyện từ đầu:",
            solution: "Huấn luyện tokenizer riêng biệt bằng SentencePiece cho mô hình GPT tự xây dựng, xử lý hiệu quả hiện tượng Out-of-Vocabulary (OOV) trên dữ liệu song ngữ Anh - Việt."
          },
          {
            title: "3. Đo lường đối chiếu công bằng giữa mô hình Scratch và Pretrained:",
            solution: "Tiến hành đánh giá đối chiếu giữa Transformer tự huấn luyện và MarianMT pretrained (Helsinki-NLP) trên tập IWSLT15, đo lường chính xác bằng thang đo tiêu chuẩn SacreBLEU."
          }
        ]
      },
      en: {
        title: "EN-VI Machine Translation (NLP)",
        meta: "Jan 2025 - May 2025 • NLP Project",
        summary: "Explored RLHF/PPO alignment with Hugging Face TRL and benchmarked EN-VI Machine Translation comparing scratch models (Transformer/GPT + SentencePiece) against pretrained GPT-2 and MarianMT.",
        subtitle: "Jan 2025 - May 2025 • RLHF (PPO) & English-Vietnamese Machine Translation",
        desc: "Comprehensive Natural Language Processing (NLP) project comprising two modules: (1) RLHF & PPO exploration (CartPole baseline & causal LLM fine-tuning using Hugging Face TRL); (2) Comprehensive EN↔VI Machine Translation benchmark comparing models trained from scratch vs pretrained models.",
        arch: "Diverse architectural suite: Custom Transformer Seq2Seq (Encoder-Decoder) from scratch, small GPT with SentencePiece tokenizer; Pretrained models include fine-tuned GPT-2 with [EN]/[VI] tokens and Helsinki-NLP MarianMT.",
        data: "Parallel English-Vietnamese bilingual datasets (IWSLT'15 en-vi): Text cleaning, sentence length filtering, custom train/val/test splits, and quantitative translation evaluation via SacreBLEU and ROUGE.",
        challenges: [
          {
            title: "1. RLHF Alignment via PPO with TRL for Causal LMs:",
            solution: "Configured Proximal Policy Optimization (PPO) using Hugging Face TRL and Accelerate, fine-tuning causal language models with advantage clipping and policy updates."
          },
          {
            title: "2. Custom Subword Tokenization Eradicating OOV Deficiencies:",
            solution: "Trained dedicated SentencePiece subword tokenizers for custom GPT models, resolving out-of-vocabulary challenges across bilingual vocabulary distributions."
          },
          {
            title: "3. Empirical Benchmarking (From-Scratch vs Pretrained):",
            solution: "Benchmarked scratch Transformer models against pretrained Helsinki-NLP MarianMT models on IWSLT'15, tracking SacreBLEU convergence trajectories."
          }
        ]
      }
    },
    {
      id: "stock-ml",
      alt: "Ảnh dự án Stock Forecasting & Benchmark",
      i18nKeys: { "meta": "p_stock_meta", "title": "p_stock_title", "desc": "p_stock_desc" },
      cardTechs: [{ "skill": "python", "label": "Python", "title": "Xem kỹ năng Python" }, { "skill": "tensorflow", "label": "TensorFlow", "title": "Xem kỹ năng TensorFlow" }, { "skill": "python", "label": "LSTM / Time-Series", "title": "LSTM / Time-Series" }],
      num: "#08",
      isLatest: false,
      categories: ["ai"],
      image: "assets/projects/stock-ml.webp",
      tags: [
        "Python",
        "TensorFlow / Keras",
        "scikit-learn",
        "LSTM / FFNN",
        "Time-Series",
        "CNN",
        "Optimization"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Machine-Learning",
          type: "primary"
        }
      ],
      vi: {
        title: "Stock Forecasting & Benchmark (ML)",
        meta: "Tháng 9, 2024 - Tháng 12, 2024 • Đồ án Machine Learning",
        summary: "Khảo sát tốc độ hội tụ 7 thuật toán Gradient Descent (GD, Momentum, Adam...); dự báo giá mở cửa cổ phiếu bằng cửa sổ trượt 60 ngày (LSTM/FFNN); và phân loại chữ số MNIST bằng CNN.",
        subtitle: "Tháng 9, 2024 - Tháng 12, 2024 • Đồ án Tổng kết Nhập môn Học máy (ML)",
        desc: "Đồ án Machine Learning giải quyết 3 bài toán kinh điển: (1) Khảo sát thực nghiệm các thuật toán tối ưu hóa Gradient Descent trên bài toán hồi quy Boston Housing; (2) Dự báo giá mở cửa cổ phiếu (Stock Open Price) theo chuỗi thời gian bằng cửa sổ trượt sequence_length = 60; (3) Phân loại chữ số viết tay MNIST bằng mạng CNN tích chập.",
        arch: "Đa dạng cấu trúc mô hình: Mạng nơ-ron hồi quy FFNN (Dense 50-50-1) và Stacked LSTM cho chuỗi thời gian; Mạng CNN phân loại ảnh (Conv2D 32 -> MaxPool -> Conv2D 64 -> MaxPool -> Dense 128 -> Dropout 0.5 -> Softmax 10); Mô hình cơ sở Decision Tree Regressor và Hồi quy tuyến tính.",
        data: "Tập dữ liệu HousingData.csv (506 dòng x 14 cột) cho bài toán tối ưu; Tập dữ liệu tài chính data_src_2.csv (6816 dòng x 10 cột gồm OHLCV, Ticker, Industry, GDP) cho bài toán dự báo chứng khoán; Tập dữ liệu ảnh chữ số viết tay chuẩn MNIST.",
        challenges: [
          {
            title: "1. Lập trình và trực quan hóa so sánh 7 thuật toán tối ưu Gradient:",
            solution: "Lập trình và so sánh Batch GD, SGD, Mini-batch GD, Momentum, Adagrad, RMSProp và Adam trên dữ liệu Boston Housing, vẽ biểu đồ đường cong loss/epoch để phân tích tốc độ hội tụ."
          },
          {
            title: "2. Chuẩn bị chuỗi dữ liệu cửa sổ trượt (Sequence Length = 60) chống Data Leakage:",
            solution: "Lọc dữ liệu theo từng mã Ticker, sắp xếp theo thứ tự thời gian, chuẩn hóa giá trị Open bằng MinMaxScaler và tạo chuỗi 60 ngày liên tiếp để dự báo giá mở cửa ngày tiếp theo."
          },
          {
            title: "3. Kiểm soát Overfitting trên mạng nơ-ron dự báo chuỗi thời gian:",
            solution: "So sánh hiệu quả dự báo giữa LSTM, FFNN, Linear Regression và Decision Tree qua chỉ số MSE và R²; tích hợp Dropout, L2 Regularization và EarlyStopping trong Keras."
          }
        ]
      },
      en: {
        title: "Stock Forecasting & Benchmark (ML)",
        meta: "Sep 2024 - Dec 2024 • Machine Learning Project",
        summary: "Benchmarked 7 gradient optimizers (GD, Momentum, Adam...); engineered 60-day sliding window stock open price forecasting (LSTM/FFNN); and classified MNIST digits with CNN.",
        subtitle: "Sep 2024 - Dec 2024 • Intro to Machine Learning Final Project",
        desc: "Comprehensive Machine Learning coursework addressing 3 distinct foundational challenges: (1) Empirical convergence comparison of gradient optimization methods on Boston Housing; (2) Stock Open Price time-series forecasting using a 60-day sliding window; (3) Handwritten digit classification on MNIST using CNNs.",
        arch: "Diverse architectural implementations: FFNN (Dense 50-50-1) & stacked LSTM networks for time-series; 2-stage Conv2D CNN with Dropout for MNIST; Decision Tree Regressor and Linear models as baselines.",
        data: "HousingData.csv (506 rows x 14 cols) for optimization analysis; data_src_2.csv (6,816 rows x 10 cols containing OHLCV, Tickers, Industry, GDP) for stock forecasting; benchmark MNIST dataset.",
        challenges: [
          {
            title: "1. Comparative Benchmark of 7 Gradient Optimizers:",
            solution: "Implemented and evaluated Batch GD, SGD, Mini-batch GD, Momentum, Adagrad, RMSProp, and Adam on Boston Housing, plotting epoch loss trajectories to illustrate convergence speed."
          },
          {
            title: "2. 60-Step Sliding Window Feature Engineering:",
            solution: "Filtered data by ticker, preserved chronological sorting, applied MinMaxScaler to Open prices, and constructed 60-step lookback sliding windows for next-day open price prediction."
          },
          {
            title: "3. Overfitting Curtailment in Time-Series Neural Models:",
            solution: "Benchmarked LSTM vs FFNN vs Decision Tree using MSE and R² metrics; leveraged Dropout, L2 Regularization, and EarlyStopping in Keras to curtail overfitting."
          }
        ]
      }
    },
    {
      id: "warehouse",
      alt: "Ảnh dự án WarehouseMA",
      i18nKeys: { "meta": "p2_meta", "title": "p2_title", "desc": "p2_desc" },
      cardTechs: [{ "skill": "csharp", "label": "C#", "title": "Xem kỹ năng C#" }, { "skill": "dotnet", "label": ".NET WinForms", "title": "Xem kỹ năng .NET" }, { "skill": "mysql", "label": "MySQL", "title": "Xem kỹ năng MySQL" }],
      num: "#09",
      isLatest: false,
      categories: ["backend"],
      image: "assets/projects/warehouse.webp",
      tags: [
        "C#",
        ".NET WinForms",
        "MySQL / SQL Server",
        "3-Tier Architecture",
        "Google Forms API",
        "QR Code",
        "SRS / BRD"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/WarehouseMA",
          type: "primary"
        }
      ],
      vi: {
        title: "WarehouseMA",
        meta: "Tháng 9, 2024 - Tháng 12, 2024 • Đồ án Công nghệ Phần mềm",
        summary: "Phần mềm quản lý kho tòa nhà WinForms C# kiến trúc 3 lớp: tích hợp Google Forms API tiếp nhận yêu cầu, quét mã QR kiểm kê, tính phí tự động và bộ hồ sơ tài liệu SRS/BRD/UML chuẩn mực.",
        subtitle: "Tháng 9, 2024 - Tháng 12, 2024 • Phần mềm Quản lý Kho Hàng Tòa nhà (.NET WinForms)",
        desc: "Đồ án môn Công nghệ Phần mềm tại Trường Đại học Tôn Đức Thắng (TDTU). WarehouseMA là ứng dụng desktop quản lý kho hàng hóa, vật tư, dụng cụ trong tòa nhà, hỗ trợ 2 loại kho: Kho Nội Bộ (vận hành tòa nhà) và Kho Cho Thuê (dành cho cư dân/đơn vị thuê). Dự án được triển khai theo quy trình công nghệ phần mềm chuyên nghiệp: Phân tích, Thiết kế, Lập trình và Kiểm thử.",
        arch: "Kiến trúc 3 phân tầng (3-Tier Architecture): Tầng giao diện người dùng WinForms (Presentation Layer), Tầng xử lý nghiệp vụ BLL (Business Logic Layer) và Tầng truy xuất dữ liệu DAL (Data Access Layer) giao tiếp thông qua các đối tượng truyền dữ liệu DTO.",
        data: "Cơ sở dữ liệu quan hệ MySQL / SQL Server: Quản lý chi tiết dung tích, trạng thái khả dụng của từng kệ, tầng, ngăn lưu trữ; lưu vết các phiếu nhập/xuất và lịch sử kiểm kê.",
        challenges: [
          {
            title: "1. Thu thập yêu cầu nghiệp vụ phức tạp & Thiết kế tài liệu chuẩn BA:",
            solution: "Đóng vai trò Business Analyst (BA) chính: khảo sát nghiệp vụ thực tế, xây dựng tài liệu SRS/BRD, thiết kế ERD và hệ thống sơ đồ UML (Use Case, Class, Activity, Sequence, State)."
          },
          {
            title: "2. Tự động hóa tiếp nhận yêu cầu với Google Forms API & Kiểm kê bằng QR Code:",
            solution: "Tích hợp Google Forms API giúp người dùng đăng ký yêu cầu nhập/xuất hàng từ xa tự động đổ về phần mềm; ứng dụng quét mã QR Code để nhân viên kiểm kê nhanh chóng."
          },
          {
            title: "3. Thuật toán gợi ý vị trí lưu trữ kho tối ưu (Storage Slotting Algorithm):",
            solution: "Xây dựng thuật toán gợi ý vị trí lưu trữ tối ưu theo thể tích và tính chất hàng hóa; tự động tính toán chi phí lưu kho theo thời gian kèm phí phạt khi quá hạn."
          }
        ]
      },
      en: {
        title: "WarehouseMA",
        meta: "Sep 2024 - Dec 2024 • Software Engineering Project",
        summary: "Building warehouse desktop management in C# WinForms (3-tier): Google Forms API for inbound requests, QR inventory audits, automated fee calculations, and full SRS/BRD/UML documentation.",
        subtitle: "Sep 2024 - Dec 2024 • Building Warehouse Management System (C# WinForms)",
        desc: "Software Engineering coursework project at Ton Duc Thang University (TDTU). WarehouseMA is a C# .NET desktop application managing facility inventory, materials, and equipment across two models: Internal Operational Warehouse and Leasable Resident Warehouse. Executed through full software engineering lifecycles: Analysis, Design, Coding, and Testing.",
        arch: "Rigorous 3-tier architecture: WinForms Presentation Layer, Business Logic Layer (BLL), and Data Access Layer (DAL) passing strongly-typed Data Transfer Objects (DTO).",
        data: "Relational MySQL / SQL Server database modeling warehouse capacity at shelf, tier, and bin granularity, with comprehensive audit logs for stock requisitions.",
        challenges: [
          {
            title: "1. Business Analysis, SRS, BRD & UML System Modeling:",
            solution: "Served as main BA: gathered operational requirements, authored comprehensive SRS and BRD documentation, designed ERD schemas and complete UML diagram suites (Use Case, Class, Activity, Sequence, State)."
          },
          {
            title: "2. Google Forms API Inbound Requisitions & QR Audits:",
            solution: "Integrated Google Forms API to automatically receive off-site inbound/outbound stock requests into desktop queues; incorporated QR code scanning for accelerated inventory auditing."
          },
          {
            title: "3. Automated Storage Fee Calculation & Slotting Algorithm:",
            solution: "Developed an optimal slotting algorithm recommending warehouse bin locations by volume, paired with automated tiered storage billing and overdue penalty calculators."
          }
        ]
      }
    },
    {
      id: "pos",
      alt: "Ảnh dự án An Khang Store POS",
      i18nKeys: { "meta": "p3_meta", "title": "p3_title", "desc": "p3_desc" },
      cardTechs: [{ "skill": "laravel", "label": "Laravel 10", "title": "Xem kỹ năng Laravel" }, { "skill": "php", "label": "Livewire", "title": "Xem kỹ năng PHP / Livewire" }, { "skill": "mysql", "label": "MySQL", "title": "Xem kỹ năng MySQL" }],
      num: "#10",
      isLatest: false,
      categories: ["backend"],
      image: "assets/projects/pos.webp",
      tags: [
        "Laravel 10",
        "Livewire",
        "MySQL",
        "Bootstrap 5",
        "DOMPDF",
        "Vite",
        "Toastr"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Web-Programming-and-Applications",
          type: "primary"
        },
        {
          labelVi: "Xem Video Demo →",
          labelEn: "Watch Demo Video →",
          url: "https://youtu.be/XLwuIJpsN-M",
          type: "accent"
        }
      ],
      vi: {
        title: "An Khang Store POS",
        meta: "Tháng 1, 2024 - Tháng 5, 2024 • Đồ án Lập trình Web",
        summary: "Hệ thống POS bán lẻ nội bộ cho cửa hàng điện thoại bằng Laravel 10 & Livewire: tìm kiếm mã vạch, tra cứu tự tạo khách hàng theo SĐT, email kích hoạt 1 phút và xuất hóa đơn PDF.",
        subtitle: "Tháng 1, 2024 - Tháng 5, 2024 • Hệ thống Quản lý Bán lẻ POS Nội bộ (Laravel 10)",
        desc: "Đồ án môn Lập trình Web và Ứng dụng tại Đại học Tôn Đức Thắng (TDTU). AN KHANG STORE là ứng dụng Point of Sale (POS) xây dựng bằng Laravel 10 dành riêng cho nhân viên và ban quản trị cửa hàng bán lẻ điện thoại và phụ kiện điện tử (không phải e-commerce công khai). Hệ thống xử lý bán hàng nhanh, tìm kiếm khách hàng, gửi email tự động và báo cáo doanh thu.",
        arch: "Kiến trúc Laravel 10 MVC kết hợp Laravel Livewire cho giao diện động phản hồi tức thì mà không cần tải lại trang. Xác thực bảo mật, tích hợp Barryvdh/Dompdf in hóa đơn PDF và Toastr popup thông báo trực quan.",
        data: "Cơ sở dữ liệu MySQL: Thiết kế quan hệ giữa các bảng Sản phẩm, Danh mục, Đơn hàng, Chi tiết đơn hàng, Nhân viên và Khách hàng với các seeder dữ liệu mẫu đầy đủ.",
        challenges: [
          {
            title: "1. Tự động gửi Email kích hoạt tài khoản nhân viên với Token hết hạn 1 phút:",
            solution: "Admin tạo nhân viên mới qua Gmail; hệ thống tự động gửi email chứa link token kích hoạt chỉ có hiệu lực trong 1 phút, bắt buộc nhân viên đổi mật khẩu ngay lần đầu đăng nhập."
          },
          {
            title: "2. Tra cứu khách hàng theo SĐT & Tự động tạo mới mượt mà:",
            solution: "Tại quầy thu ngân, khi nhập số điện thoại khách hàng: nếu đã có sẽ tự điền thông tin và lịch sử mua hàng, nếu chưa có hệ thống sẽ tự động tạo hồ sơ khách hàng mới ngay trong luồng thanh toán."
          },
          {
            title: "3. Bán hàng theo Barcode, tính tiền thừa & Xuất hóa đơn PDF:",
            solution: "Tìm kiếm sản phẩm nhanh qua mã vạch (barcode) hoặc tên, giỏ hàng Livewire tự động cập nhật tổng tiền và tiền thừa cần thối lại cho khách; hỗ trợ xuất hóa đơn PDF chuyên nghiệp."
          }
        ]
      },
      en: {
        title: "An Khang Store POS",
        meta: "Jan 2024 - May 2024 • Web Programming Project",
        summary: "Internal retail POS for electronics stores built with Laravel 10 & Livewire: barcode search, customer phone lookup & auto-creation, 1-minute email activation, and DOMPDF invoice generation.",
        subtitle: "Jan 2024 - May 2024 • Internal Retail Point of Sale (POS) System (Laravel 10)",
        desc: "Web Programming coursework project at Ton Duc Thang University (TDTU). AN KHANG STORE is a Point of Sale (POS) system built on Laravel 10 for retail phone and electronics stores, exclusively designed for internal staff and store administrators (not a public e-commerce store). Handles rapid counter checkouts, customer lookup, automated activation emails, and revenue analytics.",
        arch: "Laravel 10 MVC architecture combined with Laravel Livewire for reactive, single-page-like UI interactions. Integrates Barryvdh/Dompdf for instant PDF receipt generation and Toastr for dynamic alerts.",
        data: "MySQL relational database structuring Products, Categories, Orders, Order Items, Customers, and Cashier Users, populated with seeders for rapid local demonstration.",
        challenges: [
          {
            title: "1. Automated 1-Minute Token Staff Email Activation:",
            solution: "Implemented automated SMTP Gmail dispatch on staff creation; tokens expire within 1 minute, strictly requiring an initial credential reset prior to workstation authorization."
          },
          {
            title: "2. Phone-Number Customer Lookup & Inline Auto-Registration:",
            solution: "Cashier entering a customer phone number instantly retrieves past order history or triggers seamless inline customer registration directly within the checkout flow."
          },
          {
            title: "3. Barcode Search, Live Cash Change & Thermal PDF Invoice Export:",
            solution: "Supported barcode and name lookup with dynamic Livewire cart recalculation of subtotals and change return; generates instant printable customer receipt PDFs via DOMPDF."
          }
        ]
      }
    }
  ];

  // Lookup map by ID
  const map = {};
  rawProjects.forEach((p) => {
    map[p.id] = p;
  });

  /**
   * Global PROJECTS_DATA object
   * Supports both direct property lookup: PROJECTS_DATA["coursehub"]
   * and clean helper methods: PROJECTS_DATA.get(), PROJECTS_DATA.getAll()
   */
  const PROJECTS_DATA = Object.assign({}, map, {
    list: rawProjects,

    get: function (id) {
      return map[id] || null;
    },

    getAll: function () {
      return rawProjects.slice();
    },

    getLocalized: function (id, lang) {
      const p = map[id];
      if (!p) return null;
      const l = lang === "en" ? "en" : "vi";
      const loc = p[l] || p.vi;
      return Object.assign({}, p, loc);
    },

    filterByCategory: function (cat) {
      if (!cat || cat === "all") return rawProjects.slice();
      const target = cat.toLowerCase();
      return rawProjects.filter((p) => p.categories && p.categories.includes(target));
    },

    filterBySkill: function (skillId, skillMapping) {
      if (!skillId) return rawProjects.slice();
      if (skillMapping && skillMapping[skillId]) {
        const allowedIds = skillMapping[skillId].projects || [];
        return rawProjects.filter((p) => allowedIds.includes(p.id));
      }
      return rawProjects.slice();
    }
  });

  // Export to global scope

  // ==========================================================================
  // Domain Tracks Metadata for Executive Overview Dashboard
  // ==========================================================================
  const TRACKS_METADATA = [
    {
      id: "fullstack",
      icon: "🚀",
      badgeClass: "badge-fullstack",
      count: 4,
      vi: {
        title: "Full-Stack Development",
        tagline: "Kiến trúc Monorepo & Web Platforms",
        summary: "Thiết kế và triển khai các hệ thống web enterprise hoàn chỉnh: phân tầng Controller/Service/Repository, dynamic RBAC, đồng bộ thời gian thực, SSR/SSG tối ưu và kết nối CSDL tin cậy.",
        highlights: ["Next.js 16/15", "React 19", "Express.js", "PostgreSQL 16", "Supabase", "JWT RBAC"],
        featured: "SchoolOps, BookingCare",
        cta: "Khám phá 4 dự án Full-Stack"
      },
      en: {
        title: "Full-Stack Development",
        tagline: "Monorepo & Web Platforms",
        summary: "Designing and shipping robust enterprise web platforms: layered Controller/Service/Repository architecture, dynamic RBAC, real-time sync, optimized SSR/SSG, and rock-solid database integrations.",
        highlights: ["Next.js 16/15", "React 19", "Express.js", "PostgreSQL 16", "Supabase", "JWT RBAC"],
        featured: "SchoolOps, BookingCare",
        cta: "Explore 4 Full-Stack Projects"
      }
    },
    {
      id: "frontend",
      icon: "🎨",
      badgeClass: "badge-frontend",
      count: 3,
      vi: {
        title: "Frontend & UI/UX Engineering",
        tagline: "Royal UI & Hiệu năng 120Hz",
        summary: "Chuyên sâu kỹ thuật giao diện hiện đại: chuyển động tăng tốc phần cứng GPU (0ms latency), triệt tiêu Layout Thrashing trên iOS Safari, kiến trúc vector thuần SVG và chuẩn nén WebP siêu nhẹ.",
        highlights: ["Next.js 16", "Tailwind CSS v4", "motion/react", "Zero CLS", "Custom Cursor", "SVG Vector"],
        featured: "Graduation Invitation, SchoolOps",
        cta: "Khám phá 3 dự án Frontend"
      },
      en: {
        title: "Frontend & UI/UX Engineering",
        tagline: "Royal Aesthetics & Zero CLS",
        summary: "Deep modern UI engineering: GPU-accelerated motion (0ms latency), compositor thrashing elimination on iOS Safari, pure code-based SVG vector graphics, and high-performance WebP media pipelines.",
        highlights: ["Next.js 16", "Tailwind CSS v4", "motion/react", "Zero CLS", "Custom Cursor", "SVG Vector"],
        featured: "Graduation Invitation, SchoolOps",
        cta: "Explore 3 Frontend Projects"
      }
    },
    {
      id: "backend",
      icon: "⚙️",
      badgeClass: "badge-backend",
      count: 6,
      vi: {
        title: "Backend & Systems Architecture",
        tagline: "High-Throughput APIs & SQL",
        summary: "Xây dựng hạ tầng dịch vụ và CSDL chịu tải cao: Native pg connection pooling (không ORM), stored procedures chống xung đột lịch, atomic updates chống race condition và container hóa Docker.",
        highlights: ["Node.js", "Express", "PostgreSQL 16 (Native pg)", "MySQL", "Laravel 10", "Docker"],
        featured: "SchoolOps, BookingCare, POS",
        cta: "Khám phá 6 dự án Backend"
      },
      en: {
        title: "Backend & Systems Architecture",
        tagline: "High-Throughput APIs & SQL",
        summary: "Building robust service infrastructure and relational databases: native node-postgres connection pooling (no ORM), timetable conflict stored procedures, atomic updates, and Docker containerization.",
        highlights: ["Node.js", "Express", "PostgreSQL 16 (Native pg)", "MySQL", "Laravel 10", "Docker"],
        featured: "SchoolOps, BookingCare, POS",
        cta: "Explore 6 Backend Projects"
      }
    },
    {
      id: "ai",
      icon: "🧠",
      badgeClass: "badge-ai",
      count: 4,
      vi: {
        title: "AI & Machine Learning",
        tagline: "Computer Vision & NLP Models",
        summary: "Nghiên cứu và triển khai mô hình học sâu thực nghiệm: Spatial Attention OCR, Transformer Decoder, Reinforcement Learning (PPO/RLHF) cho máy dịch và LSTM dự báo chuỗi thời gian.",
        highlights: ["Python", "PyTorch", "PaddleOCR", "Hugging Face TRL", "TensorFlow", "FastAPI"],
        featured: "PDF Vision OCR, Vietnamese OCR",
        cta: "Khám phá 4 dự án AI & ML"
      },
      en: {
        title: "AI & Machine Learning",
        tagline: "Computer Vision & NLP Models",
        summary: "Researching and deploying experimental deep learning architectures: Spatial Attention OCR, Transformer Decoder, Reinforcement Learning (PPO/RLHF) for machine translation, and LSTM forecasting.",
        highlights: ["Python", "PyTorch", "PaddleOCR", "Hugging Face TRL", "TensorFlow", "FastAPI"],
        featured: "PDF Vision OCR, Vietnamese OCR",
        cta: "Explore 4 AI & ML Projects"
      }
    }
  ];

  // ==========================================================================
  // Dynamic Project Cards Render Engine
  // ==========================================================================
  function buildProjectCard(p, dynamicNum) {
    const isEn = (typeof window.getCurrentLang === "function" ? window.getCurrentLang() : "vi") === "en";
    const loc = p[isEn ? "en" : "vi"] || p.vi;
    const cardNum = dynamicNum || p.num || "#01";

    const latestBadge = p.isLatest ? [
      '<span class="project-badge-latest">',
      '  <span class="badge-dot animate-pulse"></span>',
      '  <span data-i18n="p_badge_latest">Đang phát triển</span>',
      '</span>'
    ].join("") : "";

    const pills = (p.cardTechs || []).map(function (t) {
      return '<span class="text-xs tag-pill tag-pill--interactive" data-tech-skill="' + t.skill + '" title="' + t.title + '">' + t.label + '</span>';
    }).join("");

    const links = (p.links || []).map(function (l) {
      const isPrimary = l.type === "primary";
      const colorCls = isPrimary ? "text-indigo-600 dark:text-indigo-400" : "text-cyan-600 dark:text-cyan-400";
      const label = (l.url.indexOf("youtu") !== -1 || l.type === "accent") ? "Demo →" : "GitHub →";
      return '<a href="' + l.url + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 ' + colorCls + ' hover:underline font-medium text-xs sm:text-sm"><span>' + label + '</span></a>';
    }).join("");

    const metaKey = p.i18nKeys ? p.i18nKeys.meta : "";
    const titleKey = p.i18nKeys ? p.i18nKeys.title : "";
    const descKey = p.i18nKeys ? p.i18nKeys.desc : "";

    return [
      '<article class="project-card bg-white dark:bg-[#0f172a]/75 rounded-2xl shadow-lg border border-slate-200/80 dark:border-white/10 p-6 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1" data-category="' + p.categories.join(" ") + '" data-project-id="' + p.id + '">',
      '  <div>',
      '    <div class="project-card-header">',
      '      <span class="project-num">' + cardNum + '</span>',
      latestBadge,
      '    </div>',
      '    <div class="text-center mb-4">',
      '      <p class="text-gray-500 dark:text-gray-400 text-sm font-medium" data-i18n="' + metaKey + '">' + loc.meta + '</p>',
      '      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" data-i18n="' + titleKey + '" data-project-trigger="' + p.id + '">' + loc.title + '</h3>',
      '    </div>',
      '    <div class="project-thumb mb-4 cursor-pointer group" data-project-trigger="' + p.id + '" title="Xem chi tiết">',
      '      <img src="' + p.image + '" alt="' + (p.alt || loc.title) + '" loading="lazy" decoding="async">',
      '      <div class="project-thumb-overlay">',
      '        <span class="project-thumb-hint">',
      '          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">',
      '            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
      '            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />',
      '          </svg>',
      '          <span data-i18n="p_btn_details">Chi tiết</span>',
      '        </span>',
      '      </div>',
      '    </div>',
      '    <p class="text-gray-600 dark:text-gray-300 mb-4" data-i18n="' + descKey + '">' + (loc.desc || loc.summary) + '</p>',
      '    <div class="flex flex-wrap gap-2 mb-6 project-tech-list">' + pills + '</div>',
      '  </div>',
      '  <div class="project-actions-row flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-white/5">',
      '    <button type="button" class="btn-project-details" data-project-id="' + p.id + '">',
      '      <span data-i18n="p_btn_details">Chi tiết</span>',
      '      <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">',
      '        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />',
      '      </svg>',
      '    </button>',
      '    <div class="flex items-center gap-3">' + links + '</div>',
      '  </div>',
      '</article>'
    ].join("");
  }

  function renderProjectCards() {
    const track = document.getElementById("projects-track");
    if (!track) return;
    track.innerHTML = rawProjects.map(function (p, idx) {
      const numStr = (idx + 1 < 10 ? "#0" : "#") + (idx + 1);
      return buildProjectCard(p, numStr);
    }).join("");
    if (typeof window.applyI18n === "function") {
      window.applyI18n(track);
    }
  }

  // ==========================================================================
  // Executive Overview Dashboard Render Engine
  // ==========================================================================
  function buildOverviewGrid() {
    const isEn = (typeof window.getCurrentLang === "function" ? window.getCurrentLang() : "vi") === "en";

    // Chart columns configuration
    const trackFillClasses = {
      fullstack: "chart-fill-fullstack",
      frontend: "chart-fill-frontend",
      backend: "chart-fill-backend",
      ai: "chart-fill-ai"
    };

    const maxCount = 6;

    const chartColsHtml = TRACKS_METADATA.map(function (track) {
      const loc = track[isEn ? "en" : "vi"];
      const count = rawProjects.filter(function (p) {
        return p.categories && p.categories.includes(track.id);
      }).length;
      const percent = Math.round((count / maxCount) * 100);
      const fillCls = trackFillClasses[track.id] || "chart-fill-fullstack";
      const shortTitle = track.id === "fullstack" ? "Full-Stack" : (track.id === "frontend" ? "Frontend" : (track.id === "backend" ? "Backend" : "AI & ML"));

      return [
        '<button type="button" class="chart-col-btn group" data-track-target="' + track.id + '" title="' + loc.title + '">',
        '  <div class="chart-col-val">',
        '    <span>' + count + '</span>',
        '    <span class="chart-col-unit">' + (isEn ? 'prjs' : 'dự án') + '</span>',
        '  </div>',
        '  <div class="chart-bar-pillar">',
        '    <div class="chart-bar-fill ' + fillCls + '" style="height: ' + percent + '%;"></div>',
        '  </div>',
        '  <div class="mt-2.5 flex items-center justify-center gap-1">',
        '    <span class="text-sm">' + track.icon + '</span>',
        '    <span class="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors whitespace-nowrap">' + shortTitle + '</span>',
        '  </div>',
        '  <span class="mt-0.5 text-[10px] sm:text-[11px] font-semibold text-indigo-500 dark:text-indigo-400 opacity-75 group-hover:opacity-100 group-hover:underline inline-flex items-center gap-0.5 whitespace-nowrap">',
        '    <span>' + (isEn ? 'Explore →' : 'Khám phá →') + '</span>',
        '  </span>',
        '</button>'
      ].join("");
    }).join("");

    const cardsHtml = TRACKS_METADATA.map(function (track) {
      const loc = track[isEn ? "en" : "vi"];
      const count = rawProjects.filter(function (p) {
        return p.categories && p.categories.includes(track.id);
      }).length;

      // Keep only top 4 pills for compact minimalism
      const topPills = (loc.highlights || []).slice(0, 4).map(function (h) {
        return '<span class="track-pill">' + h + '</span>';
      }).join("");

      return [
        '<div class="track-bento-card group cursor-pointer" data-track-id="' + track.id + '" role="button" tabindex="0" aria-label="' + loc.title + '">',
        '  <div class="track-card-top flex items-center justify-between gap-3 mb-2.5">',
        '    <div class="flex items-center gap-3 min-w-0 flex-1">',
        '      <span class="track-icon-badge text-xl p-2 rounded-xl ' + track.badgeClass + ' flex-shrink-0">' + track.icon + '</span>',
        '      <div class="min-w-0">',
        '        <h4 class="track-title text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors truncate">' + loc.title + '</h4>',
        '        <p class="track-tagline text-[11px] font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 whitespace-nowrap">' + loc.tagline + '</p>',
        '      </div>',
        '    </div>',
        '    <span class="track-count-badge flex-shrink-0 whitespace-nowrap">' + count + ' ' + (isEn ? 'Projects' : 'Dự án') + '</span>',
        '  </div>',
        '  <div class="track-highlights flex flex-wrap gap-1.5 mb-3">' + topPills + '</div>',
        '  <div class="track-footer flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-white/5">',
        '    <span class="track-featured text-xs text-gray-500 dark:text-gray-400 truncate max-w-[62%]"><span class="font-medium text-gray-700 dark:text-gray-300">' + (isEn ? 'Featured: ' : 'Tiêu biểu: ') + '</span>' + loc.featured + '</span>',
        '    <button type="button" class="track-cta-btn inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex-shrink-0 whitespace-nowrap" data-track-target="' + track.id + '">',
        '      <span>' + (isEn ? 'Explore track' : 'Khám phá') + '</span>',
        '      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>',
        '    </button>',
        '  </div>',
        '</div>'
      ].join("");
    }).join("");

    return [
      '<div class="projects-overview-grid max-w-5xl mx-auto">',
      '  <div class="overview-chart-card mb-6">',
      '    <div class="flex flex-wrap items-center justify-between gap-3 mb-2 pb-3 border-b border-slate-200/60 dark:border-white/5">',
      '      <div>',
      '        <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">',
      '          <span>📊</span><span>' + (isEn ? 'Engineering Tracks Distribution' : 'Phân bổ Dự án theo Chuyên môn') + '</span>',
      '        </h3>',
      '        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">' + (isEn ? '12 Production & Research Projects across 4 Domains' : 'Tổng hợp 12 dự án thực tế & nghiên cứu trên 4 trục kỹ thuật cốt lõi') + '</p>',
      '      </div>',
      '      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 whitespace-nowrap">',
      '        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>',
      '        <span>' + (isEn ? '12 Live / Clean Source Projects' : '12 Dự án Thực tế & Nghiên cứu') + '</span>',
      '      </span>',
      '    </div>',
      '    <div class="overview-chart-grid">' + chartColsHtml + '</div>',
      '  </div>',
      '  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">' + cardsHtml + '</div>',
      '</div>'
    ].join("");
  }

  function renderProjectsOverview() {
    const container = document.getElementById("projects-overview-container");
    if (!container) return;
    container.innerHTML = buildOverviewGrid();

    // Wire clicks to switch tab
    container.querySelectorAll("[data-track-target], [data-track-id]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        const trackId = el.getAttribute("data-track-target") || el.getAttribute("data-track-id");
        if (trackId && typeof window.switchProjectsCategory === "function") {
          window.switchProjectsCategory(trackId);
        }
      });
    });

    if (typeof window.applyI18n === "function") {
      window.applyI18n(container);
    }
  }

  global.buildProjectCard = buildProjectCard;
  global.renderProjectCards = renderProjectCards;
  global.renderProjectsOverview = renderProjectsOverview;
  global.TRACKS_METADATA = TRACKS_METADATA;

  global.PROJECTS_DATA = rawProjects;
  global.rawProjects = rawProjects;
})(typeof window !== "undefined" ? window : this);
