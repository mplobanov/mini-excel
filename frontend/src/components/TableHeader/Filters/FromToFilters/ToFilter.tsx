import React from "react";
import {FilterProps} from "../FilterList";
import {getFromToFilter} from "./FromFilter";

export const ToFilter: React.FC<FilterProps> = getFromToFilter('ToFilter');