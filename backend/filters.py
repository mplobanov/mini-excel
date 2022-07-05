from abc import ABC, abstractmethod
from datetime import datetime as dt

import pandas as pd
import numpy as np

from models import Filter as FilterPydantic, FilterGroup


class Filter(ABC):
    @staticmethod
    @abstractmethod
    def filter(df: pd.DataFrame, *args) -> pd.Series:
        pass


class RandomFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.Series:
        # args[0] - number of rows
        n = args[0]
        q = np.random.randint(0, df.shape[0], size=n)
        z = np.zeros(shape=df.shape[0])
        z[q] = 1
        return pd.Series(z.astype(bool))


class ListFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.Series:
        # args[0] - column's name
        # args[1] - value list
        return np.vectorize(lambda x: x in args[1])(df[args[0]])


class FromFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.Series:
        # args[0] - column's name
        # args[1] - value or datetime!
        d = args[1]
        if type(d) is str:
            d = dt.strptime(d, '%Y-%m-%d')
        return pd.Series(df[args[0]] > d)


class ToFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.Series:
        # args[0] - column's name
        # args[1] - value: int or datetime!
        d = args[1]
        if type(d) is str:
            d = dt.strptime(d, '%Y-%m-%d')
        return pd.Series(df[args[0]] < d)


class QuantileFilter(Filter):
    @staticmethod
    def filter(df: pd.DataFrame, *args) -> pd.Series:
        # args[0] - column's name
        # args[1] - quantile in (0, 1)
        # args[2] - bottom flag -> 1
        if len(args) == 3:
            return pd.Series(df[args[0]] <= np.quantile(df[args[0]], args[1]))
        return pd.Series(df[args[0]] >= np.quantile(df[args[0]], args[1]))


def filterDF(df: pd.DataFrame, filter_group: FilterGroup) -> pd.DataFrame:
    ls = [np.ones(df.shape[0]).astype(bool)]
    for f in filter_group.filters:
        filterClass: Filter = globals()[f.name]
        ls.append(filterClass.filter(df, *f.args))
    return df[np.min(ls, axis=0)]