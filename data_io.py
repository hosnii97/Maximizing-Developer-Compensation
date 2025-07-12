import os
import requests
import zipfile
import pandas as pd

DATA_DIR = "data"


def fetch_and_unpack(years=range(2017, 2025), outdir=DATA_DIR):

    os.makedirs(outdir, exist_ok=True)

    for yr in years:
        zip_path = os.path.join(outdir, f"{yr}.zip")
        folder = os.path.join(outdir, str(yr))
        csv_dest = os.path.join(folder, f"{yr}.csv")

        if not os.path.exists(zip_path):
            print(f"↓ Downloading {yr}…")
            url = (
                f"https://survey.stackoverflow.co/"
                f"datasets/stack-overflow-developer-survey-{yr}.zip"
            )
            r = requests.get(url)
            r.raise_for_status()
            with open(zip_path, "wb") as f:
                f.write(r.content)
        else:
            print(f"✔ Zip exists: {zip_path}")

        if not os.path.isdir(folder):
            print(f"  Unzipping {zip_path} → {folder}")
            with zipfile.ZipFile(zip_path) as z:
                z.extractall(folder)
        else:
            print(f"✔ Already unzipped: {folder}")

        pub_csv = os.path.join(folder, "survey_results_public.csv")
        if os.path.exists(pub_csv) and not os.path.exists(csv_dest):
            print(f"🔀 Renaming {pub_csv} → {csv_dest}")
            os.rename(pub_csv, csv_dest)

        schema_csv = os.path.join(folder, "survey_results_schema.csv")
        if os.path.exists(schema_csv):
            os.remove(schema_csv)


def load_raw_data(data_dir=DATA_DIR):

    if not os.path.isdir(data_dir):
        raise FileNotFoundError(
            f"Data directory '{data_dir}' not found. "
            "Did you forget to call fetch_and_unpack()?"
        )

    dfs = {}
    for sub in sorted(os.listdir(data_dir)):
        if not sub.isdigit():
            continue
        year = int(sub)
        csv_path = os.path.join(data_dir, sub, f"{sub}.csv")
        if not os.path.exists(csv_path):
            raise FileNotFoundError(f"Expected data file not found: {csv_path}")
        print(f"→ Loading {year} from {csv_path}")
        dfs[year] = pd.read_csv(csv_path, low_memory=False)

    return dfs
