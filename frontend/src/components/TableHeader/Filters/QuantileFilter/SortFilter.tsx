import React, {useCallback, useEffect, useState} from "react";
import {FilterProps} from "../FilterList";
import {useFieldFilter} from "../useFieldFilter";
import styles from './QuantileFilter.module.css'

export const SortFilter: React.FC<FilterProps> = ({name}) => {
    const {updateArgs} = useFieldFilter('SortFilter', name);

    const [sort, setSort] = useState<0 | 1 | null>(null);

    useEffect(() => {
        if (sort === null) {
            updateArgs();
        } else {
            updateArgs([sort]);
        }
    }, [sort, updateArgs]);

    const handleClick = useCallback((i: 0 | 1) => {
        if (sort === i) {
            setSort(null);
        } else {
            setSort(i);
        }
    }, [sort]);


    return <div className={styles.container}><span className={styles.title}>Сортировка</span>
        <div className={styles.chipGroup}>
            <div onClick={() => handleClick(1)}
                 className={`${styles.chip} ${sort === 1 ? styles.checked : styles.notChecked}`}>
                <span className="material-icons-outlined">north_east</span>
            </div>
            <div onClick={() => handleClick(0)}
                 className={`${styles.chip} ${sort === 0 ? styles.checked : styles.notChecked}`}>
                <span className="material-icons-outlined">south_east</span>
            </div>
        </div>
    </div>;
}