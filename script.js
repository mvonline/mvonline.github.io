(() => {
  'use strict';

  // ===== Typewriter Effect =====
  const typedEl = document.getElementById('typedText');
  const words = [
    'Senior Backend Engineer',
    'Engineering Team Lead',
    'System Architect',
    'Open Source Contributor'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER_WORD = 2000;

  function typeWriter() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = PAUSE_AFTER_WORD;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeWriter, delay);
  }

  typeWriter();

  // ===== Mobile Navigation =====
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('open');
  });

  document.querySelectorAll('.sidebar__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      sidebar.classList.remove('open');
    });
  });

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar__link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ===== Scroll Reveal =====
  const revealElements = document.querySelectorAll('.portfolio__item, .reveal-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // ===== Skill Bars Animation =====
  const skillFills = document.querySelectorAll('.skill__fill');
  let skillsAnimated = false;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        skillFills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = width + '%';
        });
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // ===== Counter Animation =====
  const counterNumbers = document.querySelectorAll('.counter__number');
  let countersAnimated = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterNumbers.forEach(animateCounter);
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const countersSection = document.getElementById('counters');
  if (countersSection) {
    counterObserver.observe(countersSection);
  }

  // ===== Close sidebar on outside click (mobile) =====
  document.addEventListener('click', (e) => {
    if (
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
})();
