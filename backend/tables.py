import pandas as pd
from models import *
from filters import filterDF

def get_type(type: str) -> str:
    if 'object' in type:
        return 'string'
    elif 'datetime' in type:
        return 'datetime'
    elif 'int' in type:
        return 'number'
    elif 'float' in type:
        return 'float'


TABLES: dict[str, pd.DataFrame] = dict()


def get_tbl(file_id: str) -> pd.DataFrame:
    if file_id not in TABLES:
        TABLES[file_id] = pd.read_excel('files/{}'.format(file_id))
    return TABLES[file_id]


def get_table(file_id: str, limit: int = 20, filter_group: FilterGroup = FilterGroup()) -> Table:
    tbl = get_tbl(file_id)
    tbl = filterDF(tbl, filter_group)
    rows = tbl.apply(lambda row: {name: row[name] for name in tbl.columns}, axis=1).to_list()[:limit]
    return Table(rows=rows, meta=TableMeta(name=file_id, types={
        x: get_type(str(tbl.dtypes[x])) for x in tbl.columns.to_list()
    }))