/* ============================================
   GYM 51 — Main JavaScript
   Interactivity, Animations & WhatsApp Links
   ============================================ */

(function () {
  'use strict';

  /* ---------- CONFIG ---------- */
  const CONFIG = {
    waNumber: '6282124558775',    // Nomor WhatsApp resmi GYM 51
    gymName: 'GYM 51',
  };

  /* ---------- HEADER SCROLL ---------- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- MOBILE NAV ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---------- COUNTER ANIMATION ---------- */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      if (counter.dataset.animated === 'true') return;

      const target = parseInt(counter.dataset.count, 10);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        counter.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      }

      counter.dataset.animated = 'true';
      requestAnimationFrame(step);
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          if (entry.target.querySelector('[data-count]')) {
            animateCounters();
          }

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('open');
        faq.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- WHATSAPP LINK BUILDER ---------- */
  function buildWaLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${CONFIG.waNumber}?text=${encoded}`;
  }

  document.querySelectorAll('[data-wa-msg]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = el.dataset.waMsg;
      window.open(buildWaLink(msg), '_blank');
    });
  });

  /* Floating WA */
  const floatingWa = document.getElementById('floatingWa');
  if (floatingWa) {
    floatingWa.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(
        buildWaLink(`Halo ${CONFIG.gymName}, saya ingin bertanya mengenai membership dan fasilitas gym. Terima kasih!`),
        '_blank'
      );
    });
  }

  /* ---------- SMOOTH SCROLL for anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
