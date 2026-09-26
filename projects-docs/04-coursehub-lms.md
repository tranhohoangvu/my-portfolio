# 🎓 CourseHub — Full-Stack Learning Management System (LMS)

> **Thời gian thực hiện:** Tháng 2, 2026 – Tháng 3, 2026  
> **Vai trò:** Backend & Full-Stack Developer  
> **Demo trực tiếp:** [https://coursehub-lms-eight.vercel.app](https://coursehub-lms-eight.vercel.app)  
> **API Backend:** [https://coursehub-lms.onrender.com](https://coursehub-lms.onrender.com)  
> **GitHub Repository:** [https://github.com/tranhohoangvu/coursehub-lms](https://github.com/tranhohoangvu/coursehub-lms)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng nền tảng LMS full-stack gọn nhẹ, tối ưu hiệu năng cao cho vị trí Backend Developer, thể hiện tư duy thiết kế cơ sở dữ liệu quan hệ và kiểm soát truy vấn SQL tầng thấp.
- **Nghiệp vụ cốt lõi:**
  - **Không gian học tập chuẩn Udemy (Split-Screen Workspace):** Thanh mục lục/giáo trình thu gọn linh hoạt bên phải, không gian phát video YouTube và tài liệu học tập bên trái.
  - **Đồng bộ hóa URL Navigation:** Đồng bộ trạng thái khóa học và bài học vào query params (`/my-courses?courseId=...&lessonId=...`), hỗ trợ các thao tác Back/Forward trên trình duyệt mà không mất vị trí bài học.
  - **Phân quyền RBAC 3 cấp độ:** 
    - `ADMIN`: Quản trị toàn bộ hệ thống, theo dõi báo cáo doanh thu và người dùng.
    - `INSTRUCTOR`: Soạn thảo khóa học, quản lý đề cương bài giảng và tài nguyên đa phương tiện.
    - `STUDENT`: Tìm kiếm khóa học, mua khóa học, học tập theo lộ trình, cập nhật tiến độ và viết đánh giá.
  - **Giỏ hàng & Thanh toán:** Giỏ hàng lưu database đồng bộ đa thiết bị, mô phỏng checkout và tự động kích hoạt ghi danh khóa học.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** MVC phân tầng nghiêm ngặt (Controller – Service – Model / Data Access).
- **Module & Middleware chính:**
  - `Authentication & RBAC Middleware`: Xác thực stateless JSON Web Token (JWT), kiểm tra quyền sở hữu tài nguyên và vai trò trước khi vào route handler.
  - `Centralized Error Handler`: Middleware bắt lỗi tập trung, trả về định dạng response JSON chuẩn mực và bảo vệ an toàn thông tin server.
  - `Modular Services`: Tách biệt hoàn toàn tầng logic nghiệp vụ khỏi tầng HTTP routes và tầng truy vấn dữ liệu.
  - **Triết lý thiết kế:** Loại bỏ hoàn toàn Docker và các ORM cồng kềnh (Prisma/Sequelize) để đảm bảo tốc độ cold-start tức thì trên cloud và tránh các vấn đề tải binary engine qua mạng.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ quản trị:** PostgreSQL (Supabase Cloud).
- **Thiết kế Schema:** Chuẩn hóa 3NF với hơn 15 bảng quan hệ (Users, Courses, Lessons, Enrollments, Reviews, Cart Items, Roles,...).
- **Tối ưu truy vấn:**
  - Sử dụng driver native `pg` (node-postgres) với connection pooling, toàn quyền kiểm soát SQL execution plan.
  - Viết các truy vấn Raw SQL tổng hợp (Conditional Aggregation & Window Functions), tính toán chính xác % hoàn thành bài học chỉ trong một truy vấn duy nhất.
  - Bọc luồng checkout và ghi danh trong **Database Transactions** (`BEGIN ... COMMIT / ROLLBACK`), đảm bảo tính toàn vẹn dữ liệu khi có nhiều yêu cầu đồng thời.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Quản lý trạng thái học tập Udemy & Đồng bộ URL Navigation**  
  *Thách thức:* Giữ trạng thái bài giảng và video đang phát đồng bộ khi học viên reload trang hoặc bấm nút Back/Forward trên trình duyệt.  
  *Giải pháp:* Thiết kế layout split-screen responsive; ánh xạ mã khóa học và bài học vào URL query parameters (`?courseId=...&lessonId=...`), sử dụng React Router tự động đồng bộ state với URL.
- **Bài toán 2: Tối ưu hóa truy vấn Raw SQL thay vì dùng ORM**  
  *Thách thức:* Tránh hiện tượng N+1 queries và overhead kết nối khi tính toán tiến độ hoàn thành bài học của học viên.  
  *Giải pháp:* Viết truy vấn Raw SQL tổng hợp bằng lệnh JOIN và COUNT có điều kiện qua connection pool, trả về kết quả trong thời gian dưới 2ms.
- **Bài toán 3: Phân quyền RBAC đa cấp & Ngăn ngừa leo thang đặc quyền**  
  *Thách thức:* Đảm bảo học viên không truy cập trái phép bài giảng chưa mua, và giảng viên chỉ được quyền chỉnh sửa khóa học do chính mình tạo ra.  
  *Giải pháp:* Thiết lập middleware xác thực JWT claims kết hợp kiểm tra quyền sở hữu tài nguyên (Resource Ownership Verification) trực tiếp từ database trước khi thực hiện CRUD.

---

## 5. Công nghệ & Thư viện sử dụng
- **Backend:** Node.js, Express.js, native `pg` (node-postgres), JSON Web Token (`jsonwebtoken`), `bcryptjs`, CORS, Dotenv.
- **Frontend:** React 18, Vite, React Router DOM, Vanilla CSS.
- **Database & Triển khai:** PostgreSQL (Supabase), Vercel (Frontend), Render (Backend API).