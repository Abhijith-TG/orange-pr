(function() {
  'use strict';

  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Toggle mobile menu
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
      // Drop header z-index so logo doesn't show over the sidebar
      if (header) header.classList.toggle('nav-open');
    });
  }

  // Smooth scroll and close menu on link click
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Close mobile menu if it's open
          if (mobileNav && mobileNav.classList.contains('is-open')) {
            mobileNav.classList.remove('is-open');
            if (header) header.classList.remove('nav-open');
          }
          
          // Scroll into view
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
})();
