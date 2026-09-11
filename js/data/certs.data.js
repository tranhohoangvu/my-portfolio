// ==========================================================================
// Certificate Data Module (Single Source of Truth)
// Extracted from inline HTML to reduce index.html payload by ~35 KB.
// Rendered at runtime by renderCertCards() after DOM is ready.
// ==========================================================================
(function () {

  // SVG icon markup for each issuer
  var ISSUER_ICONS = {
    microsoft: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg>',
    linux: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 3H21V15H16V8H3V3Z" fill="currentColor" class="text-slate-800 dark:text-white"/><path d="M3 9H8V16H16V21H3V9Z" fill="#0099E5"/></svg>',
    google: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27A7.18 7.18 0 014.9 12c0-.79.14-1.57.38-2.27V6.58H1.25A11.96 11.96 0 000 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>',
    gemini: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24Z" fill="url(#geminiGradShared)"/><defs><linearGradient id="geminiGradShared" x1="0" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse"><stop stop-color="#1BA1E3"/><stop offset="0.34" stop-color="#548BF4"/><stop offset="0.68" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/></linearGradient></defs></svg>',
    deeplearning: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#EE4C2C" stroke-width="2.2"/><circle cx="12" cy="12" r="6.2" stroke="#EE4C2C" stroke-width="2.2"/><circle cx="12" cy="12" r="2.5" fill="#EE4C2C"/></svg>',
    agile: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2.5L20.5 9.5V14.5L12 7.5L3.5 14.5V9.5L12 2.5Z" fill="#E52E25"/><path d="M12 10L20.5 17V22L12 15L3.5 22V17L12 10Z" fill="#E52E25"/></svg>',
    language: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="6.5" cy="6.5" r="4.2"/><circle cx="17.5" cy="6.5" r="4.2"/><circle cx="6.5" cy="17.5" r="4.2"/><circle cx="17.5" cy="17.5" r="4.2"/></svg>',
  };

  // Shared SVG icons for card sub-elements
  var SVG = {
    home: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    calendar: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    badge: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>',
    pdf: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    external: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    email: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4c-1.1 0-2-.9-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    lock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-cyan-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
  };

  // Certificate data array — extracted from inline HTML
  window.CERTS_DATA = [
    {
      id: "cert-microsoft", category: "ai", issuerKey: "microsoft",
      issuerLabel: "Microsoft \u2022 Coursera",
      titleI18n: "cert_ms_title", tagI18n: "cert_tag_ms_ai", tagClass: "microsoft",
      descI18n: "cert_ms_desc",
      skills: [
        { label: "Copilot", cls: "microsoft" }, { label: "Azure AI", cls: "microsoft" },
        { label: "Power BI", cls: "microsoft" }, { label: "Product Strategy", cls: "microsoft" },
        { label: "UX/UI Design", cls: "microsoft" },
      ],
      date: "01/2026", certId: "Y1B76ZTZXTCN",
      pdfFile: "assets/certificates/TranHoHoangVu_Microsoft_AI_Product_Manager.pdf",
      pdfLabelI18n: "certs_view_pdf", viewBtnClass: "microsoft",
      verifyUrl: "https://coursera.org/verify/professional-cert/Y1B76ZTZXTCN", verifyHost: "Coursera",
    },
    {
      id: "cert-linux", category: "software", issuerKey: "linux",
      issuerLabel: "The Linux Foundation",
      titleI18n: "cert_linux_title", tagI18n: "cert_tag_linux", tagClass: "linux",
      descI18n: "cert_linux_desc",
      skills: [
        { label: "Linux CLI", cls: "linux" }, { label: "Bash Scripting", cls: "linux" },
        { label: "System Administration", cls: "linux" }, { label: "File Systems", cls: "linux" },
        { label: "Open Source", cls: "linux" },
      ],
      date: "01/2026", certId: "LF-0korv3z00s",
      pdfFile: "assets/certificates/TranHoHoangVu_Linux_Foundation_LFS101.pdf",
      pdfLabelI18n: "certs_view_pdf", viewBtnClass: "linux",
      verifyUrl: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/dc762e77-b6cb-4eee-aa23-b50aa5972e53-vu-tran-ho-hoang-b4bad79c-ac9f-4eac-83b5-405ef7710018-certificate.pdf",
      verifyHost: "The Linux Foundation",
    },
    {
      id: "cert-google", category: "data", issuerKey: "google",
      issuerLabel: "Google \u2022 Coursera",
      titleI18n: "cert_google_title", tagI18n: "cert_tag_data", tagClass: "google",
      descI18n: "cert_google_desc",
      skills: [
        { label: "SQL" }, { label: "R Programming" }, { label: "Tableau" },
        { label: "Spreadsheets" }, { label: "Data Cleaning" },
      ],
      date: "01/2026", certId: "2256GOEWHB2O",
      pdfFile: "assets/certificates/TranHoHoangVu_Google_Data_Analytics.pdf",
      pdfLabelI18n: "certs_view_pdf", viewBtnClass: "google",
      verifyUrl: "https://coursera.org/verify/professional-cert/2256GOEWHB2O", verifyHost: "Coursera",
    },
    {
      id: "cert-gemini-educator", category: "ai", issuerKey: "gemini",
      issuerLabel: "Google for Education",
      titleI18n: "cert_gemini_educator_title", tagI18n: "cert_tag_gemini", tagClass: "gemini",
      descI18n: "cert_gemini_educator_desc",
      skills: [
        { label: "Gemini AI", cls: "gemini" }, { label: "Google AI", cls: "gemini" },
        { label: "AI in Education", cls: "gemini" }, { label: "Prompt Engineering", cls: "gemini" },
        { label: "Instructional AI", cls: "gemini" },
      ],
      date: "01/2026", certId: "QwBRzFdp",
      pdfFile: "assets/certificates/TranHoHoangVu_Google_Gemini_Certified_Educator.pdf",
      pdfLabelI18n: "certs_view_pdf", viewBtnClass: "gemini",
      verifyUrl: "https://edu.google.accredible.com/6a00f1fb-442c-423c-ac04-556950bbe4d0#acc.QwBRzFdp",
      verifyHost: "Google Accredible",
    },
    {
      id: "cert-gemini-student", category: "ai", issuerKey: "gemini",
      issuerLabel: "Google for Education",
      titleI18n: "cert_gemini_title", tagI18n: "cert_tag_gemini", tagClass: "gemini",
      descI18n: "cert_gemini_desc",
      skills: [
        { label: "Gemini AI", cls: "gemini" }, { label: "Google AI", cls: "gemini" },
        { label: "Prompt Engineering", cls: "gemini" }, { label: "Generative AI", cls: "gemini" },
        { label: "LLMs", cls: "gemini" },
      ],
      date: "01/2026", certId: "DwFyn4bH",
      pdfFile: "assets/certificates/TranHoHoangVu_Google_Gemini_Certified_Student.pdf",
      pdfLabelI18n: "certs_view_pdf", viewBtnClass: "gemini",
      verifyUrl: "https://edu.google.accredible.com/3d729d76-cba3-4376-8e5f-2bd6e53fd276#acc.DwFyn4bH",
      verifyHost: "Google Accredible",
    },
    {
      id: "cert-tensorflow", category: "ai", issuerKey: "deeplearning",
      issuerLabel: "DeepLearning.AI \u2022 Coursera",
      titleI18n: "cert_tf_title", tagI18n: "cert_tag_ai", tagClass: "deeplearning",
      descI18n: "cert_tf_desc",
      skills: [
        { label: "TensorFlow", cls: "deeplearning" }, { label: "Deep Learning", cls: "deeplearning" },
        { label: "CNN", cls: "deeplearning" }, { label: "NLP", cls: "deeplearning" },
        { label: "Time Series", cls: "deeplearning" },
      ],
      date: "01/2026", certId: "7VU0Y6P2472Z",
      pdfFile: "assets/certificates/TranHoHoangVu_DeepLearning_TensorFlow.pdf",
      pdfLabelI18n: "certs_view_pdf", viewBtnClass: "deeplearning",
      verifyUrl: "https://coursera.org/verify/professional-cert/7VU0Y6P2472Z", verifyHost: "Coursera",
    },
    {
      id: "cert-agile", category: "software", issuerKey: "agile",
      issuerLabel: "Techbase Viet Nam",
      titleI18n: "cert_agile_title", tagI18n: "cert_tag_software", tagClass: "agile",
      descI18n: "cert_agile_desc",
      skills: [
        { label: "Scrum Roles", cls: "agile" }, { label: "Sprints", cls: "agile" },
        { label: "Backlog Refinement", cls: "agile" }, { label: "Agile Ceremonies", cls: "agile" },
      ],
      date: "10/2024", certId: null,
      pdfFile: "assets/certificates/TranHoHoangVu_Techbase_Agile.pdf",
      pdfLabelI18n: "certs_view_agile", viewBtnClass: "agile",
      verifyUrl: null,
      requestOriginalBtnId: "btn-request-agile-cert",
    },
    {
      id: "cert-aptis", category: "language", issuerKey: "language",
      issuerLabel: "British Council",
      titleI18n: "cert_aptis_title", tagI18n: "cert_tag_language", tagClass: "language",
      descI18n: "cert_aptis_desc",
      skills: [],
      date: "04/2024", certId: "ESOL\u00a00155613",
      pdfFile: "assets/certificates/TranHoHoangVu_Aptis_ESOL_Redacted.pdf",
      pdfLabelI18n: "certs_view_redacted", viewBtnClass: "language",
      verifyUrl: null,
      scoreBar: { score: "135", max: "200", levelI18n: "cert_level_label" },
      privacyNoteI18n: "cert_privacy_note",
      requestOriginalBtnId: "btn-request-aptis-original",
    },
  ];

  // ---- Render Engine --------------------------------------------------------

  function buildCertCard(cert) {
    var icon = ISSUER_ICONS[cert.issuerKey] || "";

    var skills = cert.skills.map(function(s) {
      var cls = s.cls ? " cert-skill-chip--" + s.cls : "";
      return '<span class="cert-skill-chip' + cls + '">' + s.label + "</span>";
    }).join("");

    var dateChip = '<div class="cert-date-chip">' + SVG.calendar +
      '<span data-i18n="cert_issued_label">C\u1ea5p th\u00e1ng</span>&nbsp;' + cert.date + "</div>";

    var idBadge = cert.certId ? '<div class="cert-id-badge">' + SVG.badge +
      '<span class="cert-id-badge__label" data-i18n="cert_id_label">M\u00e3 ch\u1ee9ng ch\u1ec9</span>:&nbsp;<span class="cert-id-badge__value">' + cert.certId + "</span></div>" : "";

    var scoreBarHtml = "";
    if (cert.scoreBar) {
      scoreBarHtml = '<div class="cert-score-block" role="img" aria-label="Di\u1ec3m Aptis ESOL: ' + cert.scoreBar.score + ' tr\u00ean ' + cert.scoreBar.max + '">' +
        '<div class="cert-score-block__header">' +
          '<span class="cert-score-block__label" data-i18n="cert_score_label">Di\u1ec3m</span>' +
          '<span class="cert-score-block__value">' + cert.scoreBar.score + ' <span style="font-size:.75rem;font-weight:500;opacity:.65">/ ' + cert.scoreBar.max + "</span></span>" +
        "</div>" +
        '<div class="cert-score-track"><div class="cert-score-fill" id="aptis-score-bar"></div></div>' +
        '<span class="cert-score-block__sub" data-i18n="' + cert.scoreBar.levelI18n + '">Overall CEFR level: B1</span>' +
        "</div>";
    }

    var privacyNoteHtml = cert.privacyNoteI18n ? '<div class="cert-privacy-note">' + SVG.lock +
      '<span data-i18n="' + cert.privacyNoteI18n + '">B\u1ea3n online \u0111\u00e3 che th\u00f4ng tin nh\u1ea1y c\u1ea3m (CCCD, QR). Nh\u1ea5n "Y\u00eau c\u1ea7u b\u1ea3n g\u1ed1c" \u0111\u1ec3 nh\u1eadn b\u1ea3n \u0111\u1ea7y \u0111\u1ee7.</span></div>' : "";

    var verifyBtn = cert.verifyUrl ? '<a href="' + cert.verifyUrl + '" target="_blank" rel="noopener noreferrer" class="cert-verify-btn" title="X\u00e1c minh ch\u1ee9ng ch\u1ec9 tr\u00ean ' + cert.verifyHost + '">' +
      SVG.external + '<span data-i18n="certs_show_credential">Xem ch\u1ee9ng ch\u1ec9 g\u1ed1c \u2197</span></a>' : "";

    var requestBtn = cert.requestOriginalBtnId ? '<button type="button" class="cert-request-btn" id="' + cert.requestOriginalBtnId + '" title="G\u1eedi y\u00eau c\u1ea7u b\u1ea3n g\u1ed1c \u0111\u1ed1i chi\u1ebfu">' +
      SVG.email + '<span data-i18n="certs_request_original">Y\u00eau c\u1ea7u b\u1ea3n g\u1ed1c</span></button>' : "";

    return '<article class="cert-card-v2" id="' + cert.id + '" data-cert-category="' + cert.category + '">' +
      '<div class="cert-card-v2__toprow">' +
        '<div class="cert-issuer-icon cert-issuer-icon--' + cert.issuerKey + '" aria-hidden="true">' + icon + "</div>" +
        '<div class="cert-card-v2__meta">' +
          '<h3 class="cert-card-v2__title" data-i18n="' + cert.titleI18n + '">Loading\u2026</h3>' +
          '<p class="cert-card-v2__issuer">' + SVG.home + " " + cert.issuerLabel + "</p>" +
        "</div>" +
        '<span class="cert-card-v2__tag cert-card-v2__tag--' + cert.tagClass + '" data-i18n="' + cert.tagI18n + '">Tag</span>' +
      "</div>" +
      '<p class="cert-card-v2__desc" data-i18n="' + cert.descI18n + '">Loading\u2026</p>' +
      (cert.skills.length ? '<div class="cert-skills-chips">' + skills + "</div>" : "") +
      scoreBarHtml +
      '<div class="cert-badges-row">' + dateChip + idBadge + "</div>" +
      privacyNoteHtml +
      '<div class="cert-card-v2__footer">' +
        '<a href="' + cert.pdfFile + '" target="_blank" rel="noopener noreferrer" class="cert-view-btn cert-view-btn--' + cert.viewBtnClass + '" title="Xem ch\u1ee9ng ch\u1ec9 (PDF)">' +
          SVG.pdf + '<span data-i18n="' + cert.pdfLabelI18n + '">Xem b\u1ea3n PDF \u2192</span>' +
        "</a>" +
        verifyBtn + requestBtn +
      "</div>" +
    "</article>";
  }

  function renderCertCards() {
    var grid = document.getElementById("cert-grid-v2-mount");
    if (!grid) return;

    grid.innerHTML = window.CERTS_DATA.map(buildCertCard).join("");

    // Re-apply i18n translations to newly-rendered nodes
    if (typeof window.applyI18n === "function") {
      window.applyI18n(grid);
    }
  }

  window.renderCertCards = renderCertCards;

})();
