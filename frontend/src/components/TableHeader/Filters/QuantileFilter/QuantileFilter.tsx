import React, {useCallback, useEffect, useState} from "react";
import {FilterProps} from "../FilterList";
import {useFieldFilter} from "../useFieldFilter";
import styles from './QuantileFilter.module.css';

type Quantile = {
    name: string,
    args: [number] | [number, number]
};

type QuantileGroup = {
    name: string,
    qts: Quantile[]
}

const Quantiles: QuantileGroup[] = [
    {
        name: 'Top',
        qts: [
            {
                name: '1%',
                args: [0.99],
            },
            {
                name: '5%',
                args: [0.95]
            },
            {
                name: '10%',
                args: [0.9]
            },
            {
                name: '15%',
                args: [0.85]
            },
            {
                name: '25%',
                args: [0.75]
            },
        ]
    },
    {
        name: 'Bottom',
        qts: [
            {
                name: '1%',
                args: [0.01, 1],
            },
            {
                name: '5%',
                args: [0.05, 1]
            },
            {
                name: '10%',
                args: [0.1, 1]
            },
            {
                name: '15%',
                args: [0.15, 1]
            },
            {
                name: '25%',
                args: [0.25, 1]
            },
        ]
    }
]

export const QuantileFilter: React.FC<FilterProps> = ({name}) => {
    const {updateArgs} = useFieldFilter('QuantileFilter', name);

    const [args, setArgs] = useState<Array<number> | null>(null);

    const handleClick = useCallback((newArgs: Array<number>) => {
        setArgs(oldArgs => {
            if (oldArgs === newArgs) {
                return null;
            }
            return newArgs;
        });
    }, []);

    useEffect(() => {
        if (args) {
            updateArgs(args)
        } else {
            updateArgs();
        }
    }, [args, updateArgs]);
    // return <div></div>

    return <>{Quantiles.map((group, i) => <div key={group.name} className={styles.container}>
        <div className={styles.title}>{group.name}</div>
        <div className={styles.chipGroup}>{group.qts.map(qt => <span key={qt.name} onClick={() => handleClick(qt.args)} className={`${styles.chip} ${args === qt.args ? styles.checked : styles.notChecked}`}>{qt.name}</span>)}</div>
    </div>)}</>;
}