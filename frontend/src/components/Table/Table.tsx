import {Table as TableDTF} from "../../services/openapi";
import styles from './Table.module.css';
import {TableHeader} from "../TableHeader/TableHeader";
import {TableCell} from "../TableCell/TableCell";

export interface TableProps {
    table: TableDTF,
    onInfiniteScroll: () => void,
}

export const Table = ({table, onInfiniteScroll}: TableProps) => {
    const cols = Object.entries(table.meta?.types ?? {}).map(entry => entry.at(0) as string);

    return <div className={styles.container}>
        <div className={styles.header}>{table.meta?.name ?? "Таблица"}</div>
        <div className={styles.tableContainer}>
            <table>
                <colgroup>
                    {cols.map((type, i) => <col key={i}/>)}
                </colgroup>
                <thead>
                <tr className={styles.headRow}>
                    {cols.map((col, i) =>
                        <th key={i} className={styles.tableHeaderCell}>
                            <TableHeader name={col} type={(table.meta?.types ?? {})[col] ?? ''}/>
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {table.rows?.map((row, i) => <tr key={i}>
                    {cols.map((col, i) => <td key={i} className={styles.tableDataCell}><TableCell
                        value={row[col].toString()} type={(table.meta?.types ?? {})[col] ?? ''}/></td>)}
                </tr>)}
                </tbody>

            </table>
        </div>


    </div>;
};