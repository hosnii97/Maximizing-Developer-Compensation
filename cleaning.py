import os
import numpy as np
import pandas as pd
from collections import defaultdict

from data_io import DATA_DIR

CLEAN_DIR_NAME = "clean_numeric"

alias_map = {
    "country": ["Country"],
    "employment": ["EmploymentStatus", "Employment"],
    "education_level": ["FormalEducation", "EdLevel"],
    "org_size": ["CompanySize", "OrgSize"],
    "dev_type": ["DeveloperType", "DevType"],
    "years_code_total": ["YearsProgram", "YearsCoding", "YearsCode"],
    "years_code_pro": ["YearsCodedJob", "YearsCodingProf", "YearsCodePro"],
    "currency": ["Currency", "CurrencySymbol"],
    "compensation_total": ["Salary", "ConvertedSalary", "CompTotal", "ConvertedComp", "ConvertedCompYearly"],
    "langs_worked": ["HaveWorkedLanguage", "LanguageWorkedWith", "LanguageHaveWorkedWith"],
    "langs_desired": ["WantWorkLanguage", "LanguageDesireNextYear", "LanguageWantToWorkWith"],
    "db_worked": ["HaveWorkedDatabase", "DatabaseWorkedWith", "DatabaseHaveWorkedWith"],
    "db_desired": ["WantWorkDatabase", "DatabaseDesireNextYear", "DatabaseWantToWorkWith"],
    "platform_worked": ["HaveWorkedPlatform", "PlatformWorkedWith", "PlatformHaveWorkedWith"],
    "platform_desired": ["WantWorkPlatform", "PlatformDesireNextYear", "PlatformWantToWorkWith"],
    "webframe_worked": ["HaveWorkedFramework", "FrameworkWorkedWith", "WebFrameWorkedWith", "WebframeWorkedWith", "WebframeHaveWorkedWith"],
    "webframe_desired": ["WantWorkFramework", "FrameworkDesireNextYear", "WebFrameDesireNextYear", "WebframeDesireNextYear", "WebframeWantToWorkWith"],
    "operating_system": ["OperatingSystem", "OpSys", "OpSysPersonal use", "OpSysProfessional use"],
    "so_visit_freq": ["StackOverflowVisit", "SOVisitFreq"],
    "so_account": ["StackOverflowHasAccount", "SOAccount"],
    "so_part_freq": ["StackOverflowParticipate", "SOPartFreq"],
    "so_community": ["StackOverflowCommunity", "SOComm"],
    "age": ["Age"],
    "survey_ease": ["SurveyEasy", "SurveyEase"],
    "gender": ["Gender"],
    "ethnicity": ["Race", "RaceEthnicity", "Ethnicity"],
    "main_branch": ["MainBranch"],
    "misc_tech_worked": ["MiscTechWorkedWith", "MiscTechHaveWorkedWith"],
    "misc_tech_desired": ["MiscTechDesireNextYear", "MiscTechWantToWorkWith"],
    "job_satisfaction": ["JobSatisfaction", "JobSat"],
    "career_satisfaction": ["CareerSatisfaction", "CareerSat"],
    "open_source": ["OpenSource", "OpenSourcer"],
    "last_job_change": ["LastNewJob", "LastHireDate", "NEWJobHunt", "NEWOnboardGood"],
    "job_factors": ["JobFactors"] + [f"AssessJob{i}" for i in range(1, 11)],
    "undergrad_major": ["MajorUndergrad", "UndergradMajor"],
    "work_life_balance": ["ExCoderBalance", "BetterLife"],
}

alias_to_canon = {alias: canon for canon, aliases in alias_map.items() for alias in aliases}
for canon in alias_map:
    alias_to_canon.setdefault(canon, canon)

CANON_COLS = list(alias_map.keys())


def consolidate_aliases(df: pd.DataFrame) -> pd.DataFrame:

    df = df.copy()
    present = defaultdict(list)
    for col in df.columns:
        if col in alias_to_canon:
            present[alias_to_canon[col]].append(col)

    for canon, cols in present.items():
        merged = df[cols[0]].copy()
        for alt in cols[1:]:
            merged = merged.combine_first(df[alt])
        if canon in df.columns and canon not in cols:
            merged = df[canon].combine_first(merged)
        df[canon] = merged
        drop_cols = [c for c in cols if c != canon]
        df.drop(columns=drop_cols, inplace=True)
    return df


def harmonize_and_select(dfs: dict[int, pd.DataFrame]) -> dict[int, pd.DataFrame]:

    out = {}
    for yr, df in dfs.items():
        df = consolidate_aliases(df)
        for col in CANON_COLS:
            if col not in df:
                df[col] = np.nan
        out[yr] = df.loc[:, CANON_COLS].copy()
        print(f"{yr}: kept {out[yr].shape[1]} cols → {out[yr].shape}")
    return out


def drop_empty_and_low_info(dfs: dict[int, pd.DataFrame], low_info_threshold: float = 0.05) -> dict[int, pd.DataFrame]:

    out = {}
    for yr, df in dfs.items():
        empty = df.columns[df.isnull().all()]
        print(f"Year {yr}: Dropping {len(empty)} empty columns")
        df = df.drop(columns=empty)
        info = df.notna().mean()
        low = info[info < low_info_threshold].index
        print(f"Year {yr}: Dropping {len(low)} low-info columns")
        df = df.drop(columns=low)
        out[yr] = df
    return out


def convert_to_numeric(dfs: dict[int, pd.DataFrame]) -> dict[int, pd.DataFrame]:

    out = {}
    for yr, df in dfs.items():
        for col in df.columns:
            if df[col].dtype == object or col in ('respondent_id', 'respondent', 'ResponseId', 'country'):
                continue
            try:
                df[col] = pd.to_numeric(df[col], errors='coerce')
            except Exception:
                pass
        out[yr] = df
    return out


def save_cleaned(dfs: dict[int, pd.DataFrame], base_dir: str = DATA_DIR):

    clean_dir = os.path.join(base_dir, CLEAN_DIR_NAME)
    os.makedirs(clean_dir, exist_ok=True)
    for yr, df in dfs.items():
        path = os.path.join(clean_dir, f"{yr}_clean_numeric.csv")
        df.to_csv(path, index=False)
    print(f"Clean files saved to {clean_dir}")
