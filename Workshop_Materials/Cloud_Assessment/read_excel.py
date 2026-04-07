import pandas as pd
import sys

file_path = 'Copy of Scope of Work - Cloud Assessment v1.0.xlsx'
output_path = 'excel_content.txt'

xls = pd.ExcelFile(file_path)

with open(output_path, 'w', encoding='utf-8') as f:
    for sheet_name in xls.sheet_names:
        f.write(f"--- Sheet: {sheet_name} ---\n")
        df = pd.read_excel(xls, sheet_name=sheet_name, header=None)
        df = df.dropna(how='all')
        for i, row in df.iterrows():
            clean_row = [str(val).strip() for val in row if pd.notna(val)]
            if clean_row:
                f.write(f"Row {i}: {' | '.join(clean_row)}\n")
        f.write("\n")
