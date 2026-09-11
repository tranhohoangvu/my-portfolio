// ==========================================================================
// UI Micro-Interactions, Counters & Motion Animations
// ==========================================================================
(function () {
  // 1. Hero Mouse Glow Effect
  function initHeroInteractions() {
    const hero = document.getElementById("home");
    if (!hero) return;

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

  // 2. Statistics Counter Increment Animation
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

  // 3. Profile Avatar Click-to-Flip
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

  // 4. CV Download & View Counter with LocalStorage
  function initCvDownloadCounter() {
    const BASE_DOWNLOADS = { be: 52, ai: 38 };
    const BASE_VIEWS = { be: 128, ai: 95 };

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

    document.querySelectorAll(".cv-download-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-cv-type");
        if (type && storedDownloads[type] != null) {
          storedDownloads[type] += 1;
          try {
            localStorage.setItem("cv_download_counts", JSON.stringify(storedDownloads));
          } catch (e) {}
          updateDisplays();

          if (typeof window.showToast === "function") {
            const roleName = type === "be" ? "Fresher Backend" : "AI Engineer";
            window.showToast({
              message: `Đang tải CV ${roleName}...`,
              type: "success",
              duration: 2500,
            });
          }
        }
      });
    });

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

  // 5. CV Dropdown Menu
  function initCvDropdown() {
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

    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });
  }

  // 6. Scroll Progress Bar
  function initScrollProgressBar() {
    const progress = document.getElementById("scroll-progress");
    if (!progress) return;

    const d = document.documentElement;
    let maxScroll = d.scrollHeight - d.clientHeight;
    window.addEventListener("resize", () => {
      maxScroll = d.scrollHeight - d.clientHeight;
    }, { passive: true });

    let progTicking = false;
    const update = () => {
      if (progTicking) return;
      progTicking = true;
      requestAnimationFrame(() => {
        const p = maxScroll > 0 ? d.scrollTop / maxScroll : 0;
        progress.style.transform = `scaleX(${p})`;
        progTicking = false;
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // 7. Hero Typewriter Animation
  function initHeroTypewriter() {
    const el = document.getElementById("heroTypewriter");
    if (!el) return;

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
      const text = (el.textContent || "").trim();
      if (!text) return;

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

    start();
    window.restartHeroTypewriter = start;
  }

  window.initHeroInteractions = initHeroInteractions;
  window.initCounterAnimations = initCounterAnimations;
  window.initProfileFlip = initProfileFlip;
  window.initCvDownloadCounter = initCvDownloadCounter;
  window.initCvDropdown = initCvDropdown;
  window.initScrollProgressBar = initScrollProgressBar;
  window.initHeroTypewriter = initHeroTypewriter;

  document.addEventListener("DOMContentLoaded", () => {
    initCvDropdown();
    initScrollProgressBar();
    initHeroTypewriter();
  });
})();
