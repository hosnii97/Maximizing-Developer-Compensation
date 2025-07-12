import pandas as pd
import numpy as np
from typing import Tuple
from sklearn.model_selection import train_test_split


def prepare_train_test(
        df: pd.DataFrame,
        test_year: int = 2024
) -> Tuple[
    pd.DataFrame, np.ndarray,
    pd.DataFrame, np.ndarray,
    pd.Series, pd.Series
]:
    country_avg_salary = df.groupby("country")["compensation_total"].mean()

    train_df = df[df["year"] < test_year].copy()
    test_df  = df[df["year"] == test_year].copy()

    drop_cols = ["salary_normalized", "country", "compensation_total", "year"]

    X_train     = train_df.drop(columns=drop_cols)
    y_train_log = np.log1p(train_df["salary_normalized"])

    X_test      = test_df.drop(columns=drop_cols)
    y_test_log  = np.log1p(test_df["salary_normalized"])

    test_countries = test_df.loc[X_test.index, "country"]

    return X_train, y_train_log, X_test, y_test_log, test_countries, country_avg_salary


def prepare_train_test_interpolation(
        df: pd.DataFrame,
        test_size: float = 0.2,
        random_state: int = 0
) -> Tuple[
    pd.DataFrame, np.ndarray,
    pd.DataFrame, np.ndarray,
    pd.Series, pd.Series
]:
    country_avg_salary = df.groupby("country")["compensation_total"].mean()

    drop_cols = ["salary_normalized", "country", "compensation_total", "year"]
    X = df.drop(columns=drop_cols)
    y_log = np.log1p(df["salary_normalized"])
    countries = df["country"]

    X_train, X_test, y_train_log, y_test_log, _, test_countries = train_test_split(
        X, y_log, countries,
        test_size=test_size,
        random_state=random_state
    )

    return X_train, y_train_log, X_test, y_test_log, test_countries, country_avg_salary