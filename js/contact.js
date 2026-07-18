// ==========================================================================
// CONTACT FORM VALIDATION & TOAST NOTIFICATIONS
// ==========================================================================

(function () {
  'use strict';

  const form = document.querySelector('.contact__form');
  if (!form) return;

  const emailInput = form.querySelector('input[type="email"]');
  const phoneInput = form.querySelector('input[type="tel"]');

  // Helper to show invalid state
  function setInvalid(input, message) {
    input.classList.add('is-invalid');
    input.setCustomValidity(message);

    // Dynamic error message positioning
    let errorText = input.nextElementSibling;
    if (!errorText || !errorText.classList.contains('contact__error-message')) {
      errorText = document.createElement('div');
      errorText.className = 'contact__error-message';
      errorText.style.color = '#E05252';
      errorText.style.fontSize = '12px';
      errorText.style.marginTop = '4px';
      errorText.style.textAlign = 'left';
      errorText.style.width = '100%';
      input.parentNode.appendChild(errorText);
    }
    errorText.textContent = message;
    errorText.style.display = 'block';
  }

  // Helper to clear invalid state
  function setValid(input) {
    input.classList.remove('is-invalid');
    input.setCustomValidity('');
    const errorText = input.nextElementSibling;
    if (errorText && errorText.classList.contains('contact__error-message')) {
      errorText.style.display = 'none';
    }
  }

  // Email validation logic
  function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
      setInvalid(emailInput, 'Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInvalid(emailInput, 'Please enter a valid email address');
      return false;
    }
    setValid(emailInput);
    return true;
  }

  // Phone validation logic (min 10 digits)
  function validatePhone() {
    const phone = phoneInput.value.trim();
    if (!phone) {
      setInvalid(phoneInput, 'Phone number is required');
      return false;
    }
    // Clean out non-digit characters to allow standard patterns like (123) 456-7890
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setInvalid(phoneInput, 'Phone number must be at least 10 digits');
      return false;
    }
    setValid(phoneInput);
    return true;
  }

  // Real-time validation listeners
  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);

  // Form submission handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    if (isEmailValid && isPhoneValid) {
      showToast('Success! Your message has been sent.');
      form.reset();
      
      // Reset validation states after clearing
      setValid(emailInput);
      setValid(phoneInput);
    }
  });

  // ── TOAST SYSTEM ──────────────────────────────────────────────────────────
  function showToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.position = 'fixed';
      toastContainer.style.top = '24px';
      toastContainer.style.bottom = 'auto';
      toastContainer.style.right = '24px';
      toastContainer.style.zIndex = '9999';
      toastContainer.style.display = 'flex';
      toastContainer.style.flexDirection = 'column';
      toastContainer.style.gap = '8px';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-notification__body">
        <span class="toast-notification__message">${message}</span>
        <button class="toast-notification__close" aria-label="Close">&times;</button>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Trigger reflow to initialize smooth slide animation
    toast.offsetHeight;
    toast.classList.add('is-visible');

    // Dismiss click handler
    const closeBtn = toast.querySelector('.toast-notification__close');
    closeBtn.addEventListener('click', () => dismissToast(toast));

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(toast);
    }, 4000);
  }

  function dismissToast(toast) {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', function handler() {
      toast.remove();
      toast.removeEventListener('transitionend', handler);
    });
  }

})();
