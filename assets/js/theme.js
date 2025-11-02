'use strict';

/**
 * Theme Toggle Component
 * Handles dark/light theme switching
 */

const Theme = {
  init: function() {
    const themeToggleBtn = document.querySelector("[data-theme-toggle]");
    const themeIcon = document.querySelector(".theme-icon");
    const html = document.documentElement;

    // Get theme from localStorage or default to dark
    const currentTheme = localStorage.getItem("theme") || "dark";

    // Set initial theme
    if (currentTheme === "light") {
      html.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.setAttribute("name", "sunny-outline");
    } else {
      html.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.setAttribute("name", "moon-outline");
    }

    // Theme toggle function
    if (themeToggleBtn && themeIcon) {
      themeToggleBtn.addEventListener("click", function () {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        // Update icon
        if (newTheme === "light") {
          themeIcon.setAttribute("name", "sunny-outline");
        } else {
          themeIcon.setAttribute("name", "moon-outline");
        }

        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
      });
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Theme.init);
} else {
  Theme.init();
}

