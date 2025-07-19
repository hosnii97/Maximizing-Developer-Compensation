import pandas as pd


def find_common_columns(dfs: dict[int, pd.DataFrame]) -> list[str]:
    """
    Identifies columns that are common across all DataFrames for each year.
    """
    years = sorted(dfs)
    common = set(dfs[years[0]].columns)
    for yr in years[1:]:
        common &= set(dfs[yr].columns)
    return sorted(common)


def merge_data(dfs: dict[int, pd.DataFrame]) -> pd.DataFrame:
    """
    Merges multiple yearly DataFrames into a single DataFrame using only common columns.
    """
    common_cols = find_common_columns(dfs)
    drop_cols = [
        'db_desired',
        'langs_desired',
        'platform_desired',
        'webframe_desired'
    ]
    common_cols = [c for c in common_cols if c not in drop_cols]
    merged_list = []
    for yr, df in sorted(dfs.items()):
        sub = df[common_cols].copy()
        sub['year'] = yr
        merged_list.append(sub)

    merged_df = pd.concat(merged_list, ignore_index=True)
    print(f"Merged DataFrame shape: {merged_df.shape}")
    return merged_df
