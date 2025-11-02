'use strict';

/**
 * Utility Functions
 */

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
};

// Helper function to safely update element
function updateElement(id, value, fallback = '0') {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value !== null && value !== undefined ? value : fallback;
  }
}

// Export for use in other modules (if needed)
if (typeof window !== 'undefined') {
  window.utils = {
    elementToggleFunc,
    updateElement
  };
}

