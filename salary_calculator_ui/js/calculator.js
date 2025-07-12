// Developer Salary Calculator - Enhanced JavaScript
// Based on Stack Overflow Survey Data Analysis (2022-2024)

class SalaryCalculator {
    constructor() {
        this.baselineData = {
            // Country salary baselines (median salaries in USD)
            countries: {
                'United States of America': 120000,
                'Switzerland': 98500,
                'Australia': 78000,
                'Netherlands': 72000,
                'Canada': 71500,
                'Germany': 68000,
                'United Kingdom': 65000,
                'Sweden': 62000,
                'France': 58000,
                'Israel': 55000,
                'Norway': 54000,
                'Denmark': 52000,
                'Belgium': 48000,
                'Austria': 46000,
                'Italy': 42000,
                'Other': 35000
            },
            
            // Programming language premiums (percentage)
            languagePremiums: {
                'Go': 23.4,
                'Rust': 20.1,
                'Scala': 18.7,
                'Kotlin': 8.2,
                'Python': 6.7,
                'TypeScript': 4.9,
                'C#': 3.8,
                'Java': 1.7,
                'SQL': 0.4,
                'JavaScript': -1.6,
                'PHP': -4.2,
                'Ruby': 1.3,
                'C++': 2.1,
                'Swift': 5.2,
                'Dart': 3.1
            },
            
            // Company size multipliers
            companySizeMultipliers: {
                '2 to 9 employees': 0.893,
                '10 to 19 employees': 0.938,
                '20 to 99 employees': 1.000,
                '100 to 499 employees': 1.046,
                '500 to 999 employees': 1.092,
                '1,000 to 4,999 employees': 1.154,
                '5,000 to 9,999 employees': 1.200,
                '10,000 or more employees': 1.246
            },
            
            // Employment type multipliers
            employmentMultipliers: {
                'Employed, full-time': 1.000,
                'Employed, part-time': 0.692,
                'Independent contractor, freelancer, or self-employed': 1.108,
                'Student': 0.400,
                'Unemployed': 0.000
            },
            
            // Experience curve parameters
            experienceBase: 45000,
            experienceGrowthRate: 0.08,
            experienceDecayRate: 0.02
        };
        
        this.initializeEventListeners();
        this.hideLoadingScreen();
    }
    
    initializeEventListeners() {
        // Form submission
        const form = document.getElementById('salaryForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Slider updates
        const experienceSlider = document.getElementById('experience');
        const ageSlider = document.getElementById('age');
        
        if (experienceSlider) {
            experienceSlider.addEventListener('input', (e) => this.updateSliderValue('experience', e.target.value));
        }
        
        if (ageSlider) {
            ageSlider.addEventListener('input', (e) => this.updateSliderValue('age', e.target.value));
        }
        
        // Navigation
        this.initializeNavigation();
        
        // Real-time calculation (optional)
        this.initializeRealTimeCalculation();
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 1500);
    }
    
    initializeNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }
    
    initializeRealTimeCalculation() {
        // Add event listeners for real-time updates (optional feature)
        const inputs = document.querySelectorAll('#salaryForm input, #salaryForm select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                // Debounce the calculation
                clearTimeout(this.calculationTimeout);
                this.calculationTimeout = setTimeout(() => {
                    this.calculateSalaryQuiet();
                }, 500);
            });
        });
    }
    
    updateSliderValue(sliderId, value) {
        const valueElement = document.getElementById(sliderId + 'Value');
        if (valueElement) {
            if (sliderId === 'experience') {
                valueElement.textContent = value;
            } else if (sliderId === 'age') {
                valueElement.textContent = value;
            }
        }
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        const button = document.querySelector('.calculate-btn');
        if (button) {
            button.classList.add('loading');
        }
        
        // Simulate calculation time for better UX
        setTimeout(() => {
            this.calculateSalary();
            if (button) {
                button.classList.remove('loading');
            }
        }, 1500);
    }
    
    calculateSalary() {
        const formData = this.getFormData();
        const result = this.performCalculation(formData);
        this.displayResults(result);
        this.showResultsPanel();
    }
    
    calculateSalaryQuiet() {
        // Silent calculation for real-time updates
        const formData = this.getFormData();
        if (this.isFormComplete(formData)) {
            const result = this.performCalculation(formData);
            this.displayResults(result);
        }
    }
    
    getFormData() {
        const form = document.getElementById('salaryForm');
        const formData = new FormData(form);
        
        return {
            country: formData.get('country'),
            experience: parseInt(formData.get('experience')) || 5,
            age: parseInt(formData.get('age')) || 30,
            companySize: formData.get('companySize'),
            employment: formData.get('employment'),
            languages: formData.getAll('languages')
        };
    }
    
    isFormComplete(formData) {
        return formData.country && formData.companySize && formData.employment;
    }
    
    performCalculation(data) {
        // Start with country baseline
        let baseSalary = this.baselineData.countries[data.country] || this.baselineData.countries['Other'];
        
        // Apply experience curve
        const experienceMultiplier = this.calculateExperienceMultiplier(data.experience);
        baseSalary *= experienceMultiplier;
        
        // Apply company size multiplier
        const companySizeMultiplier = this.baselineData.companySizeMultipliers[data.companySize] || 1.0;
        baseSalary *= companySizeMultiplier;
        
        // Apply employment type multiplier
        const employmentMultiplier = this.baselineData.employmentMultipliers[data.employment] || 1.0;
        baseSalary *= employmentMultiplier;
        
        // Apply language premiums
        let languageMultiplier = 1.0;
        const languagePremiums = [];
        
        data.languages.forEach(language => {
            const premium = this.baselineData.languagePremiums[language];
            if (premium !== undefined) {
                languageMultiplier += (premium / 100);
                languagePremiums.push({ language, premium });
            }
        });
        
        baseSalary *= languageMultiplier;
        
        // Calculate confidence based on data completeness and common combinations
        const confidence = this.calculateConfidence(data);
        
        // Calculate salary range (±15%)
        const salaryMin = Math.round(baseSalary * 0.85);
        const salaryMax = Math.round(baseSalary * 1.15);
        
        return {
            salary: Math.round(baseSalary),
            salaryMin,
            salaryMax,
            confidence,
            factors: {
                country: data.country,
                experience: data.experience,
                companySize: data.companySize,
                employment: data.employment,
                languages: languagePremiums
            },
            recommendations: this.generateRecommendations(data, baseSalary)
        };
    }
    
    calculateExperienceMultiplier(years) {
        // Experience curve: rapid growth early, then diminishing returns
        const base = this.baselineData.experienceBase;
        const growthRate = this.baselineData.experienceGrowthRate;
        const decayRate = this.baselineData.experienceDecayRate;
        
        // Logarithmic growth with decay
        const multiplier = 1 + (growthRate * Math.log(1 + years)) - (decayRate * Math.pow(years / 20, 2));
        return Math.max(0.5, multiplier); // Minimum 50% of base
    }
    
    calculateConfidence(data) {
        let confidence = 85; // Base confidence
        
        // Adjust based on data completeness
        if (!data.country) confidence -= 20;
        if (!data.companySize) confidence -= 15;
        if (!data.employment) confidence -= 10;
        if (data.languages.length === 0) confidence -= 10;
        
        // Adjust based on common combinations
        if (data.country === 'United States of America' && data.languages.includes('Go')) {
            confidence += 5; // Well-documented combination
        }
        
        if (data.experience > 25) {
            confidence -= 5; // Less data for very senior developers
        }
        
        return Math.max(60, Math.min(95, confidence));
    }
    
    generateRecommendations(data, currentSalary) {
        const recommendations = [];
        
        // Geographic recommendations
        if (data.country !== 'United States of America' && data.country !== 'Switzerland') {
            recommendations.push({
                type: 'geographic',
                title: 'Consider Geographic Opportunities',
                description: 'Moving to higher-paying markets like the US or Switzerland could increase your salary by 40-80%.',
                impact: 'High',
                timeframe: 'Long-term'
            });
        }
        
        // Language recommendations
        const highValueLanguages = ['Go', 'Rust', 'Scala'];
        const hasHighValueLanguage = data.languages.some(lang => highValueLanguages.includes(lang));
        
        if (!hasHighValueLanguage) {
            recommendations.push({
                type: 'skill',
                title: 'Learn High-Premium Languages',
                description: 'Learning Go, Rust, or Scala could increase your salary by 18-23%. These languages are in high demand.',
                impact: 'High',
                timeframe: 'Medium-term'
            });
        }
        
        // Company size recommendations
        if (data.companySize && !data.companySize.includes('10,000')) {
            recommendations.push({
                type: 'career',
                title: 'Target Large Enterprises',
                description: 'Large companies (10,000+ employees) typically pay 25% more than smaller organizations.',
                impact: 'Medium',
                timeframe: 'Short-term'
            });
        }
        
        // Experience-based recommendations
        if (data.experience < 10) {
            recommendations.push({
                type: 'career',
                title: 'Focus on Experience Growth',
                description: 'The first 10 years provide the highest salary growth. Focus on challenging projects and skill development.',
                impact: 'Medium',
                timeframe: 'Ongoing'
            });
        }
        
        // Technology stack recommendations
        const modernStack = ['TypeScript', 'Python', 'Go'];
        const hasModernStack = modernStack.some(lang => data.languages.includes(lang));
        
        if (!hasModernStack) {
            recommendations.push({
                type: 'skill',
                title: 'Modernize Your Technology Stack',
                description: 'Learning modern technologies like TypeScript, Python, or cloud platforms can boost your market value.',
                impact: 'Medium',
                timeframe: 'Short-term'
            });
        }
        
        return recommendations.slice(0, 4); // Limit to top 4 recommendations
    }
    
    displayResults(result) {
        // Update salary amount
        const salaryAmount = document.getElementById('salaryAmount');
        if (salaryAmount) {
            this.animateNumber(salaryAmount, 0, result.salary, 1500);
        }
        
        // Update salary range
        const salaryMin = document.getElementById('salaryMin');
        const salaryMax = document.getElementById('salaryMax');
        if (salaryMin) salaryMin.textContent = result.salaryMin.toLocaleString();
        if (salaryMax) salaryMax.textContent = result.salaryMax.toLocaleString();
        
        // Update confidence
        const confidenceFill = document.getElementById('confidenceFill');
        const confidenceValue = document.getElementById('confidenceValue');
        if (confidenceFill) {
            confidenceFill.style.width = result.confidence + '%';
        }
        if (confidenceValue) {
            confidenceValue.textContent = result.confidence + '%';
        }
        
        // Update feature importance
        this.displayFeatureImportance(result.factors);
        
        // Update recommendations
        this.displayRecommendations(result.recommendations);
    }
    
    displayFeatureImportance(factors) {
        const importanceList = document.getElementById('importanceList');
        if (!importanceList) return;
        
        const importanceItems = [
            { label: 'Geographic Location', value: '63.1%' },
            { label: 'Years of Experience', value: '14.2%' },
            { label: 'Company Size', value: '8.9%' },
            { label: 'Programming Languages', value: '6.7%' },
            { label: 'Employment Type', value: '4.1%' }
        ];
        
        importanceList.innerHTML = importanceItems.map(item => `
            <div class="importance-item">
                <span class="importance-label">${item.label}</span>
                <span class="importance-value">${item.value}</span>
            </div>
        `).join('');
    }
    
    displayRecommendations(recommendations) {
        const recommendationList = document.getElementById('recommendationList');
        if (!recommendationList) return;
        
        recommendationList.innerHTML = recommendations.map((rec, index) => `
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas fa-${this.getRecommendationIcon(rec.type)}"></i>
                </div>
                <div class="recommendation-content">
                    <div class="recommendation-title">${rec.title}</div>
                    <div class="recommendation-text">${rec.description}</div>
                    <div class="recommendation-meta">
                        <span class="impact impact-${rec.impact.toLowerCase()}">${rec.impact} Impact</span>
                        <span class="timeframe">${rec.timeframe}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    getRecommendationIcon(type) {
        const icons = {
            'geographic': 'globe',
            'skill': 'code',
            'career': 'briefcase',
            'education': 'graduation-cap'
        };
        return icons[type] || 'lightbulb';
    }
    
    showResultsPanel() {
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            resultsPanel.classList.add('show');
            resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(start + (range * easeOutQuart));
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }
}

// Utility functions for sharing and saving results
function shareResults() {
    const salaryAmount = document.getElementById('salaryAmount')?.textContent || '0';
    const shareText = `I just calculated my developer salary potential: $${salaryAmount} per year! Check out this data-driven salary calculator based on Stack Overflow survey data.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Developer Salary Calculator Results',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
            alert('Results copied to clipboard!');
        });
    }
}

