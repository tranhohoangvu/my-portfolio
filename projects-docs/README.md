# 📁 Hồ Sơ Tài Liệu Kỹ Thuật Dự Án (Projects Documentation)

Thư mục này lưu trữ tài liệu kỹ thuật, kiến trúc hệ thống và hướng dẫn thực nghiệm cho các dự án thực tế trên Portfolio cá nhân của **Trần Hồ Hoàng Vũ**. 

Tất cả các file đều được chuẩn hóa theo **Cấu trúc khung tài liệu chuẩn 5 phần** và sẵn sàng đồng bộ vào **Project Details Modal** (`js/scripts.js` và `index.html`).

---

## 📑 Danh Sách Các Dự Án Chuẩn Hóa:

| STT | File Tài Liệu | Tên Dự Án | Thời Gian | Tech Stack Chính | Trạng Thái Modal |
| :---: | :--- | :--- | :---: | :--- | :---: |
| **01** | [`01-school-ops.md`](./01-school-ops.md) | **SchoolOps** | 09/2026 – Hiện tại | Next.js 16, React 19, TypeScript, TailwindCSS v4, Node.js, Express, PostgreSQL 16, Vitest | ✅ Đã đồng bộ |
| **02** | [`02-booking-care.md`](./02-booking-care.md) | **BookingCare** | 09/2026 – Hiện tại | Next.js 15, TypeScript, Tailwind CSS v4, Supabase (PostgreSQL, Auth SSR, RLS) | ✅ Đã đồng bộ |
| **03** | [`03-pdf-vision-ocr.md`](./03-pdf-vision-ocr.md) | **PDF Vision OCR** | 08/2026 – Hiện tại | Python, PaddleOCR, Gemini Vision, PyMuPDF, OpenCV, FastAPI, Streamlit | ✅ Đã đồng bộ |
| **04** | [`04-coursehub-lms.md`](./04-coursehub-lms.md) | **CourseHub LMS** | 04/2026 – 06/2026 | React, Vite, Node.js, Express, PostgreSQL (Native `pg` Raw SQL), JWT RBAC | ✅ Đã đồng bộ |
| **05** | [`05-ecommerce-platform.md`](./05-ecommerce-platform.md) | **E-commerce Platform** | 09/2025 – 12/2025 | React 18, Node.js, Express, MongoDB, Socket.IO, Gemini AI, Docker, VNPAY | ✅ Đã đồng bộ |
| **06** | [`06-vietnamese-ocr.md`](./06-vietnamese-ocr.md) | **Vietnamese OCR (Deep Learning)** | 01/2025 – 05/2025 | Python, PyTorch, ResNet34, Spatial Attention, Transformer Decoder, MCOCR | ✅ Đã đồng bộ |
| **07** | [`07-nlp-translation.md`](./07-nlp-translation.md) | **EN–VI Machine Translation (NLP)** | 01/2025 – 05/2025 | Python, PyTorch, Hugging Face TRL (PPO/RLHF), Transformer, MarianMT, SentencePiece | ✅ Đã đồng bộ |
| **08** | [`08-stock-forecasting-ml.md`](./08-stock-forecasting-ml.md) | **Stock Forecasting & Benchmark (ML)** | 09/2024 – 12/2024 | Python, TensorFlow/Keras, scikit-learn, LSTM, FFNN, CNN, 7 Optimizers | ✅ Đã đồng bộ |
| **09** | [`09-warehouse-ma.md`](./09-warehouse-ma.md) | **WarehouseMA** | 09/2024 – 12/2024 | C#, .NET WinForms, MySQL/SQL Server, 3-Tier, Google Forms API, QR Code, SRS/BRD | ✅ Đã đồng bộ |
| **10** | [`10-pos-system.md`](./10-pos-system.md) | **An Khang Store POS** | 01/2024 – 05/2024 | Laravel 10, Livewire, MySQL, DOMPDF, Bootstrap 5, Vite, Toastr | ✅ Đã đồng bộ |

---

## 📝 Mẫu Khung Tài Liệu Chuẩn (Standard Documentation Template)

Mỗi file trong thư mục này đều tuân thủ cấu trúc 5 mục chuẩn mực dưới đây:

```markdown
# [Tên Dự Án]

> **Thời gian:** ...
> **Vai trò:** ...
> **Demo / Repository:** ...

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- Mục tiêu dự án, vai trò đóng góp, bài toán cần giải quyết.
- Các tính năng và luồng nghiệp vụ người dùng cốt lõi.

## 2. Kiến trúc Hệ thống (System Architecture)
- Mô hình kiến trúc (MVC, 3-Tier, Microservices, Sequence-to-Sequence Pipeline,...).
- Các service, module, middleware bảo mật và luồng xử lý chính.
- Triết lý và quyết định thiết kế kỹ thuật.

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- Hệ quản trị CSDL (PostgreSQL, MySQL, MongoDB,...) và mô hình hóa bảng/document.
- Kỹ thuật tối ưu truy vấn (Raw SQL, Indexing, Atomic Operators, Transactions,...).
- Tiền xử lý dữ liệu và tạo đặc trưng (đối với dự án AI/ML/Data).

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1:** Thách thức gì? -> Giải pháp kỹ thuật đã áp dụng là gì?
- **Bài toán 2:** Thách thức gì? -> Giải pháp kỹ thuật đã áp dụng là gì?
- **Bài toán 3:** Thách thức gì? -> Giải pháp kỹ thuật đã áp dụng là gì?

## 5. Công nghệ & Thư viện sử dụng
- Ngôn ngữ, Framework, Database, AI/ML Libraries, DevOps & Công cụ hỗ trợ.
```
