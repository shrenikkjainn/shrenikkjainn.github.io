/**
 * Portfolio JavaScript
 * Refactored for Readability and Maintainability
 */

/* ========= 1. Data Configurations ========= */

const PROJECT_DATA = {
  1: {
    title: "Full-Stack Ecommerce Application",
    description: "A full-stack e-commerce web application built with Django.",
    details: ["User authentication", "Product catalog", "Cart system", "Order management", "Admin dashboard"],
    technologies: ["Django", "Python", "HTML", "CSS", "SQLite"],
    link: "#"
  },
  2: {
    title: "Student Management System",
    description: "Desktop application built with C++ for managing student records.",
    details: ["CRUD operations", "File based storage", "Authentication", "Search and filtering"],
    technologies: ["C++", "OOP", "File Handling"],
    link: "#"
  },
  3: {
    title: "AI Powered OS Monitoring System",
    description: "Flask based monitoring dashboard with ML anomaly detection.",
    details: ["Real-time CPU monitoring", "Isolation Forest anomaly detection", "Dashboard visualization", "Alert system"],
    technologies: ["Python", "Flask", "Machine Learning"],
    link: "#"
  }
};

/* ========= 2. Project Modal Logic ========= */

const modal = {
  el: document.getElementById("projectModal"),
  body: document.getElementById("modalBody"),
  closeBtn: document.querySelector(".modal-close"),
  
  open(projectId) {
    const data = PROJECT_DATA[projectId];
    if (!data) return;

    this.body.innerHTML = this.createTemplate(data);
    this.el.classList.add("active");
  },

  close() {
    this.el.classList.remove("active");
  },

  createTemplate(p) {
    return `
      <h2>${p.title}</h2>
      <p style="color:var(--text-secondary); margin-bottom:15px;">${p.description}</p>
      <ul>${p.details.map(d => `<li>${d}</li>`).join("")}</ul>
      <div class="project-tech">${p.technologies.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="project-links">
        <a href="${p.link}" target="_blank" class="btn btn-primary">Live Demo</a>
        <a href="${p.link}" target="_blank" class="btn btn-outline">GitHub</a>
      </div>
    `;
  }
};

// Listeners
document.querySelectorAll(".project-btn").forEach(btn => {
  btn.addEventListener("click", () => modal.open(btn.dataset.project));
});

modal.closeBtn.addEventListener("click", () => modal.close());
window.addEventListener("click", (e) => e.target === modal.el && modal.close());

/* ========= 3. Typing Animation ========= */

const typewriter = {
  element: document.getElementById("typingText"),
  phrases: [
    "Building scalable cloud systems",
    "Crafting elegant backend solutions",
    "Exploring AI & Machine Learning",
    "Optimizing performance at scale"
  ],
  phraseIdx: 0,
  charIdx: 0,
  isDeleting: false,

  init() {
    const currentPhrase = this.phrases[this.phraseIdx];
    const { isDeleting, charIdx } = this;

    this.element.textContent = currentPhrase.substring(0, isDeleting ? charIdx - 1 : charIdx + 1);
    this.charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && this.charIdx === currentPhrase.length) {
      delay = 1500;
      this.isDeleting = true;
    } else if (isDeleting && this.charIdx === 0) {
      this.isDeleting = false;
      this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
    }

    setTimeout(() => this.init(), delay);
  }
};

window.addEventListener("load", () => typewriter.init());

/* ========= 4. Navigation & UI Controls ========= */

const nav = {
  menu: document.getElementById("navMenu"),
  hamburger: document.getElementById("hamburger"),
  navbar: document.querySelector(".navbar"),

  toggle() {
    this.menu.classList.toggle("active");
    this.hamburger.classList.toggle("active");
  },

  close() {
    this.menu.classList.remove("active");
    this.hamburger.classList.remove("active");
  }
};

nav.hamburger.addEventListener("click", () => nav.toggle());

// Smooth Scroll & Auto-close menu
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId.startsWith("#")) return;

    e.preventDefault();
    document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    nav.close();
  });
});

// Navbar Shrink on Scroll
window.addEventListener("scroll", () => {
  nav.navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* ========= 5. Tab System ========= */

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.tab;

    // UI Update Helper
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});

/* ========= 6. Background Particles ========= */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.count = 30;

    window.addEventListener("resize", () => this.setup());
    this.setup();
    this.animate();
  }

  setup() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.particles = Array.from({ length: this.count }, () => new Particle(this.canvas));
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.update();
      p.draw(this.ctx);
    });
    requestAnimationFrame(() => this.animate());
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
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
  }

  draw(ctx) {
    const isDark = document.body.classList.contains("dark-theme");
    ctx.fillStyle = isDark ? "rgba(102,126,234,0.6)" : "rgba(102,126,234,0.3)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

new ParticleSystem("background-canvas");

/* ========= 7. Theme & Scroll Helpers ========= */

const theme = {
  btn: document.getElementById("themeToggle"),
  icon: document.getElementById("themeIcon"),
  sun: `<path d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"/>`,
  moon: `<path d="M21.64 13a9 9 0 11-10.6-10.6 7 7 0 0010.6 10.6z"/>`,

  toggle() {
    const isDark = document.body.classList.toggle("dark-theme");
    this.icon.innerHTML = isDark ? this.moon : this.sun;
  }
};

theme.btn.addEventListener("click", () => theme.toggle());

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
}, { threshold: 0.15 });

document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));