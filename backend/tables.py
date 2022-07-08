import pandas as pd
from models import *
from filters import filterDF, ListFilter, FromFilter, ToFilter, QuantileFilter
import numpy as np


def convert_type(type: str) -> str:
    if 'object' in type:
        return 'string'
    elif 'datetime' in type:
        return 'datetime'
    elif 'int' in type:
        return 'number'
    elif 'float' in type:
        return 'float'


def get_type(df: pd.DataFrame, field_name: str) -> str:
    return convert_type(str(df.dtypes[field_name]))


FILTERS = {
    'string': [ListFilter],
    'number': [ListFilter, FromFilter, ToFilter, QuantileFilter],
    'float': [ListFilter, FromFilter, ToFilter, QuantileFilter],
    'datetime': [ListFilter]
}


TABLES: dict[str, pd.DataFrame] = dict()


def get_tbl(file_id: str) -> pd.DataFrame:
    if file_id not in TABLES:
        TABLES[file_id] = pd.read_excel('files/{}'.format(file_id))
    return TABLES[file_id]


def get_table(file_id: str, limit: int = 20, filter_group: FilterGroup = FilterGroup()) -> Table:
    tbl = get_tbl(file_id)
    tbl = filterDF(tbl, filter_group)
    rws = tbl.apply(lambda row: {name: row[name] for name in tbl.columns}, axis=1)
    rows = []
    has_more = False
    if rws.shape[0]:
        rows = rws.to_list()
        if len(rows) > limit:
            has_more = True
            rows = rows[:limit]
    return Table(rows=rows, meta=TableMeta(name=file_id, types={
        x: get_type(tbl, x) for x in tbl.columns.to_list()
    }, has_more=has_more))


def get_unique_vals(file_id: str, field_name: str, limit: int) -> list[ValueType]:
    df = get_tbl(file_id)
    lst = list(df[field_name].unique())
    lst.sort()
    if len(lst) > 0 and type(lst[0]) == np.datetime64:
        lst = [str(x)[:10] for x in lst]
    return lst[:limit]


def get_filters(file_id: str, field_name: str) -> list[str]:
    df = get_tbl(file_id)
    return [x.__name__ for x in FILTERS[get_type(df, field_name)]]