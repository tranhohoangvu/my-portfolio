/**
 * Floating Actions (FAB) & Toast Notifications Module
 * Quản lý Floating Action Bar góc phải màn hình, menu tác vụ nhanh (Copy Email, View CV, Terminal) và Toast notification system.
 */
(function () {
  "use strict";

  function translate(key) {
    if (typeof window.t === "function") {
      return window.t(key);
    }
    return key;
  }

  // =======================
  // Toast Notification System
  // =======================
  function showToast({ message, type = "info", duration = 3200 }) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.setAttribute("role", "alert");

    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
      </svg>`;
    } else if (type === "error") {
      iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>`;
    } else {
      iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`;
    }

    toast.innerHTML = `
      <span class="toast__icon">${iconSvg}</span>
      <span class="toast__content">${message}</span>
      <button type="button" class="toast__close" aria-label="Đóng thông báo">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="toast__progress"></div>
    `;

    container.appendChild(toast);

    // Trigger smooth entrance
    requestAnimationFrame(() => {
      toast.classList.add("toast--visible");
      const prog = toast.querySelector(".toast__progress");
      if (prog) {
        prog.style.transition = `transform ${duration}ms linear`;
        prog.style.transform = "scaleX(0)";
      }
    });

    let dismissTimer = null;
    const dismiss = () => {
      if (dismissTimer) clearTimeout(dismissTimer);
      toast.classList.remove("toast--visible");
      toast.classList.add("toast--hiding");
      setTimeout(() => {
        toast.remove();
      }, 300);
    };

    dismissTimer = setTimeout(dismiss, duration);

    const closeBtn = toast.querySelector(".toast__close");
    if (closeBtn) closeBtn.addEventListener("click", dismiss);
  }

  // =======================
  // Floating Action Bar (FAB) & Quick Actions
  // =======================
  function initFloatingActions() {
    const container = document.getElementById("fab-container");
    const trigger = document.getElementById("fab-trigger");
    const menu = document.getElementById("fab-menu");
    const copyEmailBtn = document.getElementById("fab-copy-email");
    const cvToggleBtn = document.getElementById("fab-cv-toggle");
    const cvSubmenu = document.getElementById("fab-cv-submenu");

    if (!container || !trigger) return;

    const EMAIL_ADDRESS = "hoangvu2k4cmg@gmail.com";

    function closeAll() {
      container.classList.remove("fab-container--active");
      trigger.setAttribute("aria-expanded", "false");
      if (menu) menu.setAttribute("aria-hidden", "true");
      if (cvSubmenu) {
        cvSubmenu.classList.remove("fab-cv-submenu--open");
        if (cvToggleBtn) cvToggleBtn.setAttribute("aria-expanded", "false");
      }
    }

    function toggleMenu() {
      const isOpen = container.classList.contains("fab-container--active");
      if (isOpen) {
        closeAll();
      } else {
        container.classList.add("fab-container--active");
        trigger.setAttribute("aria-expanded", "true");
        if (menu) menu.setAttribute("aria-hidden", "false");
      }
    }

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Toggle CV Submenu
    if (cvToggleBtn && cvSubmenu) {
      cvToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isSubOpen = cvSubmenu.classList.contains("fab-cv-submenu--open");
        cvSubmenu.classList.toggle("fab-cv-submenu--open", !isSubOpen);
        cvToggleBtn.setAttribute("aria-expanded", String(!isSubOpen));
      });
    }

    // 1-Click Copy Email to Clipboard + Show Toast
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        let copied = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(EMAIL_ADDRESS);
            copied = true;
          }
        } catch (err) {
          // Fallback below
        }

        if (!copied) {
          try {
            const ta = document.createElement("textarea");
            ta.value = EMAIL_ADDRESS;
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            ta.style.top = "0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            copied = document.execCommand("copy");
            ta.remove();
          } catch (fallbackErr) {
            copied = false;
          }
        }

        if (copied) {
          showToast({
            message: translate("toast_email_copied"),
            type: "success",
            duration: 3500,
          });
        } else {
          showToast({
            message: translate("toast_email_copy_err"),
            type: "error",
            duration: 3500,
          });
        }
      });
    }

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (container.classList.contains("fab-container--active") && !container.contains(e.target)) {
        closeAll();
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && container.classList.contains("fab-container--active")) {
        closeAll();
      }
    });
  }

  // Export to window
  window.showToast = showToast;
  window.initFloatingActions = initFloatingActions;
})();
