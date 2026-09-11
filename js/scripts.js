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
    cv_kicker: "Sẵn sàng ứng tuyển",
    cv_headline: "Hai hướng. Một mục tiêu.",
    cv_title: "CV",
    cv_subtitle: "Chọn phiên bản CV phù hợp với vị trí bạn quan tâm.",
    cv_updated_be: "Cập nhật T8/2026",
    cv_updated_ai: "Cập nhật T3/2026",

    cv_be_title: "Fresher Backend Developer (PDF)",
    cv_be_desc: "Định hướng Backend: RESTful APIs, database, tự động hóa quy trình (Jira API/OpenClaw) & clean code.",

    cv_ai_title: "AI Engineer Intern (PDF)",
    cv_ai_desc: "Định hướng AI: ML/DL, NLP (Transformer MT), Computer Vision (Vietnamese OCR) & deployment pipelines.",

    cv_btn_view: "Xem",
    cv_btn_download: "Tải xuống",
    cv_preview_hover: "Xem trước",
    cv_stat_versions: "2 Định dạng chuyên sâu",
    cv_stat_roles: "Đúng trọng tâm vai trò",
    cv_stat_updated: "Cập nhật mới 2026",
    cv_badge_primary: "Định hướng chính",
    cv_badge_specialized: "Chuyên sâu AI",
    cv_downloads_be: "52 lượt tải",
    cv_downloads_ai: "38 lượt tải",

    cv_menu_be_title: "Fresher Backend Developer (PDF)",
    cv_menu_be_meta: "TranHoHoangVu_BE.pdf",
    cv_menu_ai_title: "AI Engineer Intern (PDF)",
    cv_menu_ai_meta: "TranHoHoangVu_AI.pdf",

    about_top_kicker: "👤 VỀ BẢN THÂN • PROFILE",
    about_title: "Hành trình Kỹ thuật & Định hướng",
    about_subtitle: "Khám phá nền tảng học vấn, kinh nghiệm kỹ thuật thực chiến và định hướng phát triển phần mềm & AI.",
    about_description:
      "Mình là Trần Hồ Hoàng Vũ, tốt nghiệp ngành Khoa học Máy tính tại Đại học Tôn Đức Thắng với kinh nghiệm thực tế về phát triển backend qua kỳ thực tập Kỹ sư phần mềm và các dự án học thuật. Mình thích xây dựng các giải pháp thực tế, từ thiết kế RESTful APIs, làm việc với cơ sở dữ liệu đến phát triển các quy trình tự động hóa và xử lý dữ liệu. Mình đã từng làm việc với Node.js, Express.js, Laravel và nhiều công nghệ cơ sở dữ liệu khác nhau. Định hướng sắp tới, mình muốn củng cố kỹ năng kỹ thuật phần mềm, tích lũy thêm kinh nghiệm thực tế và xây dựng phần mềm đáng tin cậy, dễ bảo trì, đồng thời không ngừng học hỏi và cải thiện bản thân.",
    about_kicker: "Thiên về Backend • Software & AI",
    about_headline: "Mình xây backend sạch và pipeline AI thực dụng, triển khai được.",
    about_chip_1: "Backend APIs",
    about_chip_2: "Cơ sở dữ liệu",
    about_chip_3: "AI ứng dụng • NLP/CV",
    about_chip_workmode: "💼 On-site • Hybrid • Remote",
    about_status_badge: "Sẵn sàng nhận việc",
    about_pillar_edu_title: "Học vấn & Nền tảng",
    about_pillar_edu_desc: "Tốt nghiệp Khoa học Máy tính — Đại học Tôn Đức Thắng (TDTU). Nền tảng vững về Cấu trúc dữ liệu & Giải thuật.",
    about_pillar_exp_title: "Kinh nghiệm Thực chiến",
    about_pillar_exp_desc: "Thực tập Kỹ sư Phần mềm: thiết kế RESTful APIs, tối ưu Raw SQL PostgreSQL và tự động hóa quy trình Jira/OpenClaw.",
    about_pillar_goal_title: "Vị trí Ứng tuyển",
    about_pillar_goal_desc: "Fresher Backend Developer (Node.js, Express, Laravel) & AI Engineer Intern (PyTorch, Transformers, Computer Vision).",
    about_stat_projects: "Dự án hoàn chỉnh",
    about_stat_repos: "GitHub Repositories",
    about_stat_certs: "Chứng chỉ quốc tế",
    about_stat_ready: "Sẵn sàng làm việc",
    about_cta_cv: "Xem hồ sơ CV",
    about_cta_contact: "Liên hệ ngay",
    about_stat_1: "Dự án AI/ML",
    about_stat_2: "Dự án Backend",
    about_stat_3: "Fresher & Sẵn sàng làm việc",

    projects_kicker: "🚀 SẢN PHẨM & DỰ ÁN • SHOWCASE",
    projects_headline: "Dự án & Giải pháp Kỹ thuật",
    projects_subtitle: "Từ thiết kế hệ thống Backend RESTful API đến xây dựng và triển khai các mô hình AI thực tế.",
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

    skills_kicker: "⚡ NĂNG LỰC CỐT LÕI • TECH STACK",
    skills_headline: "Kỹ năng & Chuyên môn Kỹ thuật",
    skills_title: "Kỹ năng",
    skills_subtitle: "Nhấp vào kỹ năng có huy hiệu để lọc và xem các dự án thực tế đã ứng dụng công nghệ tương ứng.",
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
    certs_kicker: "🏅 2 Chứng chỉ • 2024",
    certs_headline: "Được chứng nhận. Đã xác minh. Sẵn sàng.",
    certs_subtitle: "Các chứng chỉ xác nhận năng lực phương pháp phát triển phần mềm và trình độ tiếng Anh học thuật.",
    certs_view: "Xem chứng chỉ →",
    cert_score_label: "Điểm",
    cert_level_label: "Tương đương B2",
    cert_id_label: "Mã chứng chỉ",
    cert_issued_label: "Cấp tháng",
    cert_tag_language: "English",
    cert_tag_software: "Agile / Scrum",
    cert_agile_title: "Agile & Scrum Framework 2024",
    cert_agile_desc: "Cấp bởi Techbase Viet Nam tại Đại học Tôn Đức Thắng. Bao gồm Scrum roles, Sprints, Backlog refinement và Agile ceremonies.",
    cert_aptis_title: "Aptis ESOL",
    cert_aptis_desc: "Bài thi tiếng Anh quốc tế của British Council, đánh giá 4 kỹ năng: Nghe, Nói, Đọc, Viết theo thang CEFR.",

    github_title: "Hoạt động GitHub",
    github_kicker: "📊 GitHub • Cập nhật tự động",
    github_headline: "Code mỗi ngày. Học liên tục.",
    github_subtitle: "Hoạt động GitHub phản ánh quá trình học hỏi và xây dựng project thực tế liên tục.",
    github_contrib: "Tổng quan đóng góp",
    github_contrib_tip: "Dữ liệu đóng góp được tạo tự động từ dữ liệu GitHub GraphQL (Actions) và được cập nhật định kỳ.",
    github_activity: "Biểu đồ hoạt động",
    github_activity_tip: "Biểu đồ số lượng commit theo thời gian (tổng hợp từ dữ liệu GitHub).",
    github_stat_repos: "Repositories",
    github_stat_stars: "Stars",
    github_stat_langs: "Ngôn ngữ",
    github_stat_updated: "Cập nhật",
    github_profile_link: "Xem GitHub profile",
    github_profile_handle: "@tranhohoangvu",

    contact_kicker: "💬 LIÊN HỆ • KẾT NỐI NGAY",
    contact_headline: "Cùng xây dựng điều tuyệt vời.",
    contact_subtitle: "Sẵn sàng đón nhận cơ hội việc làm Fresher Backend Developer, AI Engineer Intern hoặc dự án cộng tác mới.",
    contact_avail_badge: "Sẵn sàng nhận việc ngay",
    contact_avail_roles: "Fresher Backend • AI Engineer Intern",
    contact_location: "TP. Hồ Chí Minh, Việt Nam (UTC+7)",
    contact_work_mode: "On-site • Hybrid • Remote",
    contact_response_time: "Phản hồi nhanh trong vòng 24h",
    contact_badge_fastest: "Nhanh nhất",
    contact_badge_primary: "Ưu tiên",
    contact_title: "Liên hệ",
    contact_intro: "Hãy liên hệ với tôi qua email hoặc các nền tảng sau:",
    connect_title: "Kết nối với tôi nhé!",
    form_topic_label: "Bạn quan tâm đến chủ đề gì?",
    topic_be: "💼 Tuyển dụng Backend",
    topic_ai: "🤖 Tuyển dụng AI Intern",
    topic_collab: "🤝 Hợp tác dự án",
    topic_other: "☕ Giao lưu / Khác",
    form_name: "Họ tên: *",
    form_email: "Email: *",
    form_message: "Tin nhắn: *",
    form_name_placeholder: "Nguyễn Văn A",
    form_email_placeholder: "name@company.com",
    form_message_placeholder: "Hãy chia sẻ thông tin về cơ hội việc làm, dự án hoặc lời chào...",
    form_char_counter: "ký tự",
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
    contact_email_tip: "Nhấp để sao chép email (hoangvu2k4cmg@gmail.com)",
    contact_copy_btn: "Sao chép",
    contact_copied_btn: "Đã sao chép!",
    sec_nav_home: "Trang chủ",
    sec_nav_about: "Giới thiệu",
    sec_nav_cv: "Hồ sơ CV",
    sec_nav_projects: "Dự án",
    sec_nav_skills: "Kỹ năng",
    sec_nav_certs: "Chứng chỉ",
    sec_nav_github: "GitHub",
    sec_nav_console: "Console",
    sec_nav_contact: "Liên hệ",
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
    cv_kicker: "Open to Opportunities",
    cv_headline: "Two CVs. One mission.",
    cv_title: "CV",
    cv_subtitle: "Pick the CV version that fits the role you're applying for.",
    cv_updated_be: "Updated Aug 2026",
    cv_updated_ai: "Updated Mar 2026",

    cv_be_title: "Fresher Backend Developer (PDF)",
    cv_be_desc: "Targeted for Backend Developer roles: REST APIs, databases, workflow automation (Jira API/OpenClaw) & clean code.",

    cv_ai_title: "AI Engineer Intern (PDF)",
    cv_ai_desc: "Targeted for AI Engineer Intern roles: ML/DL, NLP (Transformer MT), Computer Vision (OCR) & deployment pipelines.",

    cv_btn_view: "View",
    cv_btn_download: "Download",
    cv_preview_hover: "Preview",
    cv_stat_versions: "2 Specialized Versions",
    cv_stat_roles: "Targeted Roles",
    cv_stat_updated: "Updated 2026",
    cv_badge_primary: "Primary Focus",
    cv_badge_specialized: "Specialized AI",
    cv_downloads_be: "52 downloads",
    cv_downloads_ai: "38 downloads",

    cv_menu_be_title: "Fresher Backend Developer (PDF)",
    cv_menu_be_meta: "TranHoHoangVu_BE.pdf",
    cv_menu_ai_title: "AI Engineer Intern (PDF)",
    cv_menu_ai_meta: "TranHoHoangVu_AI.pdf",

    about_top_kicker: "👤 ABOUT ME • PROFILE",
    about_title: "Engineering Journey & Technical Vision",
    about_subtitle: "A glimpse into my computer science foundation, hands-on engineering experience, and technical focus.",
    about_description:
      "My name is Tran Ho Hoang Vu. I’m a Computer Science graduate from Ton Duc Thang University with hands-on experience in backend development through a software engineering internship and academic projects. I enjoy building practical solutions, from designing RESTful APIs and working with databases to developing automation workflows and processing data. I have worked with Node.js, Express.js, Laravel, and various database technologies. Going forward, I want to strengthen my software engineering skills, gain more real-world experience, and build reliable, maintainable software while continuing to learn and improve.",
    about_kicker: "Backend-focused • Software & AI",
    about_headline: "I build clean backend services and practical, deployable AI pipelines.",
    about_chip_1: "Backend APIs",
    about_chip_2: "Databases",
    about_chip_3: "Applied AI • NLP/CV",
    about_chip_workmode: "💼 On-site • Hybrid • Remote",
    about_status_badge: "Available for Hire",
    about_pillar_edu_title: "Education & Foundation",
    about_pillar_edu_desc: "Computer Science Graduate — Ton Duc Thang University (TDTU). Strong foundation in Data Structures & Algorithms.",
    about_pillar_exp_title: "Hands-on Experience",
    about_pillar_exp_desc: "Software Engineer Intern: designed RESTful APIs, optimized raw PostgreSQL SQL, and automated Jira/OpenClaw workflows.",
    about_pillar_goal_title: "Target Roles",
    about_pillar_goal_desc: "Fresher Backend Developer (Node.js, Express, Laravel) & AI Engineer Intern (PyTorch, Transformers, Computer Vision).",
    about_stat_projects: "Engineered Projects",
    about_stat_repos: "GitHub Repositories",
    about_stat_certs: "Verified Certificates",
    about_stat_ready: "Work Readiness",
    about_cta_cv: "View Resume CV",
    about_cta_contact: "Get in Touch",
    about_stat_1: "AI/ML Projects",
    about_stat_2: "Backend Projects",
    about_stat_3: "Fresher & Intern Ready",

    projects_kicker: "🚀 FEATURED WORK • SHOWCASE",
    projects_headline: "Engineered Projects & Solutions",
    projects_subtitle: "From scalable backend RESTful APIs to practical deployed AI & Machine Learning pipelines.",
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

    skills_kicker: "⚡ CORE EXPERTISE • TECH STACK",
    skills_headline: "Technical Skills & Competencies",
    skills_title: "Skills",
    skills_subtitle: "Click on any badged skill to filter and highlight real-world projects applying that technology.",
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
    certs_kicker: "🏅 2 Certificates • 2024",
    certs_headline: "Certified. Verified. Ready.",
    certs_subtitle: "Credentials validating proficiency in software development methodology and academic English.",
    certs_view: "View certificate →",
    cert_score_label: "Score",
    cert_level_label: "B2 Level Equivalent",
    cert_id_label: "Certificate ID",
    cert_issued_label: "Issued",
    cert_tag_language: "English",
    cert_tag_software: "Agile / Scrum",
    cert_agile_title: "Agile & Scrum Framework 2024",
    cert_agile_desc: "Issued by Techbase Viet Nam at Ton Duc Thang University. Covers Scrum roles, Sprints, Backlog refinement and Agile ceremonies.",
    cert_aptis_title: "Aptis ESOL",
    cert_aptis_desc: "International English proficiency test by British Council assessing all 4 skills: Listening, Speaking, Reading, Writing on the CEFR scale.",

    github_title: "GitHub Activity",
    github_kicker: "📊 GitHub • Auto-updated",
    github_headline: "Commit daily. Learn constantly.",
    github_subtitle: "GitHub activity reflecting continuous learning and real-world project building.",
    github_contrib: "Contributions",
    github_contrib_tip: "Contributions are generated automatically via GitHub GraphQL (Actions) and updated periodically.",
    github_activity: "Activity Graph",
    github_activity_tip: "Commit activity over time (aggregated from GitHub data).",
    github_stat_repos: "Repositories",
    github_stat_stars: "Stars",
    github_stat_langs: "Languages",
    github_stat_updated: "Updated",
    github_profile_link: "View GitHub profile",
    github_profile_handle: "@tranhohoangvu",

    contact_kicker: "💬 GET IN TOUCH • CONNECT NOW",
    contact_headline: "Let's build something remarkable.",
    contact_subtitle: "Open to Fresher Backend Developer and AI Engineer Intern opportunities, freelance projects, or tech chats.",
    contact_avail_badge: "Available for Hire",
    contact_avail_roles: "Fresher Backend • AI Engineer Intern",
    contact_location: "Ho Chi Minh City, Vietnam (UTC+7)",
    contact_work_mode: "On-site • Hybrid • Remote",
    contact_response_time: "Fast response within 24 hours",
    contact_badge_fastest: "Fastest",
    contact_badge_primary: "Preferred",
    contact_title: "Contact",
    contact_intro: "Feel free to reach out via email or these platforms:",
    connect_title: "Let’s connect!",
    form_topic_label: "What is your primary interest?",
    topic_be: "💼 Backend Hiring",
    topic_ai: "🤖 AI Intern Hiring",
    topic_collab: "🤝 Project Collaboration",
    topic_other: "☕ Quick Chat / Other",
    form_name: "Full name: *",
    form_email: "Email: *",
    form_message: "Message: *",
    form_name_placeholder: "John Doe",
    form_email_placeholder: "name@company.com",
    form_message_placeholder: "Tell me about your job opportunity, project, or just say hello...",
    form_char_counter: "chars",
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
    contact_email_tip: "Click to copy email (hoangvu2k4cmg@gmail.com)",
    contact_copy_btn: "Copy",
    contact_copied_btn: "Copied!",
    sec_nav_home: "Home",
    sec_nav_about: "About",
    sec_nav_cv: "CV Resume",
    sec_nav_projects: "Projects",
    sec_nav_skills: "Skills",
    sec_nav_certs: "Certificates",
    sec_nav_github: "GitHub",
    sec_nav_console: "Console",
    sec_nav_contact: "Contact",
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
  window.refreshSectionNavLang?.();
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
const mobileMenuToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("icon-menu");
const menuCloseIcon = document.getElementById("icon-close");

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

  // Cache navbarHeight và chỉ cập nhật khi resize (tránh forced reflow mỗi scroll)
  let cachedNavOffset = navbarEl ? navbarEl.offsetHeight + 16 : 80;
  window.addEventListener("resize", () => {
    cachedNavOffset = navbarEl ? navbarEl.offsetHeight + 16 : 80;
  }, { passive: true });
  const getOffset = () => cachedNavOffset;

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
// Navbar Scroll Effect (throttled via rAF)
// =======================
(function () {
  let _navTicking = false;
  window.addEventListener("scroll", () => {
    if (_navTicking) return;
    _navTicking = true;
    requestAnimationFrame(() => {
      updateNavbarBackground();
      _navTicking = false;
    });
  }, { passive: true });
})();

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

  // Throttle bằng rAF để không chặn scroll
  let _btTicking = false;
  window.addEventListener("scroll", () => {
    if (_btTicking) return;
    _btTicking = true;
    requestAnimationFrame(() => {
      toggleBackToTop();
      _btTicking = false;
    });
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// Form Submission & Interactive Contact (localized)
// =======================
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const contactSubject = document.getElementById("contact-subject");
const topicChips = document.querySelectorAll(".contact-topic-chip");
const messageTextarea = document.getElementById("message");
const charCountSpan = document.getElementById("message-char-count");

// 1. Topic Chips Selection
if (topicChips.length > 0 && contactSubject) {
  topicChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      topicChips.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-checked", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-checked", "true");
      const val = chip.getAttribute("data-topic-val") || chip.textContent.trim();
      contactSubject.value = val;
    });
  });
}

