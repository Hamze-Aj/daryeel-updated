'use client';

import { useEffect } from 'react';

export default function SiteInteractions() {
  useEffect(() => {
    const toggle = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('main-nav');

    if (toggle && nav) {
      const closeMenu = () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      };

      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.textContent = isOpen ? '✕' : '☰';
      });

      nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    }

    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
      const slides = Array.from(carousel.querySelectorAll<HTMLElement>('.carousel__slide'));
      const dots = Array.from(carousel.querySelectorAll<HTMLElement>('.carousel__dot'));
      const previous = document.getElementById('carousel-prev');
      const next = document.getElementById('carousel-next');
      let current = 0;
      let timer: ReturnType<typeof setInterval> | undefined;

      const goTo = (index: number) => {
        slides[current]?.classList.remove('is-active');
        dots[current]?.classList.remove('is-active');
        current = (index + slides.length) % slides.length;
        slides[current]?.classList.add('is-active');
        dots[current]?.classList.add('is-active');
      };
      const stop = () => {
        if (timer) clearInterval(timer);
      };
      const start = () => {
        stop();
        timer = setInterval(() => goTo(current + 1), 5000);
      };

      previous?.addEventListener('click', () => { stop(); goTo(current - 1); start(); });
      next?.addEventListener('click', () => { stop(); goTo(current + 1); start(); });
      dots.forEach((dot, index) => dot.addEventListener('click', () => { stop(); goTo(index); start(); }));
      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', start);
      start();
    }

    const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.filter-btn'));
    const galleryCards = Array.from(document.querySelectorAll<HTMLElement>('.gallery-card'));
    const showingText = document.getElementById('showing-text');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-img') as HTMLImageElement | null;
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    let visibleCards = galleryCards;
    let currentImage = 0;

    const showImage = (index: number) => {
      const card = visibleCards[(index + visibleCards.length) % visibleCards.length];
      if (!card || !lightbox || !lightboxImage) return;
      currentImage = (index + visibleCards.length) % visibleCards.length;
      lightboxImage.src = card.dataset.src ?? '';
      lightboxImage.alt = card.dataset.title ?? '';
      if (lightboxTitle) lightboxTitle.textContent = card.dataset.title ?? '';
      if (lightboxDescription) lightboxDescription.textContent = card.dataset.desc ?? '';
      if (lightboxCounter) lightboxCounter.textContent = `Image ${currentImage + 1} of ${visibleCards.length}`;
    };

    filterButtons.forEach((button) => button.addEventListener('click', () => {
      const filter = button.dataset.filter ?? 'all';
      filterButtons.forEach((item) => {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-selected', String(item === button));
      });
      visibleCards = galleryCards.filter((card) => filter === 'all' || card.dataset.category === filter);
      galleryCards.forEach((card) => card.classList.toggle('is-hidden', !visibleCards.includes(card)));
      if (showingText) showingText.innerHTML = `Showing ${filter === 'all' ? 'all' : filter} <strong>${visibleCards.length}</strong> photos`;
    }));

    galleryCards.forEach((card, index) => card.addEventListener('click', () => {
      visibleCards = galleryCards.filter((item) => !item.classList.contains('is-hidden'));
      showImage(visibleCards.indexOf(card) >= 0 ? visibleCards.indexOf(card) : index);
      lightbox?.classList.add('is-open');
      lightbox?.setAttribute('aria-hidden', 'false');
    }));

    document.getElementById('lightbox-close')?.addEventListener('click', () => {
      lightbox?.classList.remove('is-open');
      lightbox?.setAttribute('aria-hidden', 'true');
    });
    document.getElementById('lightbox-prev')?.addEventListener('click', () => showImage(currentImage - 1));
    document.getElementById('lightbox-next')?.addEventListener('click', () => showImage(currentImage + 1));

    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    const alertBox = document.getElementById('form-alert');
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = (document.getElementById('form-name') as HTMLInputElement | null)?.value.trim();
      const email = (document.getElementById('form-email') as HTMLInputElement | null)?.value.trim();
      const message = (document.getElementById('form-message') as HTMLTextAreaElement | null)?.value.trim();
      if (!alertBox) return;
      alertBox.className = `form-alert ${name && email && message ? 'form-alert--success' : 'form-alert--error'}`;
      alertBox.textContent = name && email && message
        ? `Thank you, ${name}! Your message has been sent successfully. Eng Hamza or a Daryeel representative will reach out to you shortly.`
        : 'Please fill out all required fields (Name, Email, and Message).';
      if (name && email && message) form.reset();
    });
  }, []);

  return null;
}