// Enhanced Animations and Interactive Effects

class AnimationController {
    constructor() {
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
    }

    initializeAnimations() {
        // Navbar scroll effect
        this.setupNavbarScrollEffect();
        
        // Smooth reveal animations
        this.setupRevealAnimations();
        
        // Counter animations
        this.setupCounterAnimations();
        
        // Typing effect for hero title
        this.setupTypingEffect();
    }

    setupNavbarScrollEffect() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    setupRevealAnimations() {
        // Add reveal animation styles
        const style = document.createElement('style');
        style.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }
            
            .reveal.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .reveal-left {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.6s ease-out;
            }
            
            .reveal-left.revealed {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-right {
                opacity: 0;
                transform: translateX(30px);
                transition: all 0.6s ease-out;
            }
            
            .reveal-right.revealed {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-scale {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.6s ease-out;
            }
            
            .reveal-scale.revealed {
                opacity: 1;
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);

        // Add reveal classes to elements
        const elementsToReveal = [
            '.section-header',
            '.methodology-card',
            '.insight-card',
            '.calculator-form',
            '.results-panel',
            '.about-text',
            '.stat-card'
        ];

        elementsToReveal.forEach(selector => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add('reveal');
                element.style.transitionDelay = `${index * 0.1}s`;
            });
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
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        const highlightText = heroTitle.querySelector('.highlight')?.textContent || '';
        
        // Only apply typing effect on desktop
        if (window.innerWidth > 768) {
            heroTitle.innerHTML = '';
            let index = 0;
            let isInHighlight = false;
            let highlightStarted = false;

            const typeWriter = () => {
                if (index < text.length) {
                    const char = text.charAt(index);
                    
                    // Check if we're entering the highlight section
                    if (!highlightStarted && text.substring(index).startsWith(highlightText)) {
                        heroTitle.innerHTML += '<span class="highlight">';
                        isInHighlight = true;
                        highlightStarted = true;
                    }
                    
                    heroTitle.innerHTML += char;
                    
                    // Check if we're exiting the highlight section
                    if (isInHighlight && index >= text.indexOf(highlightText) + highlightText.length - 1) {
                        heroTitle.innerHTML += '</span>';
                        isInHighlight = false;
                    }
                    
                    index++;
                    setTimeout(typeWriter, 50);
                }
            };

            // Start typing effect after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Form Animation Effects
class FormAnimations {
    constructor() {
        this.setupFormAnimations();
        this.setupInputAnimations();
        this.setupButtonAnimations();
    }

    setupFormAnimations() {
        const form = document.getElementById('salaryForm');
        if (!form) return;

        // Add stagger animation to form groups
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.5s ease-out';
            group.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    setupInputAnimations() {
        const inputs = document.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            // Focus animations
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
                this.createRippleEffect(input);
            });
            
            input.addEventListener('blur', () => {
                input.parentNode.classList.remove('focused');
            });
            
            // Value change animations
            input.addEventListener('change', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });

        // Checkbox animations
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const item = checkbox.closest('.checkbox-item');
                if (checkbox.checked) {
                    item.classList.add('checked');
                    this.animateCheckmark(item);
                } else {
                    item.classList.remove('checked');
                }
            });
        });
    }

    setupButtonAnimations() {
        const buttons = document.querySelectorAll('button, .cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(button, e);
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    createRippleEffect(element, event = null) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
        const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Add ripple styles
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    animateCheckmark(item) {
        const checkmark = item.querySelector('.checkmark');
        if (checkmark) {
            checkmark.style.transform = 'scale(1.2)';
            setTimeout(() => {
                checkmark.style.transform = 'scale(1)';
            }, 150);
        }
    }
}

// Results Animation Effects
class ResultsAnimations {
    constructor() {
        this.setupResultsAnimations();
    }

    setupResultsAnimations() {
        // Observe results panel
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (resultsPanel.classList.contains('show')) {
                            this.animateResults();
                        }
                    }
                });
            });
            
            observer.observe(resultsPanel, { attributes: true });
        }
    }

    animateResults() {
        // Animate prediction amount
        const predictionAmount = document.getElementById('predictedSalary');
        if (predictionAmount) {
            this.animateNumber(predictionAmount);
        }

        // Animate confidence range
        const confidenceRange = document.getElementById('confidenceRange');
        if (confidenceRange) {
            setTimeout(() => {
                confidenceRange.style.opacity = '0';
                confidenceRange.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    confidenceRange.style.transition = 'all 0.5s ease-out';
                    confidenceRange.style.opacity = '1';
                    confidenceRange.style.transform = 'translateY(0)';
                }, 100);
            }, 500);
        }

        // Animate recommendations
        const recommendations = document.querySelectorAll('.recommendation-item');
        recommendations.forEach((rec, index) => {
            rec.style.opacity = '0';
            rec.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                rec.style.transition = 'all 0.5s ease-out';
                rec.style.opacity = '1';
                rec.style.transform = 'translateX(0)';
            }, 1000 + (index * 200));
        });
    }

    animateNumber(element) {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        const duration = 1500;
        const steps = 60;
        const stepValue = numericValue / steps;
        let currentValue = 0;
        let step = 0;

        element.textContent = '$0';

        const animate = () => {
            if (step < steps) {
                currentValue += stepValue;
                element.textContent = '$' + Math.floor(currentValue).toLocaleString();
                step++;
                requestAnimationFrame(animate);
            } else {
                element.textContent = finalValue;
            }
        };

        setTimeout(animate, 300);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Progress indicator
        this.createScrollProgress();
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(37, 99, 235, 0.1);
                z-index: 9999;
            }
            
            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                width: 0%;
                transition: width 0.1s ease-out;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new FormAnimations();
    new ResultsAnimations();
    new ScrollAnimations();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationController, FormAnimations, ResultsAnimations, ScrollAnimations };
}

