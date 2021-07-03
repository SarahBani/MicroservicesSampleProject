"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserHistory = void 0;
var history_1 = require("history");
// Create browser history to use in the Redux store
var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
exports.browserHistory = history_1.createBrowserHistory({ basename: baseUrl });
//# sourceMappingURL=browserHistory.js.map