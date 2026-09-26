# 🏢 WarehouseMA – Phần mềm Quản lý Kho Hàng Tòa nhà (.NET WinForms)

> **Thời gian thực hiện:** Tháng 9, 2024 – Tháng 12, 2024  
> **Khóa học / Đơn vị:** Đồ án môn Công nghệ Phần mềm – Đại học Tôn Đức Thắng (TDTU)  
> **Vai trò:** Business Analyst (BA), Designer, Tester & Main Developer  
> **Nhóm thực hiện:** Trần Hồ Hoàng Vũ (52200214) & Cộng sự  
> **GitHub Repository:** [https://github.com/tranhohoangvu/WarehouseMA](https://github.com/tranhohoangvu/WarehouseMA)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng phần mềm quản lý kho vật tư, công cụ, dụng cụ và hàng hóa trong tòa nhà theo đúng quy trình công nghệ phần mềm chuyên nghiệp: Khảo sát, Phân tích (BA), Thiết kế hệ thống, Lập trình và Kiểm thử.
- **Nghiệp vụ cốt lõi:**
  - **Mô hình hai loại kho song song:**
    - *Kho Nội Bộ:* Quản lý vật tư, thiết bị sửa chữa và dụng cụ phục vụ công tác vận hành tòa nhà.
    - *Kho Cho Thuê:* Phục vụ cư dân hoặc các đơn vị thuê mặt bằng gửi hàng hóa.
  - **Tiếp nhận yêu cầu tự động từ xa:** Tích hợp Google Forms API cho phép cư dân gửi phiếu đăng ký gửi hàng/lấy hàng trực tuyến mà không cần đến trực tiếp văn phòng ban quản lý.
  - **Kiểm kê kho siêu tốc:** Ứng dụng quét mã **QR Code** trên từng kiện hàng để cập nhật trạng thái kiểm kê thực tế.
  - **Tự động hóa tính phí & Phạt quá hạn:** Tự động tính toán chi phí lưu kho theo thể tích và thời gian thuê, tự động áp dụng biểu phí phạt khi quá hạn lưu kho.
  - **Xuất báo cáo đối soát:** Xuất phiếu nhập/xuất và báo cáo thống kê định kỳ sang định dạng PDF hoặc Excel.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Kiến trúc 3 tầng (3-Tier Architecture) phân tách độc lập:
  - **Tầng Giao diện (Presentation Layer):** Windows Forms (WinForms) thiết kế hiện đại, giao diện trực quan hóa sơ đồ mặt bằng kho hàng.
  - **Tầng Xử lý Nghiệp vụ (Business Logic Layer - BLL):** Xử lý quy tắc nghiệp vụ kho, kiểm tra tính hợp lệ của đơn hàng, thuật toán tìm vị trí tối ưu và tính toán biểu phí.
  - **Tầng Truy xuất Dữ liệu (Data Access Layer - DAL):** Thực hiện các câu lệnh SQL truy vấn và cập nhật cơ sở dữ liệu.
  - **Đối tượng truyền dữ liệu (Data Transfer Objects - DTO):** Đóng gói dữ liệu strongly-typed truyền tải an toàn giữa các tầng.
- **Hồ sơ tài liệu kỹ thuật chuẩn mực:**
  - Viết tài liệu đặc tả yêu cầu phần mềm (**SRS**) và tài liệu yêu cầu nghiệp vụ (**BRD**).
  - Thiết kế sơ đồ quan hệ thực thể (**ERD**) và bộ sơ đồ **UML** đầy đủ (Use Case Diagram, Class Diagram, Activity Diagram, Sequence Diagram, State Machine Diagram).

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Hệ quản trị:** MySQL / Microsoft SQL Server.
- **Thiết kế Schema:** Chuẩn hóa quan hệ quản lý phân cấp kho chi tiết:
  - `Kho -> Kệ (Racks) -> Tầng (Shelves) -> Ngăn (Bins) -> Hàng hóa (Items)`.
  - Quản lý các bảng chứng từ: `PhieuNhap, PhieuXuat, ChiTietPhieu, KhachHang, HopDongThue, LichSuKiemKe`.
- **Toàn vẹn dữ liệu:** Thiết lập ràng buộc khóa ngoại (Foreign Keys) nghiêm ngặt và trigger kiểm tra dung tích thực tế của từng ngăn chứa trước khi xác nhận nhập hàng.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Thu thập yêu cầu nghiệp vụ phức tạp & Thiết kế tài liệu chuẩn BA**  
  *Thách thức:* Nghiệp vụ quản lý kho tòa nhà có nhiều ràng buộc chéo giữa việc vận hành kỹ thuật nội bộ và dịch vụ cho thuê thương mại.  
  *Giải pháp:* Đảm nhiệm vai trò BA chính, tiến hành khảo sát luồng vận hành thực tế; hoàn thành trọn bộ tài liệu SRS, BRD và vẽ các sơ đồ Sequence, Activity làm kim chỉ nam chính xác cho toàn đội ngũ phát triển.
- **Bài toán 2: Tự động hóa tiếp nhận yêu cầu với Google Forms API & Kiểm kê bằng QR Code**  
  *Thách thức:* Khách hàng cần gửi yêu cầu từ xa nhưng không thể cấp quyền truy cập vào phần mềm nội bộ của ban quản lý.  
  *Giải pháp:* Xây dựng module tích hợp Google Forms API tự động kéo dữ liệu đơn đăng ký từ Google Sheets về hàng đợi phê duyệt của WinForms; tạo và in tem QR Code dán lên kiện hàng để kiểm kê nhanh bằng máy quét.
- **Bài toán 3: Thuật toán gợi ý vị trí lưu trữ kho tối ưu (Storage Slotting Algorithm)**  
  *Thách thức:* Sắp xếp hàng hóa mới vào các ngăn kho sao cho tối ưu diện tích và thuận tiện cho việc lấy hàng sau này.  
  *Giải pháp:* Thiết kế thuật toán tìm kiếm vị trí còn trống phù hợp nhất dựa trên kích thước, trọng lượng và tần suất luân chuyển của hàng hóa; kèm cảnh báo trực quan khi dung tích kho chạm ngưỡng an toàn (Safety Capacity).

---

## 5. Công nghệ & Thư viện sử dụng
- **Ngôn ngữ & Nền tảng:** C#, .NET Framework (WinForms).
- **Cơ sở dữ liệu:** MySQL, SQL Server, ADO.NET.
- **Tích hợp bên ngoài:** Google Forms API / Google Sheets API, ZXing.NET (QR Code Generator & Reader).
- **Báo cáo & Thiết kế:** iTextSharp (PDF Export), EPPlus (Excel Export), Figma (UI/UX), Draw.io (UML/ERD).