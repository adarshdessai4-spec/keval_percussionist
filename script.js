document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.top-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav-links a, .mobile-link');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(0, 0, 0, 0.85)';
    } else {
      nav.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.75), transparent)';
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);

  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        document.body.classList.remove('nav-open');
      }
    });
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
  }
});
