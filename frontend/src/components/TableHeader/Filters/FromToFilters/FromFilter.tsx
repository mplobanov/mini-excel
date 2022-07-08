import {FilterProps} from "../FilterList";
import React, {useCallback, useMemo} from "react";
import {useFieldFilter} from "../useFieldFilter";
import styles from './FromToFilter.module.css';

export const getFromToFilter = (filterName: 'FromFilter' | 'ToFilter') => (({name: fieldName}) => {
    const {updateArgs, getCurrentArgs} = useFieldFilter(filterName, fieldName);

    const handler = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        if (e.target.value) {
            updateArgs([Number.parseFloat(e.target.value)]);
        } else {
            updateArgs();
        }
    }, [updateArgs]);

    const value = useMemo(() => {return getCurrentArgs()?.at(1)}, [getCurrentArgs]);

    return <div className={styles.container}>
        <span className={styles.title}>{filterName === 'FromFilter' ? 'От' : 'До'}</span>
        <input type={'number'} onChange={handler} defaultValue={value} className={styles.input}/>
    </div>
}) as React.FC<FilterProps>;

export const FromFilter: React.FC<FilterProps> = getFromToFilter('FromFilter');