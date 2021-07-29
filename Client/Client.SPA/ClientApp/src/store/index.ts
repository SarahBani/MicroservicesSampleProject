import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import authReducer, * as Auth from './reducers/authReducer';
import commonReducer, * as Common from './reducers/commonReducer';
import uploadReducer, * as Upload from './reducers/uploadReducer';
import bankReducer, * as Bank from './reducers/bankReducer';
import configureStore from './configureStore';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBank } from './sagas';

//// The top-level state object
//export interface ApplicationState {
//    counter: Counter.CounterState | undefined;
//    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
//    common: Common.State | undefined
//    auth: Auth.State | undefined
//    bank: Bank.State | undefined
//}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,

    common: commonReducer,
    auth: authReducer,
    //location: locationReducer,
    bank: bankReducer,
    upload: uploadReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => AppState): void;
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore(
    reducers,
    sagaMiddleware
);

sagaMiddleware.run(watchAuth);
//sagaMiddleware.run(watchLocation);
sagaMiddleware.run(watchBank);

export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

