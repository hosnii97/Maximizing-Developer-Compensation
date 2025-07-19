// Responsive Behavior and Mobile Optimizations

class ResponsiveController {
    constructor() {
        this.breakpoints = {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        };
        
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.initializeResponsiveBehavior();
        this.setupResizeHandler();
        this.setupTouchOptimizations();
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.mobile) return 'mobile';
        if (width <= this.breakpoints.tablet) return 'tablet';
        return 'desktop';
    }

    initializeResponsiveBehavior() {
        this.setupMobileNavigation();
        this.setupResponsiveCalculator();
        this.setupMobileFormOptimizations();
        this.setupResponsiveCharts();
    }

    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newBreakpoint = this.getCurrentBreakpoint();
                if (newBreakpoint !== this.currentBreakpoint) {
                    this.currentBreakpoint = newBreakpoint;
                    this.handleBreakpointChange();
                }
                this.handleResize();
            }, 250);
        });
    }

    setupMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        }
    }

    setupResponsiveCalculator() {
        const calculatorContainer = document.querySelector('.calculator-container');
        if (!calculatorContainer) return;

        // Mobile: Stack form and results vertically
        // Desktop: Side by side layout
        this.adjustCalculatorLayout();
    }

    adjustCalculatorLayout() {
        const calculatorContainer = document.querySelector('.calculator-container');
        const resultsPanel = document.getElementById('resultsPanel');
        
        if (this.currentBreakpoint === 'mobile') {
            calculatorContainer.style.gridTemplateColumns = '1fr';
            if (resultsPanel && resultsPanel.classList.contains('show')) {
                // On mobile, scroll to results when they appear
                setTimeout(() => {
                    resultsPanel.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            }
        } else {
            calculatorContainer.style.gridTemplateColumns = '1fr 1fr';
        }
    }

    setupMobileFormOptimizations() {
        // Optimize form inputs for mobile
        const inputs = document.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            // Add mobile-specific attributes
            if (input.type === 'number') {
                input.setAttribute('inputmode', 'numeric');
                input.setAttribute('pattern', '[0-9]*');
            }
            
            // Prevent zoom on focus for iOS
            if (this.isIOS()) {
                input.style.fontSize = '16px';
            }
            
            // Add touch-friendly focus handling
            input.addEventListener('focus', () => {
                if (this.currentBreakpoint === 'mobile') {
                    setTimeout(() => {
                        input.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 300);
                }
            });
        });

        // Optimize checkbox grid for mobile
        const checkboxGrid = document.querySelector('.checkbox-grid');
        if (checkboxGrid) {
            this.optimizeCheckboxGrid();
        }
    }

    optimizeCheckboxGrid() {
        const checkboxGrid = document.querySelector('.checkbox-grid');
        const checkboxItems = checkboxGrid.querySelectorAll('.checkbox-item');
        
        if (this.currentBreakpoint === 'mobile') {
            checkboxGrid.style.gridTemplateColumns = '1fr';
            checkboxItems.forEach(item => {
                item.style.minHeight = '48px';
                item.style.padding = '1rem';
            });
        } else {
            checkboxGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
            checkboxItems.forEach(item => {
                item.style.minHeight = 'auto';
                item.style.padding = '0.75rem';
            });
        }
    }

    setupResponsiveCharts() {
        // Ensure charts are responsive
        const chartCanvas = document.getElementById('impactCanvas');
        if (chartCanvas) {
            this.makeChartResponsive();
        }
    }

    makeChartResponsive() {
        // Chart.js responsive configuration is handled in the chart creation
        // This function handles additional mobile optimizations
        
        if (window.impactChart) {
            const isMobile = this.currentBreakpoint === 'mobile';
            
            window.impactChart.options.scales.x.ticks.maxRotation = isMobile ? 90 : 45;
            window.impactChart.options.scales.x.ticks.minRotation = isMobile ? 90 : 45;
            window.impactChart.options.plugins.legend.display = !isMobile;
            
            window.impactChart.update();
        }
    }

    setupTouchOptimizations() {
        // Add touch-specific optimizations
        this.setupSwipeGestures();
        this.setupTouchFeedback();
        this.preventDoubleClickZoom();
    }

    setupSwipeGestures() {
        let startX, startY, endX, endY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Horizontal swipe detection
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.handleSwipeRight();
                } else {
                    this.handleSwipeLeft();
                }
            }
            
            // Reset values
            startX = startY = endX = endY = null;
        }, { passive: true });
    }

    handleSwipeRight() {
        // Handle right swipe (could be used for navigation)
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !navMenu.classList.contains('active')) {
            // Open navigation on right swipe
            document.querySelector('.nav-toggle').click();
        }
    }

    handleSwipeLeft() {
        // Handle left swipe
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            // Close navigation on left swipe
            document.querySelector('.nav-toggle').click();
        }
    }

    setupTouchFeedback() {
        // Add haptic feedback for supported devices
        const interactiveElements = document.querySelectorAll(
            'button, .checkbox-item, .nav-link, .cta-button'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                // Add visual feedback
                element.style.transform = 'scale(0.98)';
                element.style.transition = 'transform 0.1s ease';
                
                // Haptic feedback (if supported)
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }

    preventDoubleClickZoom() {
        // Prevent double-click zoom on iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    handleBreakpointChange() {
        // Handle layout changes when breakpoint changes
        this.adjustCalculatorLayout();
        this.optimizeCheckboxGrid();
        this.makeChartResponsive();
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('breakpointChange', {
            detail: { breakpoint: this.currentBreakpoint }
        }));
    }

    handleResize() {
        // Handle general resize events
        this.adjustViewportHeight();
        this.updateChartDimensions();
    }

    adjustViewportHeight() {
        // Fix viewport height issues on mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    updateChartDimensions() {
        // Update chart dimensions on resize
        if (window.impactChart) {
            window.impactChart.resize();
        }
    }

    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }

    isAndroid() {
        return /Android/.test(navigator.userAgent);
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
}

