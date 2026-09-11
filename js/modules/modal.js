/**
 * Project Details Modal Module
 * Quản lý Modal chi tiết kỹ thuật chuyên sâu (Architecture, DB Schema, Engineering Challenges, Tech Stack).
 */
(function () {
  "use strict";

  function getProjectsData() {
    return window.PROJECTS_DATA || {};
  }

  function getSkillsMapping() {
    return (window.SKILLS_DATA && window.SKILLS_DATA.mapping) || {};
  }

  function resolveSkillId(tagStr) {
    if (typeof window.normalizeTagToSkillId === "function") {
      return window.normalizeTagToSkillId(tagStr);
    }
    if (window.SKILLS_DATA && typeof window.SKILLS_DATA.normalizeTagToSkillId === "function") {
      return window.SKILLS_DATA.normalizeTagToSkillId(tagStr);
    }
    if (!tagStr) return null;
    const s = tagStr.toLowerCase().trim();
    if (s.includes("postgres")) return "postgresql";
    if (s.includes("mongo")) return "mongodb";
    if (s.includes("mysql")) return "mysql";
    if (s.includes("sql server")) return "sqlserver";
    if (s.includes("raw sql") || s === "native pg (no orm)") return "rawsql";
    if (s.includes("node")) return "nodejs";
    if (s.includes("express")) return "express";
    if (s.includes("react")) return "react";
    if (s.includes("pytorch")) return "pytorch";
    if (s.includes("tensorflow")) return "tensorflow";
    if (s.includes("docker compose") || s.includes("compose")) return "compose";
    if (s.includes("docker")) return "docker";
    if (s.includes("nginx")) return "nginx";
    if (s.includes("laravel")) return "laravel";
    if (s.includes("livewire") || s.includes("php")) return "php";
    if (s.includes("c#") || s.includes("csharp")) return "csharp";
    if (s.includes(".net") || s.includes("winform")) return "dotnet";
    if (s.includes("python")) return "python";
    if (s.includes("rest") || s.includes("api")) return "restapi";
    if (s.includes("postman")) return "postman";
    if (s.includes("git")) return "git";
    return null;
  }

  function getCurrentLanguage() {
    if (typeof window.getCurrentLang === "function") {
      return window.getCurrentLang();
    }
    return window.currentLang || document.documentElement.getAttribute("lang") || "vi";
  }

  // =======================
  // Project Details Modal Controller
  // =======================
  function initProjectDetailsModal() {
    const modal = document.getElementById("project-detail-modal");
    if (!modal) return;

    const numEl = document.getElementById("modal-project-num");
    const titleEl = document.getElementById("modal-project-title");
    const subtitleEl = document.getElementById("modal-project-subtitle");
    const imgEl = document.getElementById("modal-project-img");
    const descEl = document.getElementById("modal-project-desc");
    const archEl = document.getElementById("modal-spec-arch");
    const dataEl = document.getElementById("modal-spec-data");
    const challengesContainer = document.getElementById("modal-spec-challenges");
    const tagsContainer = document.getElementById("modal-spec-tags");
    const actionsContainer = document.getElementById("modal-actions");

    let activeProjectId = null;

    function renderModalData(projectId) {
      const projectsData = getProjectsData();
      const data = projectsData[projectId];
      if (!data) return;

      activeProjectId = projectId;
      const lang = getCurrentLanguage() === "en" ? "en" : "vi";
      const localized = data[lang] || data.vi;
      const skillMapping = getSkillsMapping();

      if (numEl) numEl.textContent = data.num;
      if (titleEl) titleEl.textContent = data.title;
      if (subtitleEl) subtitleEl.textContent = localized.subtitle;
      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.title;
      }
      if (descEl) descEl.textContent = localized.desc;
      if (archEl) archEl.textContent = localized.arch;
      if (dataEl) dataEl.textContent = localized.data;

      // Challenges
      if (challengesContainer) {
        challengesContainer.innerHTML = "";
        (localized.challenges || []).forEach((c) => {
          const item = document.createElement("div");
          item.className = "modal-challenge-card";
          item.innerHTML = `
            <div class="modal-challenge-title">${c.title}</div>
            <p class="modal-challenge-solution">${c.solution}</p>
          `;
          challengesContainer.appendChild(item);
        });
      }

      // Tech Tags (Item 8: Interactive Skill Linking)
      if (tagsContainer) {
        tagsContainer.innerHTML = "";
        (data.tags || []).forEach((tag) => {
          const pill = document.createElement("span");
          const sId = resolveSkillId(tag);
          if (sId && skillMapping[sId]) {
            pill.className = "text-xs tag-pill tag-pill--interactive";
            pill.setAttribute("data-tech-skill", sId);
            pill.title = lang === "en"
              ? `View skill: ${skillMapping[sId].name}`
              : `Xem kỹ năng: ${skillMapping[sId].name}`;
            pill.addEventListener("click", () => {
              closeModal();
              if (window.highlightSkillTile) {
                window.highlightSkillTile(sId);
              }
            });
          } else {
            pill.className = "text-xs tag-pill";
          }
          pill.textContent = tag;
          tagsContainer.appendChild(pill);
        });
      }

      // Actions
      if (actionsContainer) {
        actionsContainer.innerHTML = "";
        (data.links || []).forEach((link) => {
          const a = document.createElement("a");
          a.href = link.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className =
            link.type === "accent"
              ? "btn btn-secondary text-xs sm:text-sm py-2 px-4 inline-flex items-center gap-1.5"
              : "btn btn-primary text-xs sm:text-sm py-2 px-4 inline-flex items-center gap-1.5";
          a.textContent = lang === "en" ? link.labelEn : link.labelVi;
          actionsContainer.appendChild(a);
        });
      }
    }

    function openModal(projectId) {
      renderModalData(projectId);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      activeProjectId = null;
    }

    // Hook for language switch while modal is open
    window.refreshProjectModalIfOpen = () => {
      if (activeProjectId && modal.classList.contains("is-open")) {
        renderModalData(activeProjectId);
      }
    };

    // Delegated click listeners for project details buttons and triggers
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-project-details");
      if (btn) {
        e.stopPropagation();
        const projectId = btn.getAttribute("data-project-id");
        const projectsData = getProjectsData();
        if (projectId && projectsData[projectId]) {
          openModal(projectId);
        }
        return;
      }
      const trigger = e.target.closest("[data-project-trigger]");
      if (trigger) {
        e.stopPropagation();
        const projectId = trigger.getAttribute("data-project-trigger");
        const projectsData = getProjectsData();
        if (projectId && projectsData[projectId]) {
          openModal(projectId);
        }
      }
    });

    // Close listeners
    modal.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Expose open/close globally
    window.openProjectModal = openModal;
    window.closeProjectModal = closeModal;
  }

  // Export to window
  window.initProjectDetailsModal = initProjectDetailsModal;
})();
