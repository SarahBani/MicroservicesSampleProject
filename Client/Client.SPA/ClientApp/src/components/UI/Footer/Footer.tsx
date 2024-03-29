﻿import * as React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as classes from './Footer.module.scss';
import Logo from '../Logo/Logo';
import { AppState } from '../../../store';

interface StoreProps {
    isLoggedIn: boolean
};

const Footer: FC = () => {

    const { isLoggedIn }: StoreProps = useSelector((state: AppState) => ({
        isLoggedIn: state.auth.loggedIn
    }));

    return (
        <footer className={classes.Footer}>
            <div className="container">
                <div className="row">
                    <div className="col-offset-0 col-5 col-sm-offset-2 col-sm-4 col-md-3 col-lg-2">
                        <Logo />
                    </div>
                    <div className="col-2 col-sm-8">
                        <div className="row">
                            <ul className="col-2 list-unstyled">
                                <li>
                                    <Link to={{ pathname: "/" }}>Home</Link>
                                </li>
                                {
                                    isLoggedIn &&
                                    <li>
                                        <Link to={{ pathname: "/Profile" }}>Profile</Link>
                                    </li>
                                }
                                <li>
                                    <Link to={{ pathname: "/Banks" }}>Banks</Link>
                                </li>
                                <li>
                                    <Link to={{ pathname: "/About" }}>About</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center pb-1">
                    © 2020 Copyright:
                    <em> Sarah Banieghbal</em>
                </div>
            </div>
        </footer>
    )
};

export default Footer;