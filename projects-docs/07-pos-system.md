# 💻 An Khang Store – Hệ Thống Quản Lý Bán Hàng & Điểm Bán Lẻ (POS)

> **Thời gian thực hiện:** Tháng 1, 2024 – Tháng 5, 2024  
> **Khóa học / Đơn vị:** Đồ án môn Lập trình Web và Ứng dụng – Đại học Tôn Đức Thắng (TDTU)  
> **Vai trò:** Fullstack Developer  
> **Nhóm thực hiện:** Trần Hồ Hoàng Vũ (52200214) & Cộng sự  
> **Video Demo:** [https://youtu.be/XLwuIJpsN-M](https://youtu.be/XLwuIJpsN-M)  
> **GitHub Repository:** [https://github.com/tranhohoangvu/Web-Programming-and-Applications](https://github.com/tranhohoangvu/Web-Programming-and-Applications)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng ứng dụng Point of Sale (POS) nội bộ trên nền tảng Laravel 10 phục vụ riêng cho nhân viên thu ngân và quản trị viên cửa hàng bán lẻ điện thoại và linh kiện điện tử (không dành cho khách hàng công chúng truy cập).
- **Nghiệp vụ cốt lõi:**
  - **Bán hàng & Checkout nhanh tại quầy:** Tìm kiếm sản phẩm theo tên hoặc quét mã vạch (barcode); giỏ hàng cập nhật tức thì tổng tiền và tiền thừa thối lại cho khách.
  - **Tra cứu & Tự động tạo khách hàng:** Nhập số điện thoại khách hàng tại quầy: nếu khách hàng cũ -> hiển thị lịch sử và thông tin; nếu khách hàng mới -> hệ thống tự động tạo hồ sơ khách hàng mới ngay trong luồng thanh toán.
  - **Quản lý tài khoản nhân viên & Token email 1 phút:** Admin tạo tài khoản nhân viên; hệ thống tự động gửi email Gmail chứa liên kết kích hoạt chỉ có hạn 1 phút, bắt buộc đổi mật khẩu mới trong lần đầu đăng nhập.
  - **Xuất hóa đơn thanh toán:** Xuất hóa đơn bán lẻ chuẩn định dạng PDF tức thì ngay sau khi chốt đơn.
  - **Báo cáo doanh thu & Lợi nhuận:** Thống kê doanh thu theo mốc thời gian (hôm nay, 7 ngày, tháng này) và xem doanh số bán hàng của từng nhân viên thu ngân.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Mô hình MVC trên nền tảng framework Laravel 10 kết hợp thành phần động Laravel Livewire.
- **Thành phần & Middleware:**
  - `Authentication & Authorization`: Phân quyền chặt chẽ giữa `Admin` và `Cashier` (Nhân viên). Nhân viên chỉ được bán hàng và xem thông tin cơ bản, không có quyền xóa sản phẩm hoặc xem lợi nhuận.
  - `One-time Activation Middleware`: Chặn mọi quyền truy cập vào hệ thống nếu tài khoản nhân viên chưa hoàn tất bước kích hoạt qua email và đổi mật khẩu.
  - `Laravel Livewire Components`: Quản lý giỏ hàng và danh sách sản phẩm theo thời gian thực (reactive UI), không cần tải lại toàn bộ trang web khi thu ngân thao tác.
  - `Barryvdh/Dompdf`: Module kết xuất giao diện hóa đơn HTML (`order_invoice_pdf.blade.php`) sang định dạng file PDF chuẩn in nhiệt.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ quản trị:** MySQL.
- **Thiết kế Schema:**
  - Bảng quan hệ chuẩn hóa: `users, roles, customers, products, categories, orders, order_items, activation_tokens`.
  - Khóa ngoại và ràng buộc toàn vẹn: Ngăn chặn xóa sản phẩm nếu sản phẩm đó đã phát sinh trong các đơn hàng lịch sử.
- **Tối ưu truy vấn & Seeding:**
  - Ánh xạ dữ liệu qua Eloquent ORM kết hợp eager loading (`with('customer', 'items')`) triệt tiêu N+1 query khi hiển thị danh sách đơn hàng.
  - Xây dựng database seeders hoàn chỉnh cho môi trường local/demo.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Tự động gửi Email kích hoạt tài khoản nhân viên với Token hết hạn 1 phút**  
  *Thách thức:* Bảo mật tuyệt đối tài khoản thu ngân nội bộ, chống việc lộ thông tin đăng nhập ban đầu do admin cấp.  
  *Giải pháp:* Tích hợp dịch vụ Laravel Mail (SMTP Gmail); sinh token ngẫu nhiên có gắn timestamp hết hạn sau 60 giây và lưu vào database; bọc middleware kiểm tra nếu quá hạn thì vô hiệu hóa liên kết và yêu cầu admin gửi lại.
- **Bài toán 2: Tra cứu khách hàng theo SĐT & Tự động tạo mới mượt mà**  
  *Thách thức:* Thu ngân thao tác gấp tại quầy không có thời gian chuyển trang để đăng ký khách hàng mới.  
  *Giải pháp:* Sử dụng Livewire lắng nghe sự kiện nhập số điện thoại; thực hiện truy vấn tức thì, nếu không tìm thấy sẽ tự động chèn record khách hàng mới vào database và tiếp tục đơn hàng mà không làm gián đoạn luồng thanh toán.
- **Bài toán 3: Tính tiền thừa tự động & Xuất hóa đơn in nhiệt tức thời qua PDF**  
  *Thách thức:* Cần render hóa đơn PDF nhanh chóng với định dạng chuẩn của máy in hóa đơn bán lẻ tại quầy.  
  *Giải pháp:* Lập trình view Blade tối ưu CSS cho máy in khổ nhỏ; sử dụng thư viện DOMPDF biên dịch HTML thành luồng stream PDF nhúng trực tiếp, hỗ trợ in hóa đơn ngay sau khi hoàn tất thanh toán.

---

## 5. Công nghệ & Thư viện sử dụng
- **Backend:** Laravel 10 (PHP 8.1+), Laravel Livewire, Eloquent ORM, Laravel Sanctum.
- **Frontend:** Bootstrap 5, Blade Template Engine, Vite.js, jQuery, Toastr.
- **Cơ sở dữ liệu & Thư viện mở rộng:** MySQL, Barryvdh/Dompdf (PDF Export), GuzzleHTTP, SMTP Gmail.