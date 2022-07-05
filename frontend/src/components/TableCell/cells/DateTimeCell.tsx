import moment from "moment";
import 'moment/locale/ru';

export interface DateTimeCellProps {
    value: string,
}

export const DateTimeCell = ({value}: DateTimeCellProps) => {
    const dt = moment(value).locale('ru');

    return <span>{dt.format('D MMMM YYYY')}</span>
};