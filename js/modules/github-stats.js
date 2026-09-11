// ==========================================================================
// GitHub Section: Activity Graphs & Dynamic SVG Theming
// ==========================================================================
(function () {
  const GITHUB_USERNAME = "tranhohoangvu";

  function setGitHubActivityImages() {
    const contribImg = document.getElementById("github-contrib-img");
    const activityImg = document.getElementById("github-activity-img");
    if (!contribImg || !activityImg) return;

    const isDark = document.documentElement.classList.contains("dark");
    const v = Date.now(); // bust cache

    // Contributions: local svg do GitHub Actions sinh ra
    contribImg.src = isDark
      ? `assets/github/github-contrib-dark.svg?v=${v}`
      : `assets/github/github-contrib-light.svg?v=${v}`;

    // Activity Graph: local SVG do GitHub Actions tự động sinh (fallback sang online mirror)
    const activitySvg = isDark
      ? `assets/github/github-activity-dark.svg?v=${v}`
      : `assets/github/github-activity-light.svg?v=${v}`;

    activityImg.src = activitySvg;

    activityImg.onerror = () => {
      // Fallback sang online mirror nếu local SVG chưa được tải
      const graphTheme = isDark ? "github-dark" : "github-light";
      activityImg.src =
        `https://github-activity-chart.vercel.app/graph?username=${GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true`;
    };
  }

  window.setGitHubActivityImages = setGitHubActivityImages;

  // Run on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setGitHubActivityImages);
  } else {
    setGitHubActivityImages();
  }
})();
