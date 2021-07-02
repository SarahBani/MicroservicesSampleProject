import * as React from 'react';
import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import * as actions from '../../../../store/actions/authActions';
import { AppState } from '../../../../store';

interface StoreProps {
    loggedIn: boolean
};

const navigationItems: FC = () => {

    const { loggedIn }: StoreProps = useSelector((state: AppState) => ({
        loggedIn: state.auth.loggedIn
    }));
    const dispatch = useDispatch();

    function signOutHandler() {
        dispatch(actions.signOut())
    };

    let links = null;
    if (loggedIn) {
        links = (
            <Fragment>
                <NavigationItem link='/' exact>
                    <span className="fa fa-home"></span>
                </NavigationItem>
                <NavigationItem link='/Profile'>Profile</NavigationItem>
                <NavigationItem link='/Banks'>Banks</NavigationItem>
                <NavigationItem link='/About'>About</NavigationItem>
                <NavigationItem clicked={signOutHandler}>Sign Out</NavigationItem>
            </Fragment>
        );
    }
    else {
        links = (
            <Fragment>
                <NavigationItem link='/' exact>
                    <i className="fa fa-home"></i>
                </NavigationItem>
                <NavigationItem link='/Banks'>Banks</NavigationItem>
                <NavigationItem link='/About'>About</NavigationItem>
                <NavigationItem link='/Auth'>Sign In</NavigationItem>
            </Fragment>
        );
    }

    return (
        <nav>
            <ul className={classes.NavigationItems}>
                {links}
            </ul>
        </nav>
    );
};

export default navigationItems;