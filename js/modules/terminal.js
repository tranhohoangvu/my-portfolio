/**
 * Interactive Terminal & REST API Console Widget Module
 * Quản lý giao diện giả lập Linux CLI Shell & RESTful API Explorer.
 */
(function () {
  "use strict";

  function getCurrentLanguage() {
    if (typeof window.getCurrentLang === "function") {
      return window.getCurrentLang();
    }
    return window.currentLang || document.documentElement.getAttribute("lang") || "vi";
  }

  function translate(key) {
    if (typeof window.t === "function") {
      return window.t(key);
    }
    return key;
  }

  function getProjectsData() {
    return window.PROJECTS_DATA || {};
  }

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

  // ==========================================================================
  // Interactive Terminal & REST API Console Widget
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

    // Mock API Endpoints Data Generator
    function getMockApiData(endpoint, method = "GET") {
      const isEn = getCurrentLanguage() === "en";
      const cleanUrl = endpoint.split("?")[0].trim();
      const query = endpoint.includes("?") ? endpoint.split("?")[1] : "";
      const projectsData = getProjectsData();

      if (cleanUrl === "/api/v1/profile") {
        return {
          developer: {
            name: "Trần Hồ Hoàng Vũ",
            role: "Fresher Backend Developer & AI Engineer",
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
        const projectList = (window.PROJECTS_DATA && window.PROJECTS_DATA.list) || Object.values(projectsData);
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
      const isEn = getCurrentLanguage() === "en";
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
      const isEn = getCurrentLanguage() === "en";
      let normalized = trimmed.toLowerCase();
      if (normalized.startsWith("vu ")) {
        normalized = normalized.slice(3).trim();
      }

      const projectsData = getProjectsData();

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
        if (idMatch && projectsData[idMatch[1]]) {
          const pId = idMatch[1];
          const p = projectsData[pId];
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

          let projectsList = Object.keys(projectsData);
          if (filterCat === "backend") {
            projectsList = projectsList.filter((id) => ["coursehub", "ecommerce", "warehouse", "pos"].includes(id));
          } else if (filterCat === "ai") {
            projectsList = projectsList.filter((id) => ["vietnamese-ocr", "nlp-translation", "stock-ml"].includes(id));
          }

          let cardsHtml = projectsList
            .map((id) => {
              const item = projectsData[id];
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
      <a href="assets/cv/TranHoHoangVu_BE.pdf" target="_blank" rel="noopener noreferrer" class="term-link font-semibold text-xs py-1 px-3 rounded bg-indigo-500/20 border border-indigo-500/30">
        ${isEn ? "View / Download →" : "Xem / Tải file →"}
      </a>
    </div>
    <div class="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
      <div>
        <div class="font-bold text-slate-200">2. AI Engineer Intern (PDF)</div>
        <div class="text-xs term-dim">PyTorch, Transformer Decoder OCR, RLHF PPO, Time-Series ML</div>
      </div>
      <a href="assets/cv/TranHoHoangVu_AI.pdf" target="_blank" rel="noopener noreferrer" class="term-link font-semibold text-xs py-1 px-3 rounded bg-cyan-500/20 border border-cyan-500/30">
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
          if (window.applyTheme) window.applyTheme("dark", true);
          responseEl.innerHTML = `<span class="term-success">✔ Theme set to DARK mode.</span>`;
        } else if (sub === "light") {
          if (window.applyTheme) window.applyTheme("light", true);
          responseEl.innerHTML = `<span class="term-success">✔ Theme set to LIGHT mode.</span>`;
        } else {
          if (window.toggleTheme) window.toggleTheme();
          const cur = document.documentElement.classList.contains("dark") ? "DARK" : "LIGHT";
          responseEl.innerHTML = `<span class="term-success">✔ Toggled theme to ${cur} mode.</span>`;
        }
      } else if (normalized.startsWith("lang")) {
        const parts = normalized.split(/\s+/);
        const sub = parts[1] || "toggle";
        if (sub === "en") {
          if (window.applyLanguage) window.applyLanguage("en", true);
          responseEl.innerHTML = `<span class="term-success">✔ Language switched to English.</span>`;
        } else if (sub === "vi") {
          if (window.applyLanguage) window.applyLanguage("vi", true);
          responseEl.innerHTML = `<span class="term-success">✔ Ngôn ngữ đã chuyển sang Tiếng Việt.</span>`;
        } else {
          const nextLang = getCurrentLanguage() === "vi" ? "en" : "vi";
          if (window.applyLanguage) window.applyLanguage(nextLang, true);
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
          if (typeof window.showToast === "function") {
            window.showToast({
              message: translate("toast_terminal_copied"),
              type: "success",
              duration: 3000
            });
          }
        } catch (e) {
          if (typeof window.showToast === "function") {
            window.showToast({
              message: "Unable to copy output.",
              type: "error"
            });
          }
        }
      });
    }

    // REST API Explorer Handlers
    function sendApiRequest() {
      const endpoint = apiEndpointSelect.value;
      const isPost = endpoint.includes("contact");
      const isEn = getCurrentLanguage() === "en";

      // UI loading state
      const spinner = apiSendBtn.querySelector(".api-btn-spinner");
      const btnText = apiSendBtn.querySelector(".api-btn-text");
      if (spinner) spinner.classList.remove("hidden");
      if (btnText) btnText.textContent = isEn ? "Sending..." : "Đang gửi...";
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
        if (btnText) btnText.textContent = translate("api_btn_send");
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
          if (typeof window.showToast === "function") {
            window.showToast({
              message: translate("toast_json_copied"),
              type: "success",
              duration: 3000
            });
          }
        } catch (e) {
          if (typeof window.showToast === "function") {
            window.showToast({
              message: "Failed to copy JSON.",
              type: "error"
            });
          }
        }
      });
    }

    // Hook for language switch to refresh placeholder or initial MOTD
    window.refreshTerminalLang = () => {
      const isEn = getCurrentLanguage() === "en";
      if (cliInput) {
        cliInput.placeholder = isEn ? "Type a command (e.g. vu --help) or press Tab..." : "Gõ lệnh (ví dụ: vu --help) hoặc bấm Tab để gợi ý...";
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

  // Export to window
  window.initTerminalConsole = initTerminalConsole;
})();
