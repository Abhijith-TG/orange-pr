// ==========================================================================
// HERO SLIDER
// Handles: next/prev arrows, dot navigation, auto-advance, keyboard support
// ==========================================================================

(function () {
  'use strict';

  const AUTOPLAY_DELAY = 6000;

  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (!slides.length) return;

  let current  = 0;
  let total    = slides.length;
  let timer    = null;

  // ── Go to a specific slide ──────────────────────────────────────────────
  function goTo(index) {
    // Bounds wrapping
    if (index < 0)      index = total - 1;
    if (index >= total) index = 0;

    // Deactivate current
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');

    // Activate target
    current = index;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
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
      startAutoplay(); // reset timer on manual interaction
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
      startAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.target, 10);
      goTo(target);
      startAutoplay();
    });
  });

  // ── Keyboard navigation ─────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAutoplay(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAutoplay(); }
  });

  // ── Pause on hover ──────────────────────────────────────────────────────
  const hero = document.getElementById('heroSlider');
  if (hero) {
    hero.addEventListener('mouseenter', stopAutoplay);
    hero.addEventListener('mouseleave', startAutoplay);
  }

  // ── Init ────────────────────────────────────────────────────────────────
  startAutoplay();

})();
