import React, {useCallback, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {TableHeader} from "./TableHeader";


export default {
    title: 'TableHeader',
    component: TableHeader,
} as ComponentMeta<typeof TableHeader>;


const Template: ComponentStory<typeof TableHeader> = (args) => <TableHeader  {...args}/>;


export const Primary = Template.bind({});
Primary.args = {
    name: 'Job Title'
};

