import * as React from 'react';
import { FC, MouseEvent, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import * as classes from './NavigationItem.module.scss';

interface OwnProps {
    link?: string,
    exact?: boolean,
    clicked?: () => void
};

type Props = OwnProps & { children?: ReactNode };

const navigationItem: FC<Props> = props => {

    function clickHandler(event: MouseEvent<HTMLAnchorElement>) {
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