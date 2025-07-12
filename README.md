# Maximizing Developer Compensation  
## Interpretable Machine Learning for Developer Salary Prediction and Skill Growth Analysis (2017–2024)

### 👤 Authors  
Hosni Abomokh, Itay Pizanty  
Supervisor: Prof. Mario  

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

## 🔖 License & Contact  
This project is for **educational and research** purposes.  
📬 Contact: hosniabomokh97@gmail.com  
📬 Contact: itaypiz71@gmail.com

---

