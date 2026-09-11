// ==========================================================================
// I18N Localization & Language Switching Module
// ==========================================================================
(function () {
  const I18N = window.I18N_DATA || {};

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
    const pack = I18N[currentLang] || I18N.vi || {};
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
    window.refreshCertsFilterContent?.();
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
  document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("lang-toggle");
    const langToggleMobile = document.getElementById("lang-toggle-mobile");

    if (langToggle) langToggle.addEventListener("click", toggleLanguage);
    if (langToggleMobile) langToggleMobile.addEventListener("click", toggleLanguage);
  });
})();
