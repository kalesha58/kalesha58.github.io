'use strict';

/**
 * Navigation Component
 * Handles page navigation between different sections
 */

const Navigation = {
  init: function() {
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");

    // Add event to all nav links
    for (let i = 0; i < navigationLinks.length; i++) {
      navigationLinks[i].addEventListener("click", function () {
        const clickedLinkText = this.textContent.trim().toLowerCase();

        // Remove active class from all pages and nav links
        for (let j = 0; j < pages.length; j++) {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }

        // Add active class to matching page and nav link
        for (let j = 0; j < pages.length; j++) {
          const pageName = pages[j].dataset.page;
          if (clickedLinkText === pageName) {
            pages[j].classList.add("active");
            navigationLinks[i].classList.add("active");
            window.scrollTo(0, 0);
            break;
          }
        }
      });
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Navigation.init);
} else {
  Navigation.init();
}

