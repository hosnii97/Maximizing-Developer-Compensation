import numpy as np
import re
import pandas as pd
from typing import List
from typing import Optional, Sequence


def summarize_nulls(df: pd.DataFrame) -> pd.DataFrame:
    nulls_before = df.isnull().sum()
    filtered = df[df['compensation_total'].notnull()]
    nulls_after = filtered.isnull().sum()
    summary = pd.DataFrame({
        'Nulls Before': nulls_before,
        'Nulls After': nulls_after
    })
    summary['Difference'] = summary['Nulls Before'] - summary['Nulls After']
    return summary


def preprocess_db_worked(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)

    print("=== Pipeline: db_worked preprocessing ===")
    print(f"Total rows: {total}")

    nulls_before = df['db_worked'].isna().sum()
    pct_before = nulls_before / total * 100
    print(f"Nulls before fill: {nulls_before} ({pct_before:.2f}%)")

    unique_before = df['db_worked'].nunique(dropna=True)
    print(f"Unique values before fill: {unique_before}")
    print("  Sample values:", df['db_worked'].dropna().unique()[:10].tolist())

    df['db_worked'] = df['db_worked'].fillna('Unknown')

    db_map = {
        'Microsoft SQL Server': 'SQL Server',
        'SQL Server':            'SQL Server',
        'Dynamodb':              'DynamoDB',
        'DynamoDB':              'DynamoDB',
        'Amazon DynamoDB':       'DynamoDB',
        'IBM Db2':               'IBM DB2',
        'IBM DB2':               'IBM DB2',
        'Neo4J':                 'Neo4j',
        'Neo4j':                 'Neo4j',
        'Couch DB':              'CouchDB',
        'CouchDB':               'CouchDB',
    }
    df['db_worked'] = (
        df['db_worked']
        .str.split(';')
        .apply(lambda items:
               '; '.join(db_map.get(x.strip(), x.strip()) for x in items)
               )
    )

    nulls_after = df['db_worked'].isna().sum()
    print(f"\nNulls after fill:  {nulls_after} (should be 0)")

    unique_after = df['db_worked'].nunique()
    print(f"Unique values after fill: {unique_after}\n")

    return df


def preprocess_langs_worked(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)

    print("=== Pipeline: langs_worked preprocessing ===")
    print(f"Total rows: {total}")

    nulls_before = df['langs_worked'].isna().sum()
    pct_before = nulls_before / total * 100
    print(f"Nulls before fill: {nulls_before} ({pct_before:.2f}%)")

    unique_before = df['langs_worked'].nunique(dropna=True)
    print(f"Unique values before fill: {unique_before}")
    print("  Sample values:", df['langs_worked'].dropna().unique()[:10].tolist())

    df['langs_worked'] = df['langs_worked'].fillna('Unknown')

    langs_map = {
        'Matlab':                  'MATLAB',
        'MATLAB':                  'MATLAB',
        'Bash/Shell (all shells)': 'Bash/Shell',
        'Bash/Shell':              'Bash/Shell',
        'LISP':                    'Lisp',
        'Lisp':                    'Lisp',
    }
    df['langs_worked'] = (
        df['langs_worked']
        .str.split(';')
        .apply(lambda items:
               '; '.join(langs_map.get(x.strip(), x.strip()) for x in items)
               )
    )

    nulls_after = df['langs_worked'].isna().sum()
    print(f"\nNulls after fill:  {nulls_after} (should be 0)")

    unique_after = df['langs_worked'].nunique()
    print(f"Unique values after fill: {unique_after}\n")

    return df