// 2. Character Counter
if (messageTextarea && charCountSpan) {
  const updateCharCount = () => {
    const len = messageTextarea.value.length;
    charCountSpan.textContent = len;
    if (len > 500) {
      charCountSpan.classList.add("text-rose-500", "font-bold");
    } else {
      charCountSpan.classList.remove("text-rose-500", "font-bold");
    }
  };
  messageTextarea.addEventListener("input", updateCharCount);
}

// 3. Form Submit with Loading Spinner & Plane Animation
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
        `<svg class="w-5 h-5 animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
         </svg>
         <span class="relative z-10">${t("form_btn_sending")}</span>
         <span class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 animate-pulse"></span>`;
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
        if (charCountSpan) charCountSpan.textContent = "0";
        // Reset topic chip to default
        if (topicChips.length > 0 && contactSubject) {
          topicChips.forEach((c, idx) => {
            if (idx === 0) {
              c.classList.add("is-active");
              c.setAttribute("aria-checked", "true");
              contactSubject.value = c.getAttribute("data-topic-val") || c.textContent.trim();
            } else {
              c.classList.remove("is-active");
              c.setAttribute("aria-checked", "false");
            }
          });
        }
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
          `<svg class="w-5 h-5 relative z-10 btn-send-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
             <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
           </svg>
           <span class="relative z-10" data-i18n="form_send_btn">${t("form_send_btn")}</span>
           <span class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>`;
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

  const d = document.documentElement;
  // Cache scrollHeight - chỉ đọc lại khi resize (tránh reflow mỗi scroll)
  let _maxScroll = d.scrollHeight - d.clientHeight;
  window.addEventListener("resize", () => {
    _maxScroll = d.scrollHeight - d.clientHeight;
  }, { passive: true });

  let _progTicking = false;
  const update = () => {
    if (_progTicking) return;
    _progTicking = true;
    requestAnimationFrame(() => {
      const p = _maxScroll > 0 ? d.scrollTop / _maxScroll : 0;
      progress.style.transform = `scaleX(${p})`;
      _progTicking = false;
    });
  };

  window.addEventListener("scroll", update, { passive: true });
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

