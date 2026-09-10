// =======================
// Service Worker Registration
// =======================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => { });
  });
}

// =======================
// GitHub Activity (Contributions + Graph)
// =======================
const GITHUB_USERNAME = "tranhohoangvu";

function setGitHubActivityImages() {
  const contribImg = document.getElementById("github-contrib-img");
  const activityImg = document.getElementById("github-activity-img");
  if (!contribImg || !activityImg) return;

  const isDark = document.documentElement.classList.contains("dark");
  const v = Date.now(); // bust cache

  // Contributions: local svg do GitHub Actions sinh ra
  contribImg.src = isDark
    ? `assets/github-contrib-dark.svg?v=${v}`
    : `assets/github-contrib-light.svg?v=${v}`;

  // Activity Graph: local SVG do GitHub Actions tự động sinh (fallback sang online mirror)
  const activitySvg = isDark
    ? `assets/github-activity-dark.svg?v=${v}`
    : `assets/github-activity-light.svg?v=${v}`;

  activityImg.src = activitySvg;

  activityImg.onerror = () => {
    // Fallback sang online mirror nếu local SVG chưa được tải
    const graphTheme = isDark ? "github-dark" : "github-light";
    activityImg.src =
      `https://github-activity-chart.vercel.app/graph?username=${GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true`;
  };
}

// =======================
// Navbar background
// =======================
const navbar = document.getElementById("navbar");
const html = document.documentElement;

const NAV_RESET_CLASSES = [
  "bg-white",
  "bg-white/80",
  "bg-white/90",
  "bg-gray-800",
  "bg-gray-900",
  "bg-gray-900/80",
  "bg-gray-900/90",
  "backdrop-blur",
  "backdrop-blur-md",
  "border-b",
  "border-gray-200/60",
  "border-gray-800/60",
];

function updateNavbarBackground() {
  if (!navbar) return;

  const isDark = html.classList.contains("dark");
  const isScrolled = window.scrollY > 50;

  navbar.classList.remove(...NAV_RESET_CLASSES);

  if (isScrolled) {
    if (isDark) {
      navbar.classList.add(
        "bg-gray-900/80",
        "backdrop-blur-md",
        "border-b",
        "border-gray-800/60"
      );
    } else {
      navbar.classList.add(
        "bg-white/80",
        "backdrop-blur-md",
        "border-b",
        "border-gray-200/60"
      );
    }
  } else {
    navbar.classList.add(isDark ? "bg-gray-800" : "bg-white");
  }
}

// =======================
// Theme (dark/light) - recommended default + still static
// localStorage.theme -> else OS preference
// only persist when user toggles
// =======================
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

function setThemeIcons(isDark) {
  if (sunIcon) sunIcon.classList.toggle("hidden", !isDark);
  if (moonIcon) moonIcon.classList.toggle("hidden", isDark);
}

function applyTheme(theme, persist = true) {
  const isDark = theme === "dark";
  html.classList.toggle("dark", isDark);
  setThemeIcons(isDark);

  // update dependent UI
  setGitHubActivityImages();
  updateNavbarBackground();

  if (persist) localStorage.setItem("theme", theme);
}

function getDefaultTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

// Init theme: do NOT save on first load
applyTheme(getDefaultTheme(), false);

