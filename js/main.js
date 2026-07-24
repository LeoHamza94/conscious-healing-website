// Conscious-Healing LLC — shared site behavior

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll('.nav-links a').forEach((link) => {
      if (link.dataset.page === currentPage) link.classList.add('active');
    });
  }

  document.querySelectorAll('.nav-dropdown-toggle').forEach((btn) => {
    const dropdown = btn.closest('.nav-dropdown');
    if (!dropdown) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.querySelectorAll('.framework-accordion-item').forEach((item) => {
    const toggle = item.querySelector('.framework-accordion-toggle');
    const panel = item.querySelector('.framework-accordion-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      toggle.setAttribute('aria-expanded', String(!isOpen));
      item.classList.toggle('open', !isOpen);
    });
  });
});
