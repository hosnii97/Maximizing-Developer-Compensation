// Animations and Interactive Effects for Developer Salary Calculator

class AnimationController {
    constructor() {
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.setupParticleAnimation();
    }
    
    initializeAnimations() {
        // Add entrance animations to elements
        this.addEntranceAnimations();
        
        // Setup hover effects
        this.setupHoverEffects();
        
        // Setup scroll animations
        this.setupScrollAnimations();
    }
    
    addEntranceAnimations() {
        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroStats = document.querySelector('.hero-stats');
        const ctaButton = document.querySelector('.cta-button');
        
        if (heroTitle) {
            setTimeout(() => heroTitle.classList.add('fade-in-up'), 300);
        }
        if (heroSubtitle) {
            setTimeout(() => heroSubtitle.classList.add('fade-in-up'), 600);
        }
        if (heroStats) {
            setTimeout(() => heroStats.classList.add('fade-in-up'), 900);
        }
        if (ctaButton) {
            setTimeout(() => ctaButton.classList.add('fade-in-up'), 1200);
        }
    }
    
    setupHoverEffects() {
        // Card hover effects
        document.querySelectorAll('.form-card, .results-card, .insight-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // Button hover effects
        document.querySelectorAll('.calculate-btn, .cta-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '';
            });
        });
        
        // Language checkbox animations
        document.querySelectorAll('.language-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    checkbox.classList.add('selected-animation');
                    setTimeout(() => checkbox.classList.remove('selected-animation'), 300);
                }
            });
        });
    }
    
    setupScrollAnimations() {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        const heroParticles = document.querySelector('.hero-particles');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroParticles) {
                heroParticles.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animations for specific elements
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('confidence-fill')) {
                        this.animateProgressBar(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.insight-card, .stat-number, .confidence-fill, .form-group').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on original content
            if (element.textContent.includes('K')) {
                element.textContent = Math.floor(current) + 'K+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    animateProgressBar(element) {
        const targetWidth = element.style.width || '85%';
        element.style.width = '0%';
        
        setTimeout(() => {
            element.style.transition = 'width 1.5s ease-out';
            element.style.width = targetWidth;
        }, 100);
    }
    
    setupParticleAnimation() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;
        
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
            `;
            heroParticles.appendChild(particle);
        }
    }
    
    // Utility method for smooth element reveals
    revealElement(element, delay = 0) {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 50);
        }, delay);
    }
    
    // Method to trigger celebration animation
    celebrateCalculation() {
        const resultsCard = document.querySelector('.results-card');
        if (resultsCard) {
            resultsCard.classList.add('celebration');
            setTimeout(() => resultsCard.classList.remove('celebration'), 1000);
        }
        
        // Create confetti effect
        this.createConfetti();
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 5000);
    }
}

// CSS animations to be injected
const animationStyles = `
    @keyframes float-particle {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
    
    @keyframes confetti-fall {
        0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .selected-animation {
        animation: pulse-select 0.3s ease-out;
    }
    
    @keyframes pulse-select {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .celebration {
        animation: celebrate 1s ease-out;
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.02) rotate(1deg); }
        75% { transform: scale(1.02) rotate(-1deg); }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .form-group.focused {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
    }
    
    .particle {
        pointer-events: none;
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});

// Export for use in other modules
window.AnimationController = AnimationController;