// Toggle => save
function toggleTheme() {
  const next = html.classList.contains("dark") ? "light" : "dark";
  applyTheme(next, true);
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

// Follow OS theme changes only when user hasn't chosen a theme
const themeMQ = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
if (themeMQ && themeMQ.addEventListener) {
  themeMQ.addEventListener("change", (e) => {
    const saved = localStorage.getItem("theme");
    if (saved) return; // user already chose
    applyTheme(e.matches ? "dark" : "light", false);
  });
}

// =======================
// i18n (VI / EN) - recommended default + still static friendly
// localStorage.lang -> else navigator.language (vi* => vi, else en)
// only persist when user toggles
// =======================
const I18N = {
  vi: {
    meta_title: "Trần Hồ Hoàng Vũ - Portfolio",
    meta_description:
      "Portfolio cá nhân của Trần Hồ Hoàng Vũ, sinh viên ngành Computer Science, showcase các dự án và kỹ năng lập trình.",
    og_title: "Trần Hồ Hoàng Vũ - Portfolio",
    og_description:
      "Portfolio cá nhân của Trần Hồ Hoàng Vũ, sinh viên ngành Computer Science, showcase các dự án và kỹ năng lập trình.",

    nav_home: "Trang chủ",
    nav_about: "Giới thiệu",
    nav_projects: "Dự án",
    nav_skills: "Kỹ năng",
    nav_github: "GitHub",
    nav_console: "Console",
    nav_contact: "Liên hệ",
    nav_cv: "CV",

    hero_name: "Trần Hồ Hoàng Vũ",
    hero_status_badge: "Sẵn sàng nhận việc • Fresher Backend / AI Engineer",
    hero_subtitle: "Backend Developer & Data Engineer",
    hero_btn_projects: "Xem dự án",
    hero_btn_cv: "Tải CV",
    cv_title: "CV",
    cv_subtitle: "Chọn phiên bản CV phù hợp với vị trí bạn quan tâm.",

    cv_be_title: "Fresher Backend Developer (PDF)",
    cv_be_desc: "Định hướng Backend: RESTful APIs, database, tự động hóa quy trình (Jira API/OpenClaw) & clean code.",

    cv_ai_title: "AI Engineer Intern (PDF)",
    cv_ai_desc: "Định hướng AI: ML/DL, NLP (Transformer MT), Computer Vision (Vietnamese OCR) & deployment pipelines.",

    cv_btn_view: "Xem",
    cv_btn_download: "Tải xuống",

    cv_menu_be_title: "Fresher Backend Developer (PDF)",
    cv_menu_be_meta: "TranHoHoangVu_BE.pdf",
    cv_menu_ai_title: "AI Engineer Intern (PDF)",
    cv_menu_ai_meta: "TranHoHoangVu_AI.pdf",

    about_title: "Giới thiệu",
    about_description:
      "Mình là Trần Hồ Hoàng Vũ, tốt nghiệp ngành Khoa học Máy tính tại Đại học Tôn Đức Thắng với kinh nghiệm thực tế về phát triển backend qua kỳ thực tập Kỹ sư phần mềm và các dự án học thuật. Mình thích xây dựng các giải pháp thực tế, từ thiết kế RESTful APIs, làm việc với cơ sở dữ liệu đến phát triển các quy trình tự động hóa và xử lý dữ liệu. Mình đã từng làm việc với Node.js, Express.js, Laravel và nhiều công nghệ cơ sở dữ liệu khác nhau. Định hướng sắp tới, mình muốn củng cố kỹ năng kỹ thuật phần mềm, tích lũy thêm kinh nghiệm thực tế và xây dựng phần mềm đáng tin cậy, dễ bảo trì, đồng thời không ngừng học hỏi và cải thiện bản thân.",
    about_kicker: "Thiên về Backend • Software & AI",
    about_headline: "Mình xây backend sạch và pipeline AI thực dụng, triển khai được.",
    about_chip_1: "Backend APIs",
    about_chip_2: "Cơ sở dữ liệu",
    about_chip_3: "AI ứng dụng • NLP/CV",
    about_stat_1: "Dự án AI/ML",
    about_stat_2: "Dự án Backend",
    about_stat_3: "Fresher & Sẵn sàng làm việc",

    projects_title: "Dự án",
    projects_tab_all: "Tất cả",
    projects_tab_fullstack: "Full-Stack",
    projects_tab_frontend: "Frontend",
    projects_tab_backend: "Backend",
    projects_tab_ai: "AI",
    projects_view_all: "Xem tất cả trên GitHub →",
    view_on_github: "Xem trên GitHub →",
    live_demo: "Demo trực tiếp →",
    projects_prev_btn: "Dự án trước",
    p_badge_latest: "Mới nhất",
    projects_no_matches: "Chưa có dự án nào thuộc danh mục này.",
    p_btn_details: "Chi tiết",
    m_arch: "Kiến trúc",
    m_db: "Database",
    m_sec: "Bảo mật",
    m_data: "Dữ liệu",
    m_metric: "Chỉ số",
    m_opt: "Tối ưu",
    m_feat: "Nghiệp vụ",
    modal_tab_overview: "Tổng quan dự án",
    modal_tab_arch: "Kiến trúc Hệ thống",
    modal_tab_data: "Dữ liệu & Cơ sở dữ liệu",
    modal_tab_challenges: "Thách thức Kỹ thuật & Giải pháp cốt lõi",
    modal_tab_techstack: "Công nghệ & Công cụ",

    p4_meta: "Tháng 2, 2026 – Tháng 3, 2026 • Dự án Full-Stack",
    p4_desc:
      "Hệ thống Quản lý Học tập (LMS) full-stack: giao diện Udemy split-screen, phân quyền RBAC, tối ưu Raw SQL PostgreSQL (không dùng ORM), giỏ hàng lưu DB và bảng phân tích doanh thu.",
    p4_title: "CourseHub LMS",

    p1_meta: "Tháng 9, 2025 – Tháng 12, 2025 • Đồ án Web Full-Stack",
    p1_desc:
      "Nền tảng thương mại điện tử full-stack tích hợp trợ lý ảo Gemini AI: giỏ hàng Zustand, cổng thanh toán VNPAY, cập nhật Socket.IO thời gian thực và triển khai Docker Compose CI/CD.",
    p1_title: "Nền tảng E-commerce",

    p_ocr_meta: "Tháng 1, 2025 – Tháng 5, 2025 • Đồ án Deep Learning",
    p_ocr_desc:
      "Khảo sát các cơ chế Attention (Self/Flash/Linear/Sparse) và xây dựng mô hình OCR nhận diện chữ tiếng Việt từ ảnh MCOCR bằng backbone ResNet34 + Spatial Attention + Transformer Decoder.",
    p_ocr_title: "Vietnamese OCR (Deep Learning)",

    p_mt_meta: "Tháng 1, 2025 – Tháng 5, 2025 • Đồ án NLP",
    p_mt_desc:
      "Khảo sát căn chỉnh RLHF/PPO với Hugging Face TRL và thực nghiệm dịch máy Anh - Việt so sánh mô hình tự huấn luyện (Transformer/GPT + SentencePiece) và Pretrained (GPT-2, MarianMT).",
    p_mt_title: "EN–VI Machine Translation (NLP)",

    p_stock_meta: "Tháng 9, 2024 – Tháng 12, 2024 • Đồ án Machine Learning",
    p_stock_desc:
      "Khảo sát tốc độ hội tụ 7 thuật toán Gradient Descent (GD, Momentum, Adam...); dự báo giá mở cửa cổ phiếu bằng cửa sổ trượt 60 ngày (LSTM/FFNN); và phân loại chữ số MNIST bằng CNN.",
    p_stock_title: "Stock Forecasting & Benchmark (ML)",

    p2_meta: "Tháng 9, 2024 – Tháng 12, 2024 • Đồ án Công nghệ Phần mềm",
    p2_desc:
      "Phần mềm quản lý kho tòa nhà WinForms C# kiến trúc 3 lớp: tích hợp Google Forms API tiếp nhận yêu cầu, quét mã QR kiểm kê, tính phí tự động và bộ hồ sơ tài liệu SRS/BRD/UML chuẩn mực.",
    p2_title: "WarehouseMA",
    p2_tag1: "C# WinForms",
    p2_tag2: "MySQL",
    p2_tag3: "3-Tier",
    p2_tag4: "QR Code",

    p3_meta: "Tháng 1, 2024 – Tháng 5, 2024 • Đồ án Lập trình Web",
    p3_desc:
      "Hệ thống POS bán lẻ nội bộ cho cửa hàng điện thoại bằng Laravel 10 & Livewire: tìm kiếm mã vạch, tra cứu tự tạo khách hàng theo SĐT, email kích hoạt 1 phút và xuất hóa đơn PDF.",
    p3_title: "An Khang Store POS",
    p3_tag4: "DOMPDF",

    skills_title: "Kỹ năng",
    skills_subtitle: "Nhấp vào kỹ năng có huy hiệu để xem các dự án thực tế đã ứng dụng công nghệ tương ứng.",
    skills_core_lang: "Ngôn ngữ cốt lõi",
    skills_core_lang_meta: "Nền tảng lập trình & tư duy thuật toán",
    skills_backend_arch: "Kiến trúc Backend & API",
    skills_backend_arch_meta: "RESTful API, MVC, JWT RBAC & Microservices",
    skills_db_opt: "Cơ sở dữ liệu & Tối ưu",
    skills_db_opt_meta: "Raw SQL, Indexing, Transactions & Schema Design",
    skills_ai_devops: "AI, DevOps & Công cụ",
    skills_ai_devops_meta: "Mô hình Học sâu, Container hóa & CI/CD Pipeline",
    skills_lang_front: "Ngôn ngữ & Frontend",
    skills_backend_db: "Backend & Database",
    skills_devops: "DevOps / Tools",
    skills_note_auth: "(Auth/Phân quyền: mức cơ bản)",
    skill_filtering_label: "Đang lọc dự án theo kỹ năng:",
    skill_clear_btn: "Bỏ lọc",

    nav_certs: "Chứng chỉ",
    certs_title: "Chứng chỉ",
    certs_view: "Xem chứng chỉ →",
    cert_score_label: "Điểm",
    cert_tag_language: "English",
    cert_tag_software: "Agile / Scrum",
    cert_agile_title: "Khóa học Agile & Scrum Framework 2024",
    cert_agile_desc: "Cấp bởi Techbase Viet Nam tại Đại học Tôn Đức Thắng (10/2024).",

    github_title: "Hoạt động GitHub",
    github_contrib: "Tổng quan đóng góp",
    github_contrib_tip: "Dữ liệu đóng góp được tạo tự động từ dữ liệu GitHub GraphQL (Actions) và được cập nhật định kỳ.",
    github_activity: "Biểu đồ hoạt động",
    github_activity_tip: "Biểu đồ số lượng commit theo thời gian (tổng hợp từ dữ liệu GitHub).",
    github_profile_link: "Xem GitHub profile →",

    contact_title: "Liên hệ",
    contact_intro: "Hãy liên hệ với tôi qua email hoặc các nền tảng sau:",
    connect_title: "Kết nối với tôi nhé!",
    form_name: "Họ tên: *",
    form_email: "Email: *",
    form_message: "Tin nhắn: *",
    form_send_btn: "Gửi tin nhắn",

    form_sending: "Đang gửi tin nhắn...",
    form_success: "Tin nhắn đã được gửi thành công!",
    form_error: "Có lỗi xảy ra, vui lòng thử lại!",
    form_network_error: "Lỗi kết nối, vui lòng kiểm tra lại!",
    form_btn_sending: "Đang gửi...",

    footer_tagline: "Tạo giá trị qua mã nguồn - Trần Hồ Hoàng Vũ",
    footer_rights: "© 2026 Bản quyền thuộc về Trần Hồ Hoàng Vũ.",

    toast_email_copied: "Đã sao chép email (hoangvu2k4cmg@gmail.com) vào clipboard!",
    toast_email_copy_err: "Không thể sao chép email. Vui lòng copy thủ công!",
    fab_copy_email: "Sao chép Email",
    fab_copy_email_tip: "Sao chép email vào clipboard",
    fab_view_cv: "Xem / Tải CV",
    fab_view_cv_tip: "Xem & Tải CV",
    fab_linkedin_tip: "Xem trang cá nhân LinkedIn",
    fab_github_tip: "Xem trang cá nhân GitHub",
    fab_terminal: "Terminal CLI",
    fab_terminal_tip: "Mở Interactive Terminal & API Console",

    console_kicker: "Backend & AI Playground",
    console_title: "Interactive Terminal & API Console",
    console_subtitle: "Khám phá portfolio qua giao diện dòng lệnh Linux hoặc mô phỏng gọi RESTful API endpoints.",
    console_chips_label: "Lệnh nhanh:",
    console_input_placeholder: "Gõ lệnh (ví dụ: vu --help) hoặc bấm Tab để gợi ý...",
    console_server_status: "API Mock Server 200 OK",
    console_hint_tab: "Tự động hoàn thành",
    console_hint_history: "Lịch sử lệnh",
    console_hint_exec: "Thực thi",
    console_hint_clear: "Xóa màn hình",
    term_tip_close: "Xóa màn hình console",
    term_tip_reset: "Khởi tạo lại màn hình ban đầu",
    term_tip_fullscreen: "Bật/tắt toàn màn hình",
    term_tip_copy: "Sao chép toàn bộ nội dung",
    api_btn_send: "Gửi Request",
    api_request_payload: "Request Payload (JSON Body):",
    api_copy_json: "Sao chép JSON",
    api_opt_profile: "/api/v1/profile (Thông tin cá nhân & học vấn)",
    api_opt_skills: "/api/v1/skills (Danh sách kỹ năng 4 trụ cột)",
    api_opt_projects: "/api/v1/projects (Toàn bộ 7 dự án kỹ thuật)",
    api_opt_projects_be: "/api/v1/projects?category=backend (Lọc Backend)",
    api_opt_projects_ai: "/api/v1/projects?category=ai (Lọc AI / Deep Learning)",
    api_opt_health: "/api/v1/health (Trạng thái hệ thống & uptime)",
    api_opt_contact: "POST /api/v1/contact (Mô phỏng gửi tin nhắn liên hệ)",
    toast_json_copied: "Đã sao chép phản hồi JSON vào clipboard!",
    toast_terminal_copied: "Đã sao chép nội dung terminal vào clipboard!",
  },

  en: {
    meta_title: "Tran Ho Hoang Vu - Portfolio",
    meta_description:
      "Personal portfolio of Tran Ho Hoang Vu, a Computer Science student, showcasing projects and technical skills.",
    og_title: "Tran Ho Hoang Vu - Portfolio",
    og_description:
      "Personal portfolio of Tran Ho Hoang Vu, a Computer Science student, showcasing projects and technical skills.",

    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_github: "GitHub",
    nav_console: "Console",
    nav_contact: "Contact",
    nav_cv: "CV",

    hero_name: "Tran Ho Hoang Vu",
    hero_status_badge: "Available for Hire • Fresher Backend / AI Engineer",
    hero_subtitle: "Backend Developer & Data Engineer",
    hero_btn_projects: "View projects",
    hero_btn_cv: "Download CV",
    cv_title: "CV",
    cv_subtitle: "Pick the CV version that fits the role you're applying for.",

    cv_be_title: "Fresher Backend Developer (PDF)",
    cv_be_desc: "Targeted for Backend Developer roles: REST APIs, databases, workflow automation (Jira API/OpenClaw) & clean code.",

    cv_ai_title: "AI Engineer Intern (PDF)",
    cv_ai_desc: "Targeted for AI Engineer Intern roles: ML/DL, NLP (Transformer MT), Computer Vision (OCR) & deployment pipelines.",

    cv_btn_view: "View",
    cv_btn_download: "Download",

    cv_menu_be_title: "Fresher Backend Developer (PDF)",
    cv_menu_be_meta: "TranHoHoangVu_BE.pdf",
    cv_menu_ai_title: "AI Engineer Intern (PDF)",
    cv_menu_ai_meta: "TranHoHoangVu_AI.pdf",

    about_title: "About",
    about_description:
      "My name is Tran Ho Hoang Vu. I’m a Computer Science graduate from Ton Duc Thang University with hands-on experience in backend development through a software engineering internship and academic projects. I enjoy building practical solutions, from designing RESTful APIs and working with databases to developing automation workflows and processing data. I have worked with Node.js, Express.js, Laravel, and various database technologies. Going forward, I want to strengthen my software engineering skills, gain more real-world experience, and build reliable, maintainable software while continuing to learn and improve.",
    about_kicker: "Backend-focused • Software & AI",
    about_headline: "I build clean backend services and practical, deployable AI pipelines.",
    about_chip_1: "Backend APIs",
    about_chip_2: "Databases",
    about_chip_3: "Applied AI • NLP/CV",
    about_stat_1: "AI/ML Projects",
    about_stat_2: "Backend Projects",
    about_stat_3: "Fresher & Intern Ready",

    projects_title: "Projects",
    projects_tab_all: "All",
    projects_tab_fullstack: "Full-Stack",
    projects_tab_frontend: "Frontend",
    projects_tab_backend: "Backend",
    projects_tab_ai: "AI",
    projects_view_all: "View all on GitHub →",
    view_on_github: "View on GitHub →",
    live_demo: "Live Demo →",
    projects_prev_btn: "Previous project",
    p_badge_latest: "Latest",
    projects_no_matches: "No projects found in this category.",
    p_btn_details: "Details",
    m_arch: "Arch",
    m_db: "Database",
    m_sec: "Security",
    m_data: "Data",
    m_metric: "Metrics",
    m_opt: "Optim",
    m_feat: "Feature",
    modal_tab_overview: "Project Overview",
    modal_tab_arch: "System Architecture",
    modal_tab_data: "Data & Database",
    modal_tab_challenges: "Key Challenges & Technical Solutions",
    modal_tab_techstack: "Technologies & Tools",

    p4_meta: "Feb 2026 – Mar 2026 • Full-Stack LMS",
    p4_desc:
      "Full-stack Learning Management System (LMS): Udemy-style split workspace, JWT RBAC authorization, optimized raw PostgreSQL SQL (no ORM), persistent cart, and revenue analytics.",
    p4_title: "CourseHub LMS",

    p1_meta: "Sep 2025 – Dec 2025 • Full-Stack Web Project",
    p1_desc:
      "Full-stack e-commerce platform with integrated Gemini AI shopping assistant: Zustand cart, VNPAY sandbox payment, Socket.IO real-time events, and Docker Compose CI/CD.",
    p1_title: "E-commerce Platform",

    p_ocr_meta: "Jan 2025 – May 2025 • Deep Learning Project",
    p_ocr_desc:
      "Simulated Attention mechanisms (Self/Flash/Linear/Sparse) and built a Vietnamese scene text OCR model on MCOCR using ResNet34 CNN backbone, Spatial Attention, and Transformer Decoder.",
    p_ocr_title: "Vietnamese OCR (Deep Learning)",

    p_mt_meta: "Jan 2025 – May 2025 • NLP Project",
    p_mt_desc:
      "Explored RLHF/PPO alignment with Hugging Face TRL and benchmarked EN-VI Machine Translation comparing scratch models (Transformer/GPT + SentencePiece) against pretrained GPT-2 and MarianMT.",
    p_mt_title: "EN–VI Machine Translation (NLP)",

    p_stock_meta: "Sep 2024 – Dec 2024 • Machine Learning Project",
    p_stock_desc:
      "Benchmarked 7 gradient optimizers (GD, Momentum, Adam...); engineered 60-day sliding window stock open price forecasting (LSTM/FFNN); and classified MNIST digits with CNN.",
    p_stock_title: "Stock Forecasting & Benchmark (ML)",

    p2_meta: "Sep 2024 – Dec 2024 • Software Engineering Project",
    p2_desc:
      "Building warehouse desktop management in C# WinForms (3-tier): Google Forms API for inbound requests, QR inventory audits, automated fee calculations, and full SRS/BRD/UML documentation.",
    p2_title: "WarehouseMA",
    p2_tag1: "C# WinForms",
    p2_tag2: "MySQL",
    p2_tag3: "3-Tier",
    p2_tag4: "QR Code",

    p3_meta: "Jan 2024 – May 2024 • Web Programming Project",
    p3_desc:
      "Internal retail POS for electronics stores built with Laravel 10 & Livewire: barcode search, customer phone lookup & auto-creation, 1-minute email activation, and DOMPDF invoice generation.",
    p3_title: "An Khang Store POS",
    p3_tag4: "DOMPDF",

    skills_title: "Skills",
    skills_subtitle: "Click on any badged skill to highlight the real-world projects applying that technology.",
    skills_core_lang: "Core Languages",
    skills_core_lang_meta: "Programming foundations & algorithmic problem solving",
    skills_backend_arch: "Backend Architecture & APIs",
    skills_backend_arch_meta: "RESTful API, MVC, JWT RBAC & Microservices",
    skills_db_opt: "Databases & Storage",
    skills_db_opt_meta: "Raw SQL, Indexing, Transactions & Schema Design",
    skills_ai_devops: "AI, DevOps & Tools",
    skills_ai_devops_meta: "Deep Learning, Containerization & CI/CD Pipelines",
    skills_lang_front: "Languages & Frontend",
    skills_backend_db: "Backend & Database",
    skills_devops: "DevOps / Tools",
    skills_note_auth: "(Auth/Authorization: basic)",
    skill_filtering_label: "Highlighting projects by skill:",
    skill_clear_btn: "Clear filter",

    nav_certs: "Certificates",
    certs_title: "Certificates",
    certs_view: "View certificate →",
    cert_score_label: "Score",
    cert_tag_language: "English",
    cert_tag_software: "Agile / Scrum",
    cert_agile_title: "Agile Development & Scrum Framework Course 2024",
    cert_agile_desc: "Issued by Techbase Viet Nam at Ton Duc Thang University (Oct 2024).",

    github_title: "GitHub Activity",
    github_contrib: "Contributions",
    github_contrib_tip: "Contributions are generated automatically via GitHub GraphQL (Actions) and updated periodically.",
    github_activity: "Activity Graph",
    github_activity_tip: "Commit activity over time (aggregated from GitHub data).",
    github_profile_link: "View GitHub profile →",

    contact_title: "Contact",
    contact_intro: "Feel free to reach out via email or these platforms:",
    connect_title: "Let’s connect!",
    form_name: "Full name: *",
    form_email: "Email: *",
    form_message: "Message: *",
    form_send_btn: "Send message",

    form_sending: "Sending message...",
    form_success: "Your message has been sent successfully!",
    form_error: "Something went wrong. Please try again!",
    form_network_error: "Network error. Please check your connection!",
    form_btn_sending: "Sending...",

    footer_tagline: "Building value through code - Tran Ho Hoang Vu",
    footer_rights: "© 2026 Tran Ho Hoang Vu. All rights reserved.",

    toast_email_copied: "Email copied to clipboard (hoangvu2k4cmg@gmail.com)!",
    toast_email_copy_err: "Failed to copy email. Please copy manually!",
    fab_copy_email: "Copy Email",
    fab_copy_email_tip: "Copy email to clipboard",
    fab_view_cv: "View / Download CV",
    fab_view_cv_tip: "View & Download CV",
    fab_linkedin_tip: "View LinkedIn profile",
    fab_github_tip: "View GitHub profile",
    fab_terminal: "Terminal CLI",
    fab_terminal_tip: "Open Interactive Terminal & API Console",

    console_kicker: "Backend & AI Playground",
    console_title: "Interactive Terminal & API Console",
    console_subtitle: "Explore the portfolio through a Linux command-line shell or simulated RESTful API endpoints.",
    console_chips_label: "Quick commands:",
    console_input_placeholder: "Type a command (e.g. vu --help) or press Tab...",
    console_server_status: "API Mock Server 200 OK",
    console_hint_tab: "Auto-complete",
    console_hint_history: "Command history",
    console_hint_exec: "Execute",
    console_hint_clear: "Clear screen",
    term_tip_close: "Clear console screen",
    term_tip_reset: "Reset to initial terminal",
    term_tip_fullscreen: "Toggle fullscreen mode",
    term_tip_copy: "Copy terminal output",
    api_btn_send: "Send Request",
    api_request_payload: "Request Payload (JSON Body):",
    api_copy_json: "Copy JSON",
    api_opt_profile: "/api/v1/profile (Developer Profile & Education)",
    api_opt_skills: "/api/v1/skills (Technical Skill Pillars)",
    api_opt_projects: "/api/v1/projects (All 7 Technical Projects)",
    api_opt_projects_be: "/api/v1/projects?category=backend (Backend Filter)",
    api_opt_projects_ai: "/api/v1/projects?category=ai (AI / Deep Learning Filter)",
    api_opt_health: "/api/v1/health (System Status & Uptime)",
    api_opt_contact: "POST /api/v1/contact (Simulate Contact Message)",
    toast_json_copied: "Copied JSON response to clipboard!",
    toast_terminal_copied: "Copied terminal output to clipboard!",
  },
};

function getDefaultLang() {
  const saved = localStorage.getItem("lang");
  if (saved === "vi" || saved === "en") return saved;

  const navLang = (navigator.language || "").toLowerCase();
  return navLang.startsWith("vi") ? "vi" : "en";
}

// Sync project & skill text into I18N dictionary for backwards compatibility
function syncPortfolioI18n() {
  if (!window.PROJECTS_DATA || !window.PROJECTS_DATA.list) return;
  const projectKeyMapping = {
    coursehub: "p4",
    ecommerce: "p1",
    "vietnamese-ocr": "p_ocr",
    "nlp-translation": "p_mt",
    "stock-ml": "p_stock",
    warehouse: "p2",
    pos: "p3"
  };
  window.PROJECTS_DATA.list.forEach((p) => {
    const prefix = projectKeyMapping[p.id];
    ["vi", "en"].forEach((lang) => {
      const loc = p[lang];
      if (!loc || !I18N[lang]) return;
      if (prefix) {
        I18N[lang][`${prefix}_title`] = loc.title;
        I18N[lang][`${prefix}_desc`] = loc.summary || loc.desc;
        I18N[lang][`${prefix}_meta`] = loc.meta || loc.subtitle;
      }
      I18N[lang][`proj_${p.id}_title`] = loc.title;
      I18N[lang][`proj_${p.id}_desc`] = loc.summary || loc.desc;
      I18N[lang][`proj_${p.id}_meta`] = loc.meta || loc.subtitle;
    });
  });
}
syncPortfolioI18n();

// Dynamic DOM updater for project cards & interactive tooltips
function refreshProjectsContent(lang) {
  if (!window.PROJECTS_DATA) return;
  const isEn = lang === "en";
  document.querySelectorAll(".project-card[data-project-id]").forEach((card) => {
    const pId = card.getAttribute("data-project-id");
    const p = window.PROJECTS_DATA.get ? window.PROJECTS_DATA.get(pId) : window.PROJECTS_DATA[pId];
    if (!p) return;
    const loc = p[isEn ? "en" : "vi"] || p.vi;
    if (!loc) return;

    // Subtitle / meta
    const metaEl = card.querySelector("p[data-i18n$='_meta'], .text-gray-500.text-sm");
    if (metaEl && loc.meta) metaEl.textContent = loc.meta;

    // Title
    const titleEl = card.querySelector("h3[data-project-trigger], h3[data-i18n$='_title']");
    if (titleEl && loc.title) titleEl.textContent = loc.title;

    // Card summary
    const descEl = card.querySelector("p[data-i18n$='_desc'], p.text-gray-600");
    if (descEl && (loc.summary || loc.desc)) descEl.textContent = loc.summary || loc.desc;

    // Tech tag tooltips
    card.querySelectorAll(".tag-pill--interactive[data-tech-skill]").forEach((pill) => {
      const sId = pill.getAttribute("data-tech-skill");
      const skill = window.SKILLS_DATA && window.SKILLS_DATA.mapping ? window.SKILLS_DATA.mapping[sId] : null;
      if (skill) {
        pill.title = isEn ? `View skill: ${skill.name}` : `Xem kỹ năng: ${skill.name}`;
      }
    });
  });
}
window.refreshProjectsContent = refreshProjectsContent;

let currentLang = getDefaultLang();

function t(key) {
  const pack = I18N[currentLang] || I18N.vi;
  return pack[key] ?? key;
}

function applyLanguage(lang, persist = true) {
  currentLang = (lang === "vi") ? "vi" : "en";

  // update html lang
  document.documentElement.setAttribute("lang", currentLang);

  // update texts
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (value == null) return;
    el.textContent = value;

    // restart typing animation for hero name (optional)
    const heroNameEl = document.querySelector('[data-i18n="hero_name"]');
    if (heroNameEl) {
      heroNameEl.classList.remove("animate-type");
      // force reflow
      void heroNameEl.offsetWidth;
      heroNameEl.classList.add("animate-type");
    }
  });

  // update tooltips
  document.querySelectorAll("[data-i18n-tooltip]").forEach((el) => {
    const key = el.getAttribute("data-i18n-tooltip");
    const value = t(key);
    if (value != null) {
      el.setAttribute("title", value);
    }
  });

  // update input placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = t(key);
    if (value != null) {
      el.setAttribute("placeholder", value);
    }
  });

  // meta + title
  document.title = t("meta_title");

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t("meta_description"));

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", t("og_title"));

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", t("og_description"));

  // update language toggle label (show the "other" language)
  const desktopBtn = document.getElementById("lang-toggle");
  const mobileBtn = document.getElementById("lang-toggle-mobile");
  const nextLabel = currentLang === "vi" ? "EN" : "VI";
  if (desktopBtn) desktopBtn.textContent = nextLabel;
  if (mobileBtn) mobileBtn.textContent = nextLabel;

  if (persist) localStorage.setItem("lang", currentLang);

  window.restartHeroTypewriter?.();
  window.refreshProjectsContent?.(currentLang);
  window.refreshProjectModalIfOpen?.();
  window.refreshActiveSkillBanner?.();
  window.refreshTerminalLang?.();
}

