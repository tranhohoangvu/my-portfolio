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

// 2. Particle.js Background Canvas Initialization
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

    const navbarEl = document.getElementById("navbar");
    const offset = navbarEl ? navbarEl.offsetHeight + 16 : 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top, behavior: "smooth" });

    document
      .querySelectorAll('#nav-links a[href^="#"], #mobile-menu a[href^="#"]')
      .forEach((a) => a.classList.toggle("active", a.getAttribute("href") === href));

    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch { }

    toggleMobileMenu(false);
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
  window.addEventListener("resize", () => {
    cachedNavOffset = navbarEl ? navbarEl.offsetHeight + 16 : 80;
  }, { passive: true });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY + cachedNavOffset;
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
  window.initCvDownloadCounter?.();
  window.initCertScoreAnimation?.();
  window.initCertRequestModal?.();
  window.initCertFilter?.();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAppModules);
} else {
  initAppModules();
}
