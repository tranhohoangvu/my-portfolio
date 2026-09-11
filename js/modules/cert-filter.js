// ==========================================================================
// Certificates Section: Category Filter Tabs & Show More / Collapse Feature
// ==========================================================================
(function () {
  "use strict";

  const DEFAULT_VISIBLE_COUNT = 3;
  let currentCategory = "all";
  let isExpanded = false;

  function t(key, fallback = "") {
    return window.t ? window.t(key, fallback) : fallback;
  }

  function getCards() {
    return Array.from(document.querySelectorAll(".cert-grid-v2 .cert-card-v2"));
  }

  function getMatchingCards(category) {
    const cards = getCards();
    if (category === "all") return cards;
    return cards.filter((card) => card.getAttribute("data-cert-category") === category);
  }

  function updateTabCounts() {
    const cards = getCards();
    const tabs = document.querySelectorAll(".certs-filter-tab");

    tabs.forEach((tab) => {
      const cat = tab.getAttribute("data-cert-filter");
      const countEl = tab.querySelector(".certs-tab-count");
      if (!countEl) return;

      if (cat === "all") {
        countEl.textContent = cards.length;
      } else {
        const count = cards.filter((c) => c.getAttribute("data-cert-category") === cat).length;
        countEl.textContent = count;
      }
    });
  }

  function renderView() {
    const allCards = getCards();
    const matchingCards = getMatchingCards(currentCategory);
    const loadMoreWrap = document.getElementById("certs-load-more-wrap");
    const loadMoreBtn = document.getElementById("certs-load-more-btn");
    const loadMoreText = document.getElementById("certs-load-more-text");
    const loadMoreIcon = document.getElementById("certs-load-more-icon");

    // Hide all cards first
    allCards.forEach((card) => {
      card.classList.add("is-hidden");
      card.classList.remove("is-fade-in");
    });

    const totalMatching = matchingCards.length;
    const visibleLimit = isExpanded ? totalMatching : DEFAULT_VISIBLE_COUNT;

    matchingCards.forEach((card, index) => {
      if (index < visibleLimit) {
        card.classList.remove("is-hidden");
        // Animate newly revealed cards
        if (index >= DEFAULT_VISIBLE_COUNT && isExpanded) {
          card.classList.add("is-fade-in");
        }
      }
    });

    // Update Load More Button visibility & text
    if (!loadMoreWrap || !loadMoreBtn || !loadMoreText) return;

    if (totalMatching <= DEFAULT_VISIBLE_COUNT) {
      loadMoreWrap.classList.add("hidden");
    } else {
      loadMoreWrap.classList.remove("hidden");
      const hiddenCount = totalMatching - DEFAULT_VISIBLE_COUNT;

      if (isExpanded) {
        loadMoreText.textContent = t("certs_btn_show_less", "Thu gọn");
        if (loadMoreIcon) loadMoreIcon.style.transform = "rotate(180deg)";
        loadMoreBtn.setAttribute("aria-expanded", "true");
      } else {
        const moreLabel = t("certs_btn_show_more", "Xem thêm chứng chỉ");
        loadMoreText.textContent = `${moreLabel} (${hiddenCount})`;
        if (loadMoreIcon) loadMoreIcon.style.transform = "rotate(0deg)";
        loadMoreBtn.setAttribute("aria-expanded", "false");
      }
    }
  }

  function handleTabClick(e) {
    const tabBtn = e.currentTarget;
    const filter = tabBtn.getAttribute("data-cert-filter");
    if (!filter || filter === currentCategory) return;

    // Update active tab styling
    document.querySelectorAll(".certs-filter-tab").forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });

    tabBtn.classList.add("is-active");
    tabBtn.setAttribute("aria-selected", "true");

    currentCategory = filter;
    // Reset expansion state on category change
    isExpanded = false;
    renderView();
  }

  function handleLoadMoreToggle() {
    isExpanded = !isExpanded;
    renderView();

    // If collapsing, smoothly scroll back to certificates header
    if (!isExpanded) {
      const section = document.getElementById("certificates");
      if (section) {
        const top = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }

  function initCertFilter() {
    const tabs = document.querySelectorAll(".certs-filter-tab");
    tabs.forEach((tab) => {
      tab.removeEventListener("click", handleTabClick);
      tab.addEventListener("click", handleTabClick);
    });

    const loadMoreBtn = document.getElementById("certs-load-more-btn");
    if (loadMoreBtn) {
      loadMoreBtn.removeEventListener("click", handleLoadMoreToggle);
      loadMoreBtn.addEventListener("click", handleLoadMoreToggle);
    }

    updateTabCounts();
    renderView();
  }

  // Hook for language updates
  window.refreshCertsFilterContent = function () {
    updateTabCounts();
    renderView();
  };

  // Expose init
  window.initCertFilter = initCertFilter;

  // Auto-init on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCertFilter);
  } else {
    initCertFilter();
  }
})();
