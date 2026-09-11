// ==========================================================================
// Contact Form Module (Topic Chips, Char Counter & Formspree AJAX Submission)
// ==========================================================================
(function () {
  function t(key) {
    return typeof window.t === "function" ? window.t(key) : key;
  }

  function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    const contactSubject = document.getElementById("contact-subject");
    const topicChips = document.querySelectorAll(".contact-topic-chip");
    const messageTextarea = document.getElementById("message");
    const charCountSpan = document.getElementById("message-char-count");

    // 1. Topic Chips Selection
    if (topicChips.length > 0 && contactSubject) {
      topicChips.forEach((chip) => {
        chip.addEventListener("click", () => {
          topicChips.forEach((c) => {
            c.classList.remove("is-active");
            c.setAttribute("aria-checked", "false");
          });
          chip.classList.add("is-active");
          chip.setAttribute("aria-checked", "true");
          const val = chip.getAttribute("data-topic-val") || chip.textContent.trim();
          contactSubject.value = val;
        });
      });
    }

    // 2. Character Counter
    if (messageTextarea && charCountSpan) {
      const updateCharCount = () => {
        const len = messageTextarea.value.length;
        charCountSpan.textContent = len;
        if (len > 500) {
          charCountSpan.classList.add("text-rose-500", "font-bold");
        } else {
          charCountSpan.classList.remove("text-rose-500", "font-bold");
        }
      };
      messageTextarea.addEventListener("input", updateCharCount);
    }

    // 3. Form Submit with Loading Spinner
    if (contactForm && formMessage) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        formMessage.classList.remove("hidden");
        formMessage.classList.remove("text-red-600", "dark:text-red-400");
        formMessage.classList.add("text-green-600", "dark:text-green-400");
        formMessage.textContent = t("form_sending");

        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerHTML =
            `<svg class="w-5 h-5 animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             <span class="relative z-10">${t("form_btn_sending")}</span>
             <span class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 animate-pulse"></span>`;
        }

        try {
          const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: new FormData(contactForm),
            headers: { Accept: "application/json" },
          });

          if (response.ok) {
            formMessage.textContent = t("form_success");
            if (typeof window.showToast === "function") {
              window.showToast({ message: t("form_success"), type: "success" });
            }
            contactForm.reset();
            if (charCountSpan) charCountSpan.textContent = "0";

            // Reset topic chip to default
            if (topicChips.length > 0 && contactSubject) {
              topicChips.forEach((c, idx) => {
                if (idx === 0) {
                  c.classList.add("is-active");
                  c.setAttribute("aria-checked", "true");
                  contactSubject.value = c.getAttribute("data-topic-val") || c.textContent.trim();
                } else {
                  c.classList.remove("is-active");
                  c.setAttribute("aria-checked", "false");
                }
              });
            }
            setTimeout(() => formMessage.classList.add("hidden"), 3000);
          } else {
            formMessage.classList.remove("text-green-600", "dark:text-green-400");
            formMessage.classList.add("text-red-600", "dark:text-red-400");
            formMessage.textContent = t("form_error");
            if (typeof window.showToast === "function") {
              window.showToast({ message: t("form_error"), type: "error" });
            }
          }
        } catch (error) {
          formMessage.classList.remove("text-green-600", "dark:text-green-400");
          formMessage.classList.add("text-red-600", "dark:text-red-400");
          formMessage.textContent = t("form_network_error");
          if (typeof window.showToast === "function") {
            window.showToast({ message: t("form_network_error"), type: "error" });
          }
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML =
              `<svg class="w-5 h-5 relative z-10 btn-send-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
               </svg>
               <span class="relative z-10" data-i18n="form_send_btn">${t("form_send_btn")}</span>
               <span class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>`;
          }
        }
      });
    }
  }

  window.initContactForm = initContactForm;

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
