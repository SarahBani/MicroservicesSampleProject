"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
require("react-app-polyfill/ie11");
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var react_redux_1 = require("react-redux");
var connected_react_router_1 = require("connected-react-router");
var history_1 = require("history");
var configureStore_1 = __importDefault(require("./store/configureStore"));
var App_1 = __importDefault(require("./components/App"));
var registerServiceWorker_1 = __importDefault(require("./registerServiceWorker"));
// Create browser history to use in the Redux store
//const baseUrl: string = document.getElementsByTagName('base')[0].getAttribute('href') as string;
var history = history_1.createBrowserHistory();
var rootElement = document.getElementById('root');
// Get the application-wide store instance, prepopulating with state from the server where available.
var store = configureStore_1.default(history);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(connected_react_router_1.ConnectedRouter, { history: history },
        React.createElement(App_1.default, null))), rootElement);
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map