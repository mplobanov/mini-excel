import {Filter} from "../services/openapi";

export interface RandomFilter extends Filter {
    args: [number]
}

export interface ListFilter extends Filter {
    args: [string, Array<any>]
}

export interface FromFilter extends Filter {
    args: [string, number|string]
}

export interface ToFilter extends Filter {
    args: [string, number|string]
}

type Flag = 1;

export interface QuantileFilter extends Filter {
    args: [string, number] | [string, number, Flag]
}