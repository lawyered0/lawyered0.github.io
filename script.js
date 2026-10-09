(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
})();
