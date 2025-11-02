'use strict';

/**
 * Sidebar Component
 * Handles sidebar toggle functionality for mobile
 */

const Sidebar = {
  init: function() {
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");

    // Sidebar toggle functionality for mobile (only if elements exist)
    if (sidebarBtn && sidebar && window.utils) {
      sidebarBtn.addEventListener("click", function () { 
        window.utils.elementToggleFunc(sidebar); 
      });
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Sidebar.init);
} else {
  Sidebar.init();
}

