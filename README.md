# Maximizing Developer Compensation  
## Through Temporal-Weighted Analysis (2017–2024)

### 👤 Authors  
Hosni Abomokh, Itay Pizanty  
Supervisor: Prof. Mario  
📅 July 2025

---

## 📊 Project Overview  
Temporal-weighted machine learning applied to 2017–2024 Stack Overflow survey data to guide developers on maximizing compensation.

---

## 🚀 Key Features  
- Weighted salary prediction models  
- Harmonized multi-year data  
- Cross-survey feature engineering  
- Baseline vs. weighted model comparison  

---

## 📑 Dataset  
268,935 filtered developer responses from Stack Overflow surveys (2017–2024).

---

## 🧮 Temporal Weighting Formula  
Exponential decay prioritizing recent years:  
```math
w(t) = e^{-λ(T - t)}
```  
Where `T = 2024` and `λ = 0.15`.

---

## 🛠 Installation  
```bash
pip install -r requirements.txt
```

---

## 🔄 How to Run  
Run the full pipeline with:  
```bash
python main.py
```

This executes:
- Data download & preprocessing
- Feature engineering
- Model training & evaluation
- Results output (MAE, R², predictions, importances)

---

## 🗂 Project Structure  
```
.
├── main.py
├── data_io.py
├── cleaning.py
├── merge.py
├── preprocessing.py
├── base_model.py
├── weighted_model.py
├── utils.py
├── requirements.txt
└── README.md
```

---

## 🌍 Key Findings (2024)  
- Go and Rust show the highest salary premiums  
- Remote-first roles pay 10–20% more  
- U.S. remains the top-paying country  
- Large enterprises offer 28.5% higher salaries  

---

## ✅ Recommendations for Developers  
**Short Term (0–6 months)**  
- Learn Go or Rust  
- Apply for remote roles in high-paying regions  

**Mid Term (6–24 months)**  
- Target companies with 1,000+ employees  
- Build AI/ML skills with Python  

**Long Term (2+ years)**  
- Specialize in infrastructure or cloud  
- Plan career moves strategically toward large tech firms  

---

## 🔖 License & Contact  
This project is for **educational and research** purposes.  
📬 Contact: hosni.abomokh@university.edu  

---

## 📚 References  
1. Boehm, *Software Engineering Economics*  
2. Stack Overflow Developer Survey (2024)  
3. GitHub Octoverse (2023)  
4. Glassdoor Tech Salary Report (2023)  
5. Harvey, *Kalman Filtering Models*  
6. U.S. Bureau of Labor Statistics (2023)

---

❤️ Made with love by Hosni & Itay
