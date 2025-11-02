'use strict';

/**
 * Portfolio Component
 * Handles portfolio filtering functionality
 */

const Portfolio = {
  filterFunc: function(selectedValue) {
    const filterItems = document.querySelectorAll("[data-filter-item]");
    
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  },

  init: function() {
    const select = document.querySelector("[data-select]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-selecct-value]");
    const filterBtn = document.querySelectorAll("[data-filter-btn]");
    const filterItems = document.querySelectorAll("[data-filter-item]");

    // Only add event listeners if elements exist
    if (select && window.utils) {
      select.addEventListener("click", function () { 
        window.utils.elementToggleFunc(this); 
      });
    }

    // Add event in all select items (only if elements exist)
    if (selectItems.length > 0 && selectValue && filterItems.length > 0 && window.utils) {
      for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener("click", function () {
          let selectedValue = this.innerText.toLowerCase();
          selectValue.innerText = this.innerText;
          window.utils.elementToggleFunc(select);
          Portfolio.filterFunc(selectedValue);
        });
      }
    }

    // Add event in all filter button items for large screen (only if elements exist)
    if (filterBtn.length > 0 && selectValue && filterItems.length > 0) {
      let lastClickedBtn = filterBtn[0];

      for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener("click", function () {
          let selectedValue = this.innerText.toLowerCase();
          selectValue.innerText = this.innerText;
          Portfolio.filterFunc(selectedValue);

          lastClickedBtn.classList.remove("active");
          this.classList.add("active");
          lastClickedBtn = this;
        });
      }
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Portfolio.init);
} else {
  Portfolio.init();
}

