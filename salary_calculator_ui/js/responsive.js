// Responsive Behavior and Mobile Optimization
// Developer Salary Calculator

class ResponsiveController {
    constructor() {
        this.breakpoints = {
            mobile: 768,
            tablet: 992,
            desktop: 1200
        };
        
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.initializeResponsiveBehavior();
        this.setupResizeListener();
        this.setupTouchOptimizations();
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < this.breakpoints.mobile) return 'mobile';
        if (width < this.breakpoints.tablet) return 'tablet';
        if (width < this.breakpoints.desktop) return 'desktop';
        return 'large-desktop';
    }
    
    initializeResponsiveBehavior() {
        this.optimizeForCurrentBreakpoint();
        this.setupMobileNavigation();
        this.setupTouchFriendlyControls();
        this.optimizeFormLayout();
    }
    
    setupResizeListener() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newBreakpoint = this.getCurrentBreakpoint();
                
                if (newBreakpoint !== this.currentBreakpoint) {
                    this.currentBreakpoint = newBreakpoint;
                    this.optimizeForCurrentBreakpoint();
                }
                
                this.adjustLayoutForViewport();
            }, 250);
        });
    }
    
    optimizeForCurrentBreakpoint() {
        const body = document.body;
        
        // Remove existing breakpoint classes
        body.classList.remove('mobile-view', 'tablet-view', 'desktop-view', 'large-desktop-view');
        
        // Add current breakpoint class
        body.classList.add(`${this.currentBreakpoint.replace('-', '-')}-view`);
        
        switch (this.currentBreakpoint) {
            case 'mobile':
                this.optimizeForMobile();
                break;
            case 'tablet':
                this.optimizeForTablet();
                break;
            case 'desktop':
                this.optimizeForDesktop();
                break;
            case 'large-desktop':
                this.optimizeForLargeDesktop();
                break;
        }
    }
    
    optimizeForMobile() {
        // Simplify navigation
        this.enableMobileNavigation();
        
        // Optimize form layout
        this.stackFormElements();
        
        // Adjust calculator layout
        this.mobileCalculatorLayout();
        
        // Optimize touch targets
        this.enlargeTouchTargets();
        
        // Simplify animations
        this.reduceAnimations();
    }
    
    optimizeForTablet() {
        // Hybrid layout optimizations
        this.tabletCalculatorLayout();
        
        // Touch-friendly but more compact than mobile
        this.optimizeTouchTargets();
    }
    
    optimizeForDesktop() {
        // Full desktop experience
        this.desktopCalculatorLayout();
        
        // Enable all animations
        this.enableFullAnimations();
    }
    
    optimizeForLargeDesktop() {
        // Enhanced desktop experience
        this.largeDesktopLayout();
    }
    
    setupMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
            
            // Close menu when clicking on links
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }
    
    toggleMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }
    
    closeMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    setupTouchOptimizations() {
        // Improve touch responsiveness
        document.addEventListener('touchstart', () => {}, { passive: true });
        
        // Optimize slider interactions for touch
        this.optimizeSliders();
        
        // Improve checkbox/radio interactions
        this.optimizeFormControls();
        
        // Add touch feedback
        this.addTouchFeedback();
    }
    
    optimizeSliders() {
        const sliders = document.querySelectorAll('.form-slider');
        
        sliders.forEach(slider => {
            // Increase touch target size
            slider.style.height = this.currentBreakpoint === 'mobile' ? '12px' : '8px';
            
            // Add touch event listeners
            slider.addEventListener('touchstart', (e) => {
                slider.classList.add('touching');
            }, { passive: true });
            
            slider.addEventListener('touchend', (e) => {
                slider.classList.remove('touching');
            }, { passive: true });
        });
    }
    
    optimizeFormControls() {
        const checkboxes = document.querySelectorAll('.language-checkbox');
        
        checkboxes.forEach(checkbox => {
            if (this.currentBreakpoint === 'mobile') {
                checkbox.style.minHeight = '48px'; // Minimum touch target size
                checkbox.style.padding = '12px';
            } else {
                checkbox.style.minHeight = '';
                checkbox.style.padding = '';
            }
        });
    }
    
    addTouchFeedback() {
        const interactiveElements = document.querySelectorAll('button, .language-checkbox, .form-select');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }
    
    mobileCalculatorLayout() {
        const calculatorContainer = document.querySelector('.calculator-container');
        if (calculatorContainer) {
            calculatorContainer.style.gridTemplateColumns = '1fr';
            calculatorContainer.style.gap = '2rem';
        }
        
        // Make results panel non-sticky on mobile
        const resultsCard = document.querySelector('.results-card');
        if (resultsCard) {
            resultsCard.style.position = 'static';
        }
    }
    
    tabletCalculatorLayout() {
        const calculatorContainer = document.querySelector('.calculator-container');
        if (calculatorContainer) {
            calculatorContainer.style.gridTemplateColumns = '1fr';
            calculatorContainer.style.gap = '2.5rem';
        }
    }
    
    desktopCalculatorLayout() {
        const calculatorContainer = document.querySelector('.calculator-container');
        if (calculatorContainer) {
            calculatorContainer.style.gridTemplateColumns = '1fr 1fr';
            calculatorContainer.style.gap = '3rem';
        }
        
        // Re-enable sticky positioning
        const resultsCard = document.querySelector('.results-card');
        if (resultsCard) {
            resultsCard.style.position = 'sticky';
            resultsCard.style.top = '100px';
        }
    }
    
    largeDesktopLayout() {
        const calculatorContainer = document.querySelector('.calculator-container');
        if (calculatorContainer) {
            calculatorContainer.style.gridTemplateColumns = '1.2fr 0.8fr';
            calculatorContainer.style.gap = '4rem';
        }
    }
    
    stackFormElements() {
        const languageOptions = document.querySelectorAll('.language-options');
        languageOptions.forEach(options => {
            options.style.gridTemplateColumns = '1fr';
        });
    }
    
    enlargeTouchTargets() {
        const buttons = document.querySelectorAll('button, .form-select');
        buttons.forEach(button => {
            if (this.currentBreakpoint === 'mobile') {
                button.style.minHeight = '48px';
                button.style.fontSize = '16px'; // Prevent zoom on iOS
            }
        });
    }
    
    optimizeTouchTargets() {
        const buttons = document.querySelectorAll('button, .form-select');
        buttons.forEach(button => {
            button.style.minHeight = '44px';
        });
    }
    
    reduceAnimations() {
        // Reduce animations on mobile for better performance
        if (this.currentBreakpoint === 'mobile') {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
    
    enableFullAnimations() {
        document.body.classList.remove('reduced-motion');
    }
    
    adjustLayoutForViewport() {
        // Adjust hero height for mobile browsers
        if (this.currentBreakpoint === 'mobile') {
            const hero = document.querySelector('.hero');
            if (hero) {
                // Account for mobile browser UI
                const vh = window.innerHeight * 0.01;
                hero.style.minHeight = `${vh * 100}px`;
            }
        }
        
        // Adjust calculator positioning
        this.adjustCalculatorPosition();
    }
    
    adjustCalculatorPosition() {
        const calculatorSection = document.querySelector('.calculator-section');
        if (calculatorSection && this.currentBreakpoint === 'mobile') {
            // Add extra padding for mobile keyboards
            calculatorSection.style.paddingBottom = '200px';
        } else if (calculatorSection) {
            calculatorSection.style.paddingBottom = '';
        }
    }
    
    setupTouchFriendlyControls() {
        // Improve dropdown behavior on touch devices
        const selects = document.querySelectorAll('.form-select');
        
        selects.forEach(select => {
            // Prevent zoom on iOS
            select.style.fontSize = '16px';
            
            // Add touch-friendly styling
            if (this.currentBreakpoint === 'mobile') {
                select.style.padding = '12px 16px';
                select.style.borderRadius = '12px';
            }
        });
    }
    
    // Utility method to check if device supports touch
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    // Method to handle orientation changes
    handleOrientationChange() {
        // Wait for orientation change to complete
        setTimeout(() => {
            this.adjustLayoutForViewport();
        }, 100);
    }
    
    // Method to optimize for specific devices
    optimizeForDevice() {
        const userAgent = navigator.userAgent;
        
        // iOS specific optimizations
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            this.optimizeForIOS();
        }
        
        // Android specific optimizations
        if (/Android/.test(userAgent)) {
            this.optimizeForAndroid();
        }
    }
    
    optimizeForIOS() {
        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (parseFloat(getComputedStyle(input).fontSize) < 16) {
                input.style.fontSize = '16px';
            }
        });
        
        // Handle iOS safe areas
        document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
        document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
    }
    
    optimizeForAndroid() {
        // Android-specific optimizations
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
        }
    }
}

// CSS for responsive behavior
const responsiveStyles = `
    .touch-active {
        opacity: 0.7;
        transform: scale(0.98);
        transition: all 0.1s ease;
    }
    
    .touching {
        transform: scale(1.1);
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    @media (max-width: 768px) {
        .hero {
            padding-top: env(safe-area-inset-top);
        }
        
        .navbar {
            padding-top: env(safe-area-inset-top);
        }
        
        .footer {
            padding-bottom: env(safe-area-inset-bottom);
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .form-select, .language-checkbox {
            border-width: 2px;
        }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject responsive styles
const responsiveStyleSheet = document.createElement('style');
responsiveStyleSheet.textContent = responsiveStyles;
document.head.appendChild(responsiveStyleSheet);

// Initialize responsive controller
document.addEventListener('DOMContentLoaded', () => {
    const responsiveController = new ResponsiveController();
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        responsiveController.handleOrientationChange();
    });
    
    // Optimize for specific devices
    responsiveController.optimizeForDevice();
});

// Export for use in other modules
window.ResponsiveController = ResponsiveController;

