# 🛍️ E-Commerce Platform & Gemini AI Shopping Assistant

> **Thời gian thực hiện:** Tháng 9, 2025 – Tháng 12, 2025  
> **Vai trò:** Full-Stack & Backend Developer  
> **GitHub Repository:** [https://github.com/tranhohoangvu/E-Commerce-Website](https://github.com/tranhohoangvu/E-Commerce-Website)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng nền tảng thương mại điện tử full-stack hoàn chỉnh, ứng dụng trợ lý trí tuệ nhân tạo Gemini AI hỗ trợ mua sắm và tối ưu hóa quy trình đặt hàng, thanh toán trực tuyến an toàn.
- **Nghiệp vụ cốt lõi:**
  - **Trợ lý mua sắm thông minh (Gemini AI Chatbot):** Widget trò chuyện tích hợp trực tiếp trên giao diện người dùng, trả lời câu hỏi về thông tin sản phẩm, hướng dẫn chọn kích cỡ và kiểm tra tình trạng kho theo thời gian thực.
  - **Quản lý danh mục & Tìm kiếm:** Bộ lọc sản phẩm đa tiêu chí (danh mục, khoảng giá, đánh giá), phân trang động và tìm kiếm nhanh.
  - **Giỏ hàng & Cổng thanh toán VNPAY:** Quản lý giỏ hàng phía client với Zustand, tích hợp thanh toán sandbox VNPAY với mã phản hồi bảo mật HMAC-SHA512.
  - **Chương trình thành viên (Loyalty Program):** Tự động tích lũy điểm thưởng theo giá trị đơn hàng và cho phép khấu trừ điểm khi thanh toán.
  - **Hệ thống email thông báo:** Gửi email xác nhận đơn hàng và khôi phục mật khẩu thông qua Nodemailer/MailHog.
  - **Admin Dashboard:** Biểu đồ phân tích doanh thu và số lượng đơn hàng trực quan bằng Recharts, quản lý tồn kho và sản phẩm.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Kiến trúc RESTful API module hóa theo domain nghiệp vụ kết hợp WebSockets (Socket.IO).
- **Module & Middleware chính:**
  - `Security Middleware`: Xác thực hai lớp JWT (Access Token 15 phút, Refresh Token 7 ngày) kết hợp Google OAuth; bảo vệ API với Helmet và Rate Limiting.
  - `Request Validation`: Kiểm tra và làm sạch toàn bộ dữ liệu đầu vào bằng Zod schema validation.
  - `Socket.IO Module`: Đồng bộ trạng thái đơn hàng và cập nhật tồn kho tức thì đến client.
  - `Nginx Reverse Proxy`: Điều hướng lưu lượng, cân bằng tải và kết nối giữa frontend React và backend Node.js.
  - `CI/CD Pipeline (GitHub Actions)`: Tự động kiểm thử, build Docker images và phát hành lên Docker Hub mỗi khi push vào nhánh main.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ quản trị:** MongoDB (NoSQL) với ODM Mongoose.
- **Thiết kế Schema:**
  - Mô hình hóa Document linh hoạt: Collections `Users`, `Products`, `Orders`, `Vouchers`, `LoyaltyHistory`.
  - Sử dụng **Embedded Documents** để lưu trữ snapshot thông tin sản phẩm và giá bán tại thời điểm đặt hàng (bảo toàn dữ liệu lịch sử đơn hàng).
- **Tối ưu truy vấn:**
  - Thiết lập **Compound Indexing** trên các trường danh mục và giá bán để tăng tốc độ tìm kiếm và sắp xếp sản phẩm.
  - Sử dụng toán tử nguyên tử MongoDB (`$inc` kèm điều kiện `$gte`) để đảm bảo trừ kho chính xác, loại bỏ nguy cơ bán vượt số lượng tồn (overselling).

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Tích hợp Trợ lý Gemini AI Chatbot thời gian thực & Bảo mật API Key**  
  *Thách thức:* Người dùng cần câu trả lời nhanh chóng về sản phẩm, đồng thời không được để lộ Gemini API Key trên mã nguồn frontend.  
  *Giải pháp:* Thiết lập widget chat trên React kết nối qua một endpoint backend proxy chuyên dụng; backend chịu trách nhiệm gắn ngữ cảnh catalog sản phẩm và gửi request đến Google Gemini API một cách an toàn.
- **Bài toán 2: Tích hợp cổng thanh toán VNPAY & Toàn vẹn tồn kho đồng thời**  
  *Thách thức:* Nhiều người dùng cùng thanh toán một mặt hàng vào giờ cao điểm có thể dẫn đến trừ âm kho hoặc sai lệch thanh toán.  
  *Giải pháp:* Tích hợp VNPAY SDK với chữ ký số checksum (HMAC-SHA512); áp dụng thao tác cập nhật nguyên tử có điều kiện trong MongoDB (`findOneAndUpdate` với điều kiện `stock >= quantityRequested`).
- **Bài toán 3: Container hóa đa dịch vụ & Tự động hóa CI/CD**  
  *Thách thức:* Đảm bảo môi trường phát triển nhất quán giữa lập trình viên và môi trường triển khai thực tế.  
  *Giải pháp:* Viết Dockerfile tối ưu multi-stage build và cấu hình `docker-compose.yml` kết nối 5 service: Frontend, Backend, Nginx, MongoDB và MailHog; tích hợp GitHub Actions tự động build và push image lên Docker Hub.

---

## 5. Công nghệ & Thư viện sử dụng
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO, JWT, Bcrypt, Zod, Nodemailer, VNPAY SDK.
- **Frontend:** React 18, Vite, Tailwind CSS, Zustand, Axios, Recharts, Google OAuth.
- **DevOps & Công cụ:** Docker, Docker Compose, Nginx, GitHub Actions CI/CD, MailHog.