// =======================
// Profile Avatar Click-to-Flip (Mobile & Desktop)
// =======================
function initProfileFlip() {
  const profileFlip = document.querySelector(".profile-flip");
  if (!profileFlip) return;

  profileFlip.addEventListener("click", () => {
    profileFlip.classList.toggle("is-flipped");
  });
  profileFlip.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      profileFlip.classList.toggle("is-flipped");
    }
  });
}

// =======================
// Cert Score Bar Animation (Aptis ESOL progress fill)
// =======================
function initCertScoreAnimation() {
  const bar = document.getElementById("aptis-score-bar");
  if (!bar) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) {
    bar.style.width = "67.5%";
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Small delay for visual polish
          setTimeout(() => { bar.style.width = "67.5%"; }, 150);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(bar.closest(".cert-score-block") || bar);
}

// ==========================================================================
// 1-Click Copy Email to Clipboard Feature
// Enables instant copy when clicking on Email in Contact section, About section,
// or any mailto link, with rich visual feedback & toast notification.
// ==========================================================================
function initEmailCopyActions() {
  const EMAIL_ADDRESS = "hoangvu2k4cmg@gmail.com";

  async function copyText(text) {
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch (err) {
      // Fallback below
    }

    if (!copied) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        ta.style.top = "0";
        ta.setAttribute("readonly", "");
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        copied = document.execCommand("copy");
        ta.remove();
      } catch (fallbackErr) {
        copied = false;
      }
    }
    return copied;
  }

  function triggerToast(opts) {
    if (typeof window.showToast === "function") {
      window.showToast(opts);
    }
  }

  // 1. Contact Section Email Card
  const contactEmailCard = document.getElementById("contact-email-link") ||
    document.querySelector('.contact-link-card[href^="mailto:"]');

  let contactResetTimer = null;

  if (contactEmailCard) {
    contactEmailCard.addEventListener("click", async (e) => {
      // If user deliberately holds Ctrl/Cmd, allow opening external mail client
      if (e.ctrlKey || e.metaKey) return;

      e.preventDefault();
      const emailToCopy = contactEmailCard.getAttribute("data-email") || EMAIL_ADDRESS;
      const copied = await copyText(emailToCopy);

      if (copied) {
        contactEmailCard.classList.add("is-copied");
        const badgeText = contactEmailCard.querySelector(".contact-link-badge-text");
        const copyIcon = contactEmailCard.querySelector(".contact-copy-icon");
        const checkIcon = contactEmailCard.querySelector(".contact-check-icon");

        if (badgeText) badgeText.textContent = t("contact_copied_btn");
        if (copyIcon) copyIcon.classList.add("hidden");
        if (checkIcon) checkIcon.classList.remove("hidden");

        if (contactResetTimer) clearTimeout(contactResetTimer);
        contactResetTimer = setTimeout(() => {
          contactEmailCard.classList.remove("is-copied");
          if (badgeText) badgeText.textContent = t("contact_copy_btn");
          if (copyIcon) copyIcon.classList.remove("hidden");
          if (checkIcon) checkIcon.classList.add("hidden");
        }, 2500);

        triggerToast({
          message: t("toast_email_copied"),
          type: "success",
          duration: 3500,
        });
      } else {
        triggerToast({
          message: t("toast_email_copy_err"),
          type: "error",
          duration: 3500,
        });
      }
    });

    // Support Spacebar click when focused for keyboard accessibility
    contactEmailCard.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        contactEmailCard.click();
      }
    });
  }

  // 2. About Section Social Email Button
  const aboutEmailBtn = document.getElementById("about-email-btn") ||
    document.querySelector(".social-btn.is-mail");

  let aboutResetTimer = null;

  if (aboutEmailBtn) {
    aboutEmailBtn.addEventListener("click", async (e) => {
      if (e.ctrlKey || e.metaKey) return;

      e.preventDefault();
      const emailToCopy = aboutEmailBtn.getAttribute("data-email") || EMAIL_ADDRESS;
      const copied = await copyText(emailToCopy);

      if (copied) {
        aboutEmailBtn.classList.add("is-copied");
        const defaultIcon = aboutEmailBtn.querySelector(".mail-default-icon");
        const checkIcon = aboutEmailBtn.querySelector(".mail-check-icon");

        if (defaultIcon) defaultIcon.classList.add("hidden");
        if (checkIcon) checkIcon.classList.remove("hidden");

        if (aboutResetTimer) clearTimeout(aboutResetTimer);
        aboutResetTimer = setTimeout(() => {
          aboutEmailBtn.classList.remove("is-copied");
          if (defaultIcon) defaultIcon.classList.remove("hidden");
          if (checkIcon) checkIcon.classList.add("hidden");
        }, 2500);

        triggerToast({
          message: t("toast_email_copied"),
          type: "success",
          duration: 3500,
        });
      } else {
        triggerToast({
          message: t("toast_email_copy_err"),
          type: "error",
          duration: 3500,
        });
      }
    });

    aboutEmailBtn.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        aboutEmailBtn.click();
      }
    });
  }

  // 3. Delegate click on any other mailto links (e.g. inside Terminal output)
  document.addEventListener("click", async (e) => {
    const mailLink = e.target.closest('a[href^="mailto:"]');
    if (!mailLink) return;
    if (mailLink === contactEmailCard || mailLink === aboutEmailBtn) return;
    if (e.ctrlKey || e.metaKey) return;

    e.preventDefault();
    const rawHref = mailLink.getAttribute("href") || "";
    const emailToCopy = rawHref.replace(/^mailto:/i, "").split("?")[0] || EMAIL_ADDRESS;
    const copied = await copyText(emailToCopy);

    if (copied) {
      triggerToast({
        message: t("toast_email_copied"),
        type: "success",
        duration: 3500,
      });
    }
  });
}
window.initEmailCopyActions = initEmailCopyActions;

