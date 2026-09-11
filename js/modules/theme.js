// ==========================================================================
// Theme (Dark / Light Mode) & Navbar Background Manager
// ==========================================================================
(function () {
  const html = document.documentElement;
  const navbar = document.getElementById("navbar");

  const NAV_RESET_CLASSES = [
    "bg-white",
    "bg-white/80",
    "bg-white/90",
    "bg-gray-800",
    "bg-gray-900",
    "bg-gray-900/80",
    "bg-gray-900/90",
    "backdrop-blur",
    "backdrop-blur-md",
    "border-b",
    "border-gray-200/60",
    "border-gray-800/60",
  ];

  function updateNavbarBackground() {
    const navEl = navbar || document.getElementById("navbar");
    if (!navEl) return;

    const isDark = html.classList.contains("dark");
    const isScrolled = window.scrollY > 50;

    navEl.classList.remove(...NAV_RESET_CLASSES);

    if (isScrolled) {
      if (isDark) {
        navEl.classList.add(
          "bg-gray-900/80",
          "backdrop-blur-md",
          "border-b",
          "border-gray-800/60"
        );
      } else {
        navEl.classList.add(
          "bg-white/80",
          "backdrop-blur-md",
          "border-b",
          "border-gray-200/60"
        );
      }
    } else {
      navEl.classList.add(isDark ? "bg-gray-800" : "bg-white");
    }
  }

  function setThemeIcons(isDark) {
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");
    if (sunIcon) sunIcon.classList.toggle("hidden", !isDark);
    if (moonIcon) moonIcon.classList.toggle("hidden", isDark);
  }

  function applyTheme(theme, persist = true) {
    const isDark = theme === "dark";
    html.classList.toggle("dark", isDark);
    setThemeIcons(isDark);

    // update dependent UI
    window.setGitHubActivityImages?.();
    updateNavbarBackground();

    if (persist) localStorage.setItem("theme", theme);
    window.dispatchEvent(new CustomEvent("portfolio:themechange", { detail: { theme, isDark } }));
  }

  function getDefaultTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }

  // Init theme: do NOT save on first load
  applyTheme(getDefaultTheme(), false);

  function toggleTheme() {
    const next = html.classList.contains("dark") ? "light" : "dark";
    applyTheme(next, true);
  }

  window.applyTheme = applyTheme;
  window.toggleTheme = toggleTheme;
  window.updateNavbarBackground = updateNavbarBackground;

  // Scroll listener for navbar background
  window.addEventListener("scroll", updateNavbarBackground, { passive: true });

  // DOMContentLoaded events
  document.addEventListener("DOMContentLoaded", () => {
    updateNavbarBackground();
    setThemeIcons(html.classList.contains("dark"));

    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");

    if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);
  });

  // Follow OS theme changes only when user hasn't chosen a theme
  const themeMQ = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  if (themeMQ && themeMQ.addEventListener) {
    themeMQ.addEventListener("change", (e) => {
      const saved = localStorage.getItem("theme");
      if (saved) return; // user already chose
      applyTheme(e.matches ? "dark" : "light", false);
    });
  }
})();
