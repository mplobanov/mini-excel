
export interface FloatCellProps {
    value: string
}

export const FloatCell = ({value}: FloatCellProps) => {
    let floatValue = Number.parseFloat(value);
    floatValue = Math.round(floatValue * 100 + Number.EPSILON) / 100
    return <span>{floatValue}</span>
}