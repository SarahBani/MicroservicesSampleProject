import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router';

import './custom.css'
import Layout from '../hoc/Layout/Layout';
import Home from './Home/Home';
import Counter from './Counter';
import FetchData from './FetchData';

export default () => {

    const Banks = React.lazy(() => {
        return import('./Banks/Banks');
    });

    let routes = null;
    routes =
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/banks' component={Banks} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        </Switch>;

    return (
        <Layout>
            <Suspense fallback={<p className="container">Loading...</p>}>
                {routes}
            </Suspense>
        </Layout>
    );
};
