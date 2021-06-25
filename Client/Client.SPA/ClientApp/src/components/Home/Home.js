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
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var Banks_1 = __importDefault(require("../Banks/Banks"));
var Home = function () { return (React.createElement("div", null,
    React.createElement("h1", null, "Hello, world!"),
    React.createElement("p", null, "Welcome to your new single-page application, built with:"),
    React.createElement("ul", null,
        React.createElement("li", null,
            React.createElement("a", { href: 'https://get.asp.net/' }, "ASP.NET Core"),
            " and ",
            React.createElement("a", { href: 'https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' }, "C#"),
            " for cross-platform server-side code"),
        React.createElement("li", null,
            React.createElement("a", { href: 'https://facebook.github.io/react/' }, "React"),
            " and ",
            React.createElement("a", { href: 'https://redux.js.org/' }, "Redux"),
            " for client-side code"),
        React.createElement("li", null,
            React.createElement("a", { href: 'http://getbootstrap.com/' }, "Bootstrap"),
            " for layout and styling")),
    React.createElement("p", null, "To help you get started, we've also set up:"),
    React.createElement("ul", null,
        React.createElement("li", null,
            React.createElement("strong", null, "Client-side navigation"),
            ". For example, click ",
            React.createElement("em", null, "Counter"),
            " then ",
            React.createElement("em", null, "Back"),
            " to return here."),
        React.createElement("li", null,
            React.createElement("strong", null, "Development server integration"),
            ". In development mode, the development server from ",
            React.createElement("code", null, "create-react-app"),
            " runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file."),
        React.createElement("li", null,
            React.createElement("strong", null, "Efficient production builds"),
            ". In production mode, development-time features are disabled, and your ",
            React.createElement("code", null, "dotnet publish"),
            " configuration produces minified, efficiently bundled JavaScript files.")),
    React.createElement("p", null,
        "The ",
        React.createElement("code", null, "ClientApp"),
        " subdirectory is a standard React application based on the ",
        React.createElement("code", null, "create-react-app"),
        " template. If you open a command prompt in that directory, you can run ",
        React.createElement("code", null, "npm"),
        " commands such as ",
        React.createElement("code", null, "npm test"),
        " or ",
        React.createElement("code", null, "npm install"),
        "."),
    React.createElement(Banks_1.default, null))); };
exports.default = react_redux_1.connect()(Home);
//# sourceMappingURL=Home.js.map