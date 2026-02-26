// Modern Portfolio JavaScript for Serab Yonjan

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const heroTl = gsap.timeline();
    
    heroTl
        .from('.hero-name', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-title-line', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-description', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-graphic', {
            duration: 1.5,
            scale: 0,
            opacity: 0,
            ease: 'elastic.out(1, 0.5)'
        }, '-=1');

    // Section Animations on Scroll
    const animateSections = () => {
        // About Section
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.about-stats', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });

        // Skills Section
        gsap.from('.skill-category', {
            scrollTrigger: {
                trigger: '.skills',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            stagger: 0.2
        });

        // Experience Section
        gsap.from('.experience-item', {
            scrollTrigger: {
                trigger: '.experience',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            stagger: 0.3
        });

        // Portfolio Section
        gsap.from('.portfolio-item', {
            scrollTrigger: {
                trigger: '.portfolio',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            stagger: 0.2
        });

        // Contact Section
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.contact-visual', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });
    };

    // Initialize animations
    animateSections();

    // Counter Animation for Stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.innerText.replace('+', '');
                const count = +counter.innerText.replace(/[^\d-]/g, '');
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment) + '+';
                    setTimeout(animate, 10);
                } else {
                    counter.innerText = target + '+';
                }
            };

            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animate();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    };

    animateCounters();

    // Typing Animation for Hero Subtitle
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        setTimeout(() => {
            typeWriter(heroSubtitle, 'Crafting Engaging Visual Stories', 80);
        }, 2000);
    }

    // Parallax Effect for Hero Graphic
    const parallaxGraphic = () => {
        const graphic = document.querySelector('.hero-graphic');
        if (graphic) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                graphic.style.transform = `translateY(${rate}px)`;
            });
        }
    };

    parallaxGraphic();

    // Active Navigation Link Highlighting
    const highlightActiveSection = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    };

    highlightActiveSection();

    // Form Validation (if contact form is added later)
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    };

    // Loading Animation Removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Console Welcome Message
    console.log('%c🎬 Serab Yonjan Portfolio', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
    console.log('%cVideo Editor & Graphic Designer', 'font-size: 14px; color: #B8B8B8;');
    console.log('%cWelcome to my creative space!', 'font-size: 12px; color: #FFD23F;');
});

// Utility Functions
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to element
    scrollToElement: (element, offset = 0) => {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
};

// Performance optimization
const optimizedScroll = utils.debounce(() => {
    // Scroll-based animations and calculations
}, 10);

window.addEventListener('scroll', optimizedScroll);