function toggleLanguage() {
  applyLanguage(currentLang === "vi" ? "en" : "vi", true);
}

// Init language: do NOT save on first load
applyLanguage(currentLang, false);

// Events
const langToggle = document.getElementById("lang-toggle");
const langToggleMobile = document.getElementById("lang-toggle-mobile");

if (langToggle) langToggle.addEventListener("click", toggleLanguage);
if (langToggleMobile) langToggleMobile.addEventListener("click", toggleLanguage);

// =======================
// Mobile Menu Toggle
// =======================
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("menu-open-icon");
const menuCloseIcon = document.getElementById("menu-close-icon");

function toggleMobileMenu(forceState) {
  if (!mobileMenu) return;
  const isOpening = forceState !== undefined ? forceState : !mobileMenu.classList.contains("active");
  mobileMenu.classList.toggle("active", isOpening);
  if (mobileMenuToggle) {
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpening));
  }
  if (menuOpenIcon) menuOpenIcon.classList.toggle("hidden", isOpening);
  if (menuCloseIcon) menuCloseIcon.classList.toggle("hidden", !isOpening);
}

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Đóng khi click ngoài menu
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      toggleMobileMenu(false);
    }
  });
}

// =======================
// Scroll for Nav Links (clean URL - no #hash)
// =======================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // scroll có offset để không bị navbar che
    const navbarEl = document.getElementById("navbar");
    const offset = navbarEl ? navbarEl.offsetHeight + 16 : 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top, behavior: "smooth" });

    // active underline ngay lập tức (cả desktop + mobile)
    document
      .querySelectorAll('#nav-links a[href^="#"], #mobile-menu a[href^="#"]')
      .forEach((a) => a.classList.toggle("active", a.getAttribute("href") === href));

    // giữ URL sạch (không hiện #home/#about...)
    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch { }

    toggleMobileMenu(false);
  });
});

// =======================
// Active Underline Navbar (ScrollSpy - stable)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav-links");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'))
    .filter(a => (a.getAttribute("href") || "").length > 1);

  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const navbarEl = document.getElementById("navbar");

  const setActive = (hash) => {
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === hash));
  };

  const getOffset = () => (navbarEl ? navbarEl.offsetHeight + 16 : 80);

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY + getOffset();

      // chọn section gần nhất phía trên
      let current = sections[0];
      for (const s of sections) {
        if (s.offsetTop <= y) current = s;
      }

      if (current?.id) setActive(`#${current.id}`);
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("hashchange", () => setActive(location.hash), { passive: true });

  // init
  setActive(location.hash || links[0]?.getAttribute("href"));
  onScroll();

  // nếu người ta vào bằng /#about thì vẫn cho scroll đúng, rồi xoá hash để URL sạch
  if (location.hash) {
    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch { }
  }
});

// =======================
// Scroll Animation
// =======================
const sections = document.querySelectorAll(".section-hidden");

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");

          const progressBars = entry.target.querySelectorAll(".animate-progress");
          progressBars.forEach((bar) => {
            bar.style.width = `${bar.dataset.progress}%`;
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
}

// =======================
// Navbar Scroll Effect
// =======================
window.addEventListener("scroll", () => {
  updateNavbarBackground();
});

// =======================
// Back to Top Button (hide on load + show after scroll)
// =======================
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  const toggleBackToTop = () => {
    if (window.scrollY > 100) backToTop.classList.add("is-visible");
    else backToTop.classList.remove("is-visible");
  };

  // Set đúng trạng thái ngay khi load (không cần đợi scroll)
  toggleBackToTop();

  window.addEventListener("scroll", toggleBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// Form Submission Feedback (localized)
// =======================
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    formMessage.classList.remove("hidden");
    formMessage.classList.remove("text-red-600", "dark:text-red-400");
    formMessage.classList.add("text-green-600", "dark:text-green-400");
    formMessage.textContent = t("form_sending");

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        `<span class="relative z-10">${t("form_btn_sending")}</span>
         <span class="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-30 animate-pulse"></span>`;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formMessage.textContent = t("form_success");
        showToast({ message: t("form_success"), type: "success" });
        contactForm.reset();
        setTimeout(() => formMessage.classList.add("hidden"), 3000);
      } else {
        formMessage.classList.remove("text-green-600", "dark:text-green-400");
        formMessage.classList.add("text-red-600", "dark:text-red-400");
        formMessage.textContent = t("form_error");
        showToast({ message: t("form_error"), type: "error" });
      }
    } catch (error) {
      formMessage.classList.remove("text-green-600", "dark:text-green-400");
      formMessage.classList.add("text-red-600", "dark:text-red-400");
      formMessage.textContent = t("form_network_error");
      showToast({ message: t("form_network_error"), type: "error" });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML =
          `<span class="relative z-10">${t("form_send_btn")}</span>
           <span class="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>`;
      }
    }
  });
}

// =======================
// Particle.js Initialization
// =======================
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 2, direction: "none", random: true },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
      },
      modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
    },
    retina_detect: true,
  });
}

// init navbar state (also ensures correct on load)
updateNavbarBackground();
setGitHubActivityImages();

