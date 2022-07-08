from abc import ABC, abstractmethod
from datetime import datetime as dt
import typing as tp

import pandas as pd
import numpy as np

from models import Filter as FilterPydantic, FilterGroup


class Filter(ABC):
    @staticmethod
    @abstractmethod
    def filter(df: pd.DataFrame, *args) -> pd.DataFrame:
        pass


class RandomFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.DataFrame:
        # args[0] - number of rows
        n = args[0]
        q = np.random.randint(0, df.shape[0], size=n)
        z = np.zeros(shape=df.shape[0])
        z[q] = 1
        return df[pd.Series(z.astype(bool))]


class ListFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.DataFrame:
        # args[0] - column's name
        # args[1] - value list
        def check(x: tp.Any) -> bool:
            if type(x) == pd.Timestamp:
                return x.isoformat()[:10] in args[1]
            return x in args[1]
        return df[np.vectorize(check)(df[args[0]])]


class FromFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.DataFrame:
        # args[0] - column's name
        # args[1] - value or datetime!
        d = args[1]
        if type(d) is str:
            d = dt.strptime(d, '%Y-%m-%d')
        return df[pd.Series(df[args[0]] >= d)]


class ToFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.DataFrame:
        # args[0] - column's name
        # args[1] - value: int or datetime!
        d = args[1]
        if type(d) is str:
            d = dt.strptime(d, '%Y-%m-%d')
        return df[pd.Series(df[args[0]] <= d)]


class QuantileFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.DataFrame:
        # args[0] - column's name
        # args[1] - quantile in (0, 1)
        # args[2] - bottom flag -> 1
        if len(args) == 3:
            return df[pd.Series(df[args[0]] <= np.quantile(df[args[0]], args[1]))]
        return df[pd.Series(df[args[0]] >= np.quantile(df[args[0]], args[1]))]


class SortFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.DataFrame:
        # args[0] - column's name
        # args[1] - 1 ascending, 0 descending
        return df.sort_values(args[0], kind='merge', ascending=args[1])


def filterDF(df: pd.DataFrame, filter_group: FilterGroup) -> pd.DataFrame:
    ddf: pd.DataFrame = df.copy(deep=True)
    for f in filter_group.filters:
        filterClass: Filter = globals()[f.name]
        ddf = filterClass.filter(ddf, *f.args)
    return ddf
