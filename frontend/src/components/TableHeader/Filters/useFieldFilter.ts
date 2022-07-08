import {useCallback, useContext} from "react";
import {TableFilterContext, TableFilterContextValue} from "../../../pages/TablePage/TableFilterContext";
import {Filter} from "../../../services/openapi";

export const useFieldFilter = (filterName: string, fieldName: string) => {
    const tableContext = useContext<TableFilterContextValue>(TableFilterContext);

    const updateArgs = useCallback((newArgs?: Array<any>) => {
        tableContext.setFilters(fts => {
            const oldFilters = fts.filters;
            let newFilters: Array<Filter> = [];
            if (oldFilters) {
                newFilters = [...oldFilters];
                const oldFilter = newFilters.find(filter => (filter.name === filterName) && (filter.args.length > 0) && (filter.args.at(0) === fieldName));
                if (oldFilter) {
                    newFilters.splice(newFilters.indexOf(oldFilter), 1);
                }
            }
            if (newArgs) {
                newFilters.push({name: filterName, args: [fieldName, ...newArgs]} as Filter);
            }
            return {filters: newFilters};
        });
    },[fieldName, filterName, tableContext.setFilters]);

    const getCurrentArgs: () => Array<any> | null = () => {
        const filters = tableContext.filters.filters;
        if (filters) {
            const filter = filters.find(filter => (filter.name === filterName) && (filter.args.length > 0) && (filter.args.at(0) === fieldName));
            if (filter) {
                return filter.args;
            }
        }
        return null;
    }

    return {updateArgs, getCurrentArgs};
};