/* ============================================
   loader.js — Fast Section Loader
   Loads all HTML sections in parallel
============================================ */

const sections = [
  "navbar",
  "hero",
  "about",
  "skills",
  "projects",
  "certifications",
  "resume",
  "contact",
  "footer"
];

async function loadSections() {
  const app = document.getElementById("app");
  try {
    // Notify other scripts that DOM is ready to be manipulated
    document.dispatchEvent(new Event("sectionsLoaded"));
  } catch (error) {
    console.error("Section loading failed:", error);
    app.innerHTML += `
      <div style="padding:40px;text-align:center;font-family:Inter;">
        Failed to load portfolio sections.
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadSections);


/**
 * animations.js
 * Particle canvas background + 3D card tilt effect.
 *
 * Scroll reveal is handled purely by CSS @keyframes on .reveal classes —
 * no IntersectionObserver needed. This keeps the system JS-independent
 * and removes any race condition with dynamic section loading.
 *
 * initAnimations() is called after sectionsLoaded so tilt attaches
 * to newly injected DOM elements.
 */

/* ─── Particle Canvas ─── */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.count = window.innerWidth < 768 ? 15 : 40;
    this.animId = null;

    this._resize = () => this.setup();
    window.addEventListener('resize', this._resize, { passive: true });
    this.setup();
    this.animate();
  }

  setup() {
    this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
    this.particles = Array.from({ length: this.count }, () => new Particle(this.canvas));
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const isDark = document.body.classList.contains('dark-theme');
    this.particles.forEach(p => {
      p.update();
      p.draw(this.ctx, isDark);
    });
    this.animId = requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 1.6 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.28;
    this.speedY = (Math.random() - 0.5) * 0.28;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
  }

  draw(ctx, isDark) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = isDark
      ? 'rgba(102, 126, 234, 0.8)'
      : 'rgba(102, 126, 234, 0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    // No ctx.shadowBlur = X -> drastically saves repaint costs
  }
}

/* ─── Init after sections are injected ─── */
function initAnimations() {
  if (document.getElementById('background-canvas')) {
    new ParticleSystem('background-canvas');
  }
}

document.addEventListener('sectionsLoaded', initAnimations);


/**
 * interactions.js
 * All DOM-dependent code lives inside the sectionsLoaded handler,
 * which fires AFTER loader.js has injected all section HTML into #app.
 *
 * Script load order (index.html):
 *   1. loader.js        → fetches sections, injects HTML, dispatches 'sectionsLoaded'
 *   2. theme-toggle.js  → applies theme immediately (only touches <body> which exists)
 *   3. animations.js    → listens for 'sectionsLoaded' → observers + tilt
 *   4. interactions.js  → listens for 'sectionsLoaded' → this file
 */

/* ─── Project Data ─── */
const PROJECT_DATA = {
  1: {
    title: 'Full-Stack E-Commerce Application',
    description: 'A full-stack e-commerce platform built with Django featuring secure authentication, product browsing, cart management, and order processing.',
    details: [
      'User authentication & session management',
      'Product catalog with search and filtering',
      'Shopping cart & checkout workflow',
      'Admin dashboard for inventory management',
      'Relational database models (SQLite)',
    ],
    technologies: ['Django', 'Python', 'HTML', 'CSS', 'SQLite'],
    github: 'https://github.com/shrenikkjainn/Django-eCommerce-Web-Application',
    live: "https://django-ecommerce-web-application.onrender.com"
  },
  2: {
    title: 'Student Management System',
    description: 'Desktop application built with C++ for managing student academic records with CRUD operations and file-based persistence.',
    details: [
      'Menu-driven interface for full CRUD operations',
      'File-based persistent storage',
      'Student search and record filtering',
      'OOP design with modular architecture',
    ],
    technologies: ['C++', 'OOP', 'File Handling', 'Data Structures'],
    github: 'https://github.com/shrenikkjainn/Student-Management-System---cpp-program'
  },
  3: {
    title: 'AI-Powered OS Monitoring System',
    description: 'Flask-based real-time monitoring dashboard with machine learning anomaly detection for system resources.',
    details: [
      'Real-time CPU, memory, and disk monitoring',
      'Isolation Forest ML anomaly detection',
      'Interactive dashboard visualisations',
      'Automated threshold-based alerting',
    ],
    technologies: ['Python', 'Flask', 'Machine Learning', 'scikit-learn', 'Real-time'],
    github: 'https://github.com/shrenikkjainn/OS-Moniter'
  },
  4: {
    title: 'Scalable E-Commerce Architecture on AWS',
    description: 'Production-grade cloud infrastructure for high-traffic e-commerce with auto-scaling and CDN optimisation.',
    details: [
      'EC2 auto-scaling groups for traffic spikes',
      'CloudFront CDN for global edge caching',
      'DynamoDB for high-throughput data storage',
      'S3 for static asset hosting',
      'Load balancer configuration and health checks',
    ],
    technologies: ['AWS EC2', 'S3', 'CloudFront', 'DynamoDB', 'IAM', 'Architecture'],
    github: 'https://github.com/shrenikkjainn/Scalable-E-Commerce-Architecture-AWS-EC2-CloudFront-S3-DynamoDB'
  },
};

/* ─── Modal HTML builder ─── */
function buildModalHTML(data) {
  return `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <ul>${data.details.map(d => `<li>${d}</li>`).join('')}</ul>
    <div class="project-tech">
      ${data.technologies.map(t => `<span>${t}</span>`).join('')}
    </div>
    <div class="project-links">
      ${data.live ? `
<a href="${data.live}" target="_blank" class="btn btn-primary">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
  Live Demo
</a>
` : ''}
      <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-outline">
  <img src="assets/icons/github-original.svg"
       class="logo-dark" width="16" height="16" alt="GitHub">
  GitHub
</a>
    </div>
  `;
}

/* ─── All UI initialisation (runs once sections are in DOM) ─── */
function initAll() {
  /* Remove loading state smoothly */
  const loadingState = document.getElementById('loadingState');
  if (loadingState) {
    loadingState.style.transition = 'opacity 0.6s ease';
    loadingState.style.opacity = '0';
    setTimeout(() => loadingState.remove(), 600);
  }

  /* ── Navbar scroll shrink ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let isTicking = false;
    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          navbar.classList.toggle('scrolled', window.scrollY > 60);
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });
  }

  /* ── Back to Top ── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Hamburger / Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ── Smooth scroll + mobile menu close on nav link click ── */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const targetEl = document.querySelector(link.getAttribute('href'));
    if (!targetEl) return;
    e.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (navMobile) {
      navMobile.classList.remove('open');
      hamburger?.classList.remove('active');
    }
  });

  /* ── Typewriter ── */
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = [
      'Building scalable cloud systems',
      'Crafting elegant backend APIs',
      'Exploring AI & Machine Learning',
      'Designing distributed architectures',
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function tick() {
      const phrase = phrases[phraseIdx];
      charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
      typingEl.textContent = phrase.substring(0, charIdx);

      let delay = isDeleting ? 30 : 58;
      if (!isDeleting && charIdx === phrase.length) {
        delay = 1800; isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  /* ── Tab System ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });

  /* ── Project Modal ── */
  const modalEl = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.querySelector('.modal-close');

  function openModal(id) {
    const data = PROJECT_DATA[id];
    if (!data || !modalEl) return;
    modalBody.innerHTML = buildModalHTML(data);
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalEl) {
    closeBtn?.addEventListener('click', closeModal);
    modalEl.addEventListener('click', e => { if (e.target === modalEl) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });

  /* ── Contact Form (Google Sheets) ── */
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      const original = submitBtn.innerHTML;

      submitBtn.innerHTML = "Sending...";
      submitBtn.disabled = true;

      const formData = {
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        subject: document.getElementById("contactSubject").value,
        message: document.getElementById("contactMessage").value
      };

      try {

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzg4qjNu8u6DTVt8RrAm6m52byf_KQQZ_zGmaCAm358KZteSvHMai8k24z-oK81hJhs/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          }
        );

        submitBtn.innerHTML = "Sent ✓";
        form.reset();

      } catch (error) {

        console.error("Form error:", error);
        submitBtn.innerHTML = "Failed";

      }

      setTimeout(() => {
        submitBtn.innerHTML = original;
        submitBtn.disabled = false;
      }, 3000);

    });
  }
}

/* ─── Listen for loader.js to finish injecting sections ─── */
document.addEventListener('sectionsLoaded', initAll);


/**
 * theme-toggle.js
 * Applies theme immediately on load (body always exists),
 * then hooks button/icon after sections are injected by loader.js.
 */

(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const DARK_CLASS = 'dark-theme';

  const SUN_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`;

  const MOON_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  /* ── Apply theme to <body> immediately — works before any section HTML loads ── */
  function applyTheme(isDark) {
    document.body.classList.toggle(DARK_CLASS, isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    // Update icon if button already in DOM (deferred call may call this again)
    const icon = document.getElementById('themeIcon');
    if (icon) icon.innerHTML = isDark ? MOON_SVG : SUN_SVG;

    // Update profile image if it exists in DOM
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
      profileImg.src = isDark ? 'assets/images/profile-dark.webp' : 'assets/images/profile-light.webp';
    }
  }

  // Determine initial theme and apply right away
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initDark = stored ? stored === 'dark' : prefersDark;
  applyTheme(initDark);

  /* ── Wire button AFTER sections are loaded ── */
  function bindButton() {
    const btn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    if (!btn) return;

    // Set the correct icon for current state
    if (icon) icon.innerHTML = document.body.classList.contains(DARK_CLASS) ? MOON_SVG : SUN_SVG;

    btn.addEventListener('click', () => {
      applyTheme(!document.body.classList.contains(DARK_CLASS));
    });
  }

  // loader.js dispatches 'sectionsLoaded' once navbar HTML is in DOM
  document.addEventListener('sectionsLoaded', bindButton);

  // OS-level change — only if no stored preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches);
  });
})();
