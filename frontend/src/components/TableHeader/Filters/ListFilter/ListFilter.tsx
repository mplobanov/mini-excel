import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {FilterProps} from "../FilterList";
import {TableFilterContext, TableFilterContextValue} from "../../../../pages/TablePage/TableFilterContext";
import {useFieldFilter} from "../useFieldFilter";
import styles from './ListFilter.module.css';
import {DefaultService} from "../../../../services/openapi";
import moment from "moment";
import 'moment/locale/ru';

export const ListFilter: React.FC<FilterProps> = ({name: fieldName}) => {
    const tableContext = useContext<TableFilterContextValue>(TableFilterContext);
    const fileId = useMemo(() => {
        return tableContext.tableMeta.name ?? ''
    }, [tableContext.tableMeta.name]);
    const cellType = useMemo(() => {
        return (tableContext.tableMeta.types ?? {})[fieldName] ?? '' ;
    }, [fieldName, tableContext.tableMeta.types]);

    const {updateArgs} = useFieldFilter('ListFilter', fieldName);
    const [values, setValues] = useState<Map<string | number, boolean>>(new Map());

    useEffect(() => {
        DefaultService.getUniqueReqFileIdUniqueGet(fileId, fieldName).then(res => {
            setValues(oldValues => {
                const newValues = new Map<string | number, boolean>();
                res.values.forEach(value => {
                    let nv = value;
                    newValues.set(nv, oldValues.get(nv) ?? false)
                })
                return newValues;
            });
        })
    }, [cellType, fieldName, fileId]);

    const toggleValue = useCallback((val: string | number) => {
        setValues(oldMap => {
            const newMap = new Map(oldMap);
            newMap.set(val, !(oldMap.get(val) ?? false));
            return newMap;
        })
    }, []);

    useEffect(() => {
        const filterVals = Array.from(values.keys()).filter(v => values.get(v));
        if (filterVals.length) {
            updateArgs([filterVals]);
        } else {
            updateArgs();
        }

    }, [updateArgs, values]);

    const handleClear = useCallback(() => {
        setValues(oldMap => {
            const newMap = new Map(oldMap);
            Array.from(newMap.keys()).forEach(val => newMap.set(val, false));
            return newMap;
        })
    }, []);

    return <div className={styles.bigContainer}>
        Значения
        <div className={styles.container}>
        {Array.from(values.keys()).sort().map((value, i) =>
            <>
                <span key={2 * i + 1} onClick={() => toggleValue(value)} >
                    <span className={`material-icons ${values.get(value) ? '' : styles.tickHidden} ${styles.tick}`}>done</span>
                </span>
                <span key={2 * i + 2} onClick={() => toggleValue(value)} className={`${styles.text}`}>{cellType === 'datetime' ? moment(value).locale('ru').format('D MMMM YYYY'): value}</span>
            </>
        )}
    </div>
    <div className={styles.clear} onClick={handleClear}>Сбросить</div></div>
}