import React, {useCallback, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Table} from "./Table";
import {defaultTable} from "./DefaultTable";
import {Table as TableDTF} from '../../services/openapi/models/Table';


export default {
    title: 'Table',
    component: Table,
} as ComponentMeta<typeof Table>;

const StoryTable = () => {
    const [table, setTable] = useState(defaultTable);



    return <Table table={table} onInfiniteScroll={() => {}} />;
}

const Template: ComponentStory<typeof Table> = (args) => <StoryTable />;


export const Primary = Template.bind({});
Primary.args = {
};

