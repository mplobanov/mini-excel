import styles from './TableHeader.module.css';
import {Popper} from "./Popper/Popper";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {TableFilterContext, TableFilterContextValue} from "../../pages/TablePage/TableFilterContext";
import {DefaultService} from "../../services/openapi";
import {FilterList, FilterProps} from "./Filters/FilterList";

export interface TableHeaderProps {
    name: string,
    last: boolean
}


export const TableHeader = ({name, last}: TableHeaderProps) => {
    const [hidden, setHidden] = useState<boolean>(true);

    const listener = useCallback(() => {
        setHidden( true);
    }, []);

    useEffect(() => {
        window.addEventListener('click', listener);

        return () => {
            window.removeEventListener('click', listener);
        }
    }, [listener]);

    const tableContext = useContext<TableFilterContextValue>(TableFilterContext);

    const [filters, setFilters] = useState<Array<React.FC<FilterProps>> | null>(null);

    useEffect(() => {
        if (tableContext.tableMeta.name) {
            DefaultService.getFiltersReqFileIdFiltersGet(tableContext.tableMeta.name, name).then(res => setFilters(res.names.map(filterName => FilterList[filterName])))
        }
    }, [name, tableContext.tableMeta.name]);

    const filtered = useMemo(() => {
        return tableContext.filters.filters?.some(val => val.args.at(0) === name)
    }, [name, tableContext.filters.filters]);


    return <span className={styles.tableHeaderCell} onClick={(e) => {setHidden(old => !old); e.stopPropagation();}}>
        {name}<span className={`${filtered ? 'material-icons' : 'material-icons-outlined'} ${styles.icon}`}>
filter_alt
</span>
        <Popper hidden={hidden} filters={filters?.map(fltr => {
            const FFF = fltr;
            return <FFF  name={name}/>;

        }) ?? []} right={last}/>
    </span>

}