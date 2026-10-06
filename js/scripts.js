// ==========================================================================
// Tran Ho Hoang Vu Portfolio - Master Application Orchestrator
// Coordinates modular components & core layout interactions.
// Independent feature modules are loaded from js/modules/ & js/data/.
// ==========================================================================

// 1. Service Worker Registration (PWA / Offline caching)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => { });
  });
}

// 2. Particle.js Background Canvas Initialization & Smooth In-place Theme Morphing
function _particlesHexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

window._initParticles = function initParticles() {
  if (typeof particlesJS === "undefined") return;
  const container = document.getElementById("particles-js");
  if (!container) return;

  const isDark = document.documentElement.classList.contains("dark");

  // In dark mode: crisp celestial white and soft star tints on dark cosmic background
  // In light mode: vibrant tech indigo, sky cyan & violet dots clearly visible on light canvas
  const particleColors = isDark
    ? ["#ffffff", "#93c5fd", "#c7d2fe"]
    : ["#4f46e5", "#0284c7", "#6366f1", "#0891b2"];
  const particleOpacity = isDark ? 0.55 : 0.6;
  const particleSize = isDark ? 3.2 : 3.8;

  // Case 1: If particles.js is already running on the canvas, morph all particle colors in-place!
  // No canvas destroying, no animation drops, no disappearing particles.
  if (window.pJSDom && window.pJSDom.length && window.pJSDom[0].pJS) {
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = particleColors;
    pJS.particles.opacity.value = particleOpacity;
    pJS.particles.size.value = particleSize;

    if (pJS.particles.array && pJS.particles.array.length) {
      for (let i = 0; i < pJS.particles.array.length; i++) {
        const p = pJS.particles.array[i];
        const hex = particleColors[Math.floor(Math.random() * particleColors.length)];
        p.color.rgb = _particlesHexToRgb(hex);
        p.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * particleOpacity;
        p.radius = (pJS.particles.size.random ? Math.random() : 1) * particleSize;
      }
    }
    return;
  }

  // Case 2: Initial launch when particles.js first loads
  particlesJS("particles-js", {
    particles: {
      number: { value: 85, density: { enable: true, value_area: 800 } },
      color: { value: particleColors },
      shape: { type: "circle" },
      opacity: { value: particleOpacity, random: true },
      size: { value: particleSize, random: true },
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
};

// Also listen to theme changes dispatched by theme module
window.addEventListener("portfolio:themechange", () => {
  if (typeof window._initParticles === "function") {
    window._initParticles();
  }
});

// 3. Mobile Menu Drawer Navigation
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

  // Close when clicking outside mobile menu
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      toggleMobileMenu(false);
    }
  });
}

// 4. Smooth Scroll for Navigation Links (clean URL without hash fragment)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // Close mobile menu FIRST so layout is stable before computing scroll position.
    // This prevents getBoundingClientRect returning an incorrect top when the
    // open menu shifts page layout on small screens.
    const wasMenuOpen = mobileMenu && mobileMenu.classList.contains("active");
    if (wasMenuOpen) toggleMobileMenu(false);

    // rAF ensures the DOM has settled after menu close before we measure
    const doScroll = () => {
      const navbarEl = document.getElementById("navbar");
      const offset = navbarEl ? navbarEl.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (wasMenuOpen) {
      requestAnimationFrame(doScroll);
    } else {
      doScroll();
    }

    document
      .querySelectorAll('#nav-links a[href^="#"], #mobile-menu a[href^="#"]')
      .forEach((a) => a.classList.toggle("active", a.getAttribute("href") === href));

    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch { }
  });
});

// 5. Active ScrollSpy for Desktop Navbar
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

  let cachedNavOffset = navbarEl ? navbarEl.offsetHeight + 16 : 80;

  // Cache section offsets to avoid layout thrashing on every scroll event
  let sectionOffsets = [];
  function recalcOffsets() {
    cachedNavOffset = navbarEl ? navbarEl.offsetHeight + 16 : 80;
    sectionOffsets = sections.map(s => s.offsetTop);
  }
  recalcOffsets(); // initial
  window.addEventListener("resize", recalcOffsets, { passive: true });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY + cachedNavOffset;
      let currentIdx = 0;
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (sectionOffsets[i] <= y) currentIdx = i;
      }

      if (sections[currentIdx]?.id) setActive(`#${sections[currentIdx].id}`);
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", () => setActive(location.hash), { passive: true });

  setActive(location.hash || links[0]?.getAttribute("href"));
  onScroll();

  if (location.hash) {
    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch { }
  }
});

// 6. Scroll Reveal Animations (IntersectionObserver for .section-hidden)
const hiddenSections = document.querySelectorAll(".section-hidden");
if (hiddenSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");

          const progressBars = entry.target.querySelectorAll(".animate-progress");
          progressBars.forEach((bar) => {
            bar.style.width = `${bar.dataset.progress}%`;
          });

          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  hiddenSections.forEach((s) => sectionObserver.observe(s));
}

// 7. Back to Top Button
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  const toggleBackToTop = () => {
    if (window.scrollY > 100) backToTop.classList.add("is-visible");
    else backToTop.classList.remove("is-visible");
  };

  toggleBackToTop();

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

// 8. Brand Logo Home Click (Smooth scroll to top without changing URL)
document.addEventListener("DOMContentLoaded", () => {
  const brand = document.getElementById("brand-home");
  if (!brand) return;

  brand.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ==========================================================================
// Central Bootstrap Orchestration
// Wires together all independent feature modules.
// ==========================================================================
function initAppModules() {
  window.renderProjectsOverview?.(); // render overview dashboard cards
  window.renderProjectCards?.();    // render project cards from data module
  window.renderCertCards?.();       // render cert cards from data module
  window.initProjectsCarousel?.();
  window.initProjectsFilter?.();
  window.initProjectDetailsModal?.();
  window.initSkillProjectLinking?.();
  window.initTerminalConsole?.();
  window.initFloatingActions?.();
  window.initSectionNav?.();
  window.initEmailCopyActions?.();
  window.initContactForm?.();
  window.initHeroInteractions?.();
  window.initCounterAnimations?.();
  window.initProfileFlip?.();
  window.initCvDownloadToast?.();
  window.initCertScoreAnimation?.();
  window.initCertRequestModal?.();
  window.initCertFilter?.();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAppModules);
} else {
  initAppModules();
}
