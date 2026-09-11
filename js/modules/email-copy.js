// ==========================================================================
// 1-Click Copy Email to Clipboard Feature
// Enables instant copy when clicking on Email in Contact section, About section,
// or any mailto link, with rich visual feedback & toast notification.
// ==========================================================================
(function () {
  const EMAIL_ADDRESS = "hoangvu2k4cmg@gmail.com";

  async function copyText(text) {
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch (err) {
      // Fallback below
    }

    if (!copied) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        ta.style.top = "0";
        ta.setAttribute("readonly", "");
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        copied = document.execCommand("copy");
        ta.remove();
      } catch (fallbackErr) {
        copied = false;
      }
    }
    return copied;
  }

  function triggerToast(opts) {
    if (typeof window.showToast === "function") {
      window.showToast(opts);
    }
  }

  function t(key) {
    return typeof window.t === "function" ? window.t(key) : key;
  }

  function initEmailCopyActions() {
    // 1. Contact Section Email Card
    const contactEmailCard = document.getElementById("contact-email-link") ||
      document.querySelector('.contact-link-card[href^="mailto:"]');

    let contactResetTimer = null;

    if (contactEmailCard) {
      contactEmailCard.addEventListener("click", async (e) => {
        // If user deliberately holds Ctrl/Cmd, allow opening external mail client
        if (e.ctrlKey || e.metaKey) return;

        e.preventDefault();
        const emailToCopy = contactEmailCard.getAttribute("data-email") || EMAIL_ADDRESS;
        const copied = await copyText(emailToCopy);

        if (copied) {
          contactEmailCard.classList.add("is-copied");
          const badgeText = contactEmailCard.querySelector(".contact-link-badge-text");
          const copyIcon = contactEmailCard.querySelector(".contact-copy-icon");
          const checkIcon = contactEmailCard.querySelector(".contact-check-icon");

          if (badgeText) badgeText.textContent = t("contact_copied_btn");
          if (copyIcon) copyIcon.classList.add("hidden");
          if (checkIcon) checkIcon.classList.remove("hidden");

          if (contactResetTimer) clearTimeout(contactResetTimer);
          contactResetTimer = setTimeout(() => {
            contactEmailCard.classList.remove("is-copied");
            if (badgeText) badgeText.textContent = t("contact_copy_btn");
            if (copyIcon) copyIcon.classList.remove("hidden");
            if (checkIcon) checkIcon.classList.add("hidden");
          }, 2500);

          triggerToast({
            message: t("toast_email_copied"),
            type: "success",
            duration: 3500,
          });
        } else {
          triggerToast({
            message: t("toast_email_copy_err"),
            type: "error",
            duration: 3500,
          });
        }
      });

      // Support Spacebar click when focused for keyboard accessibility
      contactEmailCard.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          contactEmailCard.click();
        }
      });
    }

    // 2. About Section Social Email Button
    const aboutEmailBtn = document.getElementById("about-email-btn") ||
      document.querySelector(".social-btn.is-mail");

    let aboutResetTimer = null;

    if (aboutEmailBtn) {
      aboutEmailBtn.addEventListener("click", async (e) => {
        if (e.ctrlKey || e.metaKey) return;

        e.preventDefault();
        const emailToCopy = aboutEmailBtn.getAttribute("data-email") || EMAIL_ADDRESS;
        const copied = await copyText(emailToCopy);

        if (copied) {
          aboutEmailBtn.classList.add("is-copied");
          const defaultIcon = aboutEmailBtn.querySelector(".mail-default-icon");
          const checkIcon = aboutEmailBtn.querySelector(".mail-check-icon");

          if (defaultIcon) defaultIcon.classList.add("hidden");
          if (checkIcon) checkIcon.classList.remove("hidden");

          if (aboutResetTimer) clearTimeout(aboutResetTimer);
          aboutResetTimer = setTimeout(() => {
            aboutEmailBtn.classList.remove("is-copied");
            if (defaultIcon) defaultIcon.classList.remove("hidden");
            if (checkIcon) checkIcon.classList.add("hidden");
          }, 2500);

          triggerToast({
            message: t("toast_email_copied"),
            type: "success",
            duration: 3500,
          });
        } else {
          triggerToast({
            message: t("toast_email_copy_err"),
            type: "error",
            duration: 3500,
          });
        }
      });

      aboutEmailBtn.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          aboutEmailBtn.click();
        }
      });
    }

    // 3. Delegate click on any other mailto links (e.g. inside Terminal output)
    document.addEventListener("click", async (e) => {
      const mailLink = e.target.closest('a[href^="mailto:"]');
      if (!mailLink) return;
      if (mailLink === contactEmailCard || mailLink === aboutEmailBtn) return;
      if (e.ctrlKey || e.metaKey) return;

      e.preventDefault();
      const rawHref = mailLink.getAttribute("href") || "";
      const emailToCopy = rawHref.replace(/^mailto:/i, "").split("?")[0] || EMAIL_ADDRESS;
      const copied = await copyText(emailToCopy);

      if (copied) {
        triggerToast({
          message: t("toast_email_copied"),
          type: "success",
          duration: 3500,
        });
      }
    });
  }

  window.initEmailCopyActions = initEmailCopyActions;
})();
