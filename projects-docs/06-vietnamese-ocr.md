# 👁️ Deep Learning – Attention Mechanisms & Vietnamese OCR (CNN + Transformer)

> **Thời gian thực hiện:** Tháng 1, 2025 – Tháng 5, 2025  
> **Khóa học / Lĩnh vực:** Đồ án môn Học sâu (Deep Learning)  
> **Nhóm thực hiện:** Trần Hồ Hoàng Vũ (52200214) & Cộng sự  
> **GitHub Repository:** [https://github.com/tranhohoangvu/Deep-Learning](https://github.com/tranhohoangvu/Deep-Learning)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Nghiên cứu sâu về các cơ chế Attention hiện đại trong các mô hình ngôn ngữ lớn (LLMs) và áp dụng kiến trúc Hybrid CNN + Transformer Decoder để giải quyết bài toán Nhận diện chữ tiếng Việt trong ảnh thực tế (Scene Text Recognition).
- **Nghiệp vụ cốt lõi:**
  - **Phần 1 – Khảo sát cơ chế Attention trong LLMs:** Lập trình thực nghiệm và trực quan hóa ma trận Attention của 4 phương pháp: Standard Self-Attention, FlashAttention mô phỏng (tính toán theo khối block-wise giảm bộ nhớ), Linear Attention (xấp xỉ giảm độ phức tạp từ $O(n^2)$ xuống $O(n)$), và Sparse Attention.
  - **Phần 2 – Pipeline nhận diện chữ tiếng Việt (OCR):** Nhận diện chính xác chuỗi ký tự từ ảnh văn bản thực tế dựa trên tập dữ liệu chuẩn MCOCR, xử lý được các biến thể dấu thanh điệu tiếng Việt và góc chụp nghiêng.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Kiến trúc Hybrid CNN + Spatial Attention + Transformer Decoder theo cơ chế Sequence-to-Sequence.
- **Thành phần kiến trúc:**
  - **Backbone trích xuất đặc trưng (CNN - ResNet34):** Tiếp nhận ảnh đầu vào chuẩn hóa, trích xuất bản đồ đặc trưng thị giác 2D (visual feature maps).
  - **Spatial Attention Module:** Định vị và làm nổi bật các vùng điểm ảnh chứa nét chữ và dấu thanh, triệt tiêu độ nhiễu từ nền ảnh phức tạp.
  - **Transformer Decoder:** Sinh chuỗi ký tự tự hồi quy (autoregressive) theo thời gian bằng cơ chế Multi-Head Cross-Attention với các token điều hướng (`<start>`, `<end>`, `<pad>`, `<unk>`).
  - **Cơ chế huấn luyện:** Áp dụng kỹ thuật **Teacher Forcing** trong quá trình training giúp mô hình hội tụ nhanh chóng và ổn định.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Tập dữ liệu:** Tập dữ liệu chuẩn MCOCR (MC-OCR Dataset).
- **Quy trình tiền xử lý ảnh:**
  - Chuẩn hóa kích thước ảnh về kích thước đồng nhất `(32, 128)`.
  - Kỹ thuật tăng cường dữ liệu hình ảnh (Data Augmentation): Xoay góc ngẫu nhiên (Random Rotation) và biến đổi màu sắc (Color Jitter).
- **Từ điển ký tự (Character-level Vocabulary):**
  - Xây dựng từ điển ký tự chuyên biệt bao hàm toàn bộ bảng chữ cái tiếng Việt có dấu (hơn 89 ký tự có dấu thanh khác nhau) cùng các token đặc biệt.
  - Mã hóa nhãn (Label Encoding) theo từng ký tự độc lập, khắc phục vấn đề phân đoạn từ phức tạp trong văn bản tiếng Việt.

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Khảo sát thực nghiệm & Mô phỏng cơ chế FlashAttention / Linear Attention**  
  *Thách thức:* Cơ chế Self-Attention chuẩn mực có chi phí tính toán và bộ nhớ tăng theo cấp số nhân bậc hai $O(n^2)$, gây nghẽn bộ nhớ GPU với chuỗi dài.  
  *Giải pháp:* Cài đặt thuật toán FlashAttention mô phỏng (chia nhỏ ma trận Q, K, V thành các block để tính toán cục bộ) và Linear Attention (áp dụng hàm kernel xấp xỉ), trực quan hóa ma trận trọng số attention để kiểm chứng lý thuyết.
- **Bài toán 2: Nhận diện chính xác các dấu thanh tiếng Việt nhỏ và dễ nhòe**  
  *Thách thức:* Dấu tiếng Việt (sắc, huyền, hỏi, ngã, nặng, nón, râu) chiếm diện tích rất nhỏ trong ảnh và rất dễ bị mất thông tin sau các tầng convolution sâu.  
  *Giải pháp:* Tích hợp lớp Spatial Attention ngay sau backbone ResNet34 để tập trung vào các chi tiết dấu thanh; kết hợp từ điển ký tự đơn lẻ (character-level vocab) tránh lỗi gộp nhầm âm tiết.
- **Bài toán 3: Đo lường chất lượng sinh chuỗi ký tự khách quan**  
  *Thách thức:* Đánh giá độ chính xác của chuỗi dự đoán khi các từ có độ dài biến thiên khác nhau.  
  *Giải pháp:* Cài đặt thang đo **BLEU score** (kết hợp N-gram precision) so sánh trực tiếp chuỗi dự đoán với ground-truth, kết hợp theo dõi biểu đồ loss qua từng epoch trên tập validation.

---

## 5. Công nghệ & Thư viện sử dụng
- **Ngôn ngữ & Nền tảng:** Python 3.10+, PyTorch, TorchVision.
- **Thư viện AI & Xử lý ảnh:** OpenCV, PIL, NumPy, NLTK, Matplotlib, scikit-learn.
- **Môi trường thực nghiệm:** Jupyter Lab, Kaggle GPU Environment.