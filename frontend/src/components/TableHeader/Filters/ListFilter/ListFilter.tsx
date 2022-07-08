import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {FilterProps} from "../FilterList";
import {TableFilterContext, TableFilterContextValue} from "../../../../pages/TablePage/TableFilterContext";
import {useFieldFilter} from "../useFieldFilter";
import styles from './ListFilter.module.css';
import {DefaultService} from "../../../../services/openapi";
import moment from "moment";
import 'moment/locale/ru';
import ReactLoading from "react-loading";

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
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const toggleCollapsed = useCallback(() => {
        setCollapsed(old => !old);
    }, []);

    const [limit, setLimit] = useState<number>(20);
    const ref = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback<IntersectionObserverCallback>((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setLimit(old => old + 20);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (ref.current) observer.observe(ref.current);
        return () => {
            observer.disconnect();
        }
    }, [handleObserver]);

    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        DefaultService.getUniqueReqFileIdUniqueGet(fileId, fieldName, limit).then(res => {
            setValues(oldValues => {
                const newValues = new Map<string | number, boolean>();
                res.values.forEach(value => {
                    let nv = value;
                    newValues.set(nv, oldValues.get(nv) ?? false)
                })
                setHasMore(res.has_more ?? false);
                return newValues;
            });
        })
    }, [cellType, fieldName, fileId, limit]);

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
        <span onClick={toggleCollapsed} className={styles.title}>Значения
        <span className="material-icons-outlined">{collapsed ? 'arrow_right': 'arrow_drop_down'}</span></span>
        <div className={`${styles.container} ${collapsed && styles.displayNone}`}>
        {Array.from(values.keys()).sort().map((value, i) =>
            <>
                <span key={2 * i + 1} onClick={() => toggleValue(value)} >
                    <span className={`material-icons ${values.get(value) ? '' : styles.tickHidden} ${styles.tick}`}>done</span>
                </span>
                <span key={2 * i + 2} onClick={() => toggleValue(value)} className={`${styles.text}`}>{cellType === 'datetime' ? moment(value).locale('ru').format('D MMMM YYYY'): value}</span>
            </>
        )}
            {hasMore && <div className={styles.loader} ref={ref}><ReactLoading type={'bubbles'} width={'30px'} height={'30px'} color={'rgb(8, 103, 131)'} /> </div>}
    </div>
    <div className={`${styles.clear} ${collapsed && styles.displayNone}`} onClick={handleClear}>Сбросить</div></div>
}