def preprocess_platform_worked(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)

    print("=== Pipeline: platform_worked preprocessing ===")
    print(f"Total rows: {total}")

    nulls_before = df['platform_worked'].isna().sum()
    pct_before = nulls_before / total * 100
    print(f"Nulls before fill: {nulls_before} ({pct_before:.2f}%)")

    unique_before = df['platform_worked'].nunique(dropna=True)
    print(f"Unique values before fill: {unique_before}")
    print("  Sample values:", df['platform_worked'].dropna().unique()[:10].tolist())

    df['platform_worked'] = df['platform_worked'].fillna('Unknown')

    platform_map = {
        'AWS':                          'AWS',
        'Amazon Web Services (AWS)':    'AWS',
        'Mac OS':                       'MacOS',
        'MacOS':                        'MacOS',
        'Linux Desktop':                'Linux',
        'Linux':                        'Linux',
        'Google Cloud':                 'Google Cloud',
        'Google Cloud Platform':        'Google Cloud',
        'DigitalOcean':                 'DigitalOcean',
        'Digital Ocean':                'DigitalOcean',
        'IBM Cloud or Watson':          'IBM Cloud',
        'IBM Cloud':                    'IBM Cloud',
    }
    df['platform_worked'] = (
        df['platform_worked']
        .str.split(';')
        .apply(lambda items:
               '; '.join(platform_map.get(x.strip(), x.strip()) for x in items)
               )
    )

    nulls_after = df['platform_worked'].isna().sum()
    print(f"\nNulls after fill:  {nulls_after} (should be 0)")

    unique_after = df['platform_worked'].nunique()
    print(f"Unique values after fill: {unique_after}\n")

    return df


def preprocess_webframe_worked(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)

    print("=== Pipeline: webframe_worked preprocessing ===")
    print(f"Total rows: {total}")

    nulls_before = df['webframe_worked'].isna().sum()
    pct_before = nulls_before / total * 100
    print(f"Nulls before fill: {nulls_before} ({pct_before:.2f}%)")

    unique_before = df['webframe_worked'].nunique(dropna=True)
    print(f"Unique values before fill: {unique_before}")
    print("  Sample values:", df['webframe_worked'].dropna().unique()[:10].tolist())

    df['webframe_worked'] = df['webframe_worked'].fillna('Unknown')

    webframe_map = {
        'React.js':     'React',
        'React':        'React',
        'AngularJS':    'Angular',
        'Angular.js':   'Angular',
        'Angular':      'Angular',
        'ASP.NET Core': '.NET Core',
        '.NET Core':    '.NET Core',
        'ASP.NET CORE': '.NET Core',
        '.NET CORE':    '.NET Core',
    }
    df['webframe_worked'] = (
        df['webframe_worked']
        .str.split(';')
        .apply(lambda items:
               '; '.join(webframe_map.get(x.strip(), x.strip()) for x in items)
               )
    )

    nulls_after = df['webframe_worked'].isna().sum()
    print(f"\nNulls after fill:  {nulls_after} (should be 0)")

    unique_after = df['webframe_worked'].nunique()
    print(f"Unique values after fill: {unique_after}\n")

    return df