// Brand click: scroll to top without changing URL/hash
document.addEventListener("DOMContentLoaded", () => {
  const brand = document.getElementById("brand-home");
  if (!brand) return;

  brand.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

(() => {
  const wrap = document.getElementById("cvDropdown");
  const btn = document.getElementById("cvDropdownBtn");
  const menu = document.getElementById("cvDropdownMenu");

  if (!wrap || !btn || !menu) return;

  const openMenu = () => {
    menu.classList.add("cv-menu--open");
    btn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    menu.classList.remove("cv-menu--open");
    btn.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    const isOpen = menu.classList.contains("cv-menu--open");
    if (!isOpen) openMenu();
    else closeMenu();
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  // Click outside -> close
  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) closeMenu();
  });

  // ESC -> close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Click an option -> close (vẫn mở tab mới vì là <a target="_blank">)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });
})();

(() => {
  const el = document.getElementById("heroTypewriter");
  if (!el) return;

  // Respect reduced motion
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 35;
  const HOLD_AFTER_TYPE = 1400;
  const HOLD_AFTER_DELETE = 250;

  let i = 0;
  let deleting = false;
  let timer = null;

  function stop() {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  function start() {
    stop();

    // get the latest translated text (after i18n applied)
    const text = (el.textContent || "").trim();
    if (!text) return;

    // reset
    i = 0;
    deleting = false;
    el.textContent = "";

    function tick() {
      if (!deleting) {
        i++;
        el.textContent = text.slice(0, i);
        if (i >= text.length) {
          deleting = true;
          timer = setTimeout(tick, HOLD_AFTER_TYPE);
          return;
        }
        timer = setTimeout(tick, TYPE_SPEED);
      } else {
        i--;
        el.textContent = text.slice(0, Math.max(0, i));
        if (i <= 0) {
          deleting = false;
          timer = setTimeout(tick, HOLD_AFTER_DELETE);
          return;
        }
        timer = setTimeout(tick, DELETE_SPEED);
      }
    }

    tick();
  }

  // Start once on load
  start();

  // If your language toggle re-runs i18n, call this after switching language:
  window.restartHeroTypewriter = start;
})();
// =======================
// Scroll Progress Bar (added)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;

  const update = () => {
    const d = document.documentElement;
    const max = d.scrollHeight - d.clientHeight;
    const p = max > 0 ? d.scrollTop / max : 0;
    progress.style.transform = `scaleX(${p})`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
});

// =======================
// =======================
// Projects Carousel (Bounded Slider with Dots & Boundary Control)
// =======================
function initProjectsCarousel() {
  const track = document.getElementById("projects-track");
  const prevBtn = document.getElementById("projects-prev-btn");
  const nextBtn = document.getElementById("projects-next-btn");
  const dotsContainer = document.getElementById("projects-indicators");

  if (!track || !prevBtn || !nextBtn) return;

  // Guarantee original DOM order (#01 -> #07) so #07 and #01 never clash
  const allCards = Array.from(track.querySelectorAll(".project-card"));
  allCards.sort((a, b) => {
    const numA = parseInt(a.querySelector(".project-num")?.textContent.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.querySelector(".project-num")?.textContent.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  allCards.forEach((card) => track.appendChild(card));

  let currentIndex = 0;
  let isAnimating = false;

  function getStepWidth() {
    const firstVisible = track.querySelector(".project-card:not(.is-filtered-out)");
    if (!firstVisible) return 0;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    return firstVisible.getBoundingClientRect().width + gap;
  }

  function getMetrics() {
    const visibleCards = Array.from(track.querySelectorAll(".project-card:not(.is-filtered-out)"));
    const viewport = track.parentElement;
    const viewportWidth = viewport ? viewport.clientWidth : 0;
    const step = getStepWidth();
    const maxScroll = Math.max(0, track.scrollWidth - viewportWidth);
    const cardsPerView = step > 0 ? Math.max(1, Math.round((viewportWidth + 24) / step)) : 1;
    const maxIndex = Math.max(0, visibleCards.length - cardsPerView);

    return { visibleCards, viewportWidth, step, maxScroll, maxIndex, cardsPerView };
  }

  function renderDots(metrics) {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    const { maxIndex, visibleCards } = metrics;
    if (visibleCards.length <= 1 || maxIndex <= 0) {
      dotsContainer.style.display = "none";
      return;
    }
    dotsContainer.style.display = "flex";

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `projects-dot ${i === currentIndex ? "is-active" : ""}`;
      dot.setAttribute("aria-label", `Chuyển tới dự án ${i + 1}`);
      dot.addEventListener("click", () => {
        if (isAnimating) return;
        slideTo(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateControls() {
    const metrics = getMetrics();
    const { maxScroll, maxIndex, visibleCards } = metrics;

    if (visibleCards.length <= 1 || maxScroll <= 5) {
      prevBtn.disabled = true;
      prevBtn.classList.add("is-disabled");
      nextBtn.disabled = true;
      nextBtn.classList.add("is-disabled");
    } else {
      prevBtn.disabled = currentIndex <= 0;
      prevBtn.classList.toggle("is-disabled", currentIndex <= 0);

      const isAtEnd = currentIndex >= maxIndex;
      nextBtn.disabled = isAtEnd;
      nextBtn.classList.toggle("is-disabled", isAtEnd);
    }

    // Update active dot
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".projects-dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("is-active", idx === currentIndex);
      });
    }
  }

  function slideTo(targetIndex) {
    const metrics = getMetrics();
    const { maxIndex, step, maxScroll } = metrics;

    currentIndex = Math.max(0, Math.min(targetIndex, maxIndex));

    let targetOffset = currentIndex * step;
    if (targetOffset > maxScroll) targetOffset = maxScroll;
    if (targetOffset < 0) targetOffset = 0;

    isAnimating = true;
    track.classList.add("is-animating");
    track.style.transform = `translateX(-${targetOffset}px)`;

    function onTransitionEnd(e) {
      if (e.target !== track || e.propertyName !== "transform") return;
      track.removeEventListener("transitionend", onTransitionEnd);
      track.classList.remove("is-animating");
      isAnimating = false;
    }

    track.addEventListener("transitionend", onTransitionEnd);
    updateControls();
  }

  function slideNext() {
    if (isAnimating) return;
    const { maxIndex } = getMetrics();
    if (currentIndex < maxIndex) {
      slideTo(currentIndex + 1);
    }
  }

  function slidePrev() {
    if (isAnimating) return;
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    }
  }

  nextBtn.addEventListener("click", slideNext);
  prevBtn.addEventListener("click", slidePrev);

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) slideNext();
        else slidePrev();
      }
    },
    { passive: true }
  );

  // Handle window resize
  window.addEventListener("resize", () => {
    const metrics = getMetrics();
    if (currentIndex > metrics.maxIndex) {
      currentIndex = metrics.maxIndex;
    }
    slideTo(currentIndex);
    renderDots(metrics);
  });

  // Initial render
  const initialMetrics = getMetrics();
  renderDots(initialMetrics);
  updateControls();

  // Expose reset for filter tabs
  window.resetProjectsCarousel = () => {
    currentIndex = 0;
    track.classList.remove("is-animating");
    track.style.transform = "translateX(0)";
    const m = getMetrics();
    renderDots(m);
    updateControls();
  };

  window.slideProjectsCarouselToIndex = (targetIndex) => {
    slideTo(targetIndex);
  };
}

// =======================
// Projects Category Filter Tabs
// =======================
function initProjectsFilter() {
  const filterTabs = document.querySelectorAll(".projects-filter-tab");
  const track = document.getElementById("projects-track");
  const emptyState = document.getElementById("projects-empty-state");

  if (!filterTabs.length || !track) return;

  const allCards = Array.from(track.querySelectorAll(".project-card"));

  function applyFilter(category) {
    let matchCount = 0;

    allCards.forEach((card) => {
      // Clear any temporary skill highlight/dim
      card.classList.remove("is-skill-matched");
      card.classList.remove("is-skill-dimmed");

      const cardCategories = (card.getAttribute("data-category") || "").toLowerCase().split(/\s+/);
      const isMatch = category === "all" || cardCategories.includes(category.toLowerCase());

      if (isMatch) {
        card.classList.remove("is-filtered-out");
        card.classList.remove("is-fade-in");
        void card.offsetWidth; // force reflow for smooth animation
        card.classList.add("is-fade-in");
        matchCount++;
      } else {
        card.classList.add("is-filtered-out");
        card.classList.remove("is-fade-in");
      }
    });

    if (emptyState) {
      if (matchCount === 0) {
        emptyState.classList.remove("hidden");
        track.style.display = "none";
      } else {
        emptyState.classList.add("hidden");
        track.style.display = "flex";
      }
    }

    if (window.resetProjectsCarousel) {
      window.resetProjectsCarousel();
    }
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Clear active skill filter if any
      if (window.clearSkillFilter) {
        window.clearSkillFilter(false);
      }

      filterTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      const filter = tab.getAttribute("data-filter") || "all";
      applyFilter(filter);
    });
  });

  // Initial check
  const activeTab = document.querySelector(".projects-filter-tab.is-active");
  const initialFilter = activeTab ? activeTab.getAttribute("data-filter") : "all";
  applyFilter(initialFilter);
}

// ==========================================================================
// Item 7 & 10: Project Deep-Dive Architecture & Engineering Details
// Dữ liệu được nạp độc lập từ module js/data/projects.data.js
// ==========================================================================
const PROJECTS_DETAILS_DATA = window.PROJECTS_DATA || {};

// =======================
// Item 7: Project Details Modal Controller
// =======================
function initProjectDetailsModal() {
  const modal = document.getElementById("project-detail-modal");
  if (!modal) return;

  const numEl = document.getElementById("modal-project-num");
  const titleEl = document.getElementById("modal-project-title");
  const subtitleEl = document.getElementById("modal-project-subtitle");
  const imgEl = document.getElementById("modal-project-img");
  const descEl = document.getElementById("modal-project-desc");
  const archEl = document.getElementById("modal-spec-arch");
  const dataEl = document.getElementById("modal-spec-data");
  const challengesContainer = document.getElementById("modal-spec-challenges");
  const tagsContainer = document.getElementById("modal-spec-tags");
  const actionsContainer = document.getElementById("modal-actions");

  let activeProjectId = null;

  function renderModalData(projectId) {
    const data = PROJECTS_DETAILS_DATA[projectId];
    if (!data) return;

    activeProjectId = projectId;
    const lang = currentLang === "en" ? "en" : "vi";
    const localized = data[lang] || data.vi;

    if (numEl) numEl.textContent = data.num;
    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = localized.subtitle;
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }
    if (descEl) descEl.textContent = localized.desc;
    if (archEl) archEl.textContent = localized.arch;
    if (dataEl) dataEl.textContent = localized.data;

    // Challenges
    if (challengesContainer) {
      challengesContainer.innerHTML = "";
      (localized.challenges || []).forEach((c) => {
        const item = document.createElement("div");
        item.className = "modal-challenge-card";
        item.innerHTML = `
          <div class="modal-challenge-title">${c.title}</div>
          <p class="modal-challenge-solution">${c.solution}</p>
        `;
        challengesContainer.appendChild(item);
      });
    }

    // Tech Tags (Item 8: Interactive Skill Linking)
    if (tagsContainer) {
      tagsContainer.innerHTML = "";
      (data.tags || []).forEach((tag) => {
        const pill = document.createElement("span");
        const sId = typeof normalizeTagToSkillId === "function" ? normalizeTagToSkillId(tag) : null;
        if (sId && SKILL_PROJECT_MAPPING[sId]) {
          pill.className = "text-xs tag-pill tag-pill--interactive";
          pill.setAttribute("data-tech-skill", sId);
          pill.title = currentLang === "en" ? `View skill: ${SKILL_PROJECT_MAPPING[sId].name}` : `Xem kỹ năng: ${SKILL_PROJECT_MAPPING[sId].name}`;
          pill.addEventListener("click", () => {
            closeModal();
            if (window.highlightSkillTile) {
              window.highlightSkillTile(sId);
            }
          });
        } else {
          pill.className = "text-xs tag-pill";
        }
        pill.textContent = tag;
        tagsContainer.appendChild(pill);
      });
    }

    // Actions
    if (actionsContainer) {
      actionsContainer.innerHTML = "";
      (data.links || []).forEach((link) => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className =
          link.type === "accent"
            ? "btn btn-secondary text-xs sm:text-sm py-2 px-4 inline-flex items-center gap-1.5"
            : "btn btn-primary text-xs sm:text-sm py-2 px-4 inline-flex items-center gap-1.5";
        a.textContent = lang === "en" ? link.labelEn : link.labelVi;
        actionsContainer.appendChild(a);
      });
    }
  }

  function openModal(projectId) {
    renderModalData(projectId);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeProjectId = null;
  }

  // Hook for language switch while modal is open
  window.refreshProjectModalIfOpen = () => {
    if (activeProjectId && modal.classList.contains("is-open")) {
      renderModalData(activeProjectId);
    }
  };

  // Click listeners for details buttons
  document.querySelectorAll(".btn-project-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute("data-project-id");
      if (projectId && PROJECTS_DETAILS_DATA[projectId]) {
        openModal(projectId);
      }
    });
  });

  // Click listeners for triggers (title, thumbnail)
  document.querySelectorAll("[data-project-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const projectId = trigger.getAttribute("data-project-trigger");
      if (projectId && PROJECTS_DETAILS_DATA[projectId]) {
        openModal(projectId);
      }
    });
  });

  // Close listeners
  modal.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

