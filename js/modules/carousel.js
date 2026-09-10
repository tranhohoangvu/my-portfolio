/**
 * Projects Carousel & Filter Module
 * Quản lý Carousel slider dự án, vuốt chạm mobile, chấm điều hướng (dots) và bộ lọc danh mục.
 */
(function () {
  "use strict";

  // =======================
  // Projects Carousel (Bounded Slider with Dots & Boundary Control)
  // =======================
  function initProjectsCarousel() {
    const track = document.getElementById("projects-track");
    const prevBtn = document.getElementById("projects-prev-btn");
    const nextBtn = document.getElementById("projects-next-btn");
    const dotsContainer = document.getElementById("projects-indicators");

    if (!track || !prevBtn || !nextBtn) return;

    // Guarantee original DOM order (#01 -> #07) so #07 and #01 never clash
    const allCards = Array.from(track.querySelectorAll(".project-card"));
    allCards.sort((a, b) => {
      const numA = parseInt(a.querySelector(".project-num")?.textContent.replace(/\D/g, "") || "0", 10);
      const numB = parseInt(b.querySelector(".project-num")?.textContent.replace(/\D/g, "") || "0", 10);
      return numA - numB;
    });
    allCards.forEach((card) => track.appendChild(card));

    let currentIndex = 0;
    let isAnimating = false;

    function getStepWidth() {
      const firstVisible = track.querySelector(".project-card:not(.is-filtered-out)");
      if (!firstVisible) return 0;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
      return firstVisible.getBoundingClientRect().width + gap;
    }

    function getMetrics() {
      const visibleCards = Array.from(track.querySelectorAll(".project-card:not(.is-filtered-out)"));
      const viewport = track.parentElement;
      const viewportWidth = viewport ? viewport.clientWidth : 0;
      const step = getStepWidth();
      const maxScroll = Math.max(0, track.scrollWidth - viewportWidth);
      const cardsPerView = step > 0 ? Math.max(1, Math.round((viewportWidth + 24) / step)) : 1;
      const maxIndex = Math.max(0, visibleCards.length - cardsPerView);

      return { visibleCards, viewportWidth, step, maxScroll, maxIndex, cardsPerView };
    }

    function renderDots(metrics) {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";
      const { maxIndex, visibleCards } = metrics;
      if (visibleCards.length <= 1 || maxIndex <= 0) {
        dotsContainer.style.display = "none";
        return;
      }
      dotsContainer.style.display = "flex";

      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `projects-dot ${i === currentIndex ? "is-active" : ""}`;
        dot.setAttribute("aria-label", `Chuyển tới dự án ${i + 1}`);
        dot.addEventListener("click", () => {
          if (isAnimating) return;
          slideTo(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateControls() {
      const metrics = getMetrics();
      const { maxScroll, maxIndex, visibleCards } = metrics;

      if (visibleCards.length <= 1 || maxScroll <= 5) {
        prevBtn.disabled = true;
        prevBtn.classList.add("is-disabled");
        nextBtn.disabled = true;
        nextBtn.classList.add("is-disabled");
      } else {
        prevBtn.disabled = currentIndex <= 0;
        prevBtn.classList.toggle("is-disabled", currentIndex <= 0);

        const isAtEnd = currentIndex >= maxIndex;
        nextBtn.disabled = isAtEnd;
        nextBtn.classList.toggle("is-disabled", isAtEnd);
      }

      // Update active dot
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(".projects-dot");
        dots.forEach((dot, idx) => {
          dot.classList.toggle("is-active", idx === currentIndex);
        });
      }
    }

    function slideTo(targetIndex) {
      const metrics = getMetrics();
      const { maxIndex, step, maxScroll } = metrics;

      currentIndex = Math.max(0, Math.min(targetIndex, maxIndex));

      let targetOffset = currentIndex * step;
      if (targetOffset > maxScroll) targetOffset = maxScroll;
      if (targetOffset < 0) targetOffset = 0;

      isAnimating = true;
      track.classList.add("is-animating");
      track.style.transform = `translateX(-${targetOffset}px)`;

      // Safety timeout: reset isAnimating if transitionend never fires
      let safetyTimer = setTimeout(() => {
        track.classList.remove("is-animating");
        isAnimating = false;
        updateControls();
      }, 600);

      function onTransitionEnd(e) {
        if (e.target !== track) return;
        track.removeEventListener("transitionend", onTransitionEnd);
        clearTimeout(safetyTimer);
        track.classList.remove("is-animating");
        isAnimating = false;
        updateControls();
      }

      track.addEventListener("transitionend", onTransitionEnd);
      updateControls();
    }

    function slideNext() {
      if (isAnimating) return;
      const { maxIndex } = getMetrics();
      if (currentIndex < maxIndex) {
        slideTo(currentIndex + 1);
      }
    }

    function slidePrev() {
      if (isAnimating) return;
      if (currentIndex > 0) {
        slideTo(currentIndex - 1);
      }
    }

    nextBtn.addEventListener("click", slideNext);
    prevBtn.addEventListener("click", slidePrev);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) slideNext();
          else slidePrev();
        }
      },
      { passive: true }
    );

    // Handle window resize
    window.addEventListener("resize", () => {
      const metrics = getMetrics();
      if (currentIndex > metrics.maxIndex) {
        currentIndex = metrics.maxIndex;
      }
      slideTo(currentIndex);
      renderDots(metrics);
    });

    // Initial render
    const initialMetrics = getMetrics();
    renderDots(initialMetrics);
    updateControls();

    // Expose reset for filter tabs & skill linking
    window.resetProjectsCarousel = () => {
      currentIndex = 0;
      track.classList.remove("is-animating");
      track.style.transform = "translateX(0)";
      const m = getMetrics();
      renderDots(m);
      updateControls();
    };

    window.slideProjectsCarouselToIndex = (targetIndex) => {
      slideTo(targetIndex);
    };
  }

  // =======================
  // Projects Category Filter Tabs
  // =======================
  function initProjectsFilter() {
    const filterTabs = document.querySelectorAll(".projects-filter-tab");
    const track = document.getElementById("projects-track");
    const emptyState = document.getElementById("projects-empty-state");

    if (!filterTabs.length || !track) return;

    const allCards = Array.from(track.querySelectorAll(".project-card"));

    function applyFilter(category) {
      let matchCount = 0;

      allCards.forEach((card) => {
        // Clear any temporary skill highlight/dim
        card.classList.remove("is-skill-matched");
        card.classList.remove("is-skill-dimmed");

        const cardCategories = (card.getAttribute("data-category") || "").toLowerCase().split(/\s+/);
        const isMatch = category === "all" || cardCategories.includes(category.toLowerCase());

        if (isMatch) {
          card.classList.remove("is-filtered-out");
          card.classList.remove("is-fade-in");
          void card.offsetWidth; // force reflow for smooth animation
          card.classList.add("is-fade-in");
          matchCount++;
        } else {
          card.classList.add("is-filtered-out");
          card.classList.remove("is-fade-in");
        }
      });

      if (emptyState) {
        if (matchCount === 0) {
          emptyState.classList.remove("hidden");
          track.style.display = "none";
        } else {
          emptyState.classList.add("hidden");
          track.style.display = "flex";
        }
      }

      if (window.resetProjectsCarousel) {
        window.resetProjectsCarousel();
      }
    }

    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Clear active skill filter if any
        if (window.clearSkillFilter) {
          window.clearSkillFilter(false);
        }

        filterTabs.forEach((t) => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });

        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");

        const filter = tab.getAttribute("data-filter") || "all";
        applyFilter(filter);
      });
    });

    // Initial check
    const activeTab = document.querySelector(".projects-filter-tab.is-active");
    const initialFilter = activeTab ? activeTab.getAttribute("data-filter") : "all";
    applyFilter(initialFilter);
  }

  // Export to window
  window.initProjectsCarousel = initProjectsCarousel;
  window.initProjectsFilter = initProjectsFilter;
})();
