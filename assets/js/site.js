// Shared navigation behavior: mobile menu, active link, scroll shadow.
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const toggle = nav.querySelector('.nav-toggle');
  const links = [...nav.querySelectorAll('.nav-link')];

  // Mobile menu open/close
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      const icon = toggle.querySelector('.bi');
      if (icon) icon.className = open ? 'bi bi-x-lg' : 'bi bi-list';
    }
  }
  if (toggle) toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  links.forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 992px)').addEventListener('change', e => { if (e.matches) setOpen(false); });

  // Highlight the link for the current page
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const pageLink = links.find(l => (l.getAttribute('href') || '').toLowerCase() === current);
  if (pageLink) {
    pageLink.classList.add('active');
    pageLink.setAttribute('aria-current', 'page');
  }

  // Switch the highlight to "Contact" while the contact section is on screen
  const contactLink = links.find(l => l.getAttribute('href') === '#contact');
  const contact = document.getElementById('contact');
  function updateContactHighlight() {
    if (!contactLink || !contact) return;
    const inView = contact.getBoundingClientRect().top < window.innerHeight * 0.6;
    contactLink.classList.toggle('active', inView);
    if (pageLink) pageLink.classList.toggle('active', !inView);
  }

  // Slightly stronger nav background once the page is scrolled
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    updateContactHighlight();
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
