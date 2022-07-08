import {Table as TableDTF} from "../../services/openapi";
import styles from './Table.module.css';
import {TableHeader} from "../TableHeader/TableHeader";
import {TableCell} from "../TableCell/TableCell";
import ReactLoading from "react-loading";
import {useCallback, useEffect, useMemo, useRef} from "react";

export interface TableProps {
    table: TableDTF,
    onInfiniteScroll: () => void,
}

export const Table = ({table, onInfiniteScroll}: TableProps) => {
    const cols = Object.entries(table.meta?.types ?? {}).map(entry => entry.at(0) as string);

    const ref = useRef<HTMLDivElement>(null);
    const hasMore = useMemo(() => {
        return table?.meta?.has_more ?? true
    }, [table?.meta?.has_more]);

    const handleObserver = useCallback<IntersectionObserverCallback>((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            onInfiniteScroll();
        }
    }, [onInfiniteScroll]);

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

    return <div className={styles.container}>
        <div className={styles.header}>{"Таблица Excel"}</div>
        <div className={styles.tableContainer}>
            <table>
                <colgroup>
                    {cols.map((type, i) => <col key={i}/>)}
                </colgroup>
                <thead>
                <tr className={styles.headRow}>
                    {cols.map((col, i) =>
                        <th key={i} className={styles.tableHeaderCell}>
                            <TableHeader name={col} last={(i + 2) >= cols.length}/>
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
            {hasMore && <div className={styles.loader} ref={ref}><ReactLoading type={'bubbles'} width={'60px'} height={'60px'} color={'rgb(8, 103, 131)'} /> </div>}
        </div>
    </div>;
};