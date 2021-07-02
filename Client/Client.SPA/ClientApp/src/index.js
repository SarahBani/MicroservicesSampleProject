"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("bootstrap/dist/css/bootstrap.css");
require("font-awesome/css/font-awesome.min.css");
//import 'react-app-polyfill/ie11'
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var connected_react_router_1 = require("connected-react-router");
var App_1 = require("./components/App");
var registerServiceWorker_1 = require("./registerServiceWorker");
var browserHistory_1 = require("./browserHistory");
var store_1 = require("./store");
var rootElement = document.getElementById('root');
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(connected_react_router_1.ConnectedRouter, { history: browserHistory_1.browserHistory },
        React.createElement(App_1.default, null))), rootElement);
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map