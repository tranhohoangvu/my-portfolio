# 🌐 Natural Language Processing – RLHF (PPO) & EN–VI Machine Translation (Transformers / GPT)

> **Thời gian thực hiện:** Tháng 1, 2025 – Tháng 5, 2025  
> **Khóa học / Lĩnh vực:** Đồ án môn Xử lý Ngôn ngữ Tự nhiên (NLP)  
> **Nhóm thực hiện:** Trần Hồ Hoàng Vũ (52200214) & Cộng sự  
> **GitHub Repository:** [https://github.com/tranhohoangvu/Natural-Language-Processing](https://github.com/tranhohoangvu/Natural-Language-Processing)

---

## 1. Tổng quan & Nghiệp vụ cốt lõi
- **Mục tiêu:** Nghiên cứu và thực nghiệm hai bài toán trọng tâm trong NLP hiện đại: (1) Căn chỉnh mô hình ngôn ngữ bằng Học tăng cường từ phản hồi con người (RLHF) với thuật toán PPO; (2) So sánh toàn diện hiệu năng dịch máy thần kinh Anh - Việt (EN↔VI) giữa phương pháp tự huấn luyện từ đầu (From-Scratch) và tinh chỉnh mô hình Pretrained.
- **Nghiệp vụ cốt lõi:**
  - **Phần 1 – Căn chỉnh RLHF / PPO:** Lập trình PPO trên môi trường CartPole-v1 để nắm vững cơ chế Value/Policy network; sau đó ứng dụng PPO tinh chỉnh mô hình sinh ngôn ngữ nhân quả (Causal LM) với thư viện Hugging Face TRL.
  - **Phần 2 – Dịch máy Anh - Việt (Machine Translation):** Huấn luyện và đánh giá đối chiếu 4 cấu hình mô hình dịch thuật trên tập ngữ liệu song ngữ:
    1. Mô hình GPT tự xây dựng (no-pretrain) + SentencePiece tokenizer.
    2. Mô hình GPT-2 pretrained (fine-tuning kèm special tokens `[EN]`, `[VI]`).
    3. Mô hình Transformer Seq2Seq (Encoder-Decoder) tự xây dựng từ đầu.
    4. Mô hình MarianMT pretrained (Helsinki-NLP) tinh chỉnh chuyên sâu.

---

## 2. Kiến trúc Hệ thống (System Architecture)
- **Mô hình kiến trúc:** Đa dạng kiến trúc gồm Causal LM, Transformer Seq2Seq và PPO Actor-Critic.
- **Thành phần kiến trúc:**
  - **Transformer Seq2Seq từ đầu:** Cấu trúc 6 layers Encoder và 6 layers Decoder chuẩn mực, cơ chế Scaled Dot-Product Multi-Head Attention, Sinusoidal Positional Encoding và Layer Normalization.
  - **Hugging Face TRL Pipeline:** Cấu hình PPOTrainer, Value Network, hàm clipping objective và tính toán Generalized Advantage Estimation (GAE) nhằm định hướng phản hồi của Causal LM theo reward mong muốn.
  - **Mô hình Pretrained:** MarianMT (Helsinki-NLP) tối ưu hóa cho cặp ngôn ngữ Anh - Việt.

---

## 3. Cơ sở dữ liệu & Xử lý dữ liệu (Database & Storage)
- **Tập dữ liệu:** Ngữ liệu song ngữ tiếng Anh – tiếng Việt (IWSLT'15 EN–VI và các tập dữ liệu song ngữ chuẩn).
- **Quy trình tiền xử lý văn bản:**
  - Làm sạch ký tự đặc biệt, chuẩn hóa mã hóa Unicode tiếng Việt (NFC).
  - Lọc bỏ các câu có độ dài bất thường hoặc câu rỗng; phân chia tập Train / Validation / Test chặt chẽ.
- **Xây dựng Tokenizer riêng (SentencePiece):**
  - Huấn luyện mô hình tách từ con (Subword Tokenizer) bằng SentencePiece trực tiếp trên ngữ liệu song ngữ để phục vụ mô hình GPT tự xây dựng, giải quyết triệt để vấn đề từ hiếm (Out-of-Vocabulary - OOV).

---

## 4. Thách thức Kỹ thuật & Giải pháp Thực tế (Key Challenges & Solutions)
- **Bài toán 1: Triển khai thuật toán PPO phục vụ căn chỉnh RLHF cho Causal LM**  
  *Thách thức:* Thuật toán PPO trong NLP đòi hỏi đồng bộ giữa mô hình sinh văn bản, mô hình tính reward và mô hình ước lượng value, rất dễ mất ổn định khi gradient quá lớn.  
  *Giải pháp:* Sử dụng thư viện Hugging Face `trl` kết hợp `accelerate`, thiết lập hệ số clipping cẩn thận và kỹ thuật chuẩn hóa reward, kiểm soát đường cong học tập (reward curve) qua từng batch.
- **Bài toán 2: Giải quyết hiện tượng Out-of-Vocabulary (OOV) khi tự huấn luyện từ đầu**  
  *Thách thức:* Từ vựng tiếng Việt có nhiều từ ghép và biến thể ngữ pháp, nếu dùng từ điển từ nguyên thủy sẽ sinh ra rất nhiều token `<unk>` làm hỏng câu dịch.  
  *Giải pháp:* Tự huấn luyện tokenizer SentencePiece (BPE subword segmentation), cho phép phân rã các từ phức tạp thành các đơn vị âm tiết nhỏ hơn, giảm tỷ lệ token không xác định về 0%.
- **Bài toán 3: Đo lường đối chiếu công bằng giữa mô hình Scratch và Pretrained**  
  *Thách thức:* Cần đánh giá định lượng chính xác độ mượt mà và ngữ nghĩa của bản dịch Anh - Việt giữa các kiến trúc khác nhau.  
  *Giải pháp:* Áp dụng thư viện `evaluate` với các chỉ số tiêu chuẩn quốc tế là **SacreBLEU** và **ROUGE**, thiết lập cùng một tập test độc lập để đo lường và lập biểu đồ so sánh khách quan.

---

## 5. Công nghệ & Thư viện sử dụng
- **Ngôn ngữ & Nền tảng:** Python 3.10+, PyTorch.
- **Thư viện NLP & AI:** Hugging Face `transformers`, `datasets`, `trl`, `peft`, `accelerate`, `evaluate`.
- **Tokenization & Metrics:** SentencePiece, SacreBLEU, ROUGE.
- **Môi trường & Công cụ:** Gym (CartPole demo), Jupyter Lab, Kaggle / Colab GPU.