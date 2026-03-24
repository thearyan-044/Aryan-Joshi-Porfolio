/**
 * Aryan Joshi — Portfolio
 * JavaScript: aryan-script.js
 * Version: 1.0.0
 *
 * MODULES
 * -------
 * 1. Custom Cursor
 * 2. Navbar Scroll Behaviour
 * 3. Scroll Reveal  (IntersectionObserver)
 * 4. Smooth Anchor Scrolling
 * 5. Active Nav Link Highlight
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. CUSTOM CURSOR ──────────────────────────── */
  const cursor = document.getElementById('cursor');

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  // Enlarge cursor over interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .service-card, .project-row, .testimonial-card, .process-step, .nav-cta'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });


  /* ── 2. NAVBAR SCROLL BEHAVIOUR ────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ── 3. SCROLL REVEAL ───────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.10 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 4. SMOOTH ANCHOR SCROLLING ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });


  /* ── 5. ACTIVE NAV LINK HIGHLIGHT ──────────────── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activateLink = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 60;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--accent)';
      }
    });
  };

  window.addEventListener('scroll', activateLink, { passive: true });

});