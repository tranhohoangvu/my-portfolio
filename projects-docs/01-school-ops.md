# 🏫 SchoolOps — School Operations Management System

> **Thời gian thực hiện:** Tháng 9, 2026 - Hiện tại  
> **Vai trò:** Full-Stack Developer (Frontend & Backend)  
> **Demo / Repository:** [Live Demo (schoolops-platform.vercel.app)](https://schoolops-platform.vercel.app/) | *(Repository: Private — available upon request)*

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng nền tảng quản lý vận hành trường học cấp độ doanh nghiệp (enterprise-grade) dành riêng cho các trường THCS Việt Nam, lấy mô hình vận hành của Trường THCS Nguyễn Tất Thành (Năm học 2026 - 2027) làm tập dữ liệu tham chiếu và kiểm thử thực tế.
- **Quy mô tập dữ liệu chuẩn:** 4 khối lớp (Khối 6–9), 16 lớp học (6A1–9A4), 480 học sinh (30 HS/lớp), 24 giáo viên với sự phân tách rõ ràng giữa Giáo viên Chủ nhiệm (GVCN) và Giáo viên Bộ môn (GVBM), 10 môn học cốt lõi.
- **Nghiệp vụ cốt lõi:**
  - **Ma trận RBAC động theo từng lớp:** Quyền hạn tự động thích ứng dựa trên phân công thực tế của giáo viên trong từng lớp cụ thể — GVCN có toàn quyền CRUD học sinh, xếp chỗ ngồi; GVBM chỉ đọc và điểm danh đúng môn phụ trách; Ban Giám hiệu (Admin) quản trị phân công giáo viên, thời khóa biểu và báo cáo toàn trường.
  - **Sơ đồ chỗ ngồi thông minh (20 bàn / 40 chỗ):** Bố cục lớp học chuẩn 4 cột × 5 hàng (20 bàn đôi), hỗ trợ chuyển đổi góc nhìn tức thì (từ cuối lớp / từ bục giảng), xáo trộn ngẫu nhiên Fisher-Yates, overlay điểm danh trực quan và in sơ đồ A4 ngang chuẩn mực cho cửa lớp (`@media print`).
  - **Điểm danh theo tiết / môn học:** Hệ thống tự động đồng bộ ngữ cảnh tiết học theo thời gian thực (real-time clock), tổng hợp báo cáo vắng buổi sáng/chiều 1-click định dạng sẵn để gửi ngay cho Ban Giám hiệu qua Zalo/SMS.
  - **Thời khóa biểu 2 ca & Chống trùng lịch:** Hỗ trợ lịch học ca sáng (Khối 6, 9: Tiết 1–5) và ca chiều (Khối 7, 8: Tiết 6–10), kiểm soát số tiết liền kề tối đa theo môn học, tự động phát hiện và ngăn chặn giáo viên hoặc phòng học bị xếp trùng giờ.
  - **Quản lý học sinh & Nhập liệu Excel:** CRUD hồ sơ học sinh đầy đủ, import hàng loạt từ file Excel chuẩn THCS, thẻ liên lạc phụ huynh 1-chạm tích hợp sẵn các mẫu tin nhắn sư phạm chuẩn mực.
  - **Thông báo & Ghi chú sư phạm:** Bảng tin nội bộ lớp học với tính năng ghim thông báo quan trọng, hệ thống ghi chú nhận xét học sinh cá nhân hóa dành riêng cho GVCN.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Monorepo chuẩn hóa với kiến trúc phân tầng nghiêm ngặt trên cả hai service: **Controller → Service → Repository** (Backend) và **Page/Component → Context/Service Layer → API Client** (Frontend).
- **Các service & module chính:**
  - **Frontend (Next.js 16, Port 3000 / Vercel Edge):** App Router với 19 routes tĩnh và động, Client-side Auth/Class Context, RBAC Route Guards, API Proxy Rewrites (`/api/* → backend` và `/health`) loại bỏ CORS friction trong cả môi trường local và production.
  - **Backend (Node.js + Express + TS, Port 4000 / Vercel Serverless):** Layered architecture gồm 10 Controllers, 10 Services, 12 Repositories, hệ thống router modular với middleware chain khép kín. Được đóng gói chạy dạng Serverless Function trên Vercel thông qua `backend/vercel.json` và entrypoint `backend/api/index.js`.
  - **Middleware bảo mật:**
    - `auth.middleware.ts`: Xác thực và giải mã JWT từ HttpOnly cookie hoặc `Authorization: Bearer` header.
    - `rbac.middleware.ts`: Thực thi guards phân quyền `requireRole` (ADMIN/TEACHER) và `requireClassAccess` (kiểm tra quyền GVCN/GVBM thời gian thực).
    - `validate.middleware.ts`: Thẩm định tính hợp lệ của request payload (body, query, params) bằng Zod schema trước khi đưa vào controller.
    - `error.middleware.ts`: Bắt và xử lý lỗi tập trung qua class `AppError`, trả về JSON response chuẩn hóa `{ error: { code, message, details } }`.
  - **Migrations Pipeline:** 7 file SQL versioned theo thứ tự nghiêm ngặt (001→007) — Initial Schema, Constraints, Indexes, Functions, Triggers, Seed data, Timetable Rules — chạy tự động qua migration runner script độc lập (`scripts/migrate.ts`).
- **Triết lý thiết kế kỹ thuật:** Sử dụng native PostgreSQL `pg` pool (không ORM cồng kềnh) để kiểm soát tuyệt đối query execution plan; HttpOnly cookie JWT chống tấn công XSS; Zod validation end-to-end bảo đảm type-safety; thuật toán Fisher-Yates bảo đảm tính ngẫu nhiên đều (uniform permutation) khi xếp chỗ.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ quản trị:** PostgreSQL 16 (Local instance hoặc **Neon Serverless PostgreSQL Cloud** với PgBouncer connection pooler).
- **Thiết kế Schema:** 12 bảng quan hệ chuẩn hóa cao:
  1. `users`: Tài khoản giáo viên, cán bộ quản lý với mật khẩu mã hóa bcrypt (10 salt rounds).
  2. `subjects`: 10 môn học chính khóa + sinh hoạt lớp, cấu hình số tiết liền kề tối đa (`max_consecutive_periods`).
  3. `classes`: 16 lớp học THCS, ràng buộc khối lớp (6–9), sĩ số trần tối đa 40 học sinh, 20 bàn học.
  4. `class_memberships`: Phân công vai trò giáo viên theo lớp (`HOMEROOM_TEACHER` / `SUBJECT_TEACHER`).
  5. `subject_assignments`: Phân công chi tiết giáo viên giảng dạy từng bộ môn cụ thể tại từng lớp.
  6. `timetable_entries`: Lịch học tuần 28 tiết/lớp, ca sáng/chiều, phòng học gán theo tiết (`room`).
  7. `students`: Hồ sơ 480 học sinh, mã định danh duy nhất theo lớp (`HS001–HS030`), liên hệ phụ huynh.
  8. `desks`: 20 bàn đôi chuẩn hóa theo tọa độ hàng (1–5) và cột (1–4).
  9. `seats`: 40 vị trí ngồi (`left`/`right`), áp đặt ràng buộc duy nhất 1-1 giữa học sinh và vị trí ghế.
  10. `attendance`: Nhật ký chuyên cần theo tiết/ngày/môn học (`present`, `absent`, `late`, `excused`).
  11. `announcements`: Bảng tin thông báo của lớp với cờ ưu tiên ghim đầu trang (`is_pinned`).
  12. `student_notes`: Ghi chú nhận xét sư phạm cá nhân hóa do GVCN thiết lập.
- **Tối ưu truy vấn & Bảo toàn toàn vẹn:**
  - Driver native `pg` (`pg.Pool`) với cơ chế tự động kích hoạt SSL (`rejectUnauthorized: false`) khi kết nối tới Neon Serverless.
  - Migration `003_indexes.sql`: Composite index trên các tổ hợp lookup tần suất cao (`class_id, date, subject_id`, `teacher_id`, `student_code`).
  - Migration `004_functions.sql` & `005_triggers.sql`: Stored procedures tự động cập nhật timestamp `updated_at` và trigger `trg_check_max_students` chặn vượt quá sĩ số trần 40 HS ngay tại tầng database.
  - Migration `007_timetable_rules.sql`: Thiết lập partial unique index `idx_timetable_room_slot` chống trùng lặp phòng học cùng tiết/thứ.
  - Seed dataset (`006_seed.sql`): Nạp đầy đủ 16 lớp học, 24 giáo viên, 480 học sinh và bộ thời khóa biểu mẫu hoàn chỉnh cho cả 2 ca học.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Dynamic Per-Class RBAC — Cùng một giáo viên, quyền hạn biến thiên theo từng lớp**  
  *Thách thức:* Một giáo viên đồng thời là GVCN (toàn quyền) ở lớp 6A1 nhưng chỉ là GVBM (chỉ xem & điểm danh môn mình) ở các lớp 6A2, 7A1. Quyền hạn không thể gắn tĩnh vào user role mà phải tính toán động theo ngữ cảnh lớp đang thao tác.  
  *Giải pháp:* Thiết kế `ClassContext` trên Frontend làm dynamic role resolver — mỗi khi chuyển lớp trên thanh Class Switcher, context tra cứu phân công và cập nhật tức thì state quyền hạn; Backend xây dựng middleware `requireClassAccess` độc lập truy vấn bảng `class_memberships` và `subject_assignments` tại mỗi request để ngăn chặn triệt để hành vi can thiệp từ client.

- **Bài toán 2: Thời khóa biểu 2 ca, giới hạn tiết liền kề & Chống xung đột giáo viên / phòng học toàn trường**  
  *Thách thức:* Hệ thống phải tự động điều phối 2 ca học tách biệt (Sáng: Khối 6, 9; Chiều: Khối 7, 8), đảm bảo môn học không vượt quá số tiết liền kề cho phép (Toán/Văn tối đa 2 tiết, các môn khác 1 tiết), đồng thời ngăn ngừa tuyệt đối xung đột 1 giáo viên hoặc 1 phòng học bị xếp 2 nơi trong cùng 1 tiết.  
  *Giải pháp:* Kết hợp ràng buộc tầng Database (Migration `007_timetable_rules.sql` với index `idx_timetable_room_slot`) và thuật toán kiểm tra xung đột trong `TimetableService`; bọc toàn bộ thao tác cập nhật thời khóa biểu trong Database Transaction (`BEGIN ... COMMIT / ROLLBACK`) đảm bảo tính nguyên tử (Atomicity).

- **Bài toán 3: Sơ đồ chỗ ngồi — Dual-Perspective Rendering & Live Attendance Overlay**  
  *Thách thức:* Biểu diễn sơ đồ 20 bàn / 40 chỗ từ hai góc nhìn đối xứng (từ cuối lớp nhìn lên vs từ bục giảng nhìn xuống) kết hợp phủ trực quan trạng thái điểm danh theo thời gian thực mà không làm đảo lộn cấu trúc dữ liệu hoặc gây re-render tốn kém.  
  *Giải pháp:* Chuẩn hóa tọa độ bàn thành chỉ số tuyệt đối (0–19); component `SeatingGrid` xử lý góc nhìn thuần túy bằng thuật toán chuyển đổi tọa độ hiển thị (visual index mapping) mà không làm biến đổi vị trí gốc trong database; dữ liệu điểm danh được truyền qua prop riêng và render trên một badge layer độc lập, không làm dirty state sơ đồ lớp.

- **Bài toán 4: Chuyển đổi mô hình Serverless trên Vercel & Neon**  
  *Thách thức:* Đưa ứng dụng Express truyền thống và cơ sở dữ liệu quan hệ sang môi trường serverless (Vercel Functions + Neon Postgres) mà không gặp lỗi cạn kiệt connection pool khi có nhiều request đồng thời, và xử lý tương thích các thư viện native Rust của TailwindCSS v4 trên Vercel build environment.  
  *Giải pháp:* Cấu hình `backend/vercel.json` điều hướng toàn bộ traffic vào Serverless entrypoint `backend/api/index.js`; sử dụng Neon Connection Pooler endpoint (`-pooler` qua PgBouncer) kết hợp cấu hình `pg.Pool` tối ưu timeout; tạo `frontend/vercel.json` với script cài đặt bổ sung `@tailwindcss/oxide-linux-x64-gnu` và `lightningcss-linux-x64-gnu` đảm bảo build thành công 100% trên hạ tầng Linux của Vercel.

---

## 5. Công nghệ & Thư viện sử dụng
- **Frontend:** Next.js 16.3.5 (App Router, Turbopack), React 19, TypeScript 5, TailwindCSS v4 (`@tailwindcss/postcss`), Phosphor Icons (`@phosphor-icons/react`), Zod 3.25, Vitest 5.0 (110 unit tests / 8 test suites), SheetJS (`xlsx`), Sonner (Toast notifications).
- **Backend:** Node.js (>= 20), Express 4.21, TypeScript 5.8, `pg` (node-postgres connection pool với SSL handler), `jsonwebtoken` (HttpOnly JWT cookie), `bcryptjs`, Zod 3.24, `tsx` (TypeScript runtime & migration engine).
- **Database:** PostgreSQL 16 (Neon Serverless PostgreSQL với PgBouncer pooling) — 12 bảng chuẩn hóa, 7 file migrations SQL tuần tự (Schema → Constraints → Indexes → Functions → Triggers → Seed → Timetable Rules).
- **Testing:** Vitest 5.0 — 8 test suites (110 tests passed 100%) kiểm thử toàn diện RBAC permissions, thuật toán Fisher-Yates, phát hiện xung đột thời khóa biểu, logic chuyên cần và bộ parser import Excel.
- **Triển khai:** **Vercel** (Frontend Next.js & Backend Express Serverless Functions qua rewrites), **Neon** (Serverless PostgreSQL Database) — hoặc khởi chạy đồng bộ local thông qua npm workspaces monorepo.
