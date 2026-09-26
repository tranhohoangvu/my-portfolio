# ⚡ PDF Vision OCR — Hệ Thống Trích Xuất & Nhận Dạng Tài Liệu Thông Minh

> **Thời gian thực hiện:** Tháng 8, 2026 – Hiện tại  
> **Vai trò:** AI Engineer & Full-Stack Developer  
> **Công nghệ chính:** Python, PaddleOCR, Google Gemini Vision, PyMuPDF, OpenCV, FastAPI, Streamlit, Docker  
> **GitHub Repository:** [https://github.com/tranhohoangvu/pdf-vision-ocr](https://github.com/tranhohoangvu/pdf-vision-ocr)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Xây dựng hệ thống OCR nhận diện ký tự quang học thông minh chuyên xử lý tài liệu PDF tiếng Việt đa dạng (bao gồm PDF scan chất lượng thấp, chụp ảnh nghiêng và văn bản số hóa), chuyển đổi sang các định dạng văn phòng có thể biên tập với độ chính xác cao.
- **Nghiệp vụ cốt lõi:**
  - **Bảo toàn tiếng Việt có dấu & Cấu trúc bảng biểu:** Tự động phát hiện Digital PDF có chứa text layer để trích xuất nguyên vẹn 100% tiếng Việt; với bản scan, tái cấu trúc bảng và văn bản chuẩn xác sang Word (`.docx`), Excel (`.xlsx`), Searchable PDF (`.pdf`) và Markdown (`.md`).
  - **Cơ chế Hybrid Vision AI Fallback:** Tích hợp mô hình Google Gemini 2.5 Flash để đọc chữ viết tay mờ, hóa đơn nhăn hoặc biểu mẫu phức tạp; tự động fallback về PaddleOCR cục bộ khi mất kết nối mạng hoặc cạn quota API.
  - **Xử lý hàng loạt (Batch Processing & Master ZIP):** Cho phép tải lên nhiều file PDF đồng thời, xử lý song song và đóng gói trọn bộ kết quả vào một file Master ZIP kèm báo cáo phân tích chi tiết.
  - **Giao diện kép độc lập (Dual Interface):** Cung cấp đồng thời Web UI (Streamlit Dark Mode) cho người dùng cuối và RESTful API chuẩn OpenAPI (FastAPI + Swagger UI) cho tích hợp hệ thống.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Kiến trúc pipeline phân tầng module hóa, tách bạch độc lập giữa các engine xử lý:
  - `Image Preprocessor Module`: Tiếp nhận trang tài liệu và thực hiện các thuật toán thị giác máy tính tiền xử lý với OpenCV.
  - `OCR Engine Orchestrator`: Bộ điều phối định tuyến linh hoạt hỗ trợ 4 chế độ hoạt động: `auto` (tự động phân loại tài liệu), `digital` (trích xuất text layer gốc), `ocr` (PaddleOCR chuyên biệt tiếng Việt) và `gemini` (Vision AI cloud).
  - `Multi-Format Exporters Layer`: Chuyển đổi dữ liệu có cấu trúc sang DOCX (bảo toàn font và layout), XLSX (tách dòng cột chuẩn xác), Searchable PDF (chèn text layer ẩn đè lên ảnh) và Markdown.
  - `Dual Delivery Layer`: Tách biệt giữa REST API (`src/api.py`) và ứng dụng Web (`src/app.py`).
- **Triết lý thiết kế:** Loại bỏ hoàn toàn phụ thuộc vào công cụ ngoài Poppler; sử dụng **PyMuPDF (`fitz`)** render trực tiếp các trang PDF thành ảnh trong bộ nhớ RAM, tối ưu đáng kể tốc độ và giảm kích thước image Docker.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage / Data Pipeline)
- **Data Pipeline & Tiền xử lý ảnh (OpenCV):**
  - **Tự động xoay thẳng (Auto-Deskew):** Sử dụng phép biến đổi Hough Lines Transform hoặc bounding box diện tích tối thiểu (`cv2.minAreaRect`) để xác định góc nghiêng văn bản và nắn thẳng tự động.
  - **Khử bóng râm & Tẩy nền (Shadow Removal):** Ước lượng phông nền chiếu sáng bằng các phép toán hình thái học (Morphological Operations) kết hợp phép chia kênh màu (Normalization), triệt tiêu bóng tay chụp từ điện thoại.
  - **Tăng cường tương phản (CLAHE):** Áp dụng cân bằng lược đồ màu thích ứng cục bộ, làm nổi bật rõ ràng các nét chữ mờ hoặc mực in nhạt màu.
- **Quản lý bộ nhớ đệm:** Tệp tin tạm thời và kết quả xuất được lưu trữ trong thư mục cache có cơ chế tự động dọn dẹp (auto cleanup) sau khi client hoàn tất tải về.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Bảo toàn toàn vẹn dấu tiếng Việt và cấu trúc bảng biểu khi xuất Word/Excel**  
  *Thách thức:* Các thư viện OCR thông thường dễ nhận diện sai dấu thanh tiếng Việt hoặc làm vỡ cấu trúc dạng bảng thành văn bản rời rạc vô nghĩa.  
  *Giải pháp:* Tích hợp bộ tiền xử lý phân tách bảng biểu; sử dụng PaddleOCR model tiếng Việt đã được tối ưu hóa trọng số nhận dạng ký tự có dấu; ánh xạ tọa độ bounding box sang các đối tượng ô bảng trong `python-docx` và `openpyxl`.
- **Bài toán 2: Khắc phục giới hạn của OCR truyền thống đối với chữ viết tay và tài liệu hư hỏng**  
  *Thách thức:* Các tài liệu scan cổ, hóa đơn nhăn nheo hoặc chữ viết tay vượt quá năng lực xử lý của mô hình CNN/CRNN cục bộ.  
  *Giải pháp:* Tích hợp Google Gemini 2.5 Flash Vision API thông qua structured prompt chuyên biệt để tái tạo ngữ cảnh; xây dựng cơ chế tự động retry và graceful fallback về PaddleOCR cục bộ để đảm bảo hệ thống không bao giờ gián đoạn dịch vụ.
- **Bài toán 3: Đóng gói Container Dual-Mode linh hoạt phục vụ triển khai**  
  *Thách thức:* Hệ thống cần đáp ứng cả nhu cầu người dùng trải nghiệm web lẫn backend microservice cho các ứng dụng khác mà không phải duy trì 2 image Docker riêng rẽ.  
  *Giải pháp:* Thiết kế Dockerfile đa mục đích kết hợp script khởi tạo `docker-entrypoint.sh` và Docker Compose profiles (`web`, `api`, `full`), cho phép kích hoạt giao diện Web (port 8501) hoặc REST API (port 8000) chỉ bằng một biến môi trường `APP_MODE`.

---

## 5. Công nghệ & Thư viện sử dụng
- **Lập trình & Core AI:** Python 3.10+, PaddleOCR, Google Gemini Vision API (`google-genai`), PyMuPDF (`fitz`), OpenCV (`cv2`), Pillow.
- **Xuất định dạng văn phòng:** `python-docx`, `pdf2docx`, `openpyxl`, `reportlab`.
- **Backend & Web Framework:** FastAPI, Uvicorn, Pydantic, Streamlit.
- **DevOps & Triển khai:** Docker, Docker Compose, Nginx.
