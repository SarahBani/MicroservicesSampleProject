"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var classes = require("./SideDrawer.module.scss");
var Backdrop_1 = require("../../Backdrop/Backdrop");
var NavigationItems_1 = require("../NavigationItems/NavigationItems");
;
var SideDrawer = function (props) {
    var _a = react_1.useState(''), attachedClasses = _a[0], setAttachedClasses = _a[1];
    react_1.useEffect(function () {
        setAttachedClasses([
            classes.SideDrawer,
            classes[props.isShown ? 'Open' : 'Close']
        ].join(' '));
    }, [props.isShown]);
    return (React.createElement(react_1.Fragment, null,
        React.createElement(Backdrop_1.default, { isShown: props.isShown, onClick: props.hide }),
        React.createElement("div", { className: attachedClasses, onClick: props.hide },
            React.createElement(NavigationItems_1.default, null))));
};
exports.default = SideDrawer;
//# sourceMappingURL=SideDrawer.js.map