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
// Item 7: Project Deep-Dive Architecture & Engineering Details
// Dữ liệu được trích xuất và chuẩn hóa 100% từ thư mục projects-docs/*.md
// ==========================================================================
const PROJECTS_DETAILS_DATA = {
  coursehub: {
    num: "#01",
    title: "CourseHub LMS",
    image: "assets/projects/coursehub.png",
    tags: ["React 18", "Vite", "Node.js", "Express.js", "PostgreSQL", "Native pg (No ORM)", "JWT RBAC", "RESTful API"],
    links: [
      { labelVi: "Xem trên GitHub →", labelEn: "View on GitHub →", url: "https://github.com/tranhohoangvu/coursehub-lms", type: "primary" },
      { labelVi: "Demo trực tiếp →", labelEn: "Live Demo →", url: "https://coursehub-lms-eight.vercel.app", type: "accent" }
    ],
    vi: {
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

  ecommerce: {
    num: "#02",
    title: "E-commerce Platform",
    image: "assets/projects/ecommerce.png",
    tags: ["React 18", "Node.js", "Express", "MongoDB", "Mongoose", "Socket.IO", "Gemini AI", "Docker", "VNPAY"],
    links: [
      { labelVi: "Xem trên GitHub →", labelEn: "View on GitHub →", url: "https://github.com/tranhohoangvu/E-Commerce-Website", type: "primary" }
    ],
    vi: {
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

  "vietnamese-ocr": {
    num: "#03",
    title: "Vietnamese OCR (Deep Learning)",
    image: "assets/projects/vietnamese-ocr.png",
    tags: ["Python", "PyTorch", "ResNet34", "Transformer Decoder", "Spatial Attention", "MCOCR", "BLEU"],
    links: [
      { labelVi: "Xem trên GitHub →", labelEn: "View on GitHub →", url: "https://github.com/tranhohoangvu/Deep-Learning", type: "primary" }
    ],
    vi: {
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

  "nlp-translation": {
    num: "#04",
    title: "EN–VI Machine Translation (NLP)",
    image: "assets/projects/nlp-translation.png",
    tags: ["Python", "PyTorch", "Hugging Face", "TRL (RLHF/PPO)", "MarianMT", "SentencePiece", "SacreBLEU"],
    links: [
      { labelVi: "Xem trên GitHub →", labelEn: "View on GitHub →", url: "https://github.com/tranhohoangvu/Natural-Language-Processing", type: "primary" }
    ],
    vi: {
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

  "stock-ml": {
    num: "#05",
    title: "Stock Forecasting & Benchmark (ML)",
    image: "assets/projects/stock-ml.png",
    tags: ["Python", "TensorFlow / Keras", "scikit-learn", "LSTM / FFNN", "Time-Series", "CNN", "Optimization"],
    links: [
      { labelVi: "Xem trên GitHub →", labelEn: "View on GitHub →", url: "https://github.com/tranhohoangvu/Machine-Learning", type: "primary" }
    ],
    vi: {
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

  warehouse: {
    num: "#06",
    title: "WarehouseMA",
    image: "assets/projects/warehouse.png",
    tags: ["C#", ".NET WinForms", "MySQL / SQL Server", "3-Tier Architecture", "Google Forms API", "QR Code", "SRS / BRD"],
    links: [
      { labelVi: "Xem trên GitHub →", labelEn: "View on GitHub →", url: "https://github.com/tranhohoangvu/WarehouseMA", type: "primary" }
    ],
    vi: {
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

  pos: {
    num: "#07",
    title: "An Khang Store POS",
    image: "assets/projects/pos.png",
    tags: ["Laravel 10", "Livewire", "MySQL", "Bootstrap 5", "DOMPDF", "Vite", "Toastr"],
    links: [
      { labelVi: "Xem trên GitHub →", labelEn: "View on GitHub →", url: "https://github.com/tranhohoangvu/Web-Programming-and-Applications", type: "primary" },
      { labelVi: "Xem Video Demo →", labelEn: "Watch Demo Video →", url: "https://youtu.be/XLwuIJpsN-M", type: "accent" }
    ],
    vi: {
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
};

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
// Item 8: Interactive Skill ↔ Project Linking (2-Way Bidirectional)
// ==========================================================================
const SKILL_PROJECT_MAPPING = {
  // Core Languages
  c: { name: "C", projects: [] },
  csharp: { name: "C#", projects: ["warehouse"] },
  java: { name: "Java", projects: [] },
  python: { name: "Python", projects: ["vietnamese-ocr", "nlp-translation", "stock-ml"] },
  javascript: { name: "JavaScript", projects: ["coursehub", "ecommerce"] },
  php: { name: "PHP", projects: ["pos"] },

  // Backend Architecture & Frameworks
  nodejs: { name: "Node.js", projects: ["coursehub", "ecommerce"] },
  express: { name: "Express.js", projects: ["coursehub", "ecommerce"] },
  laravel: { name: "Laravel", projects: ["pos"] },
  restapi: { name: "RESTful API", projects: ["coursehub", "ecommerce"] },
  dotnet: { name: ".NET WinForms", projects: ["warehouse"] },
  react: { name: "React", projects: ["coursehub", "ecommerce"] },

  // Databases & Storage
  postgresql: { name: "PostgreSQL", projects: ["coursehub"] },
  mysql: { name: "MySQL", projects: ["warehouse", "pos"] },
  mongodb: { name: "MongoDB", projects: ["ecommerce"] },
  sqlserver: { name: "SQL Server", projects: ["warehouse"] },
  rawsql: { name: "Raw SQL", projects: ["coursehub"] },

  // AI, DevOps & Tools
  pytorch: { name: "PyTorch", projects: ["vietnamese-ocr", "nlp-translation"] },
  tensorflow: { name: "TensorFlow", projects: ["stock-ml"] },
  docker: { name: "Docker", projects: ["ecommerce"] },
  compose: { name: "Docker Compose", projects: ["ecommerce"] },
  nginx: { name: "Nginx", projects: ["ecommerce"] },
  git: { name: "Git", projects: ["coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
  github: { name: "GitHub", projects: ["coursehub", "ecommerce", "vietnamese-ocr", "nlp-translation", "stock-ml", "warehouse", "pos"] },
  postman: { name: "Postman", projects: ["coursehub", "ecommerce"] },
  linux: { name: "Linux", projects: [] }
};

function normalizeTagToSkillId(tagStr) {
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
      return {
        categories: {
          core_languages: [
            { name: "C", level: "Academic Core" },
            { name: "C#", framework: ".NET WinForms", project: "WarehouseMA" },
            { name: "Java", level: "OOP Foundation" },
            { name: "Python", frameworks: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face"], projects: 3 },
            { name: "JavaScript", frameworks: ["Node.js", "Express.js", "React"], projects: 2 },
            { name: "PHP", framework: "Laravel", project: "Store.com POS" }
          ],
          backend_architecture: [
            "Node.js & Express.js (Modular REST APIs, JWT RBAC)",
            "Laravel (Eloquent, MVC, Blade)",
            ".NET WinForms (3-Tier BLL/DAL/DTO)",
            "RESTful API Design, Middleware, Payload Validation (Zod)"
          ],
          databases_and_optimization: [
            "PostgreSQL (Raw SQL, Indexing, Triggers, Connection Pools)",
            "MySQL / MariaDB (Transactions, ACID, Relational Schema)",
            "MongoDB (Document store, Mongoose, Compound Indexes)",
            "Microsoft SQL Server"
          ],
          ai_devops_and_tools: [
            "PyTorch & Deep Learning (ResNet34, Transformer Decoder, Spatial Attention)",
            "NLP & RLHF (TRL PPO Alignment, SentencePiece tokenization, MarianMT)",
            "Docker & Docker Compose (Multi-container microservices, Nginx reverse proxy)",
            "Git & GitHub Actions (Automated CI/CD, Daily Cron GraphQL Heatmap)",
            "Postman API Testing, Linux Ubuntu CLI"
          ]
        },
        total_skills_tracked: 25
      };
    }

    if (cleanUrl === "/api/v1/projects") {
      let list = Object.keys(PROJECTS_DETAILS_DATA).map((key) => {
        const item = PROJECTS_DETAILS_DATA[key];
        const localized = item[isEn ? "en" : "vi"] || item.vi;
        return {
          id: key,
          num: item.num,
          title: item.title,
          subtitle: localized.subtitle,
          tags: item.tags,
          github_url: item.links && item.links[0] ? item.links[0].url : "https://github.com/tranhohoangvu"
        };
      });

      if (query.includes("category=backend") || query.includes("cat=backend")) {
        list = list.filter((p) => ["coursehub", "ecommerce", "warehouse", "pos"].includes(p.id));
      } else if (query.includes("category=ai") || query.includes("cat=ai")) {
        list = list.filter((p) => ["vietnamese-ocr", "nlp-translation", "stock-ml"].includes(p.id));
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
        responseEl.innerHTML = `
<div class="space-y-2 mt-1">
  <div class="term-card">
    <div class="term-accent font-bold">1. ${isEn ? "CORE LANGUAGES" : "NGÔN NGỮ CỐT LÕI"}:</div>
    <div class="mt-1 flex flex-wrap gap-1.5">
      <span class="term-badge">C</span>
      <span class="term-badge">C# (.NET)</span>
      <span class="term-badge">Java</span>
      <span class="term-badge">Python</span>
      <span class="term-badge">JavaScript (ES6+)</span>
      <span class="term-badge">PHP</span>
      <span class="term-badge">SQL</span>
    </div>
  </div>
  <div class="term-card">
    <div class="term-info font-bold">2. ${isEn ? "BACKEND ARCHITECTURE & APIS" : "KIẾN TRÚC BACKEND & APIS"}:</div>
    <div class="mt-1 flex flex-wrap gap-1.5">
      <span class="term-badge">Node.js</span>
      <span class="term-badge">Express.js</span>
      <span class="term-badge">Laravel</span>
      <span class="term-badge">RESTful API</span>
      <span class="term-badge">JWT & RBAC</span>
      <span class="term-badge">MVC / 3-Tier</span>
    </div>
  </div>
  <div class="term-card">
    <div class="term-success font-bold">3. ${isEn ? "DATABASES & OPTIMIZATION" : "CƠ SỞ DỮ LIỆU & TỐI ƯU HÓA"}:</div>
    <div class="mt-1 flex flex-wrap gap-1.5">
      <span class="term-badge">PostgreSQL</span>
      <span class="term-badge">MySQL</span>
      <span class="term-badge">MongoDB</span>
      <span class="term-badge">SQL Server</span>
      <span class="term-badge">Raw SQL Optimized</span>
      <span class="term-badge">Indexing & Transactions</span>
    </div>
  </div>
  <div class="term-card">
    <div class="term-warn font-bold">4. ${isEn ? "AI, DEVOPS & TOOLS" : "AI, DEVOPS & CÔNG CỤ"}:</div>
    <div class="mt-1 flex flex-wrap gap-1.5">
      <span class="term-badge">PyTorch</span>
      <span class="term-badge">TensorFlow</span>
      <span class="term-badge">TRL / RLHF (PPO)</span>
      <span class="term-badge">Docker</span>
      <span class="term-badge">Docker Compose</span>
      <span class="term-badge">Nginx</span>
      <span class="term-badge">Git / GitHub Actions</span>
      <span class="term-badge">Postman</span>
    </div>
  </div>
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
