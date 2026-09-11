// ==========================================================================
// Certificates Section Interactions: Score Animation & Request Modal
// ==========================================================================
(function () {
  // Cert Score Bar Animation (Aptis ESOL progress fill)
  function initCertScoreAnimation() {
    const bar = document.getElementById("aptis-score-bar");
    if (!bar) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      bar.style.width = "67.5%";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay for visual polish
            setTimeout(() => { bar.style.width = "67.5%"; }, 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(bar.closest(".cert-score-block") || bar);
  }

  // Certificate Request Modal & Submission (Formspree)
  function initCertRequestModal() {
    const modal = document.getElementById("cert-request-modal");
    const form = document.getElementById("cert-request-form");
    const modalSubtitle = document.getElementById("cert-modal-subtitle");
    const hiddenSubject = document.getElementById("cert-req-subject");
    const hiddenCertName = document.getElementById("cert-req-cert-name");
    const submitBtn = document.getElementById("cert-req-submit-btn");

    if (!modal || !form) return;

    function openModal(certTitle, certId) {
      if (modalSubtitle) {
        modalSubtitle.textContent = certId ? `${certTitle} • ID: ${certId}` : certTitle;
      }
      if (hiddenSubject) {
        hiddenSubject.value = `[Tuyển dụng] Yêu cầu bản gốc chứng chỉ ${certTitle}${certId ? ` - ${certId}` : ""}`;
      }
      if (hiddenCertName) {
        hiddenCertName.value = certTitle;
      }

      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      const firstInput = form.querySelector("input[type='text']");
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }

    function closeModal() {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    // Close triggers (Overlay and Cancel/Close buttons)
    modal.querySelectorAll("[data-close-cert-modal]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    // Attach button triggers
    const aptisReqBtn = document.getElementById("btn-request-aptis-original");
    if (aptisReqBtn) {
      aptisReqBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("Aptis ESOL (British Council)", "ESOL 0155613");
      });
    }

    const agileReqBtn = document.getElementById("btn-request-agile-cert");
    if (agileReqBtn) {
      agileReqBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("Agile & Scrum Framework 2024 (Techbase Viet Nam)", "");
      });
    }

    // Form Submission via Formspree AJAX
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
      const tFunc = typeof window.t === "function" ? window.t : (k) => k;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>${tFunc("cert_modal_submitting") || "Đang gửi yêu cầu..."}</span>
        `;
      }

      try {
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          closeModal();
          form.reset();
          if (typeof window.showToast === "function") {
            window.showToast({
              message: tFunc("cert_modal_success") || "✓ Đã gửi yêu cầu thành công! Hoàng Vũ sẽ gửi bản scan gốc đến email của bạn sớm nhất.",
              type: "success",
              duration: 5000,
            });
          }
        } else {
          if (typeof window.showToast === "function") {
            window.showToast({
              message: tFunc("cert_modal_error") || "Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gửi trực tiếp tới hoangvu2k4cmg@gmail.com.",
              type: "error",
              duration: 4000,
            });
          }
        }
      } catch (err) {
        if (typeof window.showToast === "function") {
          window.showToast({
            message: tFunc("cert_modal_error") || "Lỗi kết nối. Vui lòng thử lại sau.",
            type: "error",
            duration: 4000,
          });
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  window.initCertScoreAnimation = initCertScoreAnimation;
  window.initCertRequestModal = initCertRequestModal;
})();
