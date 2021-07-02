import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import './custom.scss'
import Layout from '../hoc/Layout/Layout';
import Home from './Home/Home';
import Counter from './Counter';
import FetchData from './FetchData';
import NotFound from './NotFound/NotFound';
import About from './About/About';
import { AppState } from '../store';
import * as authActions from '../store/actions/authActions';

interface StoreProps {
    isLoggedIn: boolean
};

const Auth = React.lazy(() => {
    return import('./Auth/Auth');
});

//const Profile = React.lazy(() => {
//    return import('./Profile/Profile');
//});

const Banks = React.lazy(() => {
    return import('./Banks/Banks');
});

export default () => {

    const { isLoggedIn }: StoreProps = useSelector((state: AppState) => ({
        isLoggedIn: state.auth.loggedIn
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.autoSignIn());
    }, []);

    let routes = null;
    routes =
        <Switch>
            <Route path='/banks/new' render={(props) => <Banks {...props} add />} />
            <Route path='/banks/:id?/:action?' exact component={Banks} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
            <Route path='/about' component={About} />
            <Route path='/auth' render={(props) => <Auth {...props} />} />
            <Route path='/' exact component={Home} />
            <Route component={NotFound} />
        </Switch>;

    return (
        <Layout>
            <Suspense fallback={<p className="container">Loading...</p>}>
                {routes}
            </Suspense>
        </Layout>
    );
};