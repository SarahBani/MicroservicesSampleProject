import * as React from 'react';
import { FC, ReactElement, useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as classes from './Profile.module.scss';
import PageTitle from '../UI/PageTitle/PageTitle';
import { User } from '../../models/User.model';
import { AppState } from '../../store';
import * as authActions from '../../store/actions/authActions';

interface StoreProps {
    loggedIn: boolean,
    user: User
};

export const Profile: FC = () => {

    const { loggedIn, user }: StoreProps = useSelector((state: AppState) => ({
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }));
    const dispatch = useDispatch();
    const location = useLocation();
    const [redirect, setRedirect] = useState<ReactElement>();

    useEffect(() => {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(<Redirect to="/auth/" />);
        }
    }, [loggedIn]);

    return (
        <div className={["container", classes.Profile].join(' ')}>
            {redirect}
            <PageTitle title="Profile" />

            <div className="row">
                <div className="col-6 card bg-info">
                    <div className="card-body">
                        <img src="/images/avatar.png" alt="avatar" className="img-response" />
                    </div>
                    <div className="card-body text-center">
                        <h4 className="card-title">Software Developer</h4>
                        <p className="card-text">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;