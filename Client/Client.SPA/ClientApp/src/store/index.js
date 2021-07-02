"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var WeatherForecasts = require("./WeatherForecasts");
var Counter = require("./Counter");
var authReducer_1 = require("./reducers/authReducer");
var commonReducer_1 = require("./reducers/commonReducer");
var bankReducer_1 = require("./reducers/bankReducer");
var configureStore_1 = require("./configureStore");
var redux_saga_1 = require("redux-saga");
var sagas_1 = require("./sagas");
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
var reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    common: commonReducer_1.default,
    auth: authReducer_1.default,
    //location: locationReducer,
    bank: bankReducer_1.default,
    //upload: uploadReducer
};
var sagaMiddleware = redux_saga_1.default();
exports.store = configureStore_1.default(reducers, sagaMiddleware);
sagaMiddleware.run(sagas_1.watchAuth);
//sagaMiddleware.run(watchLocation);
sagaMiddleware.run(sagas_1.watchBank);
//# sourceMappingURL=index.js.map