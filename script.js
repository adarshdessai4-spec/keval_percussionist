document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.top-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav-links a, .mobile-link');
  const body = document.body;
  const sections = document.querySelectorAll('section[id]');

  const setNavOpen = open => {
    if (open) {
      body.classList.add('nav-open');
      toggle && toggle.classList.add('open');
    } else {
      body.classList.remove('nav-open');
      toggle && toggle.classList.remove('open');
    }
  };

  const handleScroll = () => {
    if (!nav) return;
    nav.style.background = window.scrollY > 40
      ? 'rgba(5, 5, 9, 0.92)'
      : 'linear-gradient(180deg, rgba(5, 5, 9, 0.92), rgba(5, 5, 9, 0.45))';
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
        setNavOpen(false);
      }
    });
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      setNavOpen(!body.classList.contains('nav-open'));
    });
  }

  if (sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!navLink) return;
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          navLink.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(section => observer.observe(section));
  }

  document.querySelectorAll('.playlist-group').forEach(group => {
    const scroller = group.querySelector('.thumb-grid');
    const prev = group.querySelector('.slider-btn.prev');
    const next = group.querySelector('.slider-btn.next');
    if (!scroller || !prev || !next) return;

    const scrollAmount = () => Math.max(scroller.clientWidth * 0.8, 220);

    prev.addEventListener('click', () => {
      scroller.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      scroller.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      setNavOpen(false);
    }
  });

  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') setNavOpen(false);
  });

  document.addEventListener('pointerdown', e => {
    if (!body.classList.contains('nav-open')) return;
    if (window.innerWidth > 1024) return;
    if (nav && !nav.contains(e.target)) {
      setNavOpen(false);
    }
  });
});