// ==========================================================================
// Item 8 & 10: Interactive Skill ↔ Project Linking (2-Way Bidirectional)
// Dữ liệu được nạp độc lập từ module js/data/skills.data.js
// ==========================================================================
const SKILL_PROJECT_MAPPING = (window.SKILLS_DATA && window.SKILLS_DATA.mapping) || {};

function normalizeTagToSkillId(tagStr) {
  if (window.SKILLS_DATA && typeof window.SKILLS_DATA.normalizeTagToSkillId === "function") {
    return window.SKILLS_DATA.normalizeTagToSkillId(tagStr);
  }
  if (!tagStr) return null;
  const s = tagStr.toLowerCase().trim();
  if (s.includes("postgres")) return "postgresql";
  if (s.includes("mongo")) return "mongodb";
  if (s.includes("mysql")) return "mysql";
  if (s.includes("sql server")) return "sqlserver";
  if (s.includes("raw sql") || s === "native pg (no orm)") return "rawsql";
  if (s.includes("node")) return "nodejs";
  if (s.includes("express")) return "express";
  if (s.includes("react")) return "react";
  if (s.includes("pytorch")) return "pytorch";
  if (s.includes("tensorflow")) return "tensorflow";
  if (s.includes("docker compose") || s.includes("compose")) return "compose";
  if (s.includes("docker")) return "docker";
  if (s.includes("nginx")) return "nginx";
  if (s.includes("laravel")) return "laravel";
  if (s.includes("livewire") || s.includes("php")) return "php";
  if (s.includes("c#") || s.includes("csharp")) return "csharp";
  if (s.includes(".net") || s.includes("winform")) return "dotnet";
  if (s.includes("python")) return "python";
  if (s.includes("rest") || s.includes("api")) return "restapi";
  if (s.includes("postman")) return "postman";
  if (s.includes("git")) return "git";
  return null;
}

function initSkillProjectLinking() {
  const skillIcons = document.querySelectorAll(".skill-icon[data-skill-id]");
  const banner = document.getElementById("active-skill-banner");
  const bannerName = document.getElementById("active-skill-name");
  const bannerCount = document.getElementById("active-skill-count");
  const clearBtn = document.getElementById("clear-skill-filter-btn");
  const track = document.getElementById("projects-track");
  const allCards = track ? Array.from(track.querySelectorAll(".project-card")) : [];

  let activeSkillId = null;

  function filterProjectsBySkill(skillId, shouldScroll = true) {
    const skillData = SKILL_PROJECT_MAPPING[skillId];
    if (!skillData || !skillData.projects || skillData.projects.length === 0) return;

    activeSkillId = skillId;

    // 1. Update skill icon active states in #skills
    skillIcons.forEach((icon) => {
      const id = icon.getAttribute("data-skill-id");
      icon.classList.toggle("is-active", id === skillId);
    });

    // 2. Show active banner
    if (banner && bannerName && bannerCount) {
      banner.classList.remove("hidden");
      bannerName.textContent = skillData.name;
      const count = skillData.projects.length;
      const suffix = currentLang === "en" ? (count > 1 ? "projects" : "project") : "dự án";
      bannerCount.textContent = `(${count} ${suffix})`;
    }

    // 3. Highlight matching cards and dim non-matching cards
    let firstMatchedIndex = -1;
    let matchedCount = 0;

    allCards.forEach((card, idx) => {
      const pId = card.getAttribute("data-project-id");
      const isMatched = skillData.projects.includes(pId);

      // Unhide card regardless of previous category filter
      card.classList.remove("is-filtered-out");

      if (isMatched) {
        card.classList.remove("is-skill-dimmed");
        card.classList.add("is-skill-matched");
        matchedCount++;
        if (firstMatchedIndex === -1) {
          firstMatchedIndex = idx;
        }
      } else {
        card.classList.remove("is-skill-matched");
        card.classList.add("is-skill-dimmed");
      }
    });

    // 4. Update empty state if applicable
    const emptyState = document.getElementById("projects-empty-state");
    if (emptyState && track) {
      if (matchedCount === 0) {
        emptyState.classList.remove("hidden");
        track.style.display = "none";
      } else {
        emptyState.classList.add("hidden");
        track.style.display = "flex";
      }
    }

    // 5. Slide carousel to the first matched project
    if (firstMatchedIndex !== -1 && window.slideProjectsCarouselToIndex) {
      window.slideProjectsCarouselToIndex(firstMatchedIndex);
    }

    // 6. Smooth scroll to projects section
    if (shouldScroll) {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const navHeight = 70;
        const targetPos = projectsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    }

    // 7. Feedback toast
    const msg = currentLang === "en"
      ? `Highlighting ${matchedCount} project(s) applying ${skillData.name}`
      : `Đang làm nổi bật ${matchedCount} dự án ứng dụng công nghệ ${skillData.name}`;
    if (typeof showToast === "function") {
      showToast({ message: msg, type: "info" });
    }
  }

  function clearSkillFilter(reapplyCategory = true) {
    if (!activeSkillId && (!banner || banner.classList.contains("hidden"))) return;
    activeSkillId = null;

    if (banner) {
      banner.classList.add("hidden");
    }

    skillIcons.forEach((icon) => icon.classList.remove("is-active"));

    allCards.forEach((card) => {
      card.classList.remove("is-skill-matched");
      card.classList.remove("is-skill-dimmed");
    });

    if (reapplyCategory) {
      const activeTab = document.querySelector(".projects-filter-tab.is-active");
      const cat = activeTab ? activeTab.getAttribute("data-filter") || "all" : "all";
      let matchCount = 0;
      allCards.forEach((card) => {
        const cardCategories = (card.getAttribute("data-category") || "").toLowerCase().split(/\s+/);
        const isMatch = cat === "all" || cardCategories.includes(cat.toLowerCase());
        card.classList.toggle("is-filtered-out", !isMatch);
        if (isMatch) matchCount++;
      });
      const emptyState = document.getElementById("projects-empty-state");
      if (emptyState && track) {
        if (matchCount === 0) {
          emptyState.classList.remove("hidden");
          track.style.display = "none";
        } else {
          emptyState.classList.add("hidden");
          track.style.display = "flex";
        }
      }
    }

    if (window.resetProjectsCarousel) {
      window.resetProjectsCarousel();
    }
  }

  window.clearSkillFilter = clearSkillFilter;
  window.filterProjectsBySkill = filterProjectsBySkill;

  // Clear button click
  if (clearBtn) {
    clearBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      clearSkillFilter(true);
    });
  }

  // Skill icons click in #skills
  skillIcons.forEach((icon) => {
    const skillId = icon.getAttribute("data-skill-id");
    const mapping = SKILL_PROJECT_MAPPING[skillId];

    if (mapping && mapping.projects && mapping.projects.length > 0) {
      icon.addEventListener("click", () => {
        if (activeSkillId === skillId) {
          clearSkillFilter(true);
        } else {
          filterProjectsBySkill(skillId, true);
        }
      });

      // Keyboard accessible
      icon.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          icon.click();
        }
      });
    }
  });

  // Reverse Linking: Project Card Tag Click -> Highlight Skill in #skills
  function highlightSkillTile(skillId) {
    const targetIcon = document.querySelector(`.skill-icon[data-skill-id="${skillId}"]`);
    const skillData = SKILL_PROJECT_MAPPING[skillId];
    const skillName = skillData ? skillData.name : skillId;

    if (targetIcon) {
      const skillsSec = document.getElementById("skills");
      if (skillsSec) {
        const navHeight = 70;
        const targetPos = skillsSec.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }

      targetIcon.classList.remove("is-highlighted");
      void targetIcon.offsetWidth; // force reflow
      targetIcon.classList.add("is-highlighted");

      setTimeout(() => {
        targetIcon.classList.remove("is-highlighted");
      }, 3600);

      const msg = currentLang === "en"
        ? `Skill: ${skillName} • Located in Skills section`
        : `Kỹ năng: ${skillName} • Đã định vị trong mục Kỹ năng`;
      if (typeof showToast === "function") {
        showToast({ message: msg, type: "info" });
      }
    }
  }

  window.highlightSkillTile = highlightSkillTile;

  // Attach event listeners to [data-tech-skill] pills in project cards
  document.querySelectorAll(".tag-pill--interactive[data-tech-skill]").forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.stopPropagation();
      const sId = tag.getAttribute("data-tech-skill");
      if (sId) {
        highlightSkillTile(sId);
      }
    });
  });

  // Language update hook
  window.refreshActiveSkillBanner = () => {
    document.querySelectorAll(".skill-count-badge[data-count]").forEach((b) => {
      const c = b.getAttribute("data-count");
      b.textContent = currentLang === "en" ? `${c} Prj` : `${c} DA`;
    });
    if (activeSkillId && SKILL_PROJECT_MAPPING[activeSkillId]) {
      const skillData = SKILL_PROJECT_MAPPING[activeSkillId];
      const count = skillData.projects.length;
      const suffix = currentLang === "en" ? (count > 1 ? "projects" : "project") : "dự án";
      if (bannerCount) bannerCount.textContent = `(${count} ${suffix})`;
    }
  };
}

