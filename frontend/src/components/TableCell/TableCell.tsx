import {NumberCell} from "./cells/NumberCell";
import {DateTimeCell} from "./cells/DateTimeCell";
import {FloatCell} from "./cells/FloatCell";

export interface TableCellProps {
    value: string,
    type: string,
}

export const TableCell = ({value, type}: TableCellProps) => {
    if (type === 'number') {
        return <NumberCell value={value} />
    } else if (type === 'datetime') {
        return <DateTimeCell value={value} />
    } else if (type === 'float') {
        return <FloatCell value={value} />
    }
    return <span>{value}</span>;
}