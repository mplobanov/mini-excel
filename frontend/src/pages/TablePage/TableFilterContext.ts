import React, {Dispatch, SetStateAction} from "react";
import {FilterGroup, TableMeta} from "../../services/openapi";




export interface TableFilterContextValue {
    filters: FilterGroup,
    setFilters: Dispatch<SetStateAction<FilterGroup>>,
    tableMeta: TableMeta
}


export const TableFilterContext = React.createContext<TableFilterContextValue>({
    filters: {},
    setFilters: () => {
    },
    tableMeta: {}
});