function saveResults() {
    // Generate PDF report (simplified version)
    const salaryAmount = document.getElementById('salaryAmount')?.textContent || '0';
    const confidence = document.getElementById('confidenceValue')?.textContent || '0%';
    
    const reportContent = `
Developer Salary Analysis Report
Generated: ${new Date().toLocaleDateString()}

Estimated Annual Salary: $${salaryAmount}
Prediction Confidence: ${confidence}

This estimate is based on analysis of 109,000+ developer survey responses
from Stack Overflow's Annual Developer Survey (2022-2024).

Key Factors:
- Geographic location accounts for 63.1% of salary variation
- Programming language expertise can add 20%+ premiums
- Company size significantly impacts compensation
- Experience growth is highest in first 10 years

For detailed recommendations and career optimization strategies,
visit our comprehensive salary calculator.
    `;
    
    // Create and download text file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'developer_salary_report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SalaryCalculator();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add tooltips for language badges
    document.querySelectorAll('.language-badge').forEach(badge => {
        badge.addEventListener('mouseenter', (e) => {
            const premium = e.target.textContent;
            if (premium.includes('+')) {
                e.target.title = 'This language commands a salary premium based on market data';
            } else if (premium.includes('-')) {
                e.target.title = 'This language shows lower average compensation';
            }
        });
    });
    
    // Add smooth animations for form interactions
    document.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, select');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                group.classList.remove('focused');
            });
        }
    });
});

