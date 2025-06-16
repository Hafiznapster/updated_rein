/**
 * REIN Enhanced Mobile JavaScript
 * Comprehensive mobile interaction improvements
 */

class MobileEnhancer {
    constructor() {
        this.isMobile = window.innerWidth <= 991.98;
        this.isTouch = 'ontouchstart' in window;
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupTouchOptimizations();
        this.setupMobileDropdowns();
        this.setupMobileScrolling();
        this.setupMobilePerformance();
        this.setupMobileAccessibility();
        this.handleOrientationChange();
        this.setupMobileBottomNav();
    }

    // Enhanced Mobile Navigation
    setupMobileNavigation() {
        const navbar = document.querySelector('.navbar') || document.querySelector('.navbar-modern');

        if (!navbar) return;

        // Navbar scroll behavior - keep navbar visible on all devices
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Keep navbar visible on all devices
            navbar.style.transform = 'translateY(0)';

            lastScrollY = currentScrollY;
        });

        // Ensure navbar toggler works properly on mobile
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', function() {
                const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
                navbarToggler.setAttribute('aria-expanded', !isExpanded);
            });
        }
    }

    // Enhanced Mobile Dropdowns
    setupMobileDropdowns() {
        // Enable dropdown functionality on all devices
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        dropdownToggles.forEach(toggle => {
            const dropdownMenu = toggle.nextElementSibling;

            if (!dropdownMenu) return;

            // Desktop dropdown behavior only
            toggle.addEventListener('click', (e) => {
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                    }
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });
        });
    }

    // Touch Optimizations
    setupTouchOptimizations() {
        if (!this.isTouch) return;

        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll(
            '.btn-modern, .card-modern, .service-card-modern, .nav-link-modern, .dropdown-item'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
                element.style.transition = 'transform 0.1s ease';
            });

            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                    element.style.transition = '';
                }, 100);
            });

            element.addEventListener('touchcancel', () => {
                element.style.transform = '';
                element.style.transition = '';
            });
        });

        // Prevent double-tap zoom on buttons
        const buttons = document.querySelectorAll('button, .btn, .btn-modern');
        buttons.forEach(button => {
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                button.click();
            });
        });
    }

    // Enhanced Mobile Scrolling
    setupMobileScrolling() {
        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll to top functionality
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top-mobile';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--rein-gradient-primary);
            color: white;
            border: none;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 999;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            display: none;
        `;

        document.body.appendChild(scrollToTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.display = 'block';
                setTimeout(() => {
                    scrollToTopBtn.style.opacity = '1';
                    scrollToTopBtn.style.transform = 'translateY(0)';
                }, 10);
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    scrollToTopBtn.style.display = 'none';
                }, 300);
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Performance Optimizations
    setupMobilePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        
        window.onscroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) originalScrollHandler();
            }, 16); // ~60fps
        };

        // Optimize animations for mobile
        if (this.isMobile) {
            const style = document.createElement('style');
            style.textContent = `
                .fade-in-up, .fade-in-left, .fade-in-right {
                    animation-duration: 0.4s !important;
                }
                .hover-lift:hover {
                    transform: translateY(-2px) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mobile Accessibility Enhancements
    setupMobileAccessibility() {
        // Enhanced focus management
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '3px solid rgba(51, 96, 33, 0.5)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });

        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--rein-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 9999;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark if not exists
        const main = document.querySelector('main') || document.querySelector('#main-content');
        if (!main) {
            const firstSection = document.querySelector('section');
            if (firstSection) {
                firstSection.id = 'main-content';
                firstSection.setAttribute('role', 'main');
            }
        }
    }

    // Handle Orientation Changes
    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Recalculate viewport height
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
                
                // Update mobile state
                this.isMobile = window.innerWidth <= 991.98;
                
                // Refresh mobile optimizations
                this.setupMobilePerformance();
            }, 100);
        });

        // Initial viewport height calculation
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Enhanced Mobile Bottom Navigation
    setupMobileBottomNav() {
        const bottomNav = document.querySelector('.mobile-bottom-nav');
        if (!bottomNav) return;

        const navItems = bottomNav.querySelectorAll('.mobile-nav-item');
        const currentPage = window.location.pathname;

        // Set active state based on current page
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (currentPage.includes(href.replace('.html', '')) || 
                (currentPage === '/' && href === 'index.html')) {
                item.classList.add('active');
            }
        });

        // Add haptic feedback for supported devices
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });
        });

        // Hide bottom nav when keyboard is open
        let initialViewportHeight = window.innerHeight;
        
        window.addEventListener('resize', () => {
            const currentViewportHeight = window.innerHeight;
            const heightDifference = initialViewportHeight - currentViewportHeight;
            
            if (heightDifference > 150) { // Keyboard likely open
                bottomNav.style.transform = 'translateY(100%)';
            } else {
                bottomNav.style.transform = 'translateY(0)';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileEnhancer();
});

// Add CSS animations
const mobileAnimations = document.createElement('style');
mobileAnimations.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .navbar-modern {
        transition: transform 0.3s ease;
    }
    
    .scroll-to-top-mobile:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 25px rgba(0,0,0,0.3) !important;
    }
`;

document.head.appendChild(mobileAnimations);
