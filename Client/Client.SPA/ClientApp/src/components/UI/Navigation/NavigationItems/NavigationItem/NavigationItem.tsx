import * as React from 'react';
import { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';

import * as classes from './NavigationItem.module.scss';

interface Props {
    link?: string,
    exact?: boolean,
    clicked?: () => void
};

const navigationItem: FC<Props> = props => {

    function clickHandler(event: any) {
        console.log(111111111);
        console.log(event);
        event.preventDefault();
        props.clicked?.();
    };

    const link =
        (!!props.clicked ?
            <a href='#' onClick={clickHandler}>
                {props.children}
            </a>
            :
            <NavLink to={props.link!!} /*exact={props.link == '/' ? true : false}*/
                exact={props.exact}
                activeClassName={classes.active}>
                {props.children}
            </NavLink>
        );
    return (
        <li className={classes.NavigationItem}>
            {link}
        </li>
    );
};

export default navigationItem;