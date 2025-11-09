'use strict';

/**
 * Contact Form Component
 * Handles contact form validation and submission using EmailJS
 */

const Contact = {
  // EmailJS Configuration
  config: {
    serviceId: 'service_c47qaig', // Your EmailJS Service ID
    templateId: 'template_akd14y8', // Your EmailJS Template ID
    publicKey: 'zudSWjBzbzSI-jWJhG6Dy' // Your EmailJS Public Key
  },

  init: function() {
    const form = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formBtn = document.querySelector("[data-form-btn]");
    const formMessage = document.querySelector("[data-form-message]");
    const btnText = document.querySelector("[data-btn-text]");

    // Debug: Check if elements are found
    if (!form) console.warn('Contact form not found');
    if (!formBtn) console.warn('Contact form button not found');
    if (formInputs.length === 0) console.warn('No form inputs found');

    // Initialize EmailJS (wait for it to load if needed)
    const publicKey = this.config.publicKey;
    if (typeof emailjs !== 'undefined' && publicKey && publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(publicKey);
    } else {
      // Wait for EmailJS to load
      window.addEventListener('load', () => {
        if (typeof emailjs !== 'undefined' && publicKey && publicKey !== 'YOUR_PUBLIC_KEY') {
          emailjs.init(publicKey);
        }
      });
    }

    // Add event to all form input field (only if form exists)
    if (form && formInputs.length > 0 && formBtn) {
      // Function to check and update button state
      const updateButtonState = () => {
        // Check each field individually
        let allValid = true;
        for (let i = 0; i < formInputs.length; i++) {
          const input = formInputs[i];
          if (input.hasAttribute('required')) {
            if (input.type === 'email') {
              // Email validation
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!input.value.trim() || !emailPattern.test(input.value.trim())) {
                allValid = false;
                break;
              }
            } else {
              // Text/textarea validation
              if (!input.value.trim()) {
                allValid = false;
                break;
              }
            }
          }
        }

        if (allValid) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
        return allValid;
      };

      // Real-time validation on input, change, and blur events
      for (let i = 0; i < formInputs.length; i++) {
        // Input event for real-time validation
        formInputs[i].addEventListener("input", function () {
          updateButtonState();
          // Clear message when user starts typing
          if (formMessage) {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
          }
        });

        // Change event for select/dropdown changes
        formInputs[i].addEventListener("change", updateButtonState);

        // Blur event to validate when user leaves field
        formInputs[i].addEventListener("blur", updateButtonState);
      }

      // Initial check (in case form is pre-filled)
      updateButtonState();

      // Form submission handler
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit(form, formBtn, formMessage, btnText);
      });
    }
  },

  handleSubmit: function(form, formBtn, formMessage, btnText) {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      this.showMessage(formMessage, 'EmailJS is not loaded. Please check your internet connection.', 'error');
      return;
    }

    // Check if credentials are configured
    if (this.config.serviceId === 'YOUR_SERVICE_ID' || 
        this.config.templateId === 'YOUR_TEMPLATE_ID' || 
        this.config.publicKey === 'YOUR_PUBLIC_KEY') {
      this.showMessage(formMessage, 'EmailJS is not configured. Please add your credentials in contact.js', 'error');
      return;
    }

    // Disable form and show loading state
    formBtn.setAttribute("disabled", "");
    if (btnText) {
      btnText.textContent = 'Sending...';
    }
    if (formMessage) {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }

    // Send email using EmailJS
    emailjs.sendForm(
      this.config.serviceId,
      this.config.templateId,
      form,
      this.config.publicKey
    )
    .then(() => {
      // Success
      this.showMessage(formMessage, 'Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      formBtn.setAttribute("disabled", "");
      if (btnText) {
        btnText.textContent = 'Send Message';
      }
    })
    .catch((error) => {
      // Error
      console.error('EmailJS Error:', error);
      this.showMessage(formMessage, 'Failed to send message. Please try again later or contact me directly at kaleshabox8@gmail.com', 'error');
      formBtn.removeAttribute("disabled");
      if (btnText) {
        btnText.textContent = 'Send Message';
      }
    });
  },

  showMessage: function(formMessage, message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Contact.init);
} else {
  Contact.init();
}

