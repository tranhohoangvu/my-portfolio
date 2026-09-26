# 🏫 SchoolOps — School Operations Management System

> **Thời gian thực hiện:** Tháng 9, 2026 – Hiện tại  
> **Vai trò:** Full-Stack Developer (Frontend & Backend)  
> **Demo / Repository:** *(Private — available upon request)*

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng nền tảng quản lý vận hành trường học cấp độ doanh nghiệp (enterprise-grade) dành riêng cho các trường THCS Việt Nam, lấy mô hình vận hành của Trường THCS Nguyễn Tất Thành (Năm học 2026 – 2027) làm tập dữ liệu tham chiếu và kiểm thử thực tế.
- **Quy mô tập dữ liệu chuẩn:** 4 khối lớp, 16 lớp học (6A1–9A4), 480 học sinh (30 HS/lớp), 24 giáo viên với sự phân tách rõ ràng giữa GVCN và GVBM, 10 môn học cốt lõi.
- **Nghiệp vụ cốt lõi:**
  - **Ma trận RBAC động theo từng lớp:** Quyền hạn tự động thích ứng dựa trên phân công thực tế của giáo viên trong từng lớp cụ thể — GVCN có toàn quyền CRUD, GVBM chỉ đọc và điểm danh môn phụ trách, Admin quản trị toàn trường.
  - **Sơ đồ chỗ ngồi thông minh (20 bàn / 40 chỗ):** Bố cục lớp học chuẩn 4 cột × 5 hàng, hỗ trợ chuyển đổi góc nhìn (từ cuối lớp / từ bục giảng), xáo trộn ngẫu nhiên Fisher-Yates, overlay điểm danh trực quan và in sơ đồ A4 ngang cho cửa lớp.
  - **Điểm danh theo tiết / môn học:** Hệ thống tự động phát hiện tiết học đang diễn ra theo đồng hồ thực tế, tổng hợp báo cáo vắng buổi sáng/chiều 1-click định dạng sẵn để gửi qua Zalo/SMS.
  - **Thời khóa biểu 2 ca:** Hỗ trợ lịch học ca sáng (Khối 6, 9: Tiết 1–5) và ca chiều (Khối 7, 8: Tiết 6–10), tự động phát hiện và ngăn ngừa xung đột giáo viên dạy 2 lớp cùng giờ.
  - **Quản lý học sinh & Nhập liệu Excel:** CRUD hồ sơ học sinh đầy đủ, import hàng loạt từ file Excel chuẩn trường, thẻ liên lạc phụ huynh 1-chạm.
  - **Thông báo & Ghi chú lớp học:** Bảng thông báo với tính năng ghim tin, ghi chú nhận xét học sinh dành cho GVCN.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Monorepo chuẩn hóa với kiến trúc phân tầng nghiêm ngặt trên cả hai service: **Controller → Service → Repository** (Backend) và **Page/Component → Service Layer → API Client** (Frontend).
- **Các service & module chính:**
  - **Frontend (Next.js 16, Port 3000):** App Router với 19 routes tĩnh và động, Client-side Auth/Class Context, RBAC Route Guards, API Proxy Rewrite (`/api/* → :4000`) để loại bỏ CORS friction trong local development.
  - **Backend (Node.js + Express + TS, Port 4000):** 10 Controllers, 10 Services, 11 Repositories, hệ thống Route modular với middleware chain đầy đủ.
  - **Middleware bảo mật:** `auth.middleware.ts` xác thực JWT từ HttpOnly cookie hoặc Bearer header; `rbac.middleware.ts` thực thi guards `requireRole` và `requireClassAccess`; `validate.middleware.ts` kiểm tra payload bằng Zod schema trước khi vào controller; `error.middleware.ts` xử lý lỗi tập trung trả về chuẩn JSON.
  - **Migrations Pipeline:** 7 file SQL theo thứ tự (001→007) — Schema, Constraints, Indexes, Stored Procedures, Triggers, Seed data, Timetable rules — chạy tự động qua migration runner script.
