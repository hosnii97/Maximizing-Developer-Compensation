# Developer Salary Calculator

A comprehensive, data-driven salary calculator for software developers based on Stack Overflow's Annual Developer Survey data (2022-2024).

## 📊 About

This interactive web application helps developers estimate their earning potential based on:
- **Geographic location** (63.1% of salary variation)
- **Programming languages** and technology stack
- **Years of experience** and career progression
- **Company size** and employment type
- **Industry trends** and market data

## 🎯 Features

### 💰 Accurate Salary Predictions
- Machine learning model with 63.1% accuracy (R² score)
- Based on 109,000+ real developer survey responses
- Confidence intervals and prediction reliability metrics

### 🌍 Global Coverage
- 50+ countries with comprehensive salary data
- Cost-of-living considerations
- Regional market analysis

### 💻 Programming Language Analysis
- 25+ programming languages with premium calculations
- Technology stack combinations
- Market demand insights

### 📱 Responsive Design
- Mobile-first responsive design
- Touch-optimized controls
- Cross-browser compatibility
- Accessibility features

### 📈 Data Visualizations
- Interactive charts and graphs
- Feature importance analysis
- Trend visualizations
- Comparative analysis

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in any modern web browser
2. Fill out the developer profile form
3. Select your programming languages
4. Click "Calculate My Salary"
5. Review results and recommendations

### Local Development
```bash
# Clone or download the project
cd salary_calculator_enhanced

# Serve locally (optional)
python -m http.server 8000
# or
npx serve .

# Open in browser
open http://localhost:8000
```

## 📁 Project Structure

```
salary_calculator_enhanced/
├── index.html              # Main application file
├── css/
│   ├── styles.css          # Main stylesheet
│   └── responsive.css      # Responsive design styles
├── js/
│   ├── calculator.js       # Core calculation logic
│   ├── animations.js       # Animation and effects
│   └── responsive.js       # Mobile optimization
├── assets/
│   └── favicon.ico         # Site favicon
└── README.md              # This file
```

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No external dependencies
- **Progressive Web App** features
- **Responsive Design** principles

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight (~200KB total)
- Fast loading times
- Optimized for mobile devices
- Offline-capable (with service worker)

## 📊 Data Sources

### Stack Overflow Developer Survey
- **Years**: 2022-2024
- **Responses**: 375,000+ total, 109,000+ with salary data
- **Coverage**: 50+ countries, 25+ programming languages
- **Methodology**: Machine learning analysis with Random Forest models

### Key Insights
- Geographic location is the strongest salary predictor (63.1% importance)
- Go programming language commands highest premium (+23.4%)
- Large companies (10,000+ employees) pay 25% more than smaller organizations
- First decade of experience shows highest salary growth

## 🎨 Design Features

### User Experience
- **Intuitive Interface** - Clean, modern design
- **Progressive Disclosure** - Information revealed as needed
- **Visual Feedback** - Animations and micro-interactions
- **Accessibility** - WCAG 2.1 AA compliant

### Visual Design
- **Color Palette** - Professional blue and green gradients
- **Typography** - Inter font family for readability
- **Icons** - Font Awesome for consistent iconography
- **Layout** - CSS Grid for responsive layouts

## 🔮 Features

### Salary Calculation
- Real-time salary estimation
- Confidence intervals
- Feature importance analysis
- Personalized recommendations

### Interactive Elements
- Range sliders for experience and age
- Multi-select programming languages
- Dropdown menus for location and company size
- Animated result displays

### Results Analysis
- Salary breakdown by factors
- Comparison with market averages
- Career optimization suggestions
- Downloadable reports

## 📈 Accuracy & Validation

### Model Performance
- **R² Score**: 0.631 (explains 63.1% of variance)
- **RMSE**: $31,847 (root mean square error)
- **Cross-validation**: 5-fold validation with consistent results
- **Sample Size**: 109,000+ complete responses

### Limitations
- Based on self-reported survey data
- Geographic bias toward Stack Overflow users
- Technology trends may change rapidly
- Individual results may vary

## 🛠️ Customization

### Modifying Salary Data
Edit the `baselineData` object in `js/calculator.js`:

```javascript
baselineData: {
    countries: {
        'United States': 120000,
        // Add or modify country data
    },
    languagePremiums: {
        'Go': 23.4,
        // Add or modify language premiums
    }
}
```

### Styling Customization
Modify CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    /* Customize colors */
}
```

## 📱 Mobile Optimization

### Responsive Features
- Mobile-first design approach
- Touch-optimized controls
- Swipe gestures support
- Viewport optimization

### Performance
- Lazy loading for images
- Optimized animations
- Reduced motion support
- Battery-efficient calculations

## 🔒 Privacy & Security

### Data Handling
- **No data collection** - All calculations performed locally
- **No tracking** - No analytics or user tracking
- **No server communication** - Fully client-side application
- **Privacy-first** - No personal data stored or transmitted

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across browsers and devices
5. Submit a pull request

### Code Style
- Use semantic HTML
- Follow BEM CSS methodology
- Write vanilla JavaScript (ES6+)
- Include accessibility features
- Test on mobile devices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

**Research Team:**
- Hosni Abomokh - University of Haifa
- Itay Pizanty - University of Haifa

**Course:** Data Science Lab (01ב214.3031)  
**Instructor:** Dr. Mario Boley  
**Institution:** University of Haifa, Department of Information Systems

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Contact the research team
- Review the documentation

## 🙏 Acknowledgments

- **Stack Overflow** for providing comprehensive survey data
- **Developer Community** for participating in annual surveys
- **University of Haifa** for supporting this research
- **Open Source Community** for tools and libraries used

---

**Built with ❤️ for the developer community**

*Last updated: July 2025*

