import * as React from 'react';
import { FC, MouseEventHandler } from 'react';

import * as classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

interface Props {
    drawerToggleClicked: MouseEventHandler
};

const Toolbar: FC<Props> = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div>
            <Logo />
        </div>
        <NavigationItems />
    </header>
);

export default Toolbar;