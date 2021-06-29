"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
//import 'react-app-polyfill/ie11'
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var connected_react_router_1 = require("connected-react-router");
var App_1 = require("./components/App");
var registerServiceWorker_1 = require("./registerServiceWorker");
var browserHistory_1 = require("./browserHistory");
var store_1 = require("./store");
var rootElement = document.getElementById('root');
//const rootReducer = combineReducers({
//    common: commonReducer,
//    auth: authReducer,
//    //location: locationReducer,
//    bank: bankReducer,
//    //upload: uploadReducer
//    router: connectRouter(browserHistory)
//});
//declare global {
//    interface Window {
//        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//    }
//}
//export const composeEnhancers =
//    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//// Get the application-wide store instance, prepopulating with state from the server where available.
//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
//const store = configureStore();
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(connected_react_router_1.ConnectedRouter, { history: browserHistory_1.browserHistory },
        React.createElement(App_1.default, null))), rootElement);
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map