// Keyboard Navigation Enhancement
class KeyboardNavigation {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupAccessibilityFeatures();
    }

    setupKeyboardNavigation() {
        // Tab navigation optimization
        const focusableElements = document.querySelectorAll(
            'input, select, button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        
        // Ensure proper tab order
        focusableElements.forEach((element, index) => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    handleKeyboardShortcuts(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.click();
            }
        }
        
        // Enter key to submit form
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            const form = document.getElementById('salaryForm');
            if (form && this.isFormValid()) {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Arrow keys for checkbox navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            this.handleArrowKeyNavigation(e);
        }
    }

    handleArrowKeyNavigation(e) {
        const checkboxes = Array.from(document.querySelectorAll('input[name="languages"]'));
        const currentIndex = checkboxes.indexOf(document.activeElement);
        
        if (currentIndex !== -1) {
            e.preventDefault();
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % checkboxes.length;
            } else {
                nextIndex = (currentIndex - 1 + checkboxes.length) % checkboxes.length;
            }
            
            checkboxes[nextIndex].focus();
        }
    }

    isFormValid() {
        const form = document.getElementById('salaryForm');
        return form && form.checkValidity();
    }

    setupAccessibilityFeatures() {
        // Add ARIA labels and descriptions
        this.enhanceAccessibility();
        
        // Screen reader announcements
        this.setupScreenReaderSupport();
    }

    enhanceAccessibility() {
        // Add ARIA labels to form elements
        const countrySelect = document.getElementById('country');
        if (countrySelect) {
            countrySelect.setAttribute('aria-label', 'Select your country or location');
        }
        
        const experienceInput = document.getElementById('experience');
        if (experienceInput) {
            experienceInput.setAttribute('aria-label', 'Years of professional programming experience');
        }
        
        // Add role and aria-expanded to mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.setAttribute('role', 'button');
            navToggle.setAttribute('aria-label', 'Toggle navigation menu');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    setupScreenReaderSupport() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        // Announce form validation errors
        document.addEventListener('invalid', (e) => {
            const message = `Error in ${e.target.labels[0]?.textContent || e.target.name}: ${e.target.validationMessage}`;
            this.announce(message);
        }, true);
        
        // Announce successful calculations
        window.addEventListener('salaryCalculated', (e) => {
            const salary = e.detail.salary;
            this.announce(`Salary calculation complete. Predicted salary is ${salary}`);
        });
    }

    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
}

// Performance Optimization for Mobile
class MobilePerformance {
    constructor() {
        this.optimizeForMobile();
        this.setupLazyLoading();
        this.optimizeAnimations();
    }

    optimizeForMobile() {
        // Reduce animation complexity on low-end devices
        if (this.isLowEndDevice()) {
            document.body.classList.add('reduced-motion');
            this.disableExpensiveAnimations();
        }
        
        // Optimize images for mobile
        this.optimizeImages();
        
        // Debounce scroll events
        this.optimizeScrollEvents();
    }

    isLowEndDevice() {
        // Simple heuristic for low-end device detection
        return navigator.hardwareConcurrency <= 2 || 
               navigator.deviceMemory <= 2 ||
               /Android.*Chrome\/[0-5]/.test(navigator.userAgent);
    }

    disableExpensiveAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    optimizeImages() {
        // Add loading="lazy" to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    setupLazyLoading() {
        // Lazy load non-critical content
        const lazyElements = document.querySelectorAll('.lazy-load');
        
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        lazyObserver.unobserve(entry.target);
                    }
                });
            });
            
            lazyElements.forEach(el => lazyObserver.observe(el));
        }
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Handle scroll events here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }

    optimizeAnimations() {
        // Use CSS transforms instead of changing layout properties
        // Prefer opacity and transform changes
        // Use will-change property sparingly
        
        const animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    }
}

// Initialize responsive behavior
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveController();
    new KeyboardNavigation();
    new MobilePerformance();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResponsiveController, KeyboardNavigation, MobilePerformance };
}

