/* =========================================================
   COMMpanion Hub POC — main.js
   Shared across all 8 pages.
   Mobile nav · dropdown · active-page highlight ·
   header scroll-state · scroll reveal · FAQ accordion ·
   footer year stamp. All motion respects prefers-reduced-motion.
   ========================================================= */

(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------
  // Footer year
  // -------------------------------------------------------
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // -------------------------------------------------------
  // Header scroll state (shadow / shrink)
  // -------------------------------------------------------
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // -------------------------------------------------------
  // Mobile nav toggle
  // -------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  const closeMobileNav = () => {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    primaryNav.classList.remove('is-open');
    // collapse any open dropdown groups when closing
    primaryNav.querySelectorAll('.has-dropdown.is-open').forEach(group => {
      group.classList.remove('is-open');
      const trig = group.querySelector('.nav-trigger');
      if (trig) trig.setAttribute('aria-expanded', 'false');
    });
  };

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      const next = !isOpen;
      navToggle.setAttribute('aria-expanded', String(next));
      navToggle.setAttribute('aria-label', next ? 'Close menu' : 'Open menu');
      primaryNav.classList.toggle('is-open', next);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileNav();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!primaryNav.classList.contains('is-open')) return;
      const target = e.target;
      if (header && !header.contains(target)) closeMobileNav();
    });
  }

  // -------------------------------------------------------
  // Programs dropdown (desktop click toggle + mobile expand)
  // -------------------------------------------------------
  document.querySelectorAll('.has-dropdown').forEach(group => {
    const trigger = group.querySelector('.nav-trigger');
    if (!trigger) return;
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const open = !group.classList.contains('is-open');
      // Close other open groups
      document.querySelectorAll('.has-dropdown.is-open').forEach(g => {
        if (g !== group) {
          g.classList.remove('is-open');
          const t = g.querySelector('.nav-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      group.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    });

    // Close dropdown when an item inside is clicked (mobile)
    group.querySelectorAll('.nav-dropdown a').forEach(a => {
      a.addEventListener('click', () => {
        group.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        closeMobileNav();
      });
    });

    // Keyboard: Esc closes dropdown
    group.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        group.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  });

  // Close desktop dropdown when clicking outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.has-dropdown.is-open').forEach(group => {
      if (!group.contains(e.target)) {
        group.classList.remove('is-open');
        const t = group.querySelector('.nav-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // -------------------------------------------------------
  // Active-page highlight in nav
  // -------------------------------------------------------
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const programPages = new Set(['primary-care.html', 'weight-management.html', 'executive-health.html', 'programs.html']);

  document.querySelectorAll('.primary-nav a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    if (href === path) {
      a.classList.add('is-current');
      a.setAttribute('aria-current', 'page');
    }
  });
  // Mark "Programs ▾" as current when on any program-related page
  if (programPages.has(path)) {
    const progTrigger = document.querySelector('.has-dropdown .nav-trigger');
    if (progTrigger) progTrigger.classList.add('is-current');
  }

  // -------------------------------------------------------
  // Smooth scroll for in-page anchors with header offset
  // (CSS scroll-padding-top handles native; this is a fallback
  // to also work with focus management)
  // -------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    a.addEventListener('click', (e) => {
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      // Move focus to the target for a11y
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // -------------------------------------------------------
  // Scroll reveal (IntersectionObserver)
  // -------------------------------------------------------
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
  }

  // -------------------------------------------------------
  // FAQ accordion (contact page)
  // -------------------------------------------------------
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });

})();
