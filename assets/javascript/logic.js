/**
 * Serab Yonjan Portfolio - Premium JavaScript
 * GSAP Animations, Interactions & Functionality
 */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const elements = {
    loadingScreen: document.querySelector('.loading-screen'),
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    hamburger: document.getElementById('hamburger'),
    navLinks: document.querySelectorAll('.nav-link'),
    cursor: document.querySelector('.cursor'),
    cursorFollower: document.querySelector('.cursor-follower'),
    scrollProgressBar: document.querySelector('.scroll-progress-bar'),
    typingText: document.querySelector('.typing-text'),
    skillCards: document.querySelectorAll('.skill-card'),
    progressBars: document.querySelectorAll('.progress-bar'),
    statValues: document.querySelectorAll('.stat-value'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    portfolioItems: document.querySelectorAll('.portfolio-item'),
    contactForm: document.getElementById('contactForm'),
    formSuccess: document.getElementById('formSuccess'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxClose: document.getElementById('lightboxClose')
};

// Typing Animation Configuration
const typingConfig = {
    words: [
        'Video Editor'
    ],
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000
};

/**
 * Initialize Application
 */
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initCursor();
    initNavbar();
    initMobileMenu();
    initTypingAnimation();
    initScrollProgress();
    initSmoothScroll();
    initSkillProgress();
    initCounterAnimation();
    initPortfolioFilter();
    initContactForm();
    initLightbox();
    initScrollAnimations();
    initParticles();
});

/**
 * Loading Screen
 */
function initLoadingScreen() {
    const loadingBar = document.querySelector('.loading-bar');
    
    // Animate loading bar
    gsap.to(loadingBar, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(elements.loadingScreen, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    elements.loadingScreen.classList.add('hidden');
                    initHeroAnimations();
                }
            });
        }
    });
}

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-greeting', {
        y: 30,
        opacity: 0,
        duration: 0.8
    })
    .from('.title-line', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15
    }, '-=0.4')
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.6')
    .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.5')
    .from('.hero-buttons .btn', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    }, '-=0.4')
    .from('.scroll-indicator', {
        opacity: 0,
        duration: 0.8
    }, '-=0.2');
}

/**
 * Custom Cursor
 */
