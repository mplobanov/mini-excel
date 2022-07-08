import {useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import {DefaultService, FilterGroup, Table as TableDTF} from "../../services/openapi";
import {Table} from "../../components/Table/Table";
import {TableFilterContext} from "./TableFilterContext";

export const TablePage = () => {
    const params = useParams();

    const [table, setTable] = useState<TableDTF | null>(null);
    const [filters, setFilters] = useState<FilterGroup>({});
    const [limit, setLimit] = useState(20);



    const increaseLimit = useCallback(() => {
        setLimit(oldLimit => oldLimit + 20);
    }, []);

    useEffect(() => {
        if (params.fileId) {
            DefaultService.getFileFileIdPost(params.fileId, limit, filters).then(res => setTable(res));
        }
    }, [filters, limit, params.fileId]);
    if (table) {
        return <TableFilterContext.Provider value={{filters, setFilters, tableMeta: table.meta ?? {}}}>
            <Table table={table} onInfiniteScroll={increaseLimit} />
        </TableFilterContext.Provider>;
    }
    return <div>Loading</div>;

}