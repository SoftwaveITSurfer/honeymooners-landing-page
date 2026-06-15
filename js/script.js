/* =====================================================
   HONEYMOONERS LANDING PAGE — JAVASCRIPT
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Navbar scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      /* Close all others */
      faqItems.forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').setAttribute('hidden', '');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });

      /* Toggle current */
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        ans.setAttribute('hidden', '');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        ans.removeAttribute('hidden');
      }
    });
  });

  /* ---------- Live countdown in hero phone mockup ---------- */
  function updateHeroCountdown() {
    /* Target date: 127 days from now — demonstrates the feature */
    const now    = new Date();
    const target = new Date(now.getTime() + 127 * 24 * 60 * 60 * 1000);

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) return;

      const d  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s  = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = document.getElementById('days');
      const hEl = document.getElementById('hours');
      const mEl = document.getElementById('mins');
      const sEl = document.getElementById('secs');

      if (dEl) dEl.textContent = String(d).padStart(2, '0');
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
  }

  updateHeroCountdown();

  /* ---------- Add stagger delay to feature cards ---------- */
  document.querySelectorAll('.features-grid .reveal').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - navbar.offsetHeight - 80;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--rose)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---------- Animate number counters on first view ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const raw    = el.textContent;
        const num    = parseFloat(raw.replace(/[^\d.]/g, ''));
        const suffix = raw.replace(/[\d.]/g, '');
        const dur    = 1200;
        const step   = 16;
        const steps  = dur / step;
        let current  = 0;
        const inc    = num / steps;

        const timer = setInterval(() => {
          current = Math.min(current + inc, num);
          const display = Number.isInteger(num) ? Math.round(current) : current.toFixed(1);
          el.textContent = display + suffix;
          if (current >= num) clearInterval(timer);
        }, step);
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

})();