def preprocess_compensation(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df = df[df['compensation_total'].notnull()].copy()
    before = len(df)

    print("=== Pipeline: compensation_total preprocessing ===")
    print(f"1) Rows with non-null raw strings: {before}")

    df['compensation_total'] = df['compensation_total'].apply(clean_compensation_string)
    df = df[df['compensation_total'].notnull()]
    after_parse = len(df)
    print(f"2) Rows after parsing to float:        {after_parse}  (dropped {before - after_parse})")

    before_bounds = after_parse
    df = df[(df['compensation_total'] >= 1_000) & (df['compensation_total'] <= 350_000)]
    after_bounds = len(df)
    print(f"3) Rows after [1k–350k] filter:        {after_bounds}  (dropped {before_bounds - after_bounds})")

    avg_before = df['compensation_total'].mean()
    print(f"   → Average before conversion:       ${avg_before:,.2f}")

    df = preprocess_currency_conversion(df)

    avg_after = df['compensation_total'].mean()
    print(f"   → Average after  conversion:       ${avg_after:,.2f}\n")

    return df


def preprocess_country(df: pd.DataFrame, top_n: int = 15) -> pd.DataFrame:
    df = df.copy()
    total_before = len(df)

    print("=== Pipeline: country preprocessing ===")
    print(f"Rows before any country cleanup: {total_before}")

    df['country'] = df['country'].fillna('Other')

    df['country'] = df['country'].replace({
        'United States of America': 'United States',
        'United States':               'United States',
        'United Kingdom of Great Britain and Northern Ireland': 'United Kingdom',
        'United Kingdom':              'United Kingdom'
    })

    unique_before = df['country'].nunique()
    print(f"Unique country labels before grouping: {unique_before}")
    print("Top countries before grouping:")
    print(df['country'].value_counts().head(top_n).to_string())

    counts = df['country'].value_counts()
    top_countries = counts.drop('Other', errors='ignore').nlargest(top_n).index.tolist()

    df['country'] = df['country'].where(df['country'].isin(top_countries), 'Other')

    unique_after = df['country'].nunique()
    print(f"\nUnique country labels after grouping: {unique_after}  (including 'Other')")
    print("Records by country (after grouping):")
    print(df['country'].value_counts().to_string())

    return df


def preprocess_currency(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total_before = len(df)
    print("\n=== Pipeline: currency preprocessing ===")
    print(f"Rows before filtering null currency: {total_before}")
    df = df[df['currency'].notna()].copy()
    total_after = len(df)
    print(f"Rows after  filtering null currency: {total_after}  (dropped {total_before - total_after})\n")
    return df


def preprocess_fill_unknown(df: pd.DataFrame, cols: List[str]) -> pd.DataFrame:
    df = df.copy()
    for col in cols:
        if col in df.columns:
            df[col] = df[col].fillna('Unknown')
    return df


def preprocess_dev_type(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)
    nulls_before = df['dev_type'].isna().sum()
    unique_before = df['dev_type'].nunique(dropna=True)

    print("=== Pipeline: dev_type preprocessing ===")
    print(f"Total rows:                       {total}")
    print(f"Nulls before mapping:            {nulls_before}")
    print(f"Unique raw values before map:    {unique_before}\n")

    df['dev_type'] = df['dev_type'].fillna('Unknown')

    dev_type_map = {
        'Back-end developer': 'Backend', 'Developer, back-end': 'Backend',
        'Front-end developer': 'Frontend', 'Developer, front-end': 'Frontend',
        'Full-stack developer': 'Fullstack', 'Developer, full-stack': 'Fullstack',
        'Mobile developer': 'Mobile', 'Developer, mobile': 'Mobile',
        'Data scientist': 'Data/ML', 'Machine learning specialist': 'Data/ML',
        'Data or business analyst': 'Data/ML', 'Data engineer': 'Data/ML',
        'Engineer, data': 'Data/ML', 'QA or test developer': 'QA/Test',
        'Quality assurance engineer': 'QA/Test', 'Developer, QA or test': 'QA/Test',
        'DevOps specialist': 'DevOps', 'Engineer, site reliability': 'DevOps',
        'Embedded applications/devices developer': 'Embedded',
        'Embedded applications or devices developer': 'Embedded',
        'Cloud infrastructure engineer': 'Cloud/Infra',
        'Systems administrator': 'Cloud/Infra', 'System administrator': 'Cloud/Infra',
        'Engineering manager': 'Manager', 'Project manager': 'Manager',
        'Product manager': 'Manager', 'Academic researcher': 'Academic',
        'Educator': 'Academic', 'Educator or academic researcher': 'Academic',
        'C-suite executive (CEO, CTO, etc.)': 'C-Suite',
        'Senior executive/VP': 'C-Suite',
        'Senior Executive (C-Suite, VP, etc.)': 'C-Suite'
    }

    def map_type(raw: str) -> str:
        if isinstance(raw, (set, list, tuple)):
            raw = next(iter(raw))
        return dev_type_map.get(raw, 'Other')

    df['dev_type'] = df['dev_type'].apply(map_type)

    nulls_after = df['dev_type'].isna().sum()
    unique_after = df['dev_type'].nunique(dropna=True)
    print(f"Nulls after mapping:             {nulls_after}")
    print(f"Unique values after mapping:     {unique_after}")
    print("Counts per dev_type:")
    print(df['dev_type'].value_counts().to_string(), "\n")

    categories = [
        'Backend', 'Frontend', 'Fullstack', 'Mobile', 'Data/ML', 'QA/Test',
        'DevOps', 'Embedded', 'Cloud/Infra', 'Manager', 'Academic', 'C-Suite',
        'Other', 'Unknown'
    ]
    cat_type = pd.CategoricalDtype(categories=categories, ordered=False)
    df['dev_type'] = df['dev_type'].astype(cat_type)

    return df


def preprocess_org_size(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)
    nulls_before = df['org_size'].isna().sum()
    unique_before = df['org_size'].nunique(dropna=True)

    print("=== Pipeline: org_size preprocessing ===")
    print(f"Total rows:                    {total}")
    print(f"Nulls before mapping:          {nulls_before}")
    print(f"Unique raw values before map:  {unique_before}\n")

    def simplify(val: str) -> str:
        if not isinstance(val, str):
            return 'Unknown'
        v = val.strip().lower()
        if 'fewer than 10' in v: return '0-9'
        if '10 to 19' in v: return '10-19'
        if '20 to 99' in v: return '20-99'
        if '100 to 499' in v:return '100-499'
        if '500 to 999' in v:return '500-999'
        if '1,000 to 4,999' in v:return '1000-4999'
        if '5,000 to 9,999' in v:return '5000-9999'
        if '10,000 or more' in v: return '10000+'
        return 'Unknown'

    df['org_size'] = df['org_size'].apply(simplify)

    df['org_size'] = df['org_size'].fillna('Unknown')
    nulls_after = df['org_size'].isna().sum()

    print(f"Nulls after mapping:           {nulls_after}")
    print("Counts per bucket:")
    print(df['org_size'].value_counts().sort_index().to_string(), "\n")

    categories = [
        'Unknown', '0-9', '10-19', '20-99',
        '100-499', '500-999', '1000-4999',
        '5000-9999', '10000+'
    ]
    cat_type = pd.CategoricalDtype(categories=categories, ordered=True)
    df['org_size'] = df['org_size'].astype(cat_type)

    return df


def preprocess_currency_conversion(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    base_rates = {
        'PLN': 0.22, 'SEK': 0.10, 'CAD': 0.75, 'RUB': 0.013, 'MXN': 0.057,
        'AUD': 0.66, 'JPY': 0.0069, 'CNY': 0.14, 'ZAR': 0.052, 'BTC': 30000,
        'COP': 0.00026, 'ARS': 0.0053, 'TRY': 0.033, 'IRR': 0.000024, 'IDR': 0.000064,
        'UAH': 0.027, 'HRK': 0.14, 'ILS': 0.27, 'BDT': 0.0094, 'PKR': 0.0057,
        'CHF': 1.09, 'RON': 0.23, 'LKR': 0.0028, 'CZK': 0.043, 'HUF': 0.0026,
        'BGN': 0.56, 'MYR': 0.22, 'BAM': 0.56, 'PHP': 0.018, 'BYN': 0.41,
        'GHS': 0.085, 'DZD': 0.0072, 'GEL': 0.35, 'KES': 0.0072, 'CLP': 0.0012,
        'VND': 0.000042, 'THB': 0.028, 'NZD': 0.60, 'RSD': 0.0090, 'KRW': 0.00076,
        'TND': 0.32, 'HKD': 0.13, 'TWD': 0.032, 'MAD': 0.10, 'AED': 0.27,
        'EGP': 0.032, 'NGN': 0.0024, 'UGX': 0.000027, 'MMK': 0.00040, 'TZS': 0.00043,
        'CUC': 1.00, 'ISK': 0.0076, 'OMR': 2.60, 'AMD': 0.0026, 'PEN': 0.26,
        'NPR': 0.0077, 'DOP': 0.017, 'SYP': 0.00040, 'NIO': 0.027, 'KZT': 0.0023,
        'PYG': 0.00014, 'MKD': 0.017, 'SAR': 0.27, 'JOD': 1.41, 'AZN': 0.59,
        'CUP': 1.00, 'MDL': 0.053, 'VEF': 0.000001, 'XAF': 0.0017, 'MUR': 0.022,
        'ETB': 0.019, 'DKK': 0.16, 'KWD': 3.27, 'GTQ': 0.13, 'BHD': 2.65,
        'MVR': 0.065, 'MNT': 0.00031, 'KGS': 0.012, 'UYU': 0.025, 'ALL': 0.010,
        'FJD': 0.47, 'MZN': 0.015, 'SDG': 0.0023, 'CRC': 0.0017, 'NOK': 0.10,
        'LYD': 0.21, 'BOB': 0.14, 'MGA': 0.00023, 'NAD': 0.052, 'TTD': 0.15,
        'HNL': 0.041, 'BTN': 0.012, 'IQD': 0.00069, 'RWF': 0.00083, 'AFN': 0.011,
        'YER': 0.0040, 'GMD': 0.018, 'UZS': 0.000090, 'ZMW': 0.055, 'XOF': 0.0017,
        'QAR': 0.27, 'MOP': 0.12, 'XPF': 0.0090, 'XCD': 0.37, 'JMD': 0.0061,
        'LBP': 0.000066, 'CVE': 0.01, 'BND': 0.74, 'TMT': 0.29, 'ANG': 0.56,
        'SOS': 0.0018, 'GNF': 0.00010, 'AOA': 0.0016, 'BZD': 0.50, 'DJF': 0.0056,
        'WST': 0.37, 'BBD': 0.50, 'LSL': 0.054, 'SZL': 0.054, 'TJS': 0.091,
        'VES': 0.000025, 'BMD': 1.00, 'GGP': 1.31, 'BIF': 0.00050, 'IMP': 1.31,
        'BWP': 0.082, 'HTG': 0.0090, 'LAK': 0.000055, 'SCR': 0.074, 'MWK': 0.0012,
        'SRD': 0.012, 'KYD': 1.20, 'BSD': 1.00, 'CDF': 0.00050, 'GIP': 1.31,
        'KHR': 0.00025, 'FKP': 1.31, 'GYD': 0.0048, 'MRU': 0.028, 'TOP': 0.42,
        'LRD': 0.0053, 'AWG': 0.56, 'KPW': 0.0010, 'SBD': 0.12, 'SLL': 0.000055,
        'JEP': 1.31, 'SSP': 0.0055, 'XDR': 1.36, 'USD': 1.00, 'EUR': 1.13, 'GBP': 1.29, 'INR': 0.015
    }
    df['compensation_total'] = pd.to_numeric(df['compensation_total'], errors='coerce')
    df['compensation_total'] = (
            df['compensation_total'] * df['currency'].map(base_rates).fillna(1.0)
    )
    return df.drop(columns=['currency'], errors='ignore')


def clean_compensation_string(x: str) -> float:
    if pd.isna(x):
        return np.nan
    s = str(x).strip()

    if ',' in s and '.' in s:
        if s.find(',') < s.find('.'):
            s2 = s.replace(',', '')
        else:
            s2 = s.replace('.', '').replace(',', '.')
    elif ',' in s:
        parts = s.split(',')
        if len(parts[-1]) == 2:
            s2 = s.replace(',', '.')
        else:
            s2 = s.replace(',', '')
    else:
        s2 = s

    try:
        return float(s2)
    except ValueError:
        return np.nan


def preprocess_years_as_category(
        df: pd.DataFrame,
        col: str,
        *,
        categories=None
) -> pd.DataFrame:
    if categories is None:
        categories = ['Unknown', '0', '1-2', '3-5', '6-10', '20+']
    df = df.copy()
    total = len(df)
    nulls_before = df[col].isna().sum()
    unique_before = df[col].nunique(dropna=True)

    print(f"=== Pipeline: {col} preprocessing as category ===")
    print(f"Total rows:                  {total}")
    print(f"Nulls before fill:           {nulls_before}")
    print(f"Unique raw values before:    {unique_before}\n")

    df[col] = df[col].replace({
        'Less than a year': 'Less than 1 year',
        'More than 50 years': '20 or more years',
    })

    df[col] = df[col].fillna('Unknown')
    nulls_after_fill = df[col].isna().sum()
    print(f"Nulls after fill:            {nulls_after_fill}\n")

    print("Top raw values after fill & unify:")
    print(df[col].value_counts().head(10).to_string(), "\n")

    def extract_years(val: str) -> int:
        if val == 'Unknown':
            return -1
        v = val.lower()
        if 'less than' in v:
            return 0
        if 'more than' in v or '20 or more' in v:
            return 20
        m = re.match(r'(\d+)', v)
        return int(m.group(1)) if m else -1

    raw = df[col].astype(str).map(extract_years)

    def to_bucket(x: int) -> str:
        if x == -1:
            return 'Unknown'
        if x == 0:
            return '0'
        if 1 <= x <= 2:
            return '1-2'
        if 3 <= x <= 5:
            return '3-5'
        if 6 <= x <= 10:
            return '6-10'
        return '20+'

    df[col] = raw.map(to_bucket)
    unique_after = df[col].nunique()
    print(f"Unique buckets after mapping: {unique_after}")
    print("Counts per bucket:")
    print(df[col].value_counts().to_string(), "\n")

    cat_type = pd.CategoricalDtype(categories=categories, ordered=True)
    df[col] = df[col].astype(cat_type)
    print(f"Final categories: {df[col].cat.categories.tolist()}\n")

    return df


def categorize_education(val: str) -> str:
    if not isinstance(val, str):
        return 'Unknown'
    val_lower = val.lower()
    if 'primary' in val_lower or 'elementary' in val_lower:
        return 'Primary'
    if 'secondary' in val_lower or 'high school' in val_lower:
        return 'Secondary'
    if 'some college' in val_lower:
        return 'Some college'
    if 'bachelor' in val_lower:
        return "Bachelor's"
    if 'master' in val_lower:
        return "Master's"
    if 'professional degree' in val_lower:
        return 'Professional'
    if 'doctoral' in val_lower or 'phd' in val_lower:
        return 'Doctorate'
    if 'prefer not to' in val_lower:
        return 'Unknown'
    return 'Other'


def preprocess_education_level(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)

    print("=== Pipeline: education_level preprocessing ===")
    print(f"Total rows: {total}")

    nulls_before = df['education_level'].isna().sum()
    pct_before  = nulls_before / total * 100
    print(f"Nulls before filling: {nulls_before} ({pct_before:.2f}%)")

    unique_before = df['education_level'].nunique(dropna=True)
    print(f"Unique values before mapping: {unique_before}")
    print("  Sample values:", df['education_level'].dropna().unique()[:10].tolist())

    df['education_level'] = df['education_level'].fillna('Unknown')
    nulls_after = df['education_level'].isna().sum()
    print(f"\nNulls after filling:  {nulls_after} (should be 0)")

    df['education_level'] = df['education_level'].apply(categorize_education)

    counts = df['education_level'].value_counts()
    print(f"\nCategories after mapping ({len(counts)} total):")
    print(counts.to_string())
    print()

    return df


def simplify_employment(val: str) -> str:
    if not isinstance(val, str):
        return 'Unknown'
    val_lower = val.lower()
    if 'full-time' in val_lower:
        return 'Full-time'
    if 'part-time' in val_lower:
        return 'Part-time'
    if 'contractor' in val_lower or 'freelancer' in val_lower or 'self-employed' in val_lower:
        return 'Self-employed'
    if 'not employed' in val_lower:
        return 'Unemployed'
    if 'retired' in val_lower:
        return 'Retired'
    if 'prefer not to say' in val_lower:
        return 'Unknown'
    return 'Other'


def preprocess_employment(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    total = len(df)

    print("=== Pipeline: employment preprocessing ===")
    print(f"Total rows: {total}")

    nulls_before = df['employment'].isna().sum()
    pct_before = nulls_before / total * 100
    print(f"Nulls before fill: {nulls_before} ({pct_before:.2f}%)")

    unique_before = df['employment'].nunique(dropna=True)
    print(f"Unique values before fill: {unique_before}")
    print("  Sample values:", df['employment'].dropna().unique()[:10].tolist())

    df['employment'] = df['employment'].fillna('Unknown')

    df['employment'] = df['employment'].apply(simplify_employment)

    nulls_after = df['employment'].isna().sum()
    print(f"\nNulls after fill & mapping: {nulls_after} (should be 0)")

    unique_after = df['employment'].nunique()
    print(f"Unique values after mapping: {unique_after}")
    print("Value counts after mapping:")
    print(df['employment'].value_counts().to_string(), "\n")

    return df


def encode_df_top_k(
        df: pd.DataFrame,
        k: int = 20,
        exclude: Optional[Sequence[str]] = None
) -> pd.DataFrame:
    df = df.copy()
    exclude = set(exclude or [])
    exclude.add('country')

    to_encode = [
        c for c in df.select_dtypes(include=['object','category']).columns
        if c not in exclude
    ]

    for col in to_encode:
        series = df[col].fillna('Unknown').astype(str)
        if series.str.contains(';').any():
            lists = series.str.split(';').apply(lambda xs: [x.strip() for x in xs])
            all_items = [item for sub in lists for item in sub]
            top_items = pd.Series(all_items).value_counts().nlargest(k).index
            for item in top_items:
                df[f"{col}_{item}"] = lists.apply(lambda xs: int(item in xs))
        else:
            top_vals = series.value_counts().nlargest(k).index
            reduced = series.where(series.isin(top_vals), other='Other')
            dummies = pd.get_dummies(reduced, prefix=col)
            df = pd.concat([df, dummies], axis=1)

    df = df.drop(columns=to_encode)
    return df


def drop_unused_dummies(df: pd.DataFrame) -> pd.DataFrame:

    pattern = re.compile(r".*_(Other|Unknown)$")
    to_drop = [col for col in df.columns if pattern.match(col)]
    return df.drop(columns=to_drop, errors='ignore')


def simplify_and_encode(df: pd.DataFrame) -> pd.DataFrame:
    df = preprocess_currency(df)
    df = preprocess_compensation(df)
    df = preprocess_country(df, top_n=30)
    df = preprocess_years_as_category(df, 'years_code_total')
    df = preprocess_years_as_category(df, 'years_code_pro')
    df = preprocess_org_size(df)
    df = preprocess_dev_type(df)
    df = preprocess_db_worked(df)
    df = preprocess_education_level(df)
    df = preprocess_webframe_worked(df)
    df = preprocess_platform_worked(df)
    df = preprocess_langs_worked(df)
    df = preprocess_employment(df)
    print("*****************************************************")
    encoded_df = encode_df_top_k(
        df,
        k=15,
        exclude=['compensation_total', 'year']
    )
    print("Before dropping unused dummies:", encoded_df.shape)

    return encoded_df
