import 'bootstrap/dist/css/bootstrap.css';
import 'react-app-polyfill/ie11'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore, combineReducers, Reducer } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';

import configureStore from './store/configureStore';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import commonReducer from './store/reducers/commonReducer';
import authReducer from './store/reducers/authReducer';
import bankReducer from './store/reducers/bankReducer';
import { watchAuth, watchBank } from './store/sagas';

// Create browser history to use in the Redux store
const baseUrl: string = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history: History = createBrowserHistory({ basename: baseUrl });
const rootElement = document.getElementById('root');

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    common: commonReducer,
    auth: authReducer,
    //location: locationReducer,
    bank: bankReducer,
    //upload: uploadReducer

    router: connectRouter(history)
});

//declare global {
//    interface Window {
//        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//    }
//}

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAuth);
//sagaMiddleware.run(watchLocation);
sagaMiddleware.run(watchBank);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    rootElement);

registerServiceWorker();
