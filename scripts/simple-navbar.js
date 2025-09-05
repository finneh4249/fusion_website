document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  if (!toggle || !menu) return;

  const ddButtons = menu.querySelectorAll('.has-dropdown > button.dd-toggle');

  function closeAllDropdowns(except = null) {
    ddButtons.forEach(btn => {
      if (btn !== except) {
        btn.parentElement.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
    if (!expanded) {
      // close any open dropdowns when opening menu fresh
      closeAllDropdowns();
    }
  });

  ddButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const li = btn.parentElement;
      const isOpen = li.classList.contains('open');
      if (window.matchMedia('(max-width: 900px)').matches) {
        // Accordion style on mobile
        if (!isOpen) closeAllDropdowns(btn);
      }
      li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(!isOpen));
      e.stopPropagation();
    });

    btn.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        const first = btn.parentElement.querySelector('.dropdown a');
        if (first) {
          e.preventDefault();
          btn.parentElement.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          first.focus();
        }
      }
      if (e.key === 'Escape') {
        btn.parentElement.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
  });

  // Close menu on resize up to desktop
  let lastIsMobile = window.matchMedia('(max-width: 900px)').matches;
  window.addEventListener('resize', () => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (!isMobile && lastIsMobile) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
    lastIsMobile = isMobile;
  });
});