// ==========================================================================
// Item 9: Interactive Terminal & REST API Console Widget
// ==========================================================================
function initTerminalConsole() {
  const windowContainer = document.getElementById("terminal-window-container");
  if (!windowContainer) return;

  const tabCli = document.getElementById("tab-cli-mode");
  const tabApi = document.getElementById("tab-api-mode");
  const viewCli = document.getElementById("terminal-view-cli");
  const viewApi = document.getElementById("terminal-view-api");

  const btnClose = document.getElementById("term-btn-close");
  const btnReset = document.getElementById("term-btn-reset");
  const btnFullscreen = document.getElementById("term-btn-fullscreen");
  const btnCopyOutput = document.getElementById("terminal-copy-output");

  const outputScreen = document.getElementById("terminal-output");
  const cliInput = document.getElementById("terminal-cli-input");
  const cliSubmit = document.getElementById("terminal-cli-submit");
  const quickChipsContainer = document.getElementById("terminal-quick-chips");
  const fabTerminalLink = document.getElementById("fab-terminal-link");

  // API Explorer elements
  const apiEndpointSelect = document.getElementById("api-endpoint-select");
  const apiMethodBadge = document.getElementById("api-method-badge");
  const apiPayloadSection = document.getElementById("api-payload-section");
  const apiSendBtn = document.getElementById("api-send-btn");
  const apiResStatus = document.getElementById("api-res-status");
  const apiResTime = document.getElementById("api-res-time");
  const apiResSize = document.getElementById("api-res-size");
  const apiResponseBody = document.getElementById("api-response-body");
  const apiCopyJsonBtn = document.getElementById("api-copy-json-btn");

  // State
  const historyList = [];
  let historyIndex = -1;
  let currentInputDraft = "";
  let lastApiResponseJson = null;
  let userHasExecutedCommands = false;

  // Helper: Escape HTML
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Helper: Syntax Highlighting for JSON
  function syntaxHighlightJson(jsonObj) {
    const jsonStr = typeof jsonObj === "string" ? jsonObj : JSON.stringify(jsonObj, null, 2);
    const escaped = escapeHtml(jsonStr);

    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "json-number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "json-key";
          } else {
            cls = "json-string";
          }
        } else if (/true|false/.test(match)) {
          cls = "json-boolean";
        } else if (/null/.test(match)) {
          cls = "json-null";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  }

  // Mock API Endpoints Data Generator
  function getMockApiData(endpoint, method = "GET") {
    const isEn = currentLang === "en";
    const cleanUrl = endpoint.split("?")[0].trim();
    const query = endpoint.includes("?") ? endpoint.split("?")[1] : "";

    if (cleanUrl === "/api/v1/profile") {
      return {
        developer: {
          name: "Trần Hồ Hoàng Vũ",
          role: isEn ? "Fresher Backend Developer & AI Engineer" : "Fresher Backend Developer & AI Engineer",
          education: {
            degree: isEn ? "Bachelor of Computer Science" : "Cử nhân Khoa học Máy tính",
            institution: "Ton Duc Thang University (TDTU)",
            graduation: "2026",
            status: isEn ? "Final-Year Student / Ready for Hire" : "Sinh viên năm cuối / Sẵn sàng làm việc"
          },
          coordinates: {
            location: isEn ? "Ho Chi Minh City, Vietnam" : "TP. Hồ Chí Minh, Việt Nam",
            email: "hoangvu2k4cmg@gmail.com",
            github: "https://github.com/tranhohoangvu",
            linkedin: "https://linkedin.com/in/tranhohoangvu/"
          },
          focus_areas: [
            "High-Throughput RESTful APIs & Modular MVC Architecture",
            "Relational Database Optimization & Raw SQL (PostgreSQL, MySQL)",
            "Deep Learning & NLP (RLHF PPO, Transformer Decoder OCR, Sequence Modeling)",
            "Containerization & CI/CD Pipelines (Docker Compose, Nginx, GitHub Actions)"
          ]
        },
        meta: {
          runtime: "Node.js v20.11 / V8",
          server: "Express.js REST Mock Service",
          status: 200
        }
      };
    }

    if (cleanUrl === "/api/v1/skills") {
      const cats = window.SKILLS_DATA ? window.SKILLS_DATA.getCategories(isEn ? "en" : "vi") : [];
      const categoriesObj = {};
      cats.forEach((c) => {
        categoriesObj[c.id] = c.skills.map((s) => ({
          name: s.name,
          framework: s.framework || (s.frameworks ? s.frameworks.join(", ") : undefined),
          level: s.level,
          projects_count: s.projectIds ? s.projectIds.length : 0
        }));
      });
      return {
        categories: categoriesObj,
        total_skills_tracked: Object.values(categoriesObj).reduce((acc, arr) => acc + arr.length, 0)
      };
    }

    if (cleanUrl === "/api/v1/projects") {
      const projectList = (window.PROJECTS_DATA && window.PROJECTS_DATA.list) || Object.values(PROJECTS_DETAILS_DATA);
      let list = projectList.map((item) => {
        const localized = item[isEn ? "en" : "vi"] || item.vi;
        return {
          id: item.id,
          num: item.num,
          title: item.title,
          subtitle: localized.subtitle || localized.meta,
          tags: item.tags,
          github_url: item.links && item.links[0] ? item.links[0].url : "https://github.com/tranhohoangvu"
        };
      });

      if (query.includes("category=backend") || query.includes("cat=backend")) {
        list = list.filter((p) => {
          const raw = window.PROJECTS_DATA && window.PROJECTS_DATA.get ? window.PROJECTS_DATA.get(p.id) : null;
          return raw ? raw.categories.includes("backend") : ["coursehub", "ecommerce", "warehouse", "pos"].includes(p.id);
        });
      } else if (query.includes("category=ai") || query.includes("cat=ai")) {
        list = list.filter((p) => {
          const raw = window.PROJECTS_DATA && window.PROJECTS_DATA.get ? window.PROJECTS_DATA.get(p.id) : null;
          return raw ? raw.categories.includes("ai") : ["vietnamese-ocr", "nlp-translation", "stock-ml"].includes(p.id);
        });
      }

      return {
        total_matched: list.length,
        filter_applied: query || "none",
        projects: list
      };
    }

    if (cleanUrl === "/api/v1/health") {
      return {
        status: "UP",
        timestamp: new Date().toISOString(),
        uptime_seconds: Math.floor(performance.now() / 1000) + 86400,
        runtime: {
          node_version: "v20.11.0",
          platform: "linux-x86_64",
          v8_engine: "12.0.267.14"
        },
        memory: {
          rss: "42.8 MB",
          heapTotal: "28.4 MB",
          heapUsed: "19.6 MB"
        },
        services: {
          database_postgresql: "HEALTHY (pool: 10/10)",
          database_mongodb: "HEALTHY (connected)",
          api_gateway: "ONLINE (latencies < 50ms)"
        },
        environment: "production"
      };
    }

    if (cleanUrl === "/api/v1/contact") {
      return {
        status: "success",
        code: 201,
        message: isEn
          ? "Message recorded in client mock buffer! To send a real message, use the Contact Form below or email hoangvu2k4cmg@gmail.com."
          : "Đã ghi nhận tin nhắn vào mock buffer thành công! Để gửi tin nhắn thực tế, vui lòng dùng Form Liên hệ bên dưới hoặc email hoangvu2k4cmg@gmail.com.",
        received_payload: {
          name: "Tech Lead / Recruiter",
          email: "lead@company.com",
          message: "Interested in Fresher Backend & AI Engineer position"
        },
        timestamp: new Date().toISOString()
      };
    }

    return {
      error: "404 Not Found",
      message: `Unknown endpoint: ${cleanUrl}. Supported endpoints: /api/v1/profile, /api/v1/skills, /api/v1/projects, /api/v1/health, /api/v1/contact`
    };
  }

  // Initial MOTD Banner (Responsive CSS Box)
  function renderMotd() {
    const isEn = currentLang === "en";
    const bannerHtml = `
<div class="term-banner-box">
  <div class="term-banner-header">
    <span class="term-banner-badge">VU-CLI v2.4.0</span>
    <span class="term-banner-meta">x86_64-pc-linux • Node.js v20.11 • REST Mock Server</span>
  </div>
  <div class="term-banner-sub">Portfolio System Shell — Tran Ho Hoang Vu (CS @ TDTU)</div>
</div>
<div class="term-status-line">
  <span class="term-success">● System Online</span>
  <span class="term-dim">|</span>
  <span class="term-info">Environment: Production Showcase</span>
  <span class="term-dim">|</span>
  <span class="term-accent">Status: 200 OK</span>
</div>
<div class="term-line term-dim">${
      isEn
        ? "Type <span class='term-accent'>'vu --help'</span> to view available commands, or click any quick command chip above."
        : "Gõ <span class='term-accent'>'vu --help'</span> để xem danh sách lệnh, hoặc bấm các nút chip lệnh nhanh phía trên."
    }</div>
<div class="term-line term-dim">${
      isEn
        ? "Switch to <span class='term-info'>'REST API Explorer'</span> tab to inspect endpoints with live status codes and JSON."
        : "Chuyển sang tab <span class='term-info'>'REST API Explorer'</span> để thử nghiệm các endpoint RESTful với status code và JSON trực quan."
    }</div>
`;
    outputScreen.innerHTML = bannerHtml;
  }

  // Execute Command
  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) {
      const emptyEcho = document.createElement("div");
      emptyEcho.className = "term-cmd-echo";
      emptyEcho.innerHTML = `<span class="term-prompt-echo"><span class="term-user">guest@hoangvu</span>:<span class="term-path">~/portfolio</span>$</span>`;
      outputScreen.appendChild(emptyEcho);
      outputScreen.scrollTop = outputScreen.scrollHeight;
      return;
    }

    userHasExecutedCommands = true;

    // Save to history
    if (historyList.length === 0 || historyList[historyList.length - 1] !== trimmed) {
      historyList.push(trimmed);
    }
    historyIndex = historyList.length;

    // Echo command
    const cmdEcho = document.createElement("div");
    cmdEcho.className = "term-cmd-echo";
    cmdEcho.innerHTML = `<span class="term-prompt-echo"><span class="term-user">guest@hoangvu</span>:<span class="term-path">~/portfolio</span>$</span> <span>${escapeHtml(trimmed)}</span>`;
    outputScreen.appendChild(cmdEcho);

    // Response Container
    const responseEl = document.createElement("div");
    responseEl.className = "term-line";

    // Normalize command string
    const isEn = currentLang === "en";
    let normalized = trimmed.toLowerCase();
    if (normalized.startsWith("vu ")) {
      normalized = normalized.slice(3).trim();
    }

    // Command Handlers
    if (normalized === "help" || normalized === "--help" || normalized === "-h" || normalized === "?") {
      responseEl.innerHTML = `
<div class="term-accent font-bold mb-2">${isEn ? "AVAILABLE COMMANDS & FLAGS:" : "DANH SÁCH LỆNH & TÙY CHỌN HỖ TRỢ:"}</div>
<table class="term-table">
  <tr>
    <td class="term-table-cmd">vu --help, -h</td>
    <td class="term-table-desc">${isEn ? "Display this help menu" : "Hiển thị danh sách câu lệnh hỗ trợ"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">vu --bio, whoami</td>
    <td class="term-table-desc">${isEn ? "Developer background, degree & engineering mindset" : "Thông tin cá nhân, học vấn TDTU và định hướng kỹ sư"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">vu --skills [--json]</td>
    <td class="term-table-desc">${isEn ? "List 4 technical pillars (pass --json for raw data)" : "Liệt kê 4 trụ cột kỹ năng (thêm cờ --json để xem JSON)"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">vu --fetch-projects</td>
    <td class="term-table-desc">${isEn ? "List technical projects (flags: --cat=backend|ai, --id=coursehub)" : "Xem danh sách dự án (cờ: --cat=backend|ai, --id=coursehub)"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">vu --contact</td>
    <td class="term-table-desc">${isEn ? "Display contact channels & social links" : "Hiển thị thông tin liên hệ và liên kết mạng xã hội"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">vu --cv</td>
    <td class="term-table-desc">${isEn ? "Download / view Fresher Backend & AI Engineer CVs" : "Xem và tải 2 bản CV chuyên biệt (Backend & AI)"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">curl &lt;endpoint&gt;</td>
    <td class="term-table-desc">${isEn ? "Simulate HTTP request (e.g. curl /api/v1/health)" : "Giả lập gọi HTTP request (ví dụ: curl /api/v1/health)"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">theme [dark|light|toggle]</td>
    <td class="term-table-desc">${isEn ? "Switch website appearance theme" : "Chuyển đổi giao diện sáng / tối trực tiếp"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">lang [vi|en|toggle]</td>
    <td class="term-table-desc">${isEn ? "Switch language between Vietnamese and English" : "Chuyển đổi ngôn ngữ Tiếng Việt / Tiếng Anh"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">clear</td>
    <td class="term-table-desc">${isEn ? "Clear output history" : "Xóa sạch màn hình dòng lệnh"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">history</td>
    <td class="term-table-desc">${isEn ? "View recently entered commands" : "Xem lịch sử các lệnh vừa nhập"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">matrix</td>
    <td class="term-table-desc">${isEn ? "Digital rain stream (Easter Egg)" : "Hiệu ứng mưa số Matrix (Easter Egg)"}</td>
  </tr>
  <tr>
    <td class="term-table-cmd">sudo &lt;command&gt;</td>
    <td class="term-table-desc">${isEn ? "Execute as superuser" : "Thực thi với quyền superuser"}</td>
  </tr>
</table>
<div class="term-dim mt-2">${isEn ? "Pro tip: Press [Tab] to auto-complete, or [↑]/[↓] to browse history." : "Mẹo: Bấm [Tab] để tự điền lệnh, bấm [↑]/[↓] để duyệt lại lịch sử."}</div>
`;
    } else if (normalized === "bio" || normalized === "--bio" || normalized === "whoami" || normalized === "about") {
      responseEl.innerHTML = `
<div class="term-card">
  <div class="term-accent font-bold text-base mb-1">TRẦN HỒ HOÀNG VŨ</div>
  <div class="term-success font-semibold mb-2">${isEn ? "Fresher Backend Developer & AI Engineer" : "Kỹ sư Phần mềm Backend & Kỹ sư AI Fresher"}</div>
  <p class="mb-2 leading-relaxed text-slate-300">${
    isEn
      ? "Graduated in Computer Science from Ton Duc Thang University (TDTU). Passionate about high-throughput RESTful architecture, relational database indexing, and operationalizing Machine Learning/NLP pipelines."
      : "Sinh viên tốt nghiệp ngành Khoa học Máy tính tại Đại học Tôn Đức Thắng (TDTU). Yêu thích xây dựng kiến trúc RESTful APIs chịu tải tốt, tối ưu hóa câu truy vấn Raw SQL và triển khai thực tế các mô hình Học sâu/NLP."
  }</p>
  <div class="text-xs term-dim flex flex-wrap gap-3">
    <span>📍 ${isEn ? "Ho Chi Minh City, Vietnam" : "TP. Hồ Chí Minh, Việt Nam"}</span>
    <span>🎓 TDTU (Computer Science)</span>
    <span>🟢 ${isEn ? "Immediate Availability" : "Sẵn sàng nhận việc ngay"}</span>
  </div>
</div>
`;
    } else if (normalized.startsWith("skills") || normalized.startsWith("--skills") || normalized === "-s") {
      if (normalized.includes("--json")) {
        const skillsData = getMockApiData("/api/v1/skills");
        responseEl.innerHTML = `<pre class="my-1">${syntaxHighlightJson(skillsData)}</pre>`;
      } else {
        let cardsHtml = "";
        const badgeColors = ["term-accent", "term-info", "term-success", "term-warn"];
        const skillCategories = window.SKILLS_DATA ? window.SKILLS_DATA.getCategories(isEn ? "en" : "vi") : [];
        if (skillCategories.length > 0) {
          cardsHtml = skillCategories.map((cat, idx) => {
            const colorClass = badgeColors[idx % badgeColors.length];
            const badges = cat.skills.map((s) => `<span class="term-badge">${s.name}</span>`).join(" ");
            return `  <div class="term-card">
    <div class="${colorClass} font-bold">${idx + 1}. ${cat.title.toUpperCase()}:</div>
    <div class="mt-1 flex flex-wrap gap-1.5">
      ${badges}
    </div>
  </div>`;
          }).join("\n");
        }
        responseEl.innerHTML = `
<div class="space-y-2 mt-1">
${cardsHtml}
  <div class="term-dim text-xs">${isEn ? "Tip: Run 'vu --skills --json' for raw machine-readable JSON." : "Mẹo: Gõ 'vu --skills --json' để xuất định dạng JSON thô."}</div>
</div>
`;
      }
    } else if (
      normalized.startsWith("projects") ||
      normalized.startsWith("--projects") ||
      normalized.startsWith("fetch-projects") ||
      normalized.startsWith("--fetch-projects")
    ) {
      // Check for --id=
      const idMatch = normalized.match(/--id=([a-z0-9\-]+)/);
      if (idMatch && PROJECTS_DETAILS_DATA[idMatch[1]]) {
        const pId = idMatch[1];
        const p = PROJECTS_DETAILS_DATA[pId];
        const localized = p[isEn ? "en" : "vi"] || p.vi;
        responseEl.innerHTML = `
<div class="term-card">
  <div class="flex items-center gap-2 mb-1">
    <span class="term-badge">${p.num}</span>
    <span class="term-accent font-bold text-base">${p.title}</span>
  </div>
  <div class="term-dim text-xs mb-2">${localized.subtitle}</div>
  <p class="text-slate-300 text-sm mb-3">${localized.desc}</p>
  <div class="mb-2"><span class="term-info font-semibold">Architecture:</span> <span class="text-slate-300 text-xs">${localized.arch}</span></div>
  <div class="mb-2"><span class="term-success font-semibold">Database:</span> <span class="text-slate-300 text-xs">${localized.data}</span></div>
  <div class="flex flex-wrap gap-1 mt-2">
    ${p.tags.map((t) => `<span class="term-badge">${t}</span>`).join(" ")}
  </div>
  <div class="mt-3">
    <a href="${p.links[0]?.url || 'https://github.com/tranhohoangvu'}" target="_blank" rel="noopener noreferrer" class="term-link text-xs">
      🔗 ${isEn ? "Open repository on GitHub →" : "Mở mã nguồn trên GitHub →"}
    </a>
  </div>
</div>
`;
      } else {
        // Filter by category if any
        let filterCat = null;
        if (normalized.includes("--cat=backend")) filterCat = "backend";
        if (normalized.includes("--cat=ai")) filterCat = "ai";

        let projectsList = Object.keys(PROJECTS_DETAILS_DATA);
        if (filterCat === "backend") {
          projectsList = projectsList.filter((id) => ["coursehub", "ecommerce", "warehouse", "pos"].includes(id));
        } else if (filterCat === "ai") {
          projectsList = projectsList.filter((id) => ["vietnamese-ocr", "nlp-translation", "stock-ml"].includes(id));
        }

        let cardsHtml = projectsList
          .map((id) => {
            const item = PROJECTS_DETAILS_DATA[id];
            const localized = item[isEn ? "en" : "vi"] || item.vi;
            return `
  <tr>
    <td class="term-table-cmd"><span class="term-badge">${item.num}</span> <span class="term-accent">${item.title}</span></td>
    <td class="term-table-desc">
      <div>${localized.subtitle}</div>
      <div class="text-xs term-dim mt-0.5">Stack: ${item.tags.slice(0, 4).join(", ")} • <span class="term-link" onclick="window.vuRunCmd('vu --fetch-projects --id=${id}')">--id=${id}</span></div>
    </td>
  </tr>`;
          })
          .join("");

        responseEl.innerHTML = `
<div class="term-success font-bold mb-2">${
          isEn
            ? `SHOWCASE PROJECTS (${projectsList.length} items):`
            : `DANH SÁCH DỰ ÁN NỔI BẬT (${projectsList.length} dự án):`
        }</div>
<table class="term-table">
  ${cardsHtml}
</table>
<div class="term-dim text-xs mt-2">${
          isEn
            ? "Inspect deep-dive details: type 'vu --fetch-projects --id=&lt;id&gt;' (e.g. coursehub, vietnamese-ocr, ecommerce)."
            : "Xem chi tiết kiến trúc & database: gõ 'vu --fetch-projects --id=&lt;id&gt;' (ví dụ: coursehub, vietnamese-ocr, ecommerce)."
        }</div>
`;
      }
    } else if (normalized === "contact" || normalized === "--contact") {
      responseEl.innerHTML = `
<div class="term-card">
  <div class="term-accent font-bold mb-2">LET'S CONNECT & WORK TOGETHER</div>
  <table class="term-table">
    <tr>
      <td class="term-table-cmd">📧 Email</td>
      <td><a href="mailto:hoangvu2k4cmg@gmail.com" class="term-link">hoangvu2k4cmg@gmail.com</a></td>
    </tr>
    <tr>
      <td class="term-table-cmd">🐙 GitHub</td>
      <td><a href="https://github.com/tranhohoangvu" target="_blank" rel="noopener noreferrer" class="term-link">github.com/tranhohoangvu</a></td>
    </tr>
    <tr>
      <td class="term-table-cmd">💼 LinkedIn</td>
      <td><a href="https://linkedin.com/in/tranhohoangvu/" target="_blank" rel="noopener noreferrer" class="term-link">linkedin.com/in/tranhohoangvu/</a></td>
    </tr>
    <tr>
      <td class="term-table-cmd">🌐 Facebook</td>
      <td><a href="https://www.facebook.com/TranHoHoangVu" target="_blank" rel="noopener noreferrer" class="term-link">facebook.com/TranHoHoangVu</a></td>
    </tr>
  </table>
  <div class="term-dim text-xs mt-2">${isEn ? "Feel free to drop a message or schedule an interview call!" : "Sẵn sàng thảo luận cơ hội việc làm và phỏng vấn trực tiếp!"}</div>
</div>
`;
    } else if (normalized === "cv" || normalized === "--cv") {
      responseEl.innerHTML = `
<div class="term-card">
  <div class="term-accent font-bold mb-2">${isEn ? "RESUME / CURRICULUM VITAE (PDF)" : "HỒ SƠ NĂNG LỰC / CV (PDF)"}</div>
  <div class="space-y-2">
    <div class="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
      <div>
        <div class="font-bold text-slate-200">1. Fresher Backend Developer (PDF)</div>
        <div class="text-xs term-dim">RESTful APIs, PostgreSQL raw SQL, Node.js, Express, Docker</div>
      </div>
      <a href="assets/TranHoHoangVu_BE.pdf" target="_blank" rel="noopener noreferrer" class="term-link font-semibold text-xs py-1 px-3 rounded bg-indigo-500/20 border border-indigo-500/30">
        ${isEn ? "View / Download →" : "Xem / Tải file →"}
      </a>
    </div>
    <div class="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
      <div>
        <div class="font-bold text-slate-200">2. AI Engineer Intern (PDF)</div>
        <div class="text-xs term-dim">PyTorch, Transformer Decoder OCR, RLHF PPO, Time-Series ML</div>
      </div>
      <a href="assets/TranHoHoangVu_AI.pdf" target="_blank" rel="noopener noreferrer" class="term-link font-semibold text-xs py-1 px-3 rounded bg-cyan-500/20 border border-cyan-500/30">
        ${isEn ? "View / Download →" : "Xem / Tải file →"}
      </a>
    </div>
  </div>
</div>
`;
    } else if (normalized.startsWith("curl") || normalized.startsWith("fetch")) {
      const parts = normalized.split(/\s+/);
      let targetUrl = parts.find((p) => p.startsWith("/") || p.startsWith("http")) || "/api/v1/health";
      if (targetUrl.startsWith("https://hoangvu.dev")) {
        targetUrl = targetUrl.replace("https://hoangvu.dev", "");
      }
      if (!targetUrl.startsWith("/")) targetUrl = "/" + targetUrl;

      const mockData = getMockApiData(targetUrl);
      const isPost = normalized.includes("-x post") || targetUrl.includes("contact");
      const statusText = mockData.error ? "404 Not Found" : isPost ? "201 Created" : "200 OK";
      const latency = Math.floor(Math.random() * 35) + 24;

      responseEl.innerHTML = `
<div class="term-dim text-xs mb-1">
  <span class="term-success">HTTP/1.1 ${statusText}</span><br>
  Date: ${new Date().toUTCString()}<br>
  Content-Type: application/json; charset=utf-8<br>
  X-Response-Time: ${latency}ms<br>
  Server: Vu-Express/4.19 (Mock-Runtime)
</div>
<pre class="my-1">${syntaxHighlightJson(mockData)}</pre>
`;
    } else if (normalized.startsWith("theme")) {
      const parts = normalized.split(/\s+/);
      const sub = parts[1] || "toggle";
      if (sub === "dark") {
        applyTheme("dark", true);
        responseEl.innerHTML = `<span class="term-success">✔ Theme set to DARK mode.</span>`;
      } else if (sub === "light") {
        applyTheme("light", true);
        responseEl.innerHTML = `<span class="term-success">✔ Theme set to LIGHT mode.</span>`;
      } else {
        toggleTheme();
        const cur = document.documentElement.classList.contains("dark") ? "DARK" : "LIGHT";
        responseEl.innerHTML = `<span class="term-success">✔ Toggled theme to ${cur} mode.</span>`;
      }
    } else if (normalized.startsWith("lang")) {
      const parts = normalized.split(/\s+/);
      const sub = parts[1] || "toggle";
      if (sub === "en") {
        applyLanguage("en", true);
        responseEl.innerHTML = `<span class="term-success">✔ Language switched to English.</span>`;
      } else if (sub === "vi") {
        applyLanguage("vi", true);
        responseEl.innerHTML = `<span class="term-success">✔ Ngôn ngữ đã chuyển sang Tiếng Việt.</span>`;
      } else {
        const nextLang = currentLang === "vi" ? "en" : "vi";
        applyLanguage(nextLang, true);
        responseEl.innerHTML = `<span class="term-success">✔ Switched language to ${nextLang.toUpperCase()}.</span>`;
      }
    } else if (normalized === "clear" || normalized === "cls") {
      outputScreen.innerHTML = "";
      return;
    } else if (normalized === "history") {
      if (historyList.length === 0) {
        responseEl.innerHTML = `<span class="term-dim">${isEn ? "No command history yet." : "Chưa có lịch sử lệnh nào."}</span>`;
      } else {
        responseEl.innerHTML = historyList
          .map((c, i) => `<div class="term-dim">${String(i + 1).padStart(3, " ")}  <span class="text-slate-200">${escapeHtml(c)}</span></div>`)
          .join("");
      }
    } else if (normalized === "date") {
      responseEl.innerHTML = `<span class="term-info">${new Date().toString()}</span>`;
    } else if (normalized.startsWith("sudo")) {
      responseEl.innerHTML = `
<div class="term-warn">[sudo] password for guest: *******</div>
<div class="term-err">Permission denied: guest is not in the sudoers file. This incident will be reported to Vu.</div>
`;
    } else if (normalized === "matrix") {
      let matrixLines = "";
      const chars = "01010110 01010101 01000001 01001001 01010011 01010100 01000101 01001101";
      for (let i = 0; i < 8; i++) {
        matrixLines += `<div class="term-success font-mono text-xs opacity-90">${chars.slice(i * 4)} [ACCESS GRANTED TO BACKEND MATRIX]</div>`;
      }
      responseEl.innerHTML = matrixLines;
    } else {
      responseEl.innerHTML = `
<div class="term-err">vu-cli: command not found: '${escapeHtml(trimmed)}'</div>
<div class="term-dim text-xs mt-1">${
        isEn
          ? "Type <span class='term-accent'>'vu --help'</span> or click any quick command badge above to get started."
          : "Gõ <span class='term-accent'>'vu --help'</span> hoặc bấm vào các chip lệnh nhanh bên trên để xem hướng dẫn."
      }</div>
`;
    }

    outputScreen.appendChild(responseEl);
    outputScreen.scrollTop = outputScreen.scrollHeight;
  }

  // Global helper for inline links
  window.vuRunCmd = (cmd) => {
    cliInput.value = cmd;
    executeCommand(cmd);
    cliInput.value = "";
    cliInput.focus();
  };

  // Submit on enter or button click
  cliSubmit.addEventListener("click", () => {
    const val = cliInput.value;
    cliInput.value = "";
    currentInputDraft = "";
    executeCommand(val);
  });

  cliInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = cliInput.value;
      cliInput.value = "";
      currentInputDraft = "";
      executeCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyList.length === 0) return;
      if (historyIndex === historyList.length) {
        currentInputDraft = cliInput.value;
      }
      if (historyIndex > 0) {
        historyIndex--;
        cliInput.value = historyList[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < historyList.length - 1) {
        historyIndex++;
        cliInput.value = historyList[historyIndex];
      } else if (historyIndex === historyList.length - 1) {
        historyIndex = historyList.length;
        cliInput.value = currentInputDraft;
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = cliInput.value.trim().toLowerCase();
      const candidates = [
        "vu --help",
        "vu --bio",
        "vu --skills",
        "vu --skills --json",
        "vu --fetch-projects",
        "vu --fetch-projects --cat=backend",
        "vu --fetch-projects --cat=ai",
        "vu --fetch-projects --id=coursehub",
        "vu --contact",
        "vu --cv",
        "curl /api/v1/profile",
        "curl /api/v1/skills",
        "curl /api/v1/projects",
        "curl /api/v1/health",
        "curl -X POST /api/v1/contact",
        "theme toggle",
        "lang toggle",
        "clear",
        "history",
        "whoami",
        "date",
        "matrix"
      ];

      const matches = candidates.filter((c) => c.startsWith(current));
      if (matches.length === 1) {
        cliInput.value = matches[0];
      } else if (matches.length > 1) {
        const line = document.createElement("div");
        line.className = "term-line term-dim text-xs my-1";
        line.textContent = matches.join("   ");
        outputScreen.appendChild(line);
        outputScreen.scrollTop = outputScreen.scrollHeight;
      }
    }
  });

  // Clicking output screen focuses input
  outputScreen.addEventListener("click", () => {
    cliInput.focus();
  });

  // Window Top Control Dots
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      outputScreen.innerHTML = "";
      cliInput.focus();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      userHasExecutedCommands = false;
      renderMotd();
      cliInput.focus();
    });
  }

  function toggleTerminalFullscreen(forceState) {
    const isCurrentlyFullscreen = windowContainer.classList.contains("is-fullscreen");
    const nextState = typeof forceState === "boolean" ? forceState : !isCurrentlyFullscreen;

    if (nextState) {
      windowContainer.classList.add("is-fullscreen");
      document.body.classList.add("terminal-fullscreen-active");
    } else {
      windowContainer.classList.remove("is-fullscreen");
      document.body.classList.remove("terminal-fullscreen-active");
    }
    cliInput?.focus();
  }

  if (btnFullscreen) {
    btnFullscreen.addEventListener("click", () => {
      toggleTerminalFullscreen();
    });
  }

  // ESC to exit fullscreen
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && windowContainer.classList.contains("is-fullscreen")) {
      toggleTerminalFullscreen(false);
    }
  });

  // Tab Switcher
  function switchTab(mode) {
    if (mode === "cli") {
      tabCli.classList.add("active");
      tabCli.setAttribute("aria-selected", "true");
      tabApi.classList.remove("active");
      tabApi.setAttribute("aria-selected", "false");
      viewCli.classList.remove("hidden");
      viewApi.classList.add("hidden");
      setTimeout(() => cliInput.focus(), 50);
    } else {
      tabApi.classList.add("active");
      tabApi.setAttribute("aria-selected", "true");
      tabCli.classList.remove("active");
      tabCli.setAttribute("aria-selected", "false");
      viewApi.classList.remove("hidden");
      viewCli.classList.add("hidden");
      // Trigger initial request if viewer is empty
      if (!apiResponseBody.hasChildNodes()) {
        sendApiRequest();
      }
    }
  }

  tabCli.addEventListener("click", () => switchTab("cli"));
  tabApi.addEventListener("click", () => switchTab("api"));

  // Quick Chips
  if (quickChipsContainer) {
    quickChipsContainer.querySelectorAll(".terminal-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const cmd = chip.getAttribute("data-cmd");
        if (cmd) {
          switchTab("cli");
          cliInput.value = cmd;
          executeCommand(cmd);
          cliInput.value = "";
          cliInput.focus();
        }
      });
    });
  }

  // FAB link: scroll and focus
  if (fabTerminalLink) {
    fabTerminalLink.addEventListener("click", () => {
      switchTab("cli");
      setTimeout(() => {
        cliInput.focus();
      }, 400);
    });
  }

  // Copy Terminal Output
  if (btnCopyOutput) {
    btnCopyOutput.addEventListener("click", async () => {
      const text = outputScreen.innerText || outputScreen.textContent;
      try {
        await navigator.clipboard.writeText(text);
        showToast({
          message: t("toast_terminal_copied"),
          type: "success",
          duration: 3000
        });
      } catch (e) {
        showToast({
          message: "Unable to copy output.",
          type: "error"
        });
      }
    });
  }

  // REST API Explorer Handlers
  function sendApiRequest() {
    const endpoint = apiEndpointSelect.value;
    const isPost = endpoint.includes("contact");

    // UI loading state
    const spinner = apiSendBtn.querySelector(".api-btn-spinner");
    const btnText = apiSendBtn.querySelector(".api-btn-text");
    if (spinner) spinner.classList.remove("hidden");
    if (btnText) btnText.textContent = currentLang === "en" ? "Sending..." : "Đang gửi...";
    apiSendBtn.disabled = true;

    // Simulate realistic network latency (25-70ms)
    const latency = Math.floor(Math.random() * 45) + 25;

    setTimeout(() => {
      const data = getMockApiData(endpoint, isPost ? "POST" : "GET");
      lastApiResponseJson = data;

      const jsonStr = JSON.stringify(data, null, 2);
      const byteSize = (new TextEncoder().encode(jsonStr).length / 1024).toFixed(1);

      if (apiResStatus) {
        apiResStatus.textContent = isPost ? "Status: 201 Created" : "Status: 200 OK";
      }
      if (apiResTime) {
        apiResTime.textContent = `Time: ${latency}ms`;
      }
      if (apiResSize) {
        apiResSize.textContent = `Size: ${byteSize} KB`;
      }

      apiResponseBody.innerHTML = `<pre class="m-0">${syntaxHighlightJson(data)}</pre>`;

      if (spinner) spinner.classList.add("hidden");
      if (btnText) btnText.textContent = t("api_btn_send");
      apiSendBtn.disabled = false;
    }, latency);
  }

  if (apiEndpointSelect) {
    apiEndpointSelect.addEventListener("change", () => {
      const isPost = apiEndpointSelect.value.includes("contact");
      if (apiMethodBadge) {
        apiMethodBadge.textContent = isPost ? "POST" : "GET";
        apiMethodBadge.classList.toggle("is-post", isPost);
      }
      if (apiPayloadSection) {
        apiPayloadSection.classList.toggle("hidden", !isPost);
      }
      sendApiRequest();
    });
  }

  if (apiSendBtn) {
    apiSendBtn.addEventListener("click", sendApiRequest);
  }

  if (apiCopyJsonBtn) {
    apiCopyJsonBtn.addEventListener("click", async () => {
      if (!lastApiResponseJson) return;
      try {
        await navigator.clipboard.writeText(JSON.stringify(lastApiResponseJson, null, 2));
        showToast({
          message: t("toast_json_copied"),
          type: "success",
          duration: 3000
        });
      } catch (e) {
        showToast({
          message: "Failed to copy JSON.",
          type: "error"
        });
      }
    });
  }

  // Hook for language switch to refresh placeholder or initial MOTD
  window.refreshTerminalLang = () => {
    if (cliInput) {
      cliInput.placeholder = currentLang === "en" ? "Type a command (e.g. vu --help) or press Tab..." : "Gõ lệnh (ví dụ: vu --help) hoặc bấm Tab để gợi ý...";
    }
    if (!userHasExecutedCommands) {
      renderMotd();
    }
    if (apiResponseBody && lastApiResponseJson && apiEndpointSelect) {
      const endpoint = apiEndpointSelect.value;
      const isPost = endpoint.includes("contact");
      lastApiResponseJson = getMockApiData(endpoint, isPost ? "POST" : "GET");
      apiResponseBody.innerHTML = `<pre class="m-0">${syntaxHighlightJson(lastApiResponseJson)}</pre>`;
    }
  };

  // Initial render
  renderMotd();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initProjectsCarousel();
    initProjectsFilter();
    initProjectDetailsModal();
    initSkillProjectLinking();
    initTerminalConsole();
    initFloatingActions();
    initHeroInteractions();
    initCounterAnimations();
  });
} else {
  initProjectsCarousel();
  initProjectsFilter();
  initProjectDetailsModal();
  initSkillProjectLinking();
  initTerminalConsole();
  initFloatingActions();
  initHeroInteractions();
  initCounterAnimations();
}

