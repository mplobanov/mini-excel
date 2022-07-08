import {FromFilter} from "./FromToFilters/FromFilter";
import {ListFilter} from "./ListFilter/ListFilter";
import {ToFilter} from "./FromToFilters/ToFilter";
import {QuantileFilter} from "./QuantileFilter/QuantileFilter";
import React from "react";
import {SortFilter} from "./QuantileFilter/SortFilter";

export interface FilterProps {
    name: string
}

export const FilterList: {
    [key: string]: React.FC<FilterProps>
} = {
    FromFilter: FromFilter,
    ListFilter: ListFilter,
    ToFilter: ToFilter,
    QuantileFilter: QuantileFilter,
    SortFilter: SortFilter,
}