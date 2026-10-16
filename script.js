/* =============================================
   PESTIDO PEST CONTROL SERVICES
   Production Optimized JavaScript
   ============================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Mobile Navigation Drawer
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    const toggleMenu = (open) => {
      const state = typeof open === 'boolean' ? open : !navLinks.classList.contains('open');
      navLinks.classList.toggle('open', state);
      hamburger.classList.toggle('open', state);
      hamburger.setAttribute('aria-expanded', String(state));
    };

    hamburger.addEventListener('click', () => toggleMenu());

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) toggleMenu(false);
    });
  }

  // Active Nav Link Spy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  if (sections.length && navItems.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(s => sectionObserver.observe(s));
  }

  // Scroll Fade-in Animations
  const fadeEls = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .process-step, .about-grid, .contact-grid, .cert-card, .faq-item');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    fadeEls.forEach(el => el.classList.add('fade-in'));
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  // Enquiry Form -> WhatsApp
  const form = document.getElementById('enquiry-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const name    = form.name.value.trim();
      const phone   = form.phone.value.trim();
      const email   = form.email.value.trim();
      const service = form.service.value;
      const message = form.message.value.trim();

      const text = [
        `Hello Pestido! 👋 I would like to enquire about pest control services.`,
        ``,
        `👤 *Name:* ${name}`,
        `📞 *Phone:* ${phone}`,
        email ? `✉️ *Email:* ${email}` : null,
        `🐛 *Service Needed:* ${service}`,
        message ? `💬 *Message:* ${message}` : null,
      ].filter(Boolean).join('\n');

      const waUrl = `https://wa.me/919570622204?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      if (successMsg) {
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { successMsg.hidden = true; }, 6000);
      }
      form.reset();
    });
  }

  // Smooth scroll for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash && hash.length > 1) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Marquee pause logic
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) marquee.style.animationPlayState = 'paused';

    const strip = marquee.closest('.marquee-strip');
    if (strip) {
      strip.addEventListener('mouseenter', () => { marquee.style.animationPlayState = 'paused'; });
      strip.addEventListener('mouseleave', () => {
        if (!mq.matches) marquee.style.animationPlayState = 'running';
      });
    }
  }
});

/* =============================================
   CERTIFICATE LIGHTBOX (Global Handlers)
   ============================================= */

const CERT_IMAGES = [
  {
    src: 'cert_skill_india.jpg',
    alt: 'Skill India NSDC Pest Controller Certificate – Ajeet Kumar, Grade A'
  },
  {
    src: 'cert_udyam_1.jpg',
    alt: 'UDYAM Registration Certificate UDYAM-DL-08-0095162'
  },
  {
    src: 'cert_udyam_2.jpg',
    alt: 'UDYAM MSME Certificate – Pestido Pest Control Service'
  },
  {
    src: 'cert_gst.jpg',
    alt: 'GST Registration Certificate – Form GST REG-06, Pestido'
  },
  {
    src: 'cert_iso.jpg',
    alt: 'ISO 9001:2015 Quality Management System Certificate – Pestido'
  }
];

let currentCertIndex = 0;
const lightbox    = document.getElementById('cert-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCtr = document.getElementById('lightbox-counter');

function updateLightbox() {
  if (!lightboxImg) return;
  const cert = CERT_IMAGES[currentCertIndex];
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = cert.src;
    lightboxImg.alt = cert.alt;
    lightboxImg.style.opacity = '1';
  }, 100);
  if (lightboxCtr) {
    lightboxCtr.textContent = `${currentCertIndex + 1} / ${CERT_IMAGES.length}`;
  }
}

function openCertLight(index) {
  if (!lightbox) return;
  currentCertIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeCertLight() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function nextCert() {
  currentCertIndex = (currentCertIndex + 1) % CERT_IMAGES.length;
  updateLightbox();
}

function prevCert() {
  currentCertIndex = (currentCertIndex - 1 + CERT_IMAGES.length) % CERT_IMAGES.length;
  updateLightbox();
}

document.addEventListener('keydown', (e) => {
  if (lightbox && !lightbox.hidden) {
    if (e.key === 'Escape') closeCertLight();
    else if (e.key === 'ArrowRight') nextCert();
    else if (e.key === 'ArrowLeft') prevCert();
  }
});

let touchStartX = 0;
lightbox?.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox?.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) {
    diff > 0 ? nextCert() : prevCert();
  }
}, { passive: true });
