"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var connected_react_router_1 = require("connected-react-router");
var browserHistory_1 = require("../browserHistory");
function configureStore(reducers, sagaMiddleware) {
    var middleware = [
        redux_thunk_1.default,
        sagaMiddleware,
        connected_react_router_1.routerMiddleware(browserHistory_1.browserHistory),
    ];
    var rootReducer = redux_1.combineReducers(__assign(__assign({}, reducers), { router: connected_react_router_1.connectRouter(browserHistory_1.browserHistory) }));
    //const enhancers = [];
    //const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    //if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    //    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    //}
    var composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || redux_1.compose;
    return redux_1.createStore(rootReducer, 
    //{},
    //initialState,
    composeEnhancers(redux_1.applyMiddleware.apply(void 0, middleware)));
}
exports.default = configureStore;
//# sourceMappingURL=configureStore.js.map