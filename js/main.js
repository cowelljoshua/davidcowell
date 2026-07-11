/* ============================================================
   David Cowell, PE — Portfolio JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar (no scroll effect for floating navbar) ----
  const navbar = document.getElementById('navbar');

  // ---- Scroll indicator ----
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ---- Mobile menu toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const heroMenuBtn = document.getElementById('hero-menu-btn');

  if (toggle && navLinks) {
    const setMenuOpen = (isOpen) => {
      navLinks.classList.toggle('open', isOpen);
      toggle.classList.toggle('open', isOpen);
      if (heroMenuBtn) heroMenuBtn.classList.toggle('is-hidden', isOpen);
    };

    toggle.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('open'));
    });

    // Hero menu button functionality
    if (heroMenuBtn) {
      heroMenuBtn.addEventListener('click', () => {
        setMenuOpen(!navLinks.classList.contains('open'));
      });
    }

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && e.target !== heroMenuBtn) {
        setMenuOpen(false);
      }
    });
  }

  // ---- Project filter buttons ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // ---- Photo Gallery Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img'));

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // ---- Scroll-in animations ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation class and observe
  const animateElements = document.querySelectorAll(
    '.timeline-item, .project-card, .client-card, .skill-card, .edu-card, .license-card, .ref-card, .stat, .expertise-item, .subpage-card, .gallery-item'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
  });

  // ---- Contact form (Netlify Forms AJAX submission) ----
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => {
          form.reset();
          formStatus.textContent = 'Thanks! Your message has been sent — David will get back to you soon.';
          formStatus.classList.add('success');
        })
        .catch(() => {
          formStatus.textContent = 'Something went wrong sending your message. Please email davidericcowell@gmail.com directly.';
          formStatus.classList.add('error');
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }

  // ---- Add active class to current page nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinkElements = document.querySelectorAll('.nav-links a');
  navLinkElements.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
