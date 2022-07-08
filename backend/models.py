from pydantic import BaseModel
import typing as tp
import datetime


ValueType = tp.Union[float, int, str, datetime.date]


class TableMeta(BaseModel):
    name: str = ''
    types: dict[str, str] = dict()
    has_more: bool = False


class Table(BaseModel):
    rows: list[dict[str, ValueType]] = []
    meta: TableMeta = TableMeta()


class UniqueValues(BaseModel):
    values: list[ValueType]


class FilterNames(BaseModel):
    names: list[str]


class FileId(BaseModel):
    file_id: str


class Filter(BaseModel):
    name: str
    args: list[tp.Any]


class FilterGroup(BaseModel):
    filters: list[Filter] = []