// ==========================================================================
// Interactive CV View & Download Counters with LocalStorage Persistence
// ==========================================================================
function initCvDownloadCounter() {
  const BASE_DOWNLOADS = { be: 52, ai: 38 };
  const BASE_VIEWS = { be: 128, ai: 95 };

  // Load Download counts
  let storedDownloads = null;
  try {
    const raw = localStorage.getItem("cv_download_counts");
    if (raw) storedDownloads = JSON.parse(raw);
  } catch (e) {
    storedDownloads = null;
  }
  if (!storedDownloads || typeof storedDownloads !== "object") {
    storedDownloads = { ...BASE_DOWNLOADS };
    try {
      localStorage.setItem("cv_download_counts", JSON.stringify(storedDownloads));
    } catch (e) {}
  }

  // Load View counts
  let storedViews = null;
  try {
    const rawViews = localStorage.getItem("cv_view_counts");
    if (rawViews) storedViews = JSON.parse(rawViews);
  } catch (e) {
    storedViews = null;
  }
  if (!storedViews || typeof storedViews !== "object") {
    storedViews = { ...BASE_VIEWS };
    try {
      localStorage.setItem("cv_view_counts", JSON.stringify(storedViews));
    } catch (e) {}
  }

  // Update DOM displays
  function updateDisplays() {
    const beDlEl = document.getElementById("cv-dl-count-be");
    const aiDlEl = document.getElementById("cv-dl-count-ai");
    if (beDlEl && storedDownloads.be != null) beDlEl.textContent = storedDownloads.be;
    if (aiDlEl && storedDownloads.ai != null) aiDlEl.textContent = storedDownloads.ai;

    const beViewEl = document.getElementById("cv-view-count-be");
    const aiViewEl = document.getElementById("cv-view-count-ai");
    if (beViewEl && storedViews.be != null) beViewEl.textContent = storedViews.be;
    if (aiViewEl && storedViews.ai != null) aiViewEl.textContent = storedViews.ai;
  }

  updateDisplays();

  // Attach click listeners to download buttons
  document.querySelectorAll(".cv-download-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-cv-type");
      if (type && storedDownloads[type] != null) {
        storedDownloads[type] += 1;
        try {
          localStorage.setItem("cv_download_counts", JSON.stringify(storedDownloads));
        } catch (e) {}
        updateDisplays();

        if (typeof triggerToast === "function") {
          const roleName = type === "be" ? "Fresher Backend" : "AI Engineer";
          triggerToast({
            message: `Đang tải CV ${roleName}...`,
            type: "success",
            duration: 2500,
          });
        }
      }
    });
  });

  // Attach click listeners to view buttons & preview thumbnail links
  document.querySelectorAll(".cv-view-btn, .cv-preview-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      let type = btn.getAttribute("data-cv-type");
      if (!type) {
        const href = btn.getAttribute("href") || "";
        if (href.includes("BE")) type = "be";
        else if (href.includes("AI")) type = "ai";
      }
      if (type && storedViews[type] != null) {
        storedViews[type] += 1;
        try {
          localStorage.setItem("cv_view_counts", JSON.stringify(storedViews));
        } catch (e) {}
        updateDisplays();
      }
    });
  });
}
window.initCvDownloadCounter = initCvDownloadCounter;

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
  window.initSectionNav?.();
  initEmailCopyActions?.();
  initHeroInteractions?.();
  initCounterAnimations?.();
  initProfileFlip?.();
  initCvDownloadCounter?.();
  initCertScoreAnimation?.();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAppModules);
} else {
  initAppModules();
}
