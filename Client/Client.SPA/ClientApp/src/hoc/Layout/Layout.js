"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var classes = require("./Layout.module.css");
var Toolbar_1 = require("../../components/UI/Navigation/Toolbar/Toolbar");
var Footer_1 = require("../../components/UI/Footer/Footer");
var SideDrawer_1 = require("../../components/UI/Navigation/SideDrawer/SideDrawer");
var Spinner_1 = require("../../components/UI/Spinner/Spinner");
;
exports.default = (function (props) {
    var loading = react_redux_1.useSelector(function (state) { return ({
        loading: state.common.isLoading
    }); }).loading;
    var _a = react_1.useState(false), isSideDrawerVisible = _a[0], setIsSideDrawerVisible = _a[1];
    var toggleSideDrawerHandler = function () {
        setIsSideDrawerVisible(function (prevIsSideDrawerVisible) { return !prevIsSideDrawerVisible; });
    };
    return (React.createElement("div", { className: classes.Layout },
        React.createElement(Toolbar_1.default, { drawerToggleClicked: function () { return toggleSideDrawerHandler(); } }),
        React.createElement(SideDrawer_1.default, { isShown: isSideDrawerVisible, hide: function () { return toggleSideDrawerHandler(); } }),
        React.createElement("main", null, props.children),
        React.createElement(Footer_1.default, null),
        loading && React.createElement(Spinner_1.default, null)));
});
//# sourceMappingURL=Layout.js.map