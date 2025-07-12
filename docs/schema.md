# 📊 Data Schema & Project Flow

This document outlines the flow of data through the project and the transformation stages it undergoes.

---

## 📁 Raw Data

- **Source**: Stack Overflow Developer Surveys (2017–2024)
- **Format**: CSV files inside ZIP archives
- **Retrieved by**:  `fetch_and_unpack()`

---

## 🧹 Cleaned Data

Handled by: `cleaning.py`, `merge.py`

- Harmonizes column names across years
- Removes rows with invalid or extreme salary values
- Drops unnecessary columns
- Saves a consistent dataset for downstream use

---

## 🔄 Merged & Harmonized Dataset

- Combined all years into a single DataFrame
- Adds a `year` column to retain time context
- Harmonized field names and fixed missing columns across years

---

## 🧠 Feature Engineering

Handled by: `preprocessing.py`

- Encodes top programming languages, platforms, organization sizes, and remote work type
- Normalizes salaries using log1p and by country averages
- Adds country and year-based features
- Constructs final training and test sets

---

## 📉 Model Training

Handled by:
- `base_model.py` (uniform weights)
- `weighted_model.py` (exponential temporal weighting)

Models:
- Random Forest Regressors
- Evaluated with MAE and R²

---

## 🧪 Evaluation & Output

Handled by: `main.py`

- Trains 3 versions of the model (baseline, weighted, interpolated)
- Outputs:
  - MAE and R² for each model
  - Salary predictions (USD)
  - Feature importances
  - Recommendations based on findings

---

## 📂 Folder Structure Summary

```
.
├── data/               # auto-populated with downloaded CSVs
├── download_data.py    # handles data download and extraction
├── cleaning.py         # column harmonization and salary filters
├── merge.py            # combines years into one DataFrame
├── preprocessing.py    # feature encoding and normalization
├── base_model.py       # base ML model
├── weighted_model.py   # temporally weighted ML model
├── main.py             # execution pipeline and evaluation
├── utils.py            # helper functions (e.g., splitting)
└── docs/
    └── schema.md       # current file
```