- **Triết lý thiết kế kỹ thuật:** Sử dụng native PostgreSQL `pg` pool (không ORM) để kiểm soát hoàn toàn execution plan; HttpOnly cookie JWT để ngăn XSS; Zod validation trên cả Frontend và Backend đảm bảo type-safety end-to-end; Fisher-Yates shuffle đảm bảo uniform permutation khi xáo chỗ ngồi.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ quản trị:** PostgreSQL 16 (Local hoặc Render PostgreSQL Cloud).
- **Thiết kế Schema:** 12 bảng quan hệ chuẩn hóa — `users`, `classes`, `students`, `seating_assignments`, `attendance_records`, `timetable_entries`, `subjects`, `teacher_assignments`, `announcements`, `student_notes`, và bảng lookup hỗ trợ — với đầy đủ foreign keys, check constraints và capacity limits.
- **Tối ưu truy vấn:**
  - Sử dụng driver native `pg` (node-postgres) với connection pooling — không ORM, toàn quyền kiểm soát Raw SQL.
  - Migration `003_indexes.sql` tạo các composite index trên các cột lookup phổ biến (classId, date, teacherId, subjectId) để tăng tốc truy vấn attendance và timetable.
  - Migration `004_functions.sql` đóng gói các PostgreSQL stored procedures cho các tác vụ phức tạp (kiểm tra xung đột lịch, tính toán KPI báo cáo).
  - Migration `005_triggers.sql` tự động cập nhật timestamp `updated_at` trên mọi bảng — không cần xử lý thủ công ở tầng application.
  - Seed data (`006_seed.sql`) nạp deterministically 16 lớp, 24 giáo viên, 480 học sinh và bộ thời khóa biểu mẫu đầy đủ cho cả 2 ca.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Dynamic Per-Class RBAC — Cùng một giáo viên, quyền khác nhau ở mỗi lớp**  
  *Thách thức:* Một giáo viên có thể đồng thời là GVCN (toàn quyền) ở lớp 6A1 và chỉ là GVBM (hạn chế) ở 6A2, 7A1. Quyền không thể gắn tĩnh vào tài khoản mà phải tính động theo ngữ cảnh lớp học.  
  *Giải pháp:* Thiết kế `ClassContext` (Frontend) làm dynamic role resolver — mỗi khi người dùng chuyển lớp, resolver tra cứu bảng `teacher_assignments` và tính toán lại toàn bộ permission set; Backend `rbac.middleware.ts` (`requireClassAccess`) độc lập xác minh quyền lại tại mỗi endpoint để không phụ thuộc client-side state.

- **Bài toán 2: Thời khóa biểu 2 ca & Phát hiện xung đột giáo viên school-wide**  
  *Thách thức:* Hệ thống phải ngăn chặn Admin phân công một giáo viên dạy hai lớp khác nhau trong cùng tiết học — xung đột này không thể phát hiện bằng unique constraint đơn giản do mỗi lớp có offset ca sáng/chiều khác nhau.  
  *Giải pháp:* Migration `007_timetable_rules.sql` tạo partial index xung đột (`teacher_id, period, day_of_week`) trên bảng `timetable_entries`; stored procedure trong `004_functions.sql` kiểm tra xung đột trước khi INSERT và trả về lỗi có cấu trúc; `TimetableService` (Backend) wrap logic trong database transaction để đảm bảo tính nguyên tử.

- **Bài toán 3: Sơ đồ chỗ ngồi — Dual-perspective rendering & Live Attendance Overlay**  
  *Thách thức:* Hiển thị cùng một sơ đồ 4×5 từ hai góc nhìn đối nghịch (từ cuối lớp / từ bục giảng) trong khi vẫn overlay trạng thái điểm danh theo thời gian thực mà không gây re-render toàn bộ grid.  
  *Giải pháp:* Encode tọa độ bàn theo chỉ số tuyệt đối (desk index 0–19); khi chuyển perspective, component `SeatingGrid` đảo ngược thứ tự render bằng CSS transform + reverse mapping — không thay đổi data model; attendance overlay được truyền qua prop riêng biệt và render độc lập bằng badge layer, không làm dirty seating state.

---

## 5. Công nghệ & Thư viện sử dụng
- **Frontend:** Next.js 16.3.5 (App Router, Turbopack), React 19, TypeScript 5, TailwindCSS v4 (`@tailwindcss/postcss`), Phosphor Icons, Zod 3.25, Vitest 5.0 (110 unit tests / 8 test suites), SheetJS (`xlsx`), Sonner.
- **Backend:** Node.js (>=20), Express 4.21, TypeScript 5.8, `pg` (node-postgres connection pool), `jsonwebtoken` (HttpOnly cookie JWT), `bcryptjs`, Zod 3.24, `tsx` (dev runtime & watch mode).
- **Database:** PostgreSQL 16 — 12 normalized tables, 7 sequenced SQL migrations (schema → constraints → indexes → stored procedures → triggers → seed → timetable rules).
- **Testing:** Vitest 5.0 — 8 test suites kiểm thử RBAC permissions, Fisher-Yates seating, timetable conflict detection, attendance logic và Excel roster import.
- **Triển khai:** Render PostgreSQL (Database), Render Web Service (Backend), Vercel (Frontend) — hoặc chạy hoàn toàn local với npm workspaces.
