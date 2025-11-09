'use strict';

/**
 * Case Studies Component
 * Handles toggle functionality for Challenge and Solution sections
 */

const CaseStudies = {
  init: function() {
    const toggleButtons = document.querySelectorAll("[data-toggle-section]");

    // Add event listeners to all toggle buttons
    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].addEventListener("click", function() {
        const button = this;
        const section = button.closest('.toggle-section');
        const content = section.querySelector('.case-study-section-content');
        const isActive = button.classList.contains("active");
        
        // Toggle active class
        button.classList.toggle("active");
        
        // If content is being expanded, set max-height appropriately
        if (!isActive) {
          // Expanding: get the actual height
          const scrollHeight = content.scrollHeight;
          // If content is taller than 400px, set to 400px to enable scrolling
          // Otherwise, expand to full height
          if (scrollHeight > 400) {
            content.style.maxHeight = "400px";
          } else {
            content.style.maxHeight = scrollHeight + "px";
          }
          // Force reflow to ensure transition works
          content.offsetHeight;
        } else {
          // Collapsing: set to 0
          content.style.maxHeight = "0";
        }
      });
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', CaseStudies.init);
} else {
  CaseStudies.init();
}

