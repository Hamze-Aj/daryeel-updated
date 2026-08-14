// ============================================================
// DARYEEL RURAL DEVELOPMENT FOR ACTION
// main.js — Mobile nav + Hero carousel
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen.toString());
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  // --- Hero Carousel ---
  const carousel  = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides    = carousel.querySelectorAll('.carousel__slide');
  const dots      = carousel.querySelectorAll('.carousel__dot');
  const prevBtn   = document.getElementById('carousel-prev');
  const nextBtn   = document.getElementById('carousel-next');
  let current     = 0;
  let timer       = null;
  const INTERVAL  = 5000;

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function startAuto() {
    timer = setInterval(function () { goTo(current + 1); }, INTERVAL);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  // Prev / Next
  prevBtn.addEventListener('click', function () { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', function () { stopAuto(); goTo(current + 1); startAuto(); });

  // Dots
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Start
  startAuto();

});

