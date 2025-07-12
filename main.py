import pandas as pd
import numpy as np
from data_io import fetch_and_unpack, load_raw_data
from cleaning import harmonize_and_select, drop_empty_and_low_info, convert_to_numeric, save_cleaned
from merge import merge_data
from preprocessing import summarize_nulls, simplify_and_encode
from model.utils import prepare_train_test, prepare_train_test_interpolation
from model.base_model import train_base_model, evaluate_model
from model.weighted_model import compute_sample_weights, train_weighted_model, evaluate_weighted_model


def ingest_data() -> dict[int, pd.DataFrame]:
    fetch_and_unpack()
    return load_raw_data()


def clean_data(dfs: dict[int, pd.DataFrame]) -> dict[int, pd.DataFrame]:
    dfs = harmonize_and_select(dfs)
    dfs = drop_empty_and_low_info(dfs)
    dfs = convert_to_numeric(dfs)
    save_cleaned(dfs)
    return dfs


def merge_data_pipeline(dfs: dict[int, pd.DataFrame]) -> pd.DataFrame:
    return merge_data(dfs)


def preprocess_data(df: pd.DataFrame) -> pd.DataFrame:
    print("Null summary:\n", summarize_nulls(df))
    df = simplify_and_encode(df)
    country_avg = df.groupby("country")["compensation_total"].mean()
    df["salary_normalized"] = df.apply(
        lambda row: row["compensation_total"] / country_avg.get(row["country"], np.nan),
        axis=1
    )
    return df


def run_baseline_model(
        X_train: pd.DataFrame,
        y_train: np.ndarray,
        X_test: pd.DataFrame,
        y_test: np.ndarray,
        test_countries: pd.Series,
        country_avg: pd.Series
) -> None:
    print("\n--- Baseline Model ---")
    rf = train_base_model(X_train, y_train)
    results = evaluate_model(
        rf=rf,
        X_test=X_test,
        y_test_log=y_test,
        country_series=test_countries,
        country_avg_salary=country_avg
    )

    print("\nSample predictions (first 5 rows):")
    sample = results.loc[:, ["country", "pred_salary_usd", "true_salary_usd"]].head()
    print(sample.to_string(index=True, float_format="%.2f"))

    importances = pd.Series(rf.feature_importances_, index=X_train.columns)
    top10 = importances.nlargest(10)
    print("\nTop 10 feature importances:")
    print(top10.to_string(float_format="%.4f"))


def run_weighted_model(
        X_train: pd.DataFrame,
        y_train: np.ndarray,
        X_test: pd.DataFrame,
        y_test: np.ndarray,
        test_countries: pd.Series,
        country_avg: pd.Series,
        all_years: pd.Series
) -> None:
    print("\n--- Weighted Model ---")
    train_years = all_years.loc[X_train.index]
    weights = compute_sample_weights(train_years)

    rf = train_weighted_model(X_train, y_train, weights)

    results = evaluate_weighted_model(
        rf=rf,
        X_test=X_test,
        y_test_log=y_test,
        country_series=test_countries,
        country_avg_salary=country_avg
    )

    print("\nSample predictions (first 5 rows):")
    sample = results.loc[:, ["country", "pred_salary_usd", "true_salary_usd"]].head()
    print(sample.to_string(index=True, float_format="%.2f"))

    importances = pd.Series(rf.feature_importances_, index=X_train.columns)
    top10 = importances.nlargest(10)
    print("\nTop 10 feature importances:")
    print(top10.to_string(float_format="%.4f"))


def main():
    dfs = ingest_data()
    cleaned = clean_data(dfs)
    merged = merge_data_pipeline(cleaned)
    print("Merged columns:", merged.columns.tolist())

    processed = preprocess_data(merged)

    X_train, y_train, X_test, y_test, test_countries, country_avg = prepare_train_test(processed)

    run_baseline_model(
        X_train, y_train,
        X_test, y_test,
        test_countries, country_avg
    )
    run_weighted_model(
        X_train, y_train,
        X_test, y_test,
        test_countries, country_avg,
        processed['year']
    )
    X_i_train, y_i_train, X_i_test, y_i_test, c_i_test, avg = prepare_train_test_interpolation(processed, test_size=0.2)
    run_baseline_model(X_i_train, y_i_train, X_i_test, y_i_test, c_i_test, avg)


if __name__ == '__main__':
    main()
