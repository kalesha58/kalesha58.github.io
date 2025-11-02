'use strict';

/**
 * Main Script
 * Initializes all components
 * Components are auto-initialized, but this file ensures proper load order
 */

// All components are self-initializing, but we can add any global initialization here
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio components initialized');
  
  // Components will initialize themselves:
  // - utils.js: Utility functions
  // - sidebar.js: Sidebar functionality
  // - navigation.js: Page navigation
  // - theme.js: Theme toggle
  // - github.js: GitHub analytics
  // - portfolio.js: Portfolio filtering
  // - contact.js: Contact form
  // - modal.js: Modal functionality
});
