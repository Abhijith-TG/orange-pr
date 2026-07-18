// ==========================================================================
// TESTIMONIALS SLIDER
// ==========================================================================

(function () {
  'use strict';

  const AUTOPLAY_DELAY = 5000;

  const slider = document.getElementById('testimonialsSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonials__slide');
  const pages = slider.querySelectorAll('.testimonials__page');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  if (!slides.length) return;

  let current = 0;
  let total = slides.length;
  let timer = null;

  // ── Go to a specific slide ──────────────────────────────────────────────
  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    if (pages[current]) pages[current].classList.remove('is-active');

    current = index;
    
    if (pages[current]) pages[current].classList.add('is-active');

    // Slide animation
    slides.forEach(slide => {
      slide.style.transform = `translateX(-${current * 100}%)`;
    });
  }

  // ── Autoplay ────────────────────────────────────────────────────────────
  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => goTo(current + 1), AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // ── Event listeners ─────────────────────────────────────────────────────
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo(current - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
      startAutoplay();
    });
  }

  pages.forEach((page) => {
    page.addEventListener('click', () => {
      const target = parseInt(page.dataset.index, 10);
      goTo(target);
      startAutoplay();
    });
  });

  // ── Pause on hover ──────────────────────────────────────────────────────
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // ── Swipe gestures ────────────────────────────────────────────────────────
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      goTo(current + 1); startAutoplay();
    }
    if (touchEndX > touchStartX + 50) {
      goTo(current - 1); startAutoplay();
    }
  }

  // ── Init ────────────────────────────────────────────────────────────────
  startAutoplay();

})();
