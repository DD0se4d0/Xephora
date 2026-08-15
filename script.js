// ==========================================================================
// XEPHORA — shared interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => cio.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------- Active nav link highlight (current page) ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href').split('#')[0];
    if (href === path || (href === 'index.html' && path === '')) {
      a.classList.add('active');
    }
  });

  /* =====================================================================
     DOCS PAGE — search + category filter + user/admin filter
     ===================================================================== */
  const searchInput = document.getElementById('docs-search');
  if (searchInput) {
    const filterChips = document.querySelectorAll('.filter-chip');
    const cmdCards = document.querySelectorAll('.cmd-card');
    const catBlocks = document.querySelectorAll('.docs-cat');
    const searchCount = document.getElementById('search-count');
    const noResults = document.getElementById('no-results');
    let activeAudience = 'all';

    const applyFilters = () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      catBlocks.forEach(cat => {
        let anyVisibleInCat = false;
        cat.querySelectorAll('.cmd-card').forEach(card => {
          const name = card.getAttribute('data-name') || '';
          const desc = card.getAttribute('data-desc') || '';
          const audience = card.getAttribute('data-audience') || 'user';

          const matchesQuery = !query || name.includes(query) || desc.includes(query);
          const matchesAudience = activeAudience === 'all' || audience === activeAudience;
          const visible = matchesQuery && matchesAudience;

          card.classList.toggle('hidden', !visible);
          if (visible) { anyVisibleInCat = true; visibleCount++; }
        });
        cat.classList.toggle('hidden', !anyVisibleInCat);
      });

      if (searchCount) {
        searchCount.textContent = visibleCount + (visibleCount === 1 ? ' comando' : ' comandos');
      }
      if (noResults) {
        noResults.classList.toggle('show', visibleCount === 0);
      }
    };

    searchInput.addEventListener('input', applyFilters);

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeAudience = chip.getAttribute('data-filter');
        applyFilters();
      });
    });

    applyFilters();

    /* Sidebar category quick-jump active state on scroll */
    const navAnchors = document.querySelectorAll('.docs-nav a[href^="#"]');
    if ('IntersectionObserver' in window && navAnchors.length) {
      const catIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      catBlocks.forEach(cat => catIO.observe(cat));
    }
  }

});
