'use strict';

/**
 * Contact Form Component
 * Handles contact form validation and submission
 */

const Contact = {
  init: function() {
    const form = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formBtn = document.querySelector("[data-form-btn]");

    // Add event to all form input field (only if form exists)
    if (form && formInputs.length > 0 && formBtn) {
      for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("input", function () {
          // Check form validation
          if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
          } else {
            formBtn.setAttribute("disabled", "");
          }
        });
      }
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Contact.init);
} else {
  Contact.init();
}

