/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TableMeta } from './TableMeta';

export type Table = {
    rows?: Array<Record<string, (number | string)>>;
    meta?: TableMeta;
};

