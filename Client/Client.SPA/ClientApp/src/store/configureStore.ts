import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

//import { AppState } from './';
import { watchAuth, watchBank } from './sagas';
import { browserHistory } from '../browserHistory';


export default function configureStore(reducers: any, sagaMiddleware: SagaMiddleware,
    //initialState?: AppState
): Store{
    const middleware = [
        thunk,
        sagaMiddleware,
        routerMiddleware(browserHistory),        
    ];

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(browserHistory)
    });

    //const enhancers = [];
    //const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    //if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    //    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    //}

    const composeEnhancers =
        (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    return createStore(
        rootReducer,
        //{},
        //initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
}