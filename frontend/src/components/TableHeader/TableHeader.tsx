import styles from './TableHeader.module.css';

export interface TableHeaderProps {
    name: string,
    type: string,
}


export const TableHeader = ({name, type}: TableHeaderProps) => {
    return <span className={styles.tableHeaderCell}>
        {name}({type})
    </span>
}