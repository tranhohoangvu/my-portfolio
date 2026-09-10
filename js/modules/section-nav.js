/**
 * Section Navigation Rail (Mini ScrollSpy) Module
 * Thanh điều hướng nhanh ghim mép phải màn hình dạng vạch dash tối giản,
 * mở rộng khi hover hiển thị mục lục các phân khu và tự động cập nhật theo vị trí cuộn trang.
 */
(function () {
  "use strict";

  function translate(key, fallback) {
    if (typeof window.t === "function") {
      const val = window.t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  }

  function initSectionNav() {
    const rail = document.getElementById("section-nav-rail");
    if (!rail) return;

    const items = rail.querySelectorAll(".section-nav-item");
    if (!items.length) return;

    const sectionIds = Array.from(items).map((item) => item.getAttribute("data-section-id"));
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    let activeSectionId = sectionIds[0] || "home";
    let isClickScrolling = false;
    let scrollTimeout = null;

    function setActive(id) {
      if (activeSectionId === id) return;
      activeSectionId = id;
      items.forEach((item) => {
        const isCurrent = item.getAttribute("data-section-id") === id;
        item.classList.toggle("is-active", isCurrent);
        item.setAttribute("aria-current", isCurrent ? "true" : "false");
      });
    }

    // Smooth click-to-scroll
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.getAttribute("data-section-id");
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        isClickScrolling = true;
        setActive(targetId);

        // Account for sticky navbar offset
        const navHeight = 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPos < 0 ? 0 : targetPos,
          behavior: "smooth",
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isClickScrolling = false;
        }, 800);
      });

      // Keyboard support
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.click();
        }
      });
    });

    // ScrollSpy calculation
    function checkScroll() {
      if (isClickScrolling) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If at very bottom of document, activate last section (contact)
      if (scrollY + windowHeight >= docHeight - 40) {
        const lastId = sectionIds[sectionIds.length - 1];
        if (lastId) setActive(lastId);
        return;
      }

      // If at very top, activate first section (home)
      if (scrollY < 120) {
        setActive(sectionIds[0]);
        return;
      }

      // Find section currently occupying the middle of the viewport
      const scanLine = scrollY + windowHeight * 0.38;
      let currentActiveId = sectionIds[0];

      for (let i = 0; i < sectionElements.length; i++) {
        const sec = sectionElements[i];
        const top = sec.offsetTop - 80;
        const bottom = top + sec.offsetHeight;

        if (scanLine >= top && scanLine < bottom) {
          currentActiveId = sec.id;
          break;
        } else if (scanLine >= top) {
          currentActiveId = sec.id;
        }
      }

      if (currentActiveId) {
        setActive(currentActiveId);
      }
    }

    // Passive scroll listener with requestAnimationFrame throttle
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            checkScroll();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check
    checkScroll();

    // Hook to refresh labels if language changes
    window.refreshSectionNavLang = () => {
      items.forEach((item) => {
        const labelEl = item.querySelector(".section-nav-label");
        if (labelEl) {
          const key = labelEl.getAttribute("data-i18n");
          if (key) {
            labelEl.textContent = translate(key, labelEl.textContent);
          }
        }
      });
    };
  }

  window.initSectionNav = initSectionNav;
})();
