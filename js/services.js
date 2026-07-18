// ==========================================================================
// SERVICES SECTION
// Handles: accordion card hover, left content sync, pagination indicator
// ==========================================================================

(function () {
  'use strict';

  const gallery = document.getElementById('servicesGallery');
  const tagline = document.getElementById('servicesTagline');
  const desc = document.getElementById('servicesDesc');
  const pages = document.querySelectorAll('.services__page');
  const cards = document.querySelectorAll('.services__card');

  if (!gallery || !cards.length) return;

  function activateCard(card) {
    cards.forEach((c) => c.classList.remove('is-active'));
    card.classList.add('is-active');

    if (tagline) tagline.textContent = card.dataset.tagline;
    if (desc) desc.textContent = card.dataset.desc;

    const index = card.dataset.index;
    pages.forEach((page) => {
      page.classList.toggle('is-active', page.dataset.index === index);
    });
  }

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => activateCard(card));
    card.addEventListener('click', () => activateCard(card));
  });

  gallery.addEventListener('mouseleave', () => {
    activateCard(cards[0]);
  });
})();
