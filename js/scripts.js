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
    ? `assets/github/github-contrib-dark.svg?v=${v}`
    : `assets/github/github-contrib-light.svg?v=${v}`;

  // Activity Graph: local SVG do GitHub Actions tự động sinh (fallback sang online mirror)
  const activitySvg = isDark
    ? `assets/github/github-activity-dark.svg?v=${v}`
    : `assets/github/github-activity-light.svg?v=${v}`;

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

window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;

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

window.applyLanguage = applyLanguage;
window.toggleLanguage = toggleLanguage;
window.t = t;
window.getCurrentLang = () => currentLang;
try {
  Object.defineProperty(window, "currentLang", {
    get: () => currentLang,
    set: (v) => { currentLang = v; },
    configurable: true
  });
} catch (e) {}

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

// ==========================================================================
// Application Bootstrap & Feature Modules Orchestration
// Các module tính năng độc lập được nạp từ js/modules/:
// - js/modules/carousel.js      (Projects Carousel slider & category filter)
// - js/modules/modal.js         (Project details modal & tabs)
// - js/modules/skill-linking.js (Skill ↔ Project bidirectional linking)
// - js/modules/terminal.js      (Terminal CLI & REST API Console widget)
// - js/modules/fab.js           (Floating Action Bar & Toasts)
// ==========================================================================
function initAppModules() {
  window.initProjectsCarousel?.();
  window.initProjectsFilter?.();
  window.initProjectDetailsModal?.();
  window.initSkillProjectLinking?.();
  window.initTerminalConsole?.();
  window.initFloatingActions?.();
  initHeroInteractions?.();
  initCounterAnimations?.();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAppModules);
} else {
  initAppModules();
}
