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
  // Active-page highlight in nav.
  // Top-level links and dropdown items match by href; a dropdown
  // trigger lights up whenever the current page is one of its
  // menu items (so "About" lights up on care-team.html, "Programs"
  // lights up on the three program detail pages).
  // -------------------------------------------------------
  const path = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.primary-nav a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    if (href === path) {
      a.classList.add('is-current');
      a.setAttribute('aria-current', 'page');
    }
  });
  document.querySelectorAll('.has-dropdown').forEach(group => {
    const trigger = group.querySelector('.nav-trigger');
    if (!trigger) return;
    if (group.querySelector(`.nav-dropdown a[href="${path}"]`)) {
      trigger.classList.add('is-current');
    }
  });

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

  // -------------------------------------------------------
  // Insights: category chip filter (no reload)
  // -------------------------------------------------------
  const chipBar = document.querySelector('[data-filter-chips]');
  const insightsGrid = document.querySelector('[data-insights-grid]');
  const emptyState = document.querySelector('[data-filter-empty]');

  if (chipBar && insightsGrid) {
    const chips = chipBar.querySelectorAll('.filter-chip');
    const cards = insightsGrid.querySelectorAll('[data-category]');

    const applyFilter = (cat) => {
      let visible = 0;
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const match = cat === 'all' || cardCat === cat;
        card.hidden = !match;
        if (match) visible++;
      });
      if (emptyState) emptyState.classList.toggle('is-on', visible === 0);
    };

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => {
          c.classList.toggle('is-active', c === chip);
          c.setAttribute('aria-pressed', String(c === chip));
        });
        applyFilter(chip.getAttribute('data-filter') || 'all');
      });
    });
  }

  // -------------------------------------------------------
  // Share bar (article pages)
  // -------------------------------------------------------
  const shareBars = document.querySelectorAll('[data-share-bar]');

  const flashToast = (toast) => {
    if (!toast) return;
    toast.classList.add('is-on');
    window.setTimeout(() => toast.classList.remove('is-on'), 1800);
  };

  // -------------------------------------------------------
  // Care team: click-to-expand card + program filter
  // -------------------------------------------------------
  document.querySelectorAll('[data-team-card]').forEach(card => {
    const toggle = () => {
      const expanded = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', String(!expanded));
    };
    card.addEventListener('click', (e) => {
      // Don't toggle when a real link inside the expanded content was clicked
      if (e.target.closest('a')) return;
      toggle();
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  const teamChips = document.querySelector('[data-team-chips]');
  const teamGrid = document.querySelector('[data-team-grid]');
  if (teamChips && teamGrid) {
    const chips = teamChips.querySelectorAll('.filter-chip');
    const cards = teamGrid.querySelectorAll('[data-program]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const target = chip.getAttribute('data-filter') || 'all';
        chips.forEach(c => {
          c.classList.toggle('is-active', c === chip);
          c.setAttribute('aria-pressed', String(c === chip));
        });
        cards.forEach(card => {
          const prog = card.getAttribute('data-program');
          // Cross-program cards (data-program="all") show on every filter
          const show = target === 'all' || prog === target || prog === 'all';
          card.hidden = !show;
          if (!show && card.getAttribute('aria-expanded') === 'true') {
            card.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });
  }

  shareBars.forEach(bar => {
    const toast = bar.querySelector('[data-copy-toast]');

    bar.querySelectorAll('[data-share]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const kind = btn.getAttribute('data-share');
        const url = window.location.href;
        const title = document.title;

        // Copy link uses Clipboard API; rest open share endpoints in new tab
        if (kind === 'copy') {
          e.preventDefault();
          try {
            await navigator.clipboard.writeText(url);
            flashToast(toast);
          } catch (err) {
            // Fallback: select-and-copy via temporary input
            const tmp = document.createElement('input');
            tmp.value = url;
            document.body.appendChild(tmp);
            tmp.select();
            try { document.execCommand('copy'); flashToast(toast); }
            catch (_) { /* swallow — UI already gives the URL via the address bar */ }
            tmp.remove();
          }
          return;
        }

        let target;
        const u = encodeURIComponent(url);
        const t = encodeURIComponent(title);
        if (kind === 'linkedin') target = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
        else if (kind === 'facebook') target = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
        else if (kind === 'x') target = `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
        if (!target) return;
        e.preventDefault();
        window.open(target, '_blank', 'noopener,noreferrer');
      });
    });
  });

})();
