import * as React from 'react';
import { FC, MouseEventHandler } from 'react';

import * as classes from './DrawerToggle.module.scss';

interface Props {
    clicked: MouseEventHandler
};

const DrawerToggle: FC<Props> = props => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;