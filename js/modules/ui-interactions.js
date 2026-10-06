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

  // 4. CV Download Toast (feedback only — no fake counters)
  function initCvDownloadToast() {
    document.querySelectorAll(".cv-download-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (typeof window.showToast !== "function") return;
        const type = btn.getAttribute("data-cv-type");
        const roleName = type === "be" ? "Backend Developer Fresher" : type === "fe" ? "Frontend Developer Fresher" : "AI Engineer Fresher";
        window.showToast({ message: `Đang tải CV ${roleName}...`, type: "success", duration: 2500 });
      });
    });

    // Clean up values left by the old local counter
    try {
      localStorage.removeItem("cv_download_counts");
      localStorage.removeItem("cv_view_counts");
    } catch (e) {}
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

  // 6. Scroll Progress Bar (Hardware accelerated & ResizeObserver synced)
  function initScrollProgressBar() {
    const progress = document.getElementById("scroll-progress");
    if (!progress) return;

    const d = document.documentElement;
    let maxScroll = Math.max(1, d.scrollHeight - d.clientHeight);

    function recalc() {
      maxScroll = Math.max(1, d.scrollHeight - d.clientHeight);
    }

    if (typeof ResizeObserver !== "undefined" && document.body) {
      const ro = new ResizeObserver(() => recalc());
      ro.observe(document.body);
    } else {
      window.addEventListener("resize", recalc, { passive: true });
    }

    let progTicking = false;
    const update = () => {
      if (progTicking) return;
      progTicking = true;
      requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, d.scrollTop / maxScroll));
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
  window.initCvDownloadToast = initCvDownloadToast;
  window.initCvDropdown = initCvDropdown;
  window.initScrollProgressBar = initScrollProgressBar;
  window.initHeroTypewriter = initHeroTypewriter;

  document.addEventListener("DOMContentLoaded", () => {
    initCvDropdown();
    initScrollProgressBar();
    initHeroTypewriter();
  });
})();
