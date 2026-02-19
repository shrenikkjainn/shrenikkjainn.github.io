// ========================================
// Modern Portfolio JavaScript
// Vanilla JS - No Dependencies
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
const typingSpeed = 50;
const deletingSpeed = 30;
const pauseDuration = 1500;

function typePhrase() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        delay = pauseDuration;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }

    setTimeout(typePhrase, delay);
}

// Start typing animation when page loads
window.addEventListener('load', typePhrase);

// ========== Smooth Navigation ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Mobile Menu Toggle ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ========== Progress Bar Animation ==========
const progressObserverOptions = {
    threshold: 0.3
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target;
            const width = progressFill.getAttribute('data-width');
            progressFill.style.width = width + '%';
            progressObserver.unobserve(entry.target);
        }
    });
}, progressObserverOptions);

document.querySelectorAll('.progress-fill').forEach(element => {
    progressObserver.observe(element);
});

// ========== Navbar Scroll Effect ==========
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});

// ========== Back to Top Button ==========
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
        description: 'A comprehensive desktop application built with C++ for managing student records, grades, and academic performance.',
        details: [
            'Full CRUD operations for student records',
            'Grade management and GPA calculation',
            'File-based data persistence',
            'Intuitive console-based UI',
            'Search and filter functionality',
            'Report generation'
        ],
        technologies: ['C++', 'Data Structures', 'File I/O', 'OOP'],
        link: '#'
    },
    2: {
        title: 'AI-Powered OS Monitoring System',
        description: 'Intelligent system monitoring platform using Flask and machine learning to predict system failures and optimize resource usage.',
        details: [
            'Real-time system metrics collection',
            'ML-based failure prediction',
            'Beautiful web dashboard with Charts.js',
            'Email alert notifications',
            'Historical data analysis',
            'RESTful API for integrations',
            'Docker containerization',
            'PostgreSQL database'
        ],
        technologies: ['Python', 'Flask', 'Machine Learning', 'Docker', 'JavaScript', 'PostgreSQL'],
        link: '#'
    },
    3: {
        title: 'Scalable E-Commerce Architecture',
        description: 'Production-grade e-commerce infrastructure on AWS featuring auto-scaling, CDN optimization, and serverless functions.',
        details: [
            'Multi-region AWS deployment',
            'Auto-scaling EC2 instances',
            'CloudFront CDN for static assets',
            'Lambda functions for serverless computing',
            'RDS MySQL database with read replicas',
            'ElastiCache for session management',
            'S3 for product images',
            'CI/CD pipeline with CodePipeline',
            'Security: WAF, SSL/TLS, VPC isolation',
            'Handles 100K+ concurrent users'
        ],
        technologies: ['AWS', 'Docker', 'Python', 'Node.js', 'MySQL', 'DevOps'],
        link: '#'
    }
};

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        const project = projectDetails[projectId];

        if (project) {
            displayProjectModal(project);
        }
    });
});

function displayProjectModal(project) {
    const detailsHtml = `
        <h2>${project.title}</h2>
        <p style="color: var(--text-secondary); margin: 15px 0; line-height: 1.6;">${project.description}</p>
        
        <h3 style="margin-top: 20px; margin-bottom: 10px; color: var(--primary-color);">Key Features</h3>
        <ul style="list-style: none; padding: 0; margin-bottom: 20px;">
            ${project.details.map(detail => `<li style="padding: 8px 0; padding-left: 20px; position: relative; color: var(--text-secondary);">
                <span style="position: absolute; left: 0; color: var(--primary-color);">→</span> ${detail}
            </li>`).join('')}
        </ul>

        <h3 style="margin-top: 20px; margin-bottom: 10px; color: var(--primary-color);">Technologies</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
            ${project.technologies.map(tech => `<span style="background: rgba(102, 126, 234, 0.2); color: var(--primary-color); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">${tech}</span>`).join('')}
        </div>

        <a href="${project.link}" class="btn btn-primary" style="display: inline-block; margin-top: 15px;">
            View Project
        </a>
    `;

    modalBody.innerHTML = detailsHtml;
    projectModal.classList.add('active');
}

// Close modal
modalClose.addEventListener('click', () => {
    projectModal.classList.remove('active');
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
    }
});

// ========== Prevent FOUC (Flash of Unstyled Content) ==========
document.documentElement.style.visibility = 'visible';

// ========== Performance: Lazy Load Images if needed ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== Accessibility: Skip to main content ==========
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ========== Page Load Animation ==========
window.addEventListener('load', () => {
    document.documentElement.style.scrollBehavior = 'smooth';
});

// ===== Live Background Dots =====
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 40; // reduced for performance


class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(102, 126, 234, 0.7)";
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
    setTimeout(() => {
        requestAnimationFrame(animateParticles);
    }, 30); // ~33fps instead of 60fps
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
