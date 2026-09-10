/**
 * ==============================================================================
 * Projects Data Module (Tab: Projects)
 * Independent client-side data store for projects showcase, modal & terminal
 * ==============================================================================
 */
(function (global) {
  "use strict";

  const rawProjects = [
    {
      id: "coursehub",
      num: "#01",
      isLatest: true,
      categories: ["backend", "fullstack"],
      image: "assets/projects/coursehub.png",
      tags: [
        "React 18",
        "Vite",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Native pg (No ORM)",
        "JWT RBAC",
        "RESTful API"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/coursehub-lms",
          type: "primary"
        },
        {
          labelVi: "Demo trực tiếp →",
          labelEn: "Live Demo →",
          url: "https://coursehub-lms-eight.vercel.app",
          type: "accent"
        }
      ],
      vi: {
        title: "CourseHub LMS",
        meta: "Tháng 2, 2026 – Tháng 3, 2026 • Dự án Full-Stack",
        summary: "Hệ thống Quản lý Học tập (LMS) full-stack: giao diện Udemy split-screen, phân quyền RBAC, tối ưu Raw SQL PostgreSQL (không dùng ORM), giỏ hàng lưu DB và bảng phân tích doanh thu.",
        subtitle: "Tháng 2, 2026 – Tháng 3, 2026 • Nền tảng Học tập Trực tuyến Full-Stack",
        desc: "CourseHub là hệ thống LMS full-stack thiết kế theo kiến trúc module hóa phục vụ vị trí Backend Developer. Hệ thống triển khai giao diện phòng học chuẩn phong cách Udemy (split-screen: giáo trình thu gọn bên phải, phát video YouTube bài giảng bên trái), đồng bộ URL query params để điều hướng mượt mà, giỏ hàng lưu database và bảng điều khiển phân tích doanh thu chi tiết.",
        arch: "Mô hình MVC phân tầng nghiêm ngặt (Controller - Service - Model / Data Access). Middleware xác thực stateless JWT, phân quyền RBAC 3 cấp độ (Admin, Instructor, Student) và lớp xử lý lỗi tập trung. Triết lý thiết kế: Loại bỏ hoàn toàn Docker và ORM cồng kềnh (như Prisma) nhằm tối ưu cold-start tức thì.",
        data: "Cơ sở dữ liệu PostgreSQL (Supabase) chuẩn hóa quan hệ 3NF với hơn 15 bảng. Toàn bộ thao tác truy vấn được viết bằng Raw SQL tối ưu thông qua native 'pg' client kết hợp connection pool; sử dụng SQL Transactions (BEGIN...COMMIT/ROLLBACK) khi thanh toán và ghi danh khóa học.",
        challenges: [
          {
            title: "1. Quản lý trạng thái học tập Udemy & Đồng bộ URL Navigation:",
            solution: "Thiết kế giao diện Workspace chia đôi màn hình kết hợp URL Query Params (/my-courses?courseId=...&lessonId=...), cho phép học viên dùng nút Back/Forward của trình duyệt mà không làm mất trạng thái bài giảng."
          },
          {
            title: "2. Tối ưu hóa truy vấn Raw SQL thay vì dùng ORM:",
            solution: "Loại bỏ hoàn toàn ORM để tránh N+1 query và overhead kết nối; viết truy vấn SQL tổng hợp tính toán tức thì tỷ lệ % hoàn thành khóa học theo từng học viên trong một query duy nhất với độ trễ dưới 2ms."
          },
          {
            title: "3. Phân quyền RBAC đa cấp & Ngăn ngừa leo thang đặc quyền:",
            solution: "Thiết lập middleware xác thực JWT claims kết hợp kiểm tra quyền sở hữu tài nguyên (Resource Ownership Verification) trước khi thực hiện CRUD, bảo vệ toàn vẹn đề cương bài giảng của Instructor."
          }
        ]
      },
      en: {
        title: "CourseHub LMS",
        meta: "Feb 2026 – Mar 2026 • Full-Stack LMS",
        summary: "Full-stack Learning Management System (LMS): Udemy-style split workspace, JWT RBAC authorization, optimized raw PostgreSQL SQL (no ORM), persistent cart, and revenue analytics.",
        subtitle: "Feb 2026 – Mar 2026 • Full-Stack Learning Management System (LMS)",
        desc: "CourseHub is a clean, high-performance Full-Stack LMS engineered as a Backend Developer showcase. Features a Udemy-style split-screen classroom workspace (collapsible syllabus sidebar on the right, active video/resource area on the left), URL query-synced navigation, persistent database cart & checkout, and comprehensive admin revenue analytics.",
        arch: "Strict layered MVC architecture in Node.js/Express. Enforces 3-tier Role-Based Access Control (Admin, Instructor, Student) via stateless JWT verification middleware and centralized error handling. Intentionally eliminates heavy ORMs (Prisma) and Docker to ensure rapid cold starts and raw database control.",
        data: "PostgreSQL (Supabase) relational schema normalized to 3NF across 15+ tables. All database interactions utilize handwritten, high-performance Raw SQL executed via native 'pg' driver with connection pooling, maintaining precise control over database transaction boundaries.",
        challenges: [
          {
            title: "1. Udemy-Style Workspace & URL-Synchronized Navigation:",
            solution: "Engineered a split-screen classroom interface mapped to URL query params (/my-courses?courseId=...&lessonId=...), enabling seamless native browser history navigation."
          },
          {
            title: "2. Native Raw SQL Optimization over Heavy ORMs:",
            solution: "Bypassed heavy ORMs to eliminate query overhead; crafted multi-table aggregate SQL joins to calculate student completion percentages in a single sub-millisecond roundtrip."
          },
          {
            title: "3. Multi-Role RBAC Authorization & Privilege Protection:",
            solution: "Constructed authorization middleware verifying JWT token claims and resource ownership, safeguarding Instructor curriculum management from unauthorized student requests."
          }
        ]
      }
    },
    {
      id: "ecommerce",
      num: "#02",
      isLatest: false,
      categories: ["backend", "fullstack"],
      image: "assets/projects/ecommerce.png",
      tags: [
        "React 18",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "Socket.IO",
        "Gemini AI",
        "Docker",
        "VNPAY"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/E-Commerce-Website",
          type: "primary"
        }
      ],
      vi: {
        title: "Nền tảng E-commerce",
        meta: "Tháng 9, 2025 – Tháng 12, 2025 • Đồ án Web Full-Stack",
        summary: "Nền tảng thương mại điện tử full-stack tích hợp trợ lý ảo Gemini AI: giỏ hàng Zustand, cổng thanh toán VNPAY, cập nhật Socket.IO thời gian thực và triển khai Docker Compose CI/CD.",
        subtitle: "Tháng 9, 2025 – Tháng 12, 2025 • Nền tảng Bán lẻ Trực tuyến & Trợ lý Gemini AI",
        desc: "Nền tảng thương mại điện tử full-stack hiện đại tích hợp trợ lý ảo thông minh Gemini AI Chatbot hỗ trợ tư vấn sản phẩm thời gian thực. Hệ thống gồm đầy đủ tính năng: duyệt sản phẩm với bộ lọc đa tiêu chí, giỏ hàng Zustand, cổng thanh toán VNPAY Sandbox, tích điểm thành viên (Loyalty), gửi email qua Nodemailer/MailHog và dashboard thống kê trực quan Recharts.",
        arch: "Kiến trúc RESTful API module hóa với Node.js & Express. Giao tiếp hai chiều thời gian thực qua Socket.IO. Xác thực bảo mật hai lớp với JWT (Access Token 15 phút, Refresh Token 7 ngày) cùng Google OAuth. Xác thực dữ liệu đầu vào bằng Zod schema.",
        data: "Cơ sở dữ liệu NoSQL MongoDB kết hợp ODM Mongoose, tạo compound index phục vụ lọc sản phẩm tốc độ cao, lưu trữ cấu trúc embedded document cho snapshot chi tiết đơn hàng và lịch sử điểm thưởng.",
        challenges: [
          {
            title: "1. Tích hợp Trợ lý Gemini AI Chatbot thời gian thực & Bảo mật API Key:",
            solution: "Xây dựng widget chat phản hồi tức thì trên frontend React, định tuyến qua proxy backend bảo mật nhằm ẩn an toàn API key và xử lý ngữ cảnh câu hỏi sản phẩm của khách hàng."
          },
          {
            title: "2. Tích hợp cổng thanh toán VNPAY & Toàn vẹn tồn kho đồng thời:",
            solution: "Tích hợp VNPAY SDK với chữ ký số checksum (HMAC-SHA512); áp dụng toán tử nguyên tử ($inc có điều kiện) trong MongoDB để tránh hiện tượng trừ âm kho khi nhiều người cùng đặt hàng."
          },
          {
            title: "3. Container hóa đa dịch vụ & Tự động hóa CI/CD Pipeline:",
            solution: "Đóng gói toàn bộ hệ thống bằng Docker & Docker Compose (Frontend, Backend, Nginx reverse proxy, MongoDB, MailHog). Thiết lập GitHub Actions tự động build và push images lên Docker Hub."
          }
        ]
      },
      en: {
        title: "E-commerce Platform",
        meta: "Sep 2025 – Dec 2025 • Full-Stack Web Project",
        summary: "Full-stack e-commerce platform with integrated Gemini AI shopping assistant: Zustand cart, VNPAY sandbox payment, Socket.IO real-time events, and Docker Compose CI/CD.",
        subtitle: "Sep 2025 – Dec 2025 • Full-Stack E-Commerce & Gemini AI Assistant",
        desc: "Full-stack e-commerce application equipped with an integrated Gemini AI shopping assistant for real-time product queries. Features catalog filtering, Zustand state management, VNPAY sandbox payment gateway, loyalty rewards program, automated email notifications (Nodemailer/MailHog), and Recharts business analytics.",
        arch: "Modular RESTful backend on Node.js/Express. Dual-token JWT authentication (15m access, 7d refresh) paired with Google OAuth. Socket.IO for real-time order updates, strict payload validation using Zod schemas, and Nginx reverse proxy.",
        data: "MongoDB document store with Mongoose ODM. Features compound indexing on category/pricing fields and embedded sub-documents for tamper-proof order snapshots and loyalty points transactions.",
        challenges: [
          {
            title: "1. Real-Time Gemini AI Chatbot Integration & Key Protection:",
            solution: "Built an interactive client-side shopping widget communicating through a secure backend proxy, safeguarding Gemini API credentials while streaming real-time product answers."
          },
          {
            title: "2. VNPAY Payment Gateway & Atomic Stock Integrity:",
            solution: "Integrated VNPAY sandbox with HMAC-SHA512 checksum validation; used atomic MongoDB conditional updates ($inc with quantity checks) to prevent race conditions during peak flash sales."
          },
          {
            title: "3. Multi-Container Orchestration & Automated CI/CD:",
            solution: "Containerized frontend, backend, Nginx, MongoDB, and MailHog via Docker Compose; configured GitHub Actions workflow to automatically test, build, and publish Docker images to Docker Hub."
          }
        ]
      }
    },
    {
      id: "vietnamese-ocr",
      num: "#03",
      isLatest: false,
      categories: ["ai"],
      image: "assets/projects/vietnamese-ocr.png",
      tags: [
        "Python",
        "PyTorch",
        "ResNet34",
        "Transformer Decoder",
        "Spatial Attention",
        "MCOCR",
        "BLEU"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Deep-Learning",
          type: "primary"
        }
      ],
      vi: {
        title: "Vietnamese OCR (Deep Learning)",
        meta: "Tháng 1, 2025 – Tháng 5, 2025 • Đồ án Deep Learning",
        summary: "Khảo sát các cơ chế Attention (Self/Flash/Linear/Sparse) và xây dựng mô hình OCR nhận diện chữ tiếng Việt từ ảnh MCOCR bằng backbone ResNet34 + Spatial Attention + Transformer Decoder.",
        subtitle: "Tháng 1, 2025 – Tháng 5, 2025 • Attention Mechanisms & Nhận dạng Chữ Tiếng Việt",
        desc: "Đồ án học sâu Deep Learning gồm 2 nội dung chính: (1) Khảo sát thực nghiệm các cơ chế Attention trong LLMs (Self-Attention, FlashAttention block-wise, Linear Attention và Sparse Attention); (2) Xây dựng mô hình OCR nhận diện văn bản tiếng Việt từ ảnh thực tế (Scene Text Recognition) trên tập dữ liệu MCOCR.",
        arch: "Kiến trúc Hybrid CNN + Transformer Decoder: Mạng backbone ResNet34 trích xuất bản đồ đặc trưng (feature map 2D), lớp Spatial Attention làm nổi bật các vùng chứa ký tự, và Transformer Decoder tự hồi quy (autoregressive) sinh chuỗi ký tự theo kỹ thuật Teacher Forcing với các token <start>, <end>, <pad>, <unk>.",
        data: "Tập dữ liệu MCOCR: Tiền xử lý chuẩn hóa ảnh về kích thước chuẩn (32, 128), kỹ thuật tăng cường dữ liệu (Random Rotation, Color Jitter), và xây dựng từ điển ký tự (character-level vocab) bao quát đầy đủ bảng chữ cái tiếng Việt có dấu.",
        challenges: [
          {
            title: "1. Khảo sát thực nghiệm & Mô phỏng cơ chế FlashAttention / Linear Attention:",
            solution: "Cài đặt và so sánh ma trận attention của Self-Attention, FlashAttention mô phỏng (tính toán theo khối block-wise giảm bộ nhớ) và Linear Attention (giảm độ phức tạp tính toán từ O(n²) xuống O(n))."
          },
          {
            title: "2. Nhận dạng chính xác các dấu thanh tiếng Việt nhỏ và dễ nhòe:",
            solution: "Tích hợp lớp Spatial Attention ngay sau backbone ResNet34 để tập trung vào các chi tiết dấu thanh nhỏ; mã hóa chuỗi nhãn theo ký tự đơn lẻ (character-level) với từ điển đầy đủ ký tự thanh điệu."
          },
          {
            title: "3. Đo lường chất lượng sinh chuỗi ký tự khách quan bằng BLEU Score:",
            solution: "Áp dụng kỹ thuật Teacher Forcing trong quá trình huấn luyện Transformer Decoder và đánh giá chất lượng nhận diện văn bản khách quan bằng chỉ số BLEU score."
          }
        ]
      },
      en: {
        title: "Vietnamese OCR (Deep Learning)",
        meta: "Jan 2025 – May 2025 • Deep Learning Project",
        summary: "Simulated Attention mechanisms (Self/Flash/Linear/Sparse) and built a Vietnamese scene text OCR model on MCOCR using ResNet34 CNN backbone, Spatial Attention, and Transformer Decoder.",
        subtitle: "Jan 2025 – May 2025 • Attention Mechanisms & Vietnamese Scene Text OCR",
        desc: "Deep Learning project covering two core domains: (1) Theoretical analysis & empirical simulation of Attention in LLMs (Self-Attention, block-wise FlashAttention, Linear Attention, Sparse Attention); (2) End-to-end Vietnamese Scene Text Recognition (OCR) pipeline on the MCOCR benchmark dataset.",
        arch: "Hybrid CNN + Transformer Decoder architecture: ResNet34 CNN backbone extracts visual spatial feature maps, a Spatial Attention module accentuates textual regions, and a Transformer Decoder autoregressively generates text sequences using Teacher Forcing with <start>, <end>, <pad>, and <unk> tokens.",
        data: "MCOCR dataset: Images resized to (32, 128) with data augmentations (Random Rotation, Color Jitter); character-level vocabulary encoding preserving all Vietnamese diacritics and accented tone variations.",
        challenges: [
          {
            title: "1. Simulating & Benchmarking Attention Formulations:",
            solution: "Implemented Self-Attention, simplified FlashAttention (block-wise tile processing minimizing GPU memory overhead), and Linear Attention reducing sequence complexity from O(n²) to O(n)."
          },
          {
            title: "2. Complex Vietnamese Diacritic Representation via Spatial Attention:",
            solution: "Augmented ResNet34 with Spatial Attention focusing on subtle tone markers; designed a comprehensive character-level vocabulary accommodating all accented variations."
          },
          {
            title: "3. Sequence Generation & Objective Evaluation via BLEU:",
            solution: "Employed Teacher Forcing for stable Transformer Decoder convergence, benchmarking character sequence predictions using BLEU scores against ground-truth text."
          }
        ]
      }
    },
    {
      id: "nlp-translation",
      num: "#04",
      isLatest: false,
      categories: ["ai"],
      image: "assets/projects/nlp-translation.png",
      tags: [
        "Python",
        "PyTorch",
        "Hugging Face",
        "TRL (RLHF/PPO)",
        "MarianMT",
        "SentencePiece",
        "SacreBLEU"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Natural-Language-Processing",
          type: "primary"
        }
      ],
      vi: {
        title: "EN–VI Machine Translation (NLP)",
        meta: "Tháng 1, 2025 – Tháng 5, 2025 • Đồ án NLP",
        summary: "Khảo sát căn chỉnh RLHF/PPO với Hugging Face TRL và thực nghiệm dịch máy Anh - Việt so sánh mô hình tự huấn luyện (Transformer/GPT + SentencePiece) và Pretrained (GPT-2, MarianMT).",
        subtitle: "Tháng 1, 2025 – Tháng 5, 2025 • RLHF (PPO) & Dịch máy Thần kinh Anh - Việt",
        desc: "Đồ án Xử lý Ngôn ngữ Tự nhiên (NLP) gồm 2 phần chuyên sâu: (1) Khảo sát Reinforcement Learning from Human Feedback (RLHF): cài đặt PPO trên CartPole-v1 và PPO tinh chỉnh mô hình ngôn ngữ nhân quả (Causal LM) với thư viện Hugging Face TRL; (2) So sánh toàn diện mô hình dịch máy Anh - Việt (EN↔VI) giữa phương pháp tự huấn luyện từ đầu (no-pretrain) và mô hình pretrained.",
        arch: "Mô hình đa dạng: Transformer seq2seq tự xây dựng từ đầu, GPT kiến trúc nhỏ kèm SentencePiece tokenizer; Mô hình Pretrained gồm GPT-2 tinh chỉnh với special tokens ([EN], [VI]) và MarianMT (Helsinki-NLP) tinh chỉnh chuyên sâu.",
        data: "Ngữ liệu song ngữ tiếng Anh – tiếng Việt (IWSLT'15 EN-VI): Làm sạch ký tự đặc biệt, lọc giới hạn độ dài câu, phân tách train/validation/test và đánh giá định lượng bằng SacreBLEU và ROUGE.",
        challenges: [
          {
            title: "1. Triển khai thuật toán PPO phục vụ căn chỉnh RLHF cho Causal LM:",
            solution: "Triển khai thuật toán Proximal Policy Optimization (PPO) kết hợp thư viện TRL, thiết lập policy/value network, advantage estimation và hàm mục tiêu clipping để điều chỉnh hành vi sinh văn bản của causal LM."
          },
          {
            title: "2. Giải quyết hiện tượng Out-of-Vocabulary (OOV) khi tự huấn luyện từ đầu:",
            solution: "Huấn luyện tokenizer riêng biệt bằng SentencePiece cho mô hình GPT tự xây dựng, xử lý hiệu quả hiện tượng Out-of-Vocabulary (OOV) trên dữ liệu song ngữ Anh - Việt."
          },
          {
            title: "3. Đo lường đối chiếu công bằng giữa mô hình Scratch và Pretrained:",
            solution: "Tiến hành đánh giá đối chiếu giữa Transformer tự huấn luyện và MarianMT pretrained (Helsinki-NLP) trên tập IWSLT15, đo lường chính xác bằng thang đo tiêu chuẩn SacreBLEU."
          }
        ]
      },
      en: {
        title: "EN–VI Machine Translation (NLP)",
        meta: "Jan 2025 – May 2025 • NLP Project",
        summary: "Explored RLHF/PPO alignment with Hugging Face TRL and benchmarked EN-VI Machine Translation comparing scratch models (Transformer/GPT + SentencePiece) against pretrained GPT-2 and MarianMT.",
        subtitle: "Jan 2025 – May 2025 • RLHF (PPO) & English–Vietnamese Machine Translation",
        desc: "Comprehensive Natural Language Processing (NLP) project comprising two modules: (1) RLHF & PPO exploration (CartPole baseline & causal LLM fine-tuning using Hugging Face TRL); (2) Comprehensive EN↔VI Machine Translation benchmark comparing models trained from scratch vs pretrained models.",
        arch: "Diverse architectural suite: Custom Transformer Seq2Seq (Encoder-Decoder) from scratch, small GPT with SentencePiece tokenizer; Pretrained models include fine-tuned GPT-2 with [EN]/[VI] tokens and Helsinki-NLP MarianMT.",
        data: "Parallel English–Vietnamese bilingual datasets (IWSLT'15 en-vi): Text cleaning, sentence length filtering, custom train/val/test splits, and quantitative translation evaluation via SacreBLEU and ROUGE.",
        challenges: [
          {
            title: "1. RLHF Alignment via PPO with TRL for Causal LMs:",
            solution: "Configured Proximal Policy Optimization (PPO) using Hugging Face TRL and Accelerate, fine-tuning causal language models with advantage clipping and policy updates."
          },
          {
            title: "2. Custom Subword Tokenization Eradicating OOV Deficiencies:",
            solution: "Trained dedicated SentencePiece subword tokenizers for custom GPT models, resolving out-of-vocabulary challenges across bilingual vocabulary distributions."
          },
          {
            title: "3. Empirical Benchmarking (From-Scratch vs Pretrained):",
            solution: "Benchmarked scratch Transformer models against pretrained Helsinki-NLP MarianMT models on IWSLT'15, tracking SacreBLEU convergence trajectories."
          }
        ]
      }
    },
    {
      id: "stock-ml",
      num: "#05",
      isLatest: false,
      categories: ["ai"],
      image: "assets/projects/stock-ml.png",
      tags: [
        "Python",
        "TensorFlow / Keras",
        "scikit-learn",
        "LSTM / FFNN",
        "Time-Series",
        "CNN",
        "Optimization"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Machine-Learning",
          type: "primary"
        }
      ],
      vi: {
        title: "Stock Forecasting & Benchmark (ML)",
        meta: "Tháng 9, 2024 – Tháng 12, 2024 • Đồ án Machine Learning",
        summary: "Khảo sát tốc độ hội tụ 7 thuật toán Gradient Descent (GD, Momentum, Adam...); dự báo giá mở cửa cổ phiếu bằng cửa sổ trượt 60 ngày (LSTM/FFNN); và phân loại chữ số MNIST bằng CNN.",
        subtitle: "Tháng 9, 2024 – Tháng 12, 2024 • Đồ án Tổng kết Nhập môn Học máy (ML)",
        desc: "Đồ án Machine Learning giải quyết 3 bài toán kinh điển: (1) Khảo sát thực nghiệm các thuật toán tối ưu hóa Gradient Descent trên bài toán hồi quy Boston Housing; (2) Dự báo giá mở cửa cổ phiếu (Stock Open Price) theo chuỗi thời gian bằng cửa sổ trượt sequence_length = 60; (3) Phân loại chữ số viết tay MNIST bằng mạng CNN tích chập.",
        arch: "Đa dạng cấu trúc mô hình: Mạng nơ-ron hồi quy FFNN (Dense 50-50-1) và Stacked LSTM cho chuỗi thời gian; Mạng CNN phân loại ảnh (Conv2D 32 -> MaxPool -> Conv2D 64 -> MaxPool -> Dense 128 -> Dropout 0.5 -> Softmax 10); Mô hình cơ sở Decision Tree Regressor và Hồi quy tuyến tính.",
        data: "Tập dữ liệu HousingData.csv (506 dòng x 14 cột) cho bài toán tối ưu; Tập dữ liệu tài chính data_src_2.csv (6816 dòng x 10 cột gồm OHLCV, Ticker, Industry, GDP) cho bài toán dự báo chứng khoán; Tập dữ liệu ảnh chữ số viết tay chuẩn MNIST.",
        challenges: [
          {
            title: "1. Lập trình và trực quan hóa so sánh 7 thuật toán tối ưu Gradient:",
            solution: "Lập trình và so sánh Batch GD, SGD, Mini-batch GD, Momentum, Adagrad, RMSProp và Adam trên dữ liệu Boston Housing, vẽ biểu đồ đường cong loss/epoch để phân tích tốc độ hội tụ."
          },
          {
            title: "2. Chuẩn bị chuỗi dữ liệu cửa sổ trượt (Sequence Length = 60) chống Data Leakage:",
            solution: "Lọc dữ liệu theo từng mã Ticker, sắp xếp theo thứ tự thời gian, chuẩn hóa giá trị Open bằng MinMaxScaler và tạo chuỗi 60 ngày liên tiếp để dự báo giá mở cửa ngày tiếp theo."
          },
          {
            title: "3. Kiểm soát Overfitting trên mạng nơ-ron dự báo chuỗi thời gian:",
            solution: "So sánh hiệu quả dự báo giữa LSTM, FFNN, Linear Regression và Decision Tree qua chỉ số MSE và R²; tích hợp Dropout, L2 Regularization và EarlyStopping trong Keras."
          }
        ]
      },
      en: {
        title: "Stock Forecasting & Benchmark (ML)",
        meta: "Sep 2024 – Dec 2024 • Machine Learning Project",
        summary: "Benchmarked 7 gradient optimizers (GD, Momentum, Adam...); engineered 60-day sliding window stock open price forecasting (LSTM/FFNN); and classified MNIST digits with CNN.",
        subtitle: "Sep 2024 – Dec 2024 • Intro to Machine Learning Final Project",
        desc: "Comprehensive Machine Learning coursework addressing 3 distinct foundational challenges: (1) Empirical convergence comparison of gradient optimization methods on Boston Housing; (2) Stock Open Price time-series forecasting using a 60-day sliding window; (3) Handwritten digit classification on MNIST using CNNs.",
        arch: "Diverse architectural implementations: FFNN (Dense 50-50-1) & stacked LSTM networks for time-series; 2-stage Conv2D CNN with Dropout for MNIST; Decision Tree Regressor and Linear models as baselines.",
        data: "HousingData.csv (506 rows x 14 cols) for optimization analysis; data_src_2.csv (6,816 rows x 10 cols containing OHLCV, Tickers, Industry, GDP) for stock forecasting; benchmark MNIST dataset.",
        challenges: [
          {
            title: "1. Comparative Benchmark of 7 Gradient Optimizers:",
            solution: "Implemented and evaluated Batch GD, SGD, Mini-batch GD, Momentum, Adagrad, RMSProp, and Adam on Boston Housing, plotting epoch loss trajectories to illustrate convergence speed."
          },
          {
            title: "2. 60-Step Sliding Window Feature Engineering:",
            solution: "Filtered data by ticker, preserved chronological sorting, applied MinMaxScaler to Open prices, and constructed 60-step lookback sliding windows for next-day open price prediction."
          },
          {
            title: "3. Overfitting Curtailment in Time-Series Neural Models:",
            solution: "Benchmarked LSTM vs FFNN vs Decision Tree using MSE and R² metrics; leveraged Dropout, L2 Regularization, and EarlyStopping in Keras to curtail overfitting."
          }
        ]
      }
    },
    {
      id: "warehouse",
      num: "#06",
      isLatest: false,
      categories: ["backend"],
      image: "assets/projects/warehouse.png",
      tags: [
        "C#",
        ".NET WinForms",
        "MySQL / SQL Server",
        "3-Tier Architecture",
        "Google Forms API",
        "QR Code",
        "SRS / BRD"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/WarehouseMA",
          type: "primary"
        }
      ],
      vi: {
        title: "WarehouseMA",
        meta: "Tháng 9, 2024 – Tháng 12, 2024 • Đồ án Công nghệ Phần mềm",
        summary: "Phần mềm quản lý kho tòa nhà WinForms C# kiến trúc 3 lớp: tích hợp Google Forms API tiếp nhận yêu cầu, quét mã QR kiểm kê, tính phí tự động và bộ hồ sơ tài liệu SRS/BRD/UML chuẩn mực.",
        subtitle: "Tháng 9, 2024 – Tháng 12, 2024 • Phần mềm Quản lý Kho Hàng Tòa nhà (.NET WinForms)",
        desc: "Đồ án môn Công nghệ Phần mềm tại Trường Đại học Tôn Đức Thắng (TDTU). WarehouseMA là ứng dụng desktop quản lý kho hàng hóa, vật tư, dụng cụ trong tòa nhà, hỗ trợ 2 loại kho: Kho Nội Bộ (vận hành tòa nhà) và Kho Cho Thuê (dành cho cư dân/đơn vị thuê). Dự án được triển khai theo quy trình công nghệ phần mềm chuyên nghiệp: Phân tích, Thiết kế, Lập trình và Kiểm thử.",
        arch: "Kiến trúc 3 phân tầng (3-Tier Architecture): Tầng giao diện người dùng WinForms (Presentation Layer), Tầng xử lý nghiệp vụ BLL (Business Logic Layer) và Tầng truy xuất dữ liệu DAL (Data Access Layer) giao tiếp thông qua các đối tượng truyền dữ liệu DTO.",
        data: "Cơ sở dữ liệu quan hệ MySQL / SQL Server: Quản lý chi tiết dung tích, trạng thái khả dụng của từng kệ, tầng, ngăn lưu trữ; lưu vết các phiếu nhập/xuất và lịch sử kiểm kê.",
        challenges: [
          {
            title: "1. Thu thập yêu cầu nghiệp vụ phức tạp & Thiết kế tài liệu chuẩn BA:",
            solution: "Đóng vai trò Business Analyst (BA) chính: khảo sát nghiệp vụ thực tế, xây dựng tài liệu SRS/BRD, thiết kế ERD và hệ thống sơ đồ UML (Use Case, Class, Activity, Sequence, State)."
          },
          {
            title: "2. Tự động hóa tiếp nhận yêu cầu với Google Forms API & Kiểm kê bằng QR Code:",
            solution: "Tích hợp Google Forms API giúp người dùng đăng ký yêu cầu nhập/xuất hàng từ xa tự động đổ về phần mềm; ứng dụng quét mã QR Code để nhân viên kiểm kê nhanh chóng."
          },
          {
            title: "3. Thuật toán gợi ý vị trí lưu trữ kho tối ưu (Storage Slotting Algorithm):",
            solution: "Xây dựng thuật toán gợi ý vị trí lưu trữ tối ưu theo thể tích và tính chất hàng hóa; tự động tính toán chi phí lưu kho theo thời gian kèm phí phạt khi quá hạn."
          }
        ]
      },
      en: {
        title: "WarehouseMA",
        meta: "Sep 2024 – Dec 2024 • Software Engineering Project",
        summary: "Building warehouse desktop management in C# WinForms (3-tier): Google Forms API for inbound requests, QR inventory audits, automated fee calculations, and full SRS/BRD/UML documentation.",
        subtitle: "Sep 2024 – Dec 2024 • Building Warehouse Management System (C# WinForms)",
        desc: "Software Engineering coursework project at Ton Duc Thang University (TDTU). WarehouseMA is a C# .NET desktop application managing facility inventory, materials, and equipment across two models: Internal Operational Warehouse and Leasable Resident Warehouse. Executed through full software engineering lifecycles: Analysis, Design, Coding, and Testing.",
        arch: "Rigorous 3-tier architecture: WinForms Presentation Layer, Business Logic Layer (BLL), and Data Access Layer (DAL) passing strongly-typed Data Transfer Objects (DTO).",
        data: "Relational MySQL / SQL Server database modeling warehouse capacity at shelf, tier, and bin granularity, with comprehensive audit logs for stock requisitions.",
        challenges: [
          {
            title: "1. Business Analysis, SRS, BRD & UML System Modeling:",
            solution: "Served as main BA: gathered operational requirements, authored comprehensive SRS and BRD documentation, designed ERD schemas and complete UML diagram suites (Use Case, Class, Activity, Sequence, State)."
          },
          {
            title: "2. Google Forms API Inbound Requisitions & QR Audits:",
            solution: "Integrated Google Forms API to automatically receive off-site inbound/outbound stock requests into desktop queues; incorporated QR code scanning for accelerated inventory auditing."
          },
          {
            title: "3. Automated Storage Fee Calculation & Slotting Algorithm:",
            solution: "Developed an optimal slotting algorithm recommending warehouse bin locations by volume, paired with automated tiered storage billing and overdue penalty calculators."
          }
        ]
      }
    },
    {
      id: "pos",
      num: "#07",
      isLatest: false,
      categories: ["backend"],
      image: "assets/projects/pos.png",
      tags: [
        "Laravel 10",
        "Livewire",
        "MySQL",
        "Bootstrap 5",
        "DOMPDF",
        "Vite",
        "Toastr"
      ],
      links: [
        {
          labelVi: "Xem trên GitHub →",
          labelEn: "View on GitHub →",
          url: "https://github.com/tranhohoangvu/Web-Programming-and-Applications",
          type: "primary"
        },
        {
          labelVi: "Xem Video Demo →",
          labelEn: "Watch Demo Video →",
          url: "https://youtu.be/XLwuIJpsN-M",
          type: "accent"
        }
      ],
      vi: {
        title: "An Khang Store POS",
        meta: "Tháng 1, 2024 – Tháng 5, 2024 • Đồ án Lập trình Web",
        summary: "Hệ thống POS bán lẻ nội bộ cho cửa hàng điện thoại bằng Laravel 10 & Livewire: tìm kiếm mã vạch, tra cứu tự tạo khách hàng theo SĐT, email kích hoạt 1 phút và xuất hóa đơn PDF.",
        subtitle: "Tháng 1, 2024 – Tháng 5, 2024 • Hệ thống Quản lý Bán lẻ POS Nội bộ (Laravel 10)",
        desc: "Đồ án môn Lập trình Web và Ứng dụng tại Đại học Tôn Đức Thắng (TDTU). AN KHANG STORE là ứng dụng Point of Sale (POS) xây dựng bằng Laravel 10 dành riêng cho nhân viên và ban quản trị cửa hàng bán lẻ điện thoại và phụ kiện điện tử (không phải e-commerce công khai). Hệ thống xử lý bán hàng nhanh, tìm kiếm khách hàng, gửi email tự động và báo cáo doanh thu.",
        arch: "Kiến trúc Laravel 10 MVC kết hợp Laravel Livewire cho giao diện động phản hồi tức thì mà không cần tải lại trang. Xác thực bảo mật, tích hợp Barryvdh/Dompdf in hóa đơn PDF và Toastr popup thông báo trực quan.",
        data: "Cơ sở dữ liệu MySQL: Thiết kế quan hệ giữa các bảng Sản phẩm, Danh mục, Đơn hàng, Chi tiết đơn hàng, Nhân viên và Khách hàng với các seeder dữ liệu mẫu đầy đủ.",
        challenges: [
          {
            title: "1. Tự động gửi Email kích hoạt tài khoản nhân viên với Token hết hạn 1 phút:",
            solution: "Admin tạo nhân viên mới qua Gmail; hệ thống tự động gửi email chứa link token kích hoạt chỉ có hiệu lực trong 1 phút, bắt buộc nhân viên đổi mật khẩu ngay lần đầu đăng nhập."
          },
          {
            title: "2. Tra cứu khách hàng theo SĐT & Tự động tạo mới mượt mà:",
            solution: "Tại quầy thu ngân, khi nhập số điện thoại khách hàng: nếu đã có sẽ tự điền thông tin và lịch sử mua hàng, nếu chưa có hệ thống sẽ tự động tạo hồ sơ khách hàng mới ngay trong luồng thanh toán."
          },
          {
            title: "3. Bán hàng theo Barcode, tính tiền thừa & Xuất hóa đơn PDF:",
            solution: "Tìm kiếm sản phẩm nhanh qua mã vạch (barcode) hoặc tên, giỏ hàng Livewire tự động cập nhật tổng tiền và tiền thừa cần thối lại cho khách; hỗ trợ xuất hóa đơn PDF chuyên nghiệp."
          }
        ]
      },
      en: {
        title: "An Khang Store POS",
        meta: "Jan 2024 – May 2024 • Web Programming Project",
        summary: "Internal retail POS for electronics stores built with Laravel 10 & Livewire: barcode search, customer phone lookup & auto-creation, 1-minute email activation, and DOMPDF invoice generation.",
        subtitle: "Jan 2024 – May 2024 • Internal Retail Point of Sale (POS) System (Laravel 10)",
        desc: "Web Programming coursework project at Ton Duc Thang University (TDTU). AN KHANG STORE is a Point of Sale (POS) system built on Laravel 10 for retail phone and electronics stores, exclusively designed for internal staff and store administrators (not a public e-commerce store). Handles rapid counter checkouts, customer lookup, automated activation emails, and revenue analytics.",
        arch: "Laravel 10 MVC architecture combined with Laravel Livewire for reactive, single-page-like UI interactions. Integrates Barryvdh/Dompdf for instant PDF receipt generation and Toastr for dynamic alerts.",
        data: "MySQL relational database structuring Products, Categories, Orders, Order Items, Customers, and Cashier Users, populated with seeders for rapid local demonstration.",
        challenges: [
          {
            title: "1. Automated 1-Minute Token Staff Email Activation:",
            solution: "Implemented automated SMTP Gmail dispatch on staff creation; tokens expire within 1 minute, strictly requiring an initial credential reset prior to workstation authorization."
          },
          {
            title: "2. Phone-Number Customer Lookup & Inline Auto-Registration:",
            solution: "Cashier entering a customer phone number instantly retrieves past order history or triggers seamless inline customer registration directly within the checkout flow."
          },
          {
            title: "3. Barcode Search, Live Cash Change & Thermal PDF Invoice Export:",
            solution: "Supported barcode and name lookup with dynamic Livewire cart recalculation of subtotals and change return; generates instant printable customer receipt PDFs via DOMPDF."
          }
        ]
      }
    }
  ];

  // Lookup map by ID
  const map = {};
  rawProjects.forEach((p) => {
    map[p.id] = p;
  });

  /**
   * Global PROJECTS_DATA object
   * Supports both direct property lookup: PROJECTS_DATA["coursehub"]
   * and clean helper methods: PROJECTS_DATA.get(), PROJECTS_DATA.getAll()
   */
  const PROJECTS_DATA = Object.assign({}, map, {
    list: rawProjects,

    get: function (id) {
      return map[id] || null;
    },

    getAll: function () {
      return rawProjects.slice();
    },

    getLocalized: function (id, lang) {
      const p = map[id];
      if (!p) return null;
      const l = lang === "en" ? "en" : "vi";
      const loc = p[l] || p.vi;
      return Object.assign({}, p, loc);
    },

    filterByCategory: function (cat) {
      if (!cat || cat === "all") return rawProjects.slice();
      const target = cat.toLowerCase();
      return rawProjects.filter((p) => p.categories && p.categories.includes(target));
    },

    filterBySkill: function (skillId, skillMapping) {
      if (!skillId) return rawProjects.slice();
      if (skillMapping && skillMapping[skillId]) {
        const allowedIds = skillMapping[skillId].projects || [];
        return rawProjects.filter((p) => allowedIds.includes(p.id));
      }
      return rawProjects.slice();
    }
  });

  // Export to global scope
  global.PROJECTS_DATA = PROJECTS_DATA;
})(typeof window !== "undefined" ? window : this);
