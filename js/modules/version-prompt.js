// ==========================================================================
// Version Selector & Prompt Module
// Manages:
// 1. Entrance screen asking visitors to choose between v2 and v1
// 2. Bottom-left floating widget (non-closable, collapsible / expandable)
// ==========================================================================
(function () {
  const STORAGE_KEY = "portfolio_version_choice";
  const DOCK_COLLAPSED_KEY = "portfolio_dock_collapsed";
  const NEW_VERSION_URL = "https://tranhohoangvu.vercel.app/en";

  function initVersionPrompt() {
    const backdrop = document.getElementById("version-prompt-modal");
    const stayBtn = document.getElementById("version-stay-btn");
    const goV2Btn = document.getElementById("version-go-v2-btn");
    const closeBtn = document.getElementById("version-modal-close");
    const rememberCheckbox = document.getElementById("version-remember-choice");

    // Bottom-left dock widget elements
    const dockWidget = document.getElementById("version-dock-widget");
    const dockTrigger = document.getElementById("version-dock-trigger");
    const dockCollapseBtn = document.getElementById("version-dock-collapse");
    const dockCollapseAltBtn = document.getElementById("version-dock-collapse-alt");

    // Check query params
    const params = new URLSearchParams(window.location.search);
    const forceShow = params.get("choose_version") === "1";
    const forceV1 = params.get("v") === "1" || params.get("stay") === "1";
    const forceV2 = params.get("v") === "2";

    if (forceV2) {
      window.location.href = NEW_VERSION_URL;
      return;
    }

    // Check saved choice for entrance modal
    let savedChoice = null;
    try {
      savedChoice = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    const shouldShowModal = forceShow || (!forceV1 && savedChoice !== "v1");

    if (backdrop) {
      if (shouldShowModal) {
        backdrop.classList.remove("is-hidden");
        document.body.classList.add("version-modal-open");
      } else {
        backdrop.classList.add("is-hidden");
        document.body.classList.remove("version-modal-open");
      }
    }

    // Initialize dock collapsed state
    if (dockWidget) {
      let isCollapsed = false;
      try {
        isCollapsed = sessionStorage.getItem(DOCK_COLLAPSED_KEY) === "1";
      } catch (e) {}

      if (isCollapsed) {
        dockWidget.classList.add("is-collapsed");
        if (dockTrigger) dockTrigger.setAttribute("aria-expanded", "false");
      } else {
        dockWidget.classList.remove("is-collapsed");
        if (dockTrigger) dockTrigger.setAttribute("aria-expanded", "true");
      }
    }

    // Function to collapse dock widget down to pill
    function collapseDock() {
      if (!dockWidget) return;
      dockWidget.classList.add("is-collapsed");
      if (dockTrigger) dockTrigger.setAttribute("aria-expanded", "false");
      try {
        sessionStorage.setItem(DOCK_COLLAPSED_KEY, "1");
      } catch (e) {}
    }

    // Function to expand dock widget
    function expandDock() {
      if (!dockWidget) return;
      dockWidget.classList.remove("is-collapsed");
      if (dockTrigger) dockTrigger.setAttribute("aria-expanded", "true");
      try {
        sessionStorage.removeItem(DOCK_COLLAPSED_KEY);
      } catch (e) {}
    }

    // Hook dock widget listeners
    if (dockTrigger) {
      dockTrigger.addEventListener("click", expandDock);
    }
    if (dockCollapseBtn) {
      dockCollapseBtn.addEventListener("click", collapseDock);
    }
    if (dockCollapseAltBtn) {
      dockCollapseAltBtn.addEventListener("click", collapseDock);
    }

    // Function to close modal smoothly
    function closeModal() {
      if (!backdrop || backdrop.classList.contains("is-hidden")) return;
      backdrop.classList.add("is-closing");
      document.body.classList.remove("version-modal-open");

      const remember = rememberCheckbox ? rememberCheckbox.checked : true;
      if (remember) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "v1");
        } catch (e) {}
      }

      setTimeout(() => {
        backdrop.classList.remove("is-closing");
        backdrop.classList.add("is-hidden");
      }, 250);
    }

    // Event listeners for entrance modal
    if (stayBtn) {
      stayBtn.addEventListener("click", closeModal);
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop || e.target.hasAttribute("data-version-close")) {
          closeModal();
        }
      });
    }

    // Press Escape to dismiss modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop && !backdrop.classList.contains("is-hidden")) {
        closeModal();
      }
    });

    // Go to v2 button inside modal
    if (goV2Btn) {
      goV2Btn.addEventListener("click", (e) => {
        e.preventDefault();
        try {
          sessionStorage.setItem(STORAGE_KEY, "v2");
        } catch (e) {}
        window.location.href = NEW_VERSION_URL;
      });
    }

    // Expose helpers
    window.openVersionModal = function () {
      if (!backdrop) return;
      backdrop.classList.remove("is-hidden");
      backdrop.classList.remove("is-closing");
      document.body.classList.add("version-modal-open");
    };
    window.toggleVersionDock = function () {
      if (!dockWidget) return;
      if (dockWidget.classList.contains("is-collapsed")) {
        expandDock();
      } else {
        collapseDock();
      }
    };
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVersionPrompt);
  } else {
    initVersionPrompt();
  }
})();
