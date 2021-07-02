"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classes = require("./Toolbar.module.scss");
var Logo_1 = require("../../Logo/Logo");
var NavigationItems_1 = require("../NavigationItems/NavigationItems");
var DrawerToggle_1 = require("../SideDrawer/DrawerToggle/DrawerToggle");
;
var Toolbar = function (props) { return (React.createElement("header", { className: classes.Toolbar },
    React.createElement(DrawerToggle_1.default, { clicked: props.drawerToggleClicked }),
    React.createElement("div", null,
        React.createElement(Logo_1.default, null)),
    React.createElement(NavigationItems_1.default, null))); };
exports.default = Toolbar;
//# sourceMappingURL=Toolbar.js.map