// ==========================================================================
// STATS COUNTER
// Scroll-triggered count-up animation for About section stat numbers
// ==========================================================================

(function () {
  'use strict';

  /**
   * Animate a single counter element from 0 up to its target value.
   * @param {HTMLElement} el       - The element whose textContent to update
   * @param {number}      end      - Final number to count to
   * @param {number}      duration - Animation duration in ms
   */
  function animateCounter(el, end, duration) {
    const startTime = performance.now();

    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: fast start, slow finish
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(end * eased);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end.toLocaleString(); // Ensure exact final value
      }
    }

    requestAnimationFrame(step);
  }

  // Grab all counter elements and store their target numbers
  const counters = document.querySelectorAll('.stat-item__number');
  if (!counters.length) return;

  counters.forEach((el) => {
    const raw = el.textContent.replace(/[^0-9]/g, '');
    el.dataset.target = raw;
    el.textContent = '0'; // Start from 0 before animation triggers
  });

  // Use IntersectionObserver to trigger once stats scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const end = parseInt(el.dataset.target, 10);
        // Scale duration: larger numbers animate slightly longer
        const duration = Math.min(1500 + end / 20, 2500);
        animateCounter(el, end, duration);
        observer.unobserve(el); // Animate only once
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of the element is visible
  });

  counters.forEach((el) => observer.observe(el));

})();
