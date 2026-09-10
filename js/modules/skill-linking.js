/**
 * Interactive Skill ↔ Project Linking Module
 * Quản lý liên kết tương tác hai chiều giữa Skill Icons và Project Cards (lọc theo kỹ năng, highlight, scroll).
 */
(function () {
  "use strict";

  function getSkillsMapping() {
    return (window.SKILLS_DATA && window.SKILLS_DATA.mapping) || {};
  }

  function getCurrentLanguage() {
    if (typeof window.getCurrentLang === "function") {
      return window.getCurrentLang();
    }
    return window.currentLang || document.documentElement.getAttribute("lang") || "vi";
  }

  function normalizeTagToSkillId(tagStr) {
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

  function initSkillProjectLinking() {
    const skillIcons = document.querySelectorAll(".skill-icon[data-skill-id]");
    const banner = document.getElementById("active-skill-banner");
    const bannerName = document.getElementById("active-skill-name");
    const bannerCount = document.getElementById("active-skill-count");
    const clearBtn = document.getElementById("clear-skill-filter-btn");
    const track = document.getElementById("projects-track");
    const allCards = track ? Array.from(track.querySelectorAll(".project-card")) : [];

    let activeSkillId = null;

    function filterProjectsBySkill(skillId, shouldScroll = true) {
      const mapping = getSkillsMapping();
      const skillData = mapping[skillId];
      if (!skillData || !skillData.projects || skillData.projects.length === 0) return;

      activeSkillId = skillId;
      const lang = getCurrentLanguage();

      // 1. Update skill icon active states in #skills
      skillIcons.forEach((icon) => {
        const id = icon.getAttribute("data-skill-id");
        icon.classList.toggle("is-active", id === skillId);
      });

      // 2. Show active banner
      if (banner && bannerName && bannerCount) {
        banner.classList.remove("hidden");
        bannerName.textContent = skillData.name;
        const count = skillData.projects.length;
        const suffix = lang === "en" ? (count > 1 ? "projects" : "project") : "dự án";
        bannerCount.textContent = `(${count} ${suffix})`;
      }

      // 3. Highlight matching cards and dim non-matching cards
      let firstMatchedIndex = -1;
      let matchedCount = 0;

      allCards.forEach((card, idx) => {
        const pId = card.getAttribute("data-project-id");
        const isMatched = skillData.projects.includes(pId);

        // Unhide card regardless of previous category filter
        card.classList.remove("is-filtered-out");

        if (isMatched) {
          card.classList.remove("is-skill-dimmed");
          card.classList.add("is-skill-matched");
          matchedCount++;
          if (firstMatchedIndex === -1) {
            firstMatchedIndex = idx;
          }
        } else {
          card.classList.remove("is-skill-matched");
          card.classList.add("is-skill-dimmed");
        }
      });

      // 4. Update empty state if applicable
      const emptyState = document.getElementById("projects-empty-state");
      if (emptyState && track) {
        if (matchedCount === 0) {
          emptyState.classList.remove("hidden");
          track.style.display = "none";
        } else {
          emptyState.classList.add("hidden");
          track.style.display = "flex";
        }
      }

      // 5. Slide carousel to the first matched project
      if (firstMatchedIndex !== -1 && window.slideProjectsCarouselToIndex) {
        window.slideProjectsCarouselToIndex(firstMatchedIndex);
      }

      // 6. Smooth scroll to projects section
      if (shouldScroll) {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          const navHeight = 70;
          const targetPos = projectsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPos, behavior: "smooth" });
        }
      }

      // 7. Feedback toast
      const msg = lang === "en"
        ? `Highlighting ${matchedCount} project(s) applying ${skillData.name}`
        : `Đang làm nổi bật ${matchedCount} dự án ứng dụng công nghệ ${skillData.name}`;
      if (typeof window.showToast === "function") {
        window.showToast({ message: msg, type: "info" });
      }
    }

    function clearSkillFilter(reapplyCategory = true) {
      if (!activeSkillId && (!banner || banner.classList.contains("hidden"))) return;
      activeSkillId = null;

      if (banner) {
        banner.classList.add("hidden");
      }

      skillIcons.forEach((icon) => icon.classList.remove("is-active"));

      allCards.forEach((card) => {
        card.classList.remove("is-skill-matched");
        card.classList.remove("is-skill-dimmed");
      });

      if (reapplyCategory) {
        const activeTab = document.querySelector(".projects-filter-tab.is-active");
        const cat = activeTab ? activeTab.getAttribute("data-filter") || "all" : "all";
        let matchCount = 0;
        allCards.forEach((card) => {
          const cardCategories = (card.getAttribute("data-category") || "").toLowerCase().split(/\s+/);
          const isMatch = cat === "all" || cardCategories.includes(cat.toLowerCase());
          card.classList.toggle("is-filtered-out", !isMatch);
          if (isMatch) matchCount++;
        });
        const emptyState = document.getElementById("projects-empty-state");
        if (emptyState && track) {
          if (matchCount === 0) {
            emptyState.classList.remove("hidden");
            track.style.display = "none";
          } else {
            emptyState.classList.add("hidden");
            track.style.display = "flex";
          }
        }
      }

      if (window.resetProjectsCarousel) {
        window.resetProjectsCarousel();
      }
    }

    window.clearSkillFilter = clearSkillFilter;
    window.filterProjectsBySkill = filterProjectsBySkill;

    // Clear button click
    if (clearBtn) {
      clearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        clearSkillFilter(true);
      });
    }

    // Skill icons click in #skills
    skillIcons.forEach((icon) => {
      const skillId = icon.getAttribute("data-skill-id");
      const mapping = getSkillsMapping();
      const item = mapping[skillId];

      if (item && item.projects && item.projects.length > 0) {
        icon.addEventListener("click", () => {
          if (activeSkillId === skillId) {
            clearSkillFilter(true);
          } else {
            filterProjectsBySkill(skillId, true);
          }
        });

        // Keyboard accessible
        icon.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            icon.click();
          }
        });
      }
    });

    // Reverse Linking: Project Card Tag Click -> Highlight Skill in #skills
    function highlightSkillTile(skillId) {
      const targetIcon = document.querySelector(`.skill-icon[data-skill-id="${skillId}"]`);
      const mapping = getSkillsMapping();
      const skillData = mapping[skillId];
      const skillName = skillData ? skillData.name : skillId;
      const lang = getCurrentLanguage();

      if (targetIcon) {
        const skillsSec = document.getElementById("skills");
        if (skillsSec) {
          const navHeight = 70;
          const targetPos = skillsSec.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPos, behavior: "smooth" });
        }

        targetIcon.classList.remove("is-highlighted");
        void targetIcon.offsetWidth; // force reflow
        targetIcon.classList.add("is-highlighted");

        setTimeout(() => {
          targetIcon.classList.remove("is-highlighted");
        }, 3600);

        const msg = lang === "en"
          ? `Skill: ${skillName} • Located in Skills section`
          : `Kỹ năng: ${skillName} • Đã định vị trong mục Kỹ năng`;
        if (typeof window.showToast === "function") {
          window.showToast({ message: msg, type: "info" });
        }
      }
    }

    window.highlightSkillTile = highlightSkillTile;

    // Attach event listeners to [data-tech-skill] pills in project cards
    document.querySelectorAll(".tag-pill--interactive[data-tech-skill]").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.stopPropagation();
        const sId = tag.getAttribute("data-tech-skill");
        if (sId) {
          highlightSkillTile(sId);
        }
      });
    });

    // Language update hook
    window.refreshActiveSkillBanner = () => {
      const lang = getCurrentLanguage();
      const mapping = getSkillsMapping();
      document.querySelectorAll(".skill-count-badge[data-count]").forEach((b) => {
        const c = b.getAttribute("data-count");
        b.textContent = lang === "en" ? `${c} Prj` : `${c} DA`;
      });
      if (activeSkillId && mapping[activeSkillId]) {
        const skillData = mapping[activeSkillId];
        const count = skillData.projects.length;
        const suffix = lang === "en" ? (count > 1 ? "projects" : "project") : "dự án";
        if (bannerCount) bannerCount.textContent = `(${count} ${suffix})`;
      }
    };
  }

  // Export to window
  window.initSkillProjectLinking = initSkillProjectLinking;
  window.normalizeTagToSkillId = normalizeTagToSkillId;
})();
