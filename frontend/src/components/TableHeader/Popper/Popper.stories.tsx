import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Popper} from "./Popper";


export default {
    title: 'Popper',
    component: Popper,
} as ComponentMeta<typeof Popper>;


const Template: ComponentStory<typeof Popper> = (args) => <Popper  {...args}/>;


export const Primary = Template.bind({});
Primary.args = {
    filters: [<div>F1</div>, <div>F2</div>, <div>F3</div>]
};

