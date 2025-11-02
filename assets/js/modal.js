'use strict';

/**
 * Modal Component
 * Handles testimonials modal functionality
 */

const Modal = {
  testimonialsModalFunc: function() {
    const modalContainer = document.querySelector("[data-modal-container]");
    const overlay = document.querySelector("[data-overlay]");
    
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  },

  init: function() {
    const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
    const modalContainer = document.querySelector("[data-modal-container]");
    const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
    const overlay = document.querySelector("[data-overlay]");
    const modalImg = document.querySelector("[data-modal-img]");
    const modalTitle = document.querySelector("[data-modal-title]");
    const modalText = document.querySelector("[data-modal-text]");

    // Add click event to all modal items (only if elements exist)
    if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
      for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener("click", function () {
          const avatar = this.querySelector("[data-testimonials-avatar]");
          const title = this.querySelector("[data-testimonials-title]");
          const text = this.querySelector("[data-testimonials-text]");

          if (avatar && title && text) {
            modalImg.src = avatar.src;
            modalImg.alt = avatar.alt;
            modalTitle.innerHTML = title.innerHTML;
            modalText.innerHTML = text.innerHTML;

            Modal.testimonialsModalFunc();
          }
        });
      }
    }

    // Add click event to modal close button (only if elements exist)
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", Modal.testimonialsModalFunc);
    }
    
    if (overlay) {
      overlay.addEventListener("click", Modal.testimonialsModalFunc);
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Modal.init);
} else {
  Modal.init();
}

