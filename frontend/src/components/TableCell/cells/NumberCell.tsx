import styles from './NumberCell.module.css';

export interface NumberCellProps {
    value: string,
}

export const NumberCell = ({value}: NumberCellProps) => {


    if (value.length === 11 && value.startsWith('79')) {
        return <a href={`tel:+${value}`} className={styles.line}>
            <span className={`material-icons ${styles.hidden}`}>call</span><span>+{value}</span></a>
    }
    return <span>{value}</span>
}