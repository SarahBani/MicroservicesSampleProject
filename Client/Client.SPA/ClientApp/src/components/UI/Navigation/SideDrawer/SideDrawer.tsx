import * as React from 'react';
import { Fragment, useState, useEffect, FC, MouseEventHandler } from 'react';

import * as classes from './SideDrawer.module.scss';
import Backdrop from '../../Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

interface Props {
    isShown: boolean,
    hide: MouseEventHandler
};

const SideDrawer: FC<Props> = (props) => {

    const [attachedClasses, setAttachedClasses] = useState<string>('');

    useEffect(() => {
        setAttachedClasses(
            [
                classes.SideDrawer,
                classes[props.isShown ? 'Open' : 'Close']
            ].join(' ')
        );
    }, [props.isShown]);

    return (
        <Fragment>
            <Backdrop isShown={props.isShown} onClick={props.hide} />
            <div className={attachedClasses} onClick={props.hide}>
                <NavigationItems />
            </div>
        </Fragment>
    );
};

export default SideDrawer;