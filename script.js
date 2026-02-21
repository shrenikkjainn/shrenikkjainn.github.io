// ========================================
// Modern Portfolio JavaScript (Clean & Optimized)
// ========================================



// ========== Typing Animation ==========
const typingText = document.getElementById('typingText');

const phrases = [
    'Building scalable cloud systems',
    'Crafting elegant backend solutions',
    'Exploring AI & Machine Learning',
    'Optimizing performance at scale'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typePhrase() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let delay = isDeleting ? 30 : 50;

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        delay = 1500;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }

    setTimeout(typePhrase, delay);
}

window.addEventListener('load', typePhrase);

// ========== Premium Smooth Navigation ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        // allow default smooth scroll behavior
        if (targetId.startsWith('#')) {

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // close mobile menu safely
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});



// ========== Mobile Menu ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}



// ===== Ultra Smooth Reveal Animation =====

const animatedElements = document.querySelectorAll('.animate-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 0.08}s`;
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

animatedElements.forEach(el => revealObserver.observe(el));



// ========== Navbar Scroll Effect ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



// ========== Back To Top ==========
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// ========== Modal Functionality ==========
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

const projectDetails = {
    1: {
        title: 'Student Management System',
        description: 'Desktop application built with C++ for managing student records and performance.',
        details: [
            'CRUD operations',
            'Grade management',
            'File persistence',
            'Search functionality'
        ],
        technologies: ['C++', 'OOP', 'Data Structures'],
        link: '#'
    },
    2: {
        title: 'AI-Powered OS Monitoring',
        description: 'Real-time system monitoring with ML prediction.',
        details: [
            'Real-time metrics',
            'ML-based prediction',
            'Dashboard',
            'Dockerized'
        ],
        technologies: ['Python', 'Flask', 'ML', 'Docker'],
        link: '#'
    },
    3: {
        title: 'Scalable E-Commerce Architecture',
        description: 'AWS production-grade architecture.',
        details: [
            'Auto-scaling',
            'CloudFront CDN',
            'RDS',
            'Lambda'
        ],
        technologies: ['AWS', 'DevOps', 'Docker'],
        link: '#'
    }
};

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const projectId = btn.getAttribute('data-project');
        const project = projectDetails[projectId];

        if (project) displayProjectModal(project);
    });
});

function displayProjectModal(project) {
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p style="margin:15px 0;color:var(--text-secondary);">${project.description}</p>
        <ul style="margin-bottom:20px;">
            ${project.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
        <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <a href="${project.link}" class="btn btn-primary" style="margin-top:15px;">View Project</a>
    `;

    projectModal.classList.add('active');
}

modalClose.addEventListener('click', () => {
    projectModal.classList.remove('active');
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        projectModal.classList.remove('active');
    }
});



// ========== Live Background Dots (Optimized) ==========
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 30;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(102,126,234,0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();

window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
});
