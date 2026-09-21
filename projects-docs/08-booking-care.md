# 🏥 BookingCare — Nền Tảng Đặt Lịch Khám Bệnh Trực Tuyến

> **Thời gian thực hiện:** Tháng 9, 2026 – Hiện tại  
> **Vai trò:** Full-Stack Developer  
> **Công nghệ chính:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Supabase (PostgreSQL, Auth SSR, RLS)  
> **GitHub Repository:** [https://github.com/tranhohoangvu/booking-care](https://github.com/tranhohoangvu/booking-care)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng nền tảng y tế số hóa đặt lịch khám bệnh trực tuyến hiện đại (lấy cảm hứng từ BookingCare), kết nối liền mạch giữa bệnh nhân, bác sĩ chuyên khoa và ban quản trị y tế.
- **Nghiệp vụ cốt lõi:**
  - **Phân quyền người dùng 3 cấp (Role-Based Access Control - RBAC):**
    - `PATIENT`: Tìm kiếm bác sĩ theo chuyên khoa/bệnh viện/mức giá; đặt lịch khám cho bản thân hoặc người thân (`booking_for`); quản lý trạng thái lịch khám (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`); nhận biên nhận điện tử có mã QR Check-in; gửi đánh giá & chấm điểm sao sau khám.
    - `DOCTOR`: Thiết lập ca khám linh hoạt theo các khung giờ chuẩn 30 phút; sử dụng **Bulk Schedule Generator** tạo lịch tự động theo tuần/tháng; quản lý danh sách bệnh nhân theo ngày; mở workspace chẩn đoán y khoa (`ClinicalNotesModal`) ghi nhận bệnh án, hướng dẫn điều trị và đơn thuốc.
    - `ADMIN`: Giám sát toàn bộ KPI nền tảng (tổng lượt khám, doanh thu GMV, tỷ lệ hoàn thành); quản lý danh mục Chuyên khoa (`Specialties`), Phòng khám/Bệnh viện (`Clinics`), phân công và thiết lập biểu phí cho Bác sĩ.
  - **Cơ chế Offline Mock Engine:** Tích hợp bộ giả lập dữ liệu zero-latency tự động kích hoạt khi chưa cấu hình Supabase credentials, đảm bảo ứng dụng chạy offline đầy đủ tính năng ngay tức thì.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Next.js 15 App Router phân tầng module hóa, kết hợp tối ưu giữa React Server Components (RSC) cho render dữ liệu tĩnh và Client Components cho tương tác động.
- **Tầng Service Layer chuyên biệt (`src/lib/services/`):** Tách bạch hoàn toàn logic nghiệp vụ khỏi giao diện:
  - `appointments.ts`: Khóa slot nguyên tử, tạo phiếu đặt khám, luồng hủy lịch và hoàn trả trạng thái slot.
  - `schedules.ts`: Thuật toán sinh lịch khám hàng loạt, bật/tắt slot khả dụng và chống ghi đè ca đã đặt.
  - `doctors.ts`, `clinics.ts`, `specialties.ts`: Tìm kiếm đa tiêu chí kết hợp đồng bộ 2 chiều với URL Query Parameters.
  - `admin.ts` & `reviews.ts`: Thống kê chỉ số vận hành và tự động tính toán lại điểm đánh giá trung bình của bác sĩ.
- **Bảo mật & Điều hướng (`middleware.ts`):** Sử dụng Supabase SSR Auth Middleware kiểm tra session cookies trên từng request, bảo vệ nghiêm ngặt các route nhạy cảm (`/admin/*`, `/doctor/*`, `/appointments`).

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ quản trị CSDL:** PostgreSQL lưu trữ trên nền tảng Supabase Cloud.
- **Thiết kế Schema & Toàn vẹn dữ liệu:**
  - Chuẩn hóa quan hệ các bảng thực thể: `specialties`, `clinics`, `doctor_profiles`, `patient_profiles`, `schedules`, `appointments`, `medical_records`, `reviews`.
  - **Database Triggers:** Tự động lắng nghe sự kiện đăng ký từ `auth.users` để khởi tạo bản ghi profile tương ứng (`patient_profiles` hoặc `doctor_profiles`).
  - **Row Level Security (RLS):** Thiết lập chính sách bảo mật cấp dòng ở tầng database, đảm bảo bệnh nhân chỉ xem được dữ liệu của chính mình và bác sĩ chỉ thao tác trên danh sách bệnh nhân được phân công.
  - **Atomic Updates & Partial Constraints:** Sử dụng unique constraint kết hợp trạng thái slot (`AVAILABLE`, `BOOKED`, `BLOCKED`) để loại trừ nguy cơ trùng lặp.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Chống đặt trùng lịch đồng thời (Anti-Race Condition Concurrency Booking)**  
  *Thách thức:* Khi nhiều bệnh nhân cùng thao tác đặt chung một khung giờ khám còn trống của một bác sĩ tại cùng một thời điểm.  
  *Giải pháp:* Triển khai truy vấn cập nhật nguyên tử có điều kiện (Atomic PostgreSQL UPDATE với `WHERE status = 'AVAILABLE'`) kết hợp kiểm tra tính duy nhất; chỉ một request thành công chuyển trạng thái sang `BOOKED`, các request đồng thời khác nhận thông báo xung đột tức thì.
- **Bài toán 2: Quản lý lịch khám quy mô lớn với Bulk Schedule Generator**  
  *Thách thức:* Bác sĩ cần khởi tạo lịch làm việc cho nhiều tuần liên tiếp với hàng trăm slot 30 phút mà không được làm gián đoạn các slot đã có người đặt trước.  
  *Giải pháp:* Thiết kế thuật toán sinh slot theo mảng ngày chọn trước kết hợp ca làm việc (Sáng/Chiều); thực hiện batch upsert an toàn vào database, tự động bỏ qua (preserve) các slot đang ở trạng thái `BOOKED`.
- **Bài toán 3: Phân quyền đa cấp bảo mật sâu kết hợp SSR Session**  
  *Thách thức:* Bảo vệ dữ liệu nhạy cảm của hồ sơ y tế bệnh nhân và ngăn chặn người dùng thường can thiệp vào trang điều khiển của bác sĩ hoặc admin.  
  *Giải pháp:* Phối hợp bảo mật 2 lớp: Layer 1 kiểm soát route tại Edge Middleware thông qua token xác thực; Layer 2 kiểm soát dữ liệu tại PostgreSQL RLS thông qua JWT claim `auth.uid()` và role metadata.

---

## 5. Công nghệ & Thư viện sử dụng
- **Frontend & UI:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React, Radix UI primitives.
- **Quản lý Form & State:** TanStack React Query v5, React Hook Form, Zod schema validation.
- **Backend & Cơ sở dữ liệu:** Supabase (PostgreSQL, Supabase Auth SSR, Row Level Security, Triggers & Functions, Storage).
- **Công cụ kiểm thử & Triển khai:** Vercel, Node.js 20+, Git, GitHub.
