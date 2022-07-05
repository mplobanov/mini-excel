import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {DefaultService, Table as TableDTF} from "../../services/openapi";
import {Table} from "../../components/Table/Table";

export const TablePage = () => {
    const params = useParams();

    const [table, setTable] = useState<TableDTF | null>(null);

    useEffect(() => {
        if (params.fileId) {
            DefaultService.getFileFileIdGet(params.fileId).then(res => setTable(res));
        }
    }, [params.fileId]);
    if (table) {
        return <Table table={table} onInfiniteScroll={() => {}} />;
    }
    return <div>Loading</div>;

}