// =======================
// Toast Notification System
// =======================
function showToast({ message, type = "info", duration = 3200 }) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.setAttribute("role", "alert");

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
    </svg>`;
  } else if (type === "error") {
    iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>`;
  } else {
    iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>`;
  }

  toast.innerHTML = `
    <span class="toast__icon">${iconSvg}</span>
    <span class="toast__content">${message}</span>
    <button type="button" class="toast__close" aria-label="Đóng thông báo">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <div class="toast__progress"></div>
  `;

  container.appendChild(toast);

  // Trigger smooth entrance
  requestAnimationFrame(() => {
    toast.classList.add("toast--visible");
    const prog = toast.querySelector(".toast__progress");
    if (prog) {
      prog.style.transition = `transform ${duration}ms linear`;
      prog.style.transform = "scaleX(0)";
    }
  });

  let dismissTimer = null;
  const dismiss = () => {
    if (dismissTimer) clearTimeout(dismissTimer);
    toast.classList.remove("toast--visible");
    toast.classList.add("toast--hiding");
    setTimeout(() => {
      toast.remove();
    }, 300);
  };

  dismissTimer = setTimeout(dismiss, duration);

  const closeBtn = toast.querySelector(".toast__close");
  if (closeBtn) closeBtn.addEventListener("click", dismiss);
}

window.showToast = showToast;

// =======================
// Floating Action Bar (FAB) & Quick Actions
// =======================
function initFloatingActions() {
  const container = document.getElementById("fab-container");
  const trigger = document.getElementById("fab-trigger");
  const menu = document.getElementById("fab-menu");
  const copyEmailBtn = document.getElementById("fab-copy-email");
  const cvToggleBtn = document.getElementById("fab-cv-toggle");
  const cvSubmenu = document.getElementById("fab-cv-submenu");

  if (!container || !trigger) return;

  const EMAIL_ADDRESS = "hoangvu2k4cmg@gmail.com";

  function closeAll() {
    container.classList.remove("fab-container--active");
    trigger.setAttribute("aria-expanded", "false");
    if (menu) menu.setAttribute("aria-hidden", "true");
    if (cvSubmenu) {
      cvSubmenu.classList.remove("fab-cv-submenu--open");
      if (cvToggleBtn) cvToggleBtn.setAttribute("aria-expanded", "false");
    }
  }

  function toggleMenu() {
    const isOpen = container.classList.contains("fab-container--active");
    if (isOpen) {
      closeAll();
    } else {
      container.classList.add("fab-container--active");
      trigger.setAttribute("aria-expanded", "true");
      if (menu) menu.setAttribute("aria-hidden", "false");
    }
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Toggle CV Submenu
  if (cvToggleBtn && cvSubmenu) {
    cvToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isSubOpen = cvSubmenu.classList.contains("fab-cv-submenu--open");
      cvSubmenu.classList.toggle("fab-cv-submenu--open", !isSubOpen);
      cvToggleBtn.setAttribute("aria-expanded", String(!isSubOpen));
    });
  }

  // 1-Click Copy Email to Clipboard + Show Toast
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      let copied = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(EMAIL_ADDRESS);
          copied = true;
        }
      } catch (err) {
        // Fallback below
      }

      if (!copied) {
        try {
          const ta = document.createElement("textarea");
          ta.value = EMAIL_ADDRESS;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          ta.style.top = "0";
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          copied = document.execCommand("copy");
          ta.remove();
        } catch (fallbackErr) {
          copied = false;
        }
      }

      if (copied) {
        showToast({
          message: t("toast_email_copied"),
          type: "success",
          duration: 3500,
        });
      } else {
        showToast({
          message: t("toast_email_copy_err"),
          type: "error",
          duration: 3500,
        });
      }
    });
  }

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (container.classList.contains("fab-container--active") && !container.contains(e.target)) {
      closeAll();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && container.classList.contains("fab-container--active")) {
      closeAll();
    }
  });
}

// =======================
// Dynamic Interactive Micro-Interactions & Animations
// =======================
function initHeroInteractions() {
  const hero = document.getElementById("home");
  if (!hero) return;

  // Respect reduced motion
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  let ticking = false;
  hero.addEventListener("mousemove", (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
      ticking = false;
    });
  });
}

function initCounterAnimations() {
  const counters = document.querySelectorAll(".about-stat__num[data-counter-target]");
  if (!counters.length) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        observer.unobserve(el);

        const target = parseInt(el.getAttribute("data-counter-target"), 10);
        const start = parseInt(el.getAttribute("data-counter-start"), 10) || 0;
        const suffix = el.getAttribute("data-counter-suffix") ?? "+";
        const duration = 1600; // ms

        if (reduceMotion || isNaN(target)) {
          el.textContent = `${target}${suffix}`;
          return;
        }

        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // smooth easeOutExpo
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(start + (target - start) * ease);

          el.textContent = `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
