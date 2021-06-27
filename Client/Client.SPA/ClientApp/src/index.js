"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeEnhancers = void 0;
require("bootstrap/dist/css/bootstrap.css");
require("react-app-polyfill/ie11");
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var redux_saga_1 = require("redux-saga");
var connected_react_router_1 = require("connected-react-router");
var history_1 = require("history");
var App_1 = require("./components/App");
var registerServiceWorker_1 = require("./registerServiceWorker");
var commonReducer_1 = require("./store/reducers/commonReducer");
var authReducer_1 = require("./store/reducers/authReducer");
var bankReducer_1 = require("./store/reducers/bankReducer");
var sagas_1 = require("./store/sagas");
// Create browser history to use in the Redux store
var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
var history = history_1.createBrowserHistory({ basename: baseUrl });
var rootElement = document.getElementById('root');
var sagaMiddleware = redux_saga_1.default();
var rootReducer = redux_1.combineReducers({
    common: commonReducer_1.default,
    auth: authReducer_1.default,
    //location: locationReducer,
    bank: bankReducer_1.default,
    //upload: uploadReducer
    router: connected_react_router_1.connectRouter(history)
});
//declare global {
//    interface Window {
//        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//    }
//}
exports.composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || redux_1.compose;
// Get the application-wide store instance, prepopulating with state from the server where available.
var store = redux_1.createStore(rootReducer, exports.composeEnhancers(redux_1.applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas_1.watchAuth);
//sagaMiddleware.run(watchLocation);
sagaMiddleware.run(sagas_1.watchBank);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(connected_react_router_1.ConnectedRouter, { history: history },
        React.createElement(App_1.default, null))), rootElement);
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map