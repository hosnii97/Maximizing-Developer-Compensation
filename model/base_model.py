import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error


def train_base_model(
        X_train: pd.DataFrame,
        y_train: np.ndarray
) -> RandomForestRegressor:
    rf = RandomForestRegressor(
        n_estimators=100,
        oob_score=True,
        random_state=0,
        n_jobs=-1
    )
    rf.fit(X_train, y_train)
    return rf


def evaluate_model(
        rf: RandomForestRegressor,
        X_test: pd.DataFrame,
        y_test_log: np.ndarray,
        country_series: pd.Series,
        country_avg_salary: pd.Series
) -> pd.DataFrame:
    y_pred_log = rf.predict(X_test)
    y_pred_norm = np.expm1(y_pred_log)
    y_true_norm = np.expm1(y_test_log)

    mae_log = mean_absolute_error(y_test_log, y_pred_log)
    mae_norm = mean_absolute_error(y_true_norm, y_pred_norm)

    df_results = pd.DataFrame({
        "country": country_series.values,
        "pred_salary_norm": y_pred_norm,
        "true_salary_norm": y_true_norm
    }, index=X_test.index)
    df_results["avg_country_salary"] = df_results["country"].map(country_avg_salary)
    df_results["pred_salary_usd"] = df_results["pred_salary_norm"] * df_results["avg_country_salary"]
    df_results["true_salary_usd"] = df_results["true_salary_norm"] * df_results["avg_country_salary"]

    mae_usd = mean_absolute_error(df_results["true_salary_usd"], df_results["pred_salary_usd"])

    print(f"Test MAE (log-normalized): {mae_log:.3f}")
    print(f"Test MAE (normalized scale): {mae_norm:.3f}")
    print(f"Test MAE (USD): ${mae_usd:,.0f}")
    print("OOB R²:", rf.oob_score_)

    return df_results