function initCursor() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
        elements.cursor.style.display = 'none';
        elements.cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Follower lags behind
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        elements.cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 5}px)`;
        elements.cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .portfolio-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            elements.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            elements.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            elements.cursorFollower.style.borderColor = 'transparent';
            elements.cursorFollower.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            elements.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            elements.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            elements.cursorFollower.style.borderColor = 'var(--accent-primary)';
            elements.cursorFollower.style.backgroundColor = 'transparent';
        });
    });
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    }, { passive: true });
    
    // Active nav link based on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        elements.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    elements.hamburger.addEventListener('click', () => {
        elements.hamburger.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu on link click
    elements.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            elements.hamburger.classList.remove('active');
            elements.navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/**
 * Typing Animation
 */
function initTypingAnimation() {
    const { words, typeSpeed, deleteSpeed, pauseTime } = typingConfig;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            elements.typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            elements.typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeDelay = isDeleting ? deleteSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500;
        }
        
        setTimeout(type, typeDelay);
    }
    
    type();
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        elements.scrollProgressBar.style.width = scrollPercent + '%';
    }, { passive: true });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Skill Progress Animation
 */
function initSkillProgress() {
    elements.progressBars.forEach(bar => {
        const width = bar.dataset.width;
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                bar.style.setProperty('--progress-width', width + '%');
                gsap.to(bar.querySelector('::after') || bar, {
                    width: width + '%',
                    duration: 1.5,
                    ease: 'power2.out'
                });
                
                // Animate the pseudo element
                const style = document.createElement('style');
                style.textContent = `
                    .progress-bar[data-width="${width}"]::after {
                        animation: progress-fill-1 1.5s ease forwards;
                    }
                    @keyframes progress-fill-1 {
                        from { width: 0%; }
                        to { width: ${width}%; }
                    }
                `;
                document.head.appendChild(style);
                
                // Animate percentage text
                const progressText = bar.nextElementSibling;
                gsap.from(progressText, {
                    scale: 0,
                    duration: 0.5,
                    delay: 1,
                    ease: 'back.out'
                });
            }
        });
    });
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    elements.statValues.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.round(this.targets()[0].textContent);
                    }
                });
            }
        });
    });
}

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            elements.portfolioItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        display: 'block'
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.4,
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

/**
 * Contact Form
 */
function initContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = elements.contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            elements.formSuccess.classList.add('active');
            elements.contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                elements.formSuccess.classList.remove('active');
            }, 5000);
        }, 1500);
    });
    
    // Input focus effects
    const inputs = elements.contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

/**
 * Lightbox
 */
function initLightbox() {
    const portfolioBtns = document.querySelectorAll('.portfolio-btn');
    
    portfolioBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const imgData = btn.dataset.image;
            const videoData = btn.dataset.video;
            
            if (imgData) {
                // Get the portfolio item image
                const imgSrc = btn.closest('.portfolio-item').querySelector('img').src;
                elements.lightboxImage.src = imgSrc;
                elements.lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else if (videoData) {
                // Show video placeholder
                alert('Video player would open here. Connect to your video hosting platform.');
            }
        });
    });
    
    // Close lightbox
    elements.lightboxClose.addEventListener('click', closeLightbox);
    elements.lightbox.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    elements.lightbox.classList.remove('active');
    elements.lightboxImage.src = '';
    document.body.style.overflow = '';
}

/**
 * Scroll Animations with GSAP ScrollTrigger
 */
function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                once: true
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });
    
    // About content
    gsap.from('.about-content > *', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            once: true
        },
        x: (i) => i === 0 ? -50 : 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Skill categories
    gsap.utils.toArray('.skill-category').forEach((category, i) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                once: true
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const direction = i % 2 === 0 ? -50 : 50;
        
        gsap.from(item.querySelector('.timeline-content'), {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true
            },
            x: direction,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from(item.querySelector('.timeline-marker'), {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: 0.3,
            ease: 'back.out(2)'
        });
    });
    
    // Portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                once: true
            },
            y: 60,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Contact wrapper
    gsap.from('.contact-wrapper > *', {
        scrollTrigger: {
            trigger: '.contact-wrapper',
            start: 'top 80%',
            once: true
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Parallax effect for gradient orbs
    gsap.to('.orb-1', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -150,
        scale: 1.2
    });
    
    gsap.to('.orb-2', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        scale: 0.9
    });
}

/**
 * Particle System
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Animate particle
    gsap.to(particle, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        opacity: `random(0.2, 0.6)`,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

/**
 * Skill Card Hover Effect
 */
elements.skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.skill-icon'), {
            scale: 1.1,
            rotate: 5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.skill-icon'), {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

/**
 * WhatsApp Button Animation Enhancement
 */
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('mouseenter', () => {
        gsap.to(whatsappBtn, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    whatsappBtn.addEventListener('mouseleave', () => {
        gsap.to(whatsappBtn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

/**
 * Intersection Observer for Lazy Animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .portfolio-item, .timeline-item').forEach(el => {
    observer.observe(el);
});

/**
 * Performance Optimization
 */
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle resize
const handleResize = debounce(() => {
    ScrollTrigger.refresh();
}, 250);

window.addEventListener('resize', handleResize);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

// Prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0);
    document.querySelectorAll('.gradient-orb, .scroll-indicator, .whatsapp-float').forEach(el => {
        el.style.animation = 'none';
    });
}

console.log('%c Serab Yonjan Portfolio ', 'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c Crafted with passion & creativity ', 'color: #3b82f6; font-size: 14px;');
