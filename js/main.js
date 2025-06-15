/**
 * Main JavaScript for REIN Website - Bootstrap 5 Enhanced
 * Handles navigation, animations, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {

    // Initialize all components
    initNavbar();
    initAnimations();
    initContactForm();
    initPhoneCopy();
    initScrollEffects();
    initHeroVideo();

    console.log('REIN Website initialized successfully');
});

/**
 * Navbar functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // Handle enhanced dropdown functionality
    initDropdown();
    
    // Set active nav item based on current page
    setActiveNavItem();
}

/**
 * Enhanced dropdown functionality
 */
function initDropdown() {
    // Add smooth animations and enhanced interactions for dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.nextElementSibling;

        // Add enhanced hover effects
        toggle.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });

        toggle.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Enhanced dropdown show/hide events
        toggle.addEventListener('show.bs.dropdown', function() {
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.transform = 'translateY(-10px) scale(0.95)';
            }
        });

        toggle.addEventListener('shown.bs.dropdown', function() {
            if (dropdown) {
                dropdown.style.transition = 'all 0.3s ease';
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

/**
 * Set active navigation item based on current page
 */
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to current link
            link.classList.add('active');
        }
    });
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add fade-in class to cards and sections
    const animatedElements = document.querySelectorAll('.card, .contact-info-card, .contact-person-card, .service-card, .mission-vision-card, .feature-item, .team-leader-card, .stat-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Initialize counter animation for statistics
    initCounterAnimation();
}

/**
 * Counter animation for statistics
 */
function initCounterAnimation() {
    const statsSection = document.querySelector('.hero-stats');
    const achievementStats = document.querySelector('.achievement-stats');

    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters('.hero-stats .stat-number');
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    if (achievementStats) {
        const achievementObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters('.achievement-stats .stat-value');
                    achievementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        achievementObserver.observe(achievementStats);
    }
}

/**
 * Animate counter numbers
 */
function animateCounters(selector = '.stat-number') {
    const counters = document.querySelectorAll(selector);

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

/**
 * Initialize hero video background
 */
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const heroVideoBackground = document.querySelector('.hero-video-background');

    if (!heroVideo || !heroVideoBackground) return;

    // Handle video loading
    heroVideo.addEventListener('loadeddata', function() {
        console.log('Hero video loaded successfully');
        heroVideoBackground.classList.add('video-loaded');
    });

    // Handle video errors
    heroVideo.addEventListener('error', function(e) {
        console.warn('Hero video failed to load:', e);
        // Hide video background and show fallback
        heroVideoBackground.style.display = 'none';
    });

    // Ensure video plays on mobile devices that support it
    heroVideo.addEventListener('canplay', function() {
        // Try to play the video
        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(function(error) {
                console.warn('Video autoplay failed:', error);
                // Autoplay was prevented, but that's okay
                // The video will still be visible as a poster
            });
        }
    });

    // Pause video when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            heroVideo.pause();
        } else {
            heroVideo.play().catch(function(error) {
                // Ignore play errors when returning to page
            });
        }
    });

    // Optimize video playback on scroll (optional performance enhancement)
    let isVideoVisible = true;
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isVideoVisible) {
                heroVideo.play().catch(() => {});
                isVideoVisible = true;
            } else if (!entry.isIntersecting && isVideoVisible) {
                heroVideo.pause();
                isVideoVisible = false;
            }
        });
    }, { threshold: 0.1 });

    videoObserver.observe(heroVideoBackground);
}

/**
 * Contact form handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formMessage = document.getElementById('form-message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', function(e) {
        // Show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        }
        
        // Show sending message
        if (formMessage) {
            showFormMessage('info', '<i class="fas fa-paper-plane me-2"></i>Sending your message...', formMessage);
        }
        
        // Form will be submitted to Formspree
        // The page will redirect or show success/error based on Formspree response
    });
    
    // Form validation
    contactForm.addEventListener('input', function(e) {
        validateField(e.target);
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    if (isRequired && !value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // Phone validation (basic)
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    if (value) {
        field.classList.add('is-valid');
    }
    
    return true;
}

/**
 * Show form message
 */
function showFormMessage(type, message, container) {
    if (!container) return;
    
    container.className = `alert alert-${type}`;
    container.innerHTML = message;
    container.style.display = 'block';
    
    // Auto-hide info messages after 3 seconds
    if (type === 'info') {
        setTimeout(() => {
            container.style.display = 'none';
        }, 3000);
    }
}

/**
 * Phone number copy functionality
 */
function initPhoneCopy() {
    const phoneNumbers = document.querySelectorAll('.copy-number');
    
    phoneNumbers.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phoneNumber = this.getAttribute('data-number') || this.textContent.trim();
            
            // Use modern Clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    showCopyFeedback(this, 'Copied!');
                }).catch(() => {
                    fallbackCopyTextToClipboard(phoneNumber, this);
                });
            } else {
                fallbackCopyTextToClipboard(phoneNumber, this);
            }
        });
    });
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyTextToClipboard(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(element, 'Copied!');
    } catch (err) {
        showCopyFeedback(element, 'Copy failed');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show copy feedback
 */
function showCopyFeedback(element, message) {
    const originalText = element.textContent;
    const originalColor = element.style.color;
    
    element.textContent = message;
    element.style.color = '#28a745';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = originalColor;
    }, 1500);
}

/**
 * Scroll effects and smooth scrolling
 */
function initScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero sections (subtle)
    const heroSections = document.querySelectorAll('.hero-section, .page-header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        heroSections.forEach(section => {
            const rate = scrolled * -0.5;
            section.style.transform = `translateY(${rate}px)`;
        });
    });
}

/**
 * Initialize tooltips (Bootstrap 5)
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Initialize popovers (Bootstrap 5)
 */
function initPopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

/**
 * Solar Solutions Tabs functionality
 */
function initSolarSolutionsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding content
            const targetContent = document.getElementById(targetTab + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize tooltips and popovers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    initPopovers();
    initSolarSolutionsTabs();
});
