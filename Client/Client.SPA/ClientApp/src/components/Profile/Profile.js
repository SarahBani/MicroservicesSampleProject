"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var classes = require("./Profile.module.scss");
var PageTitle_1 = require("../UI/PageTitle/PageTitle");
var authActions = require("../../store/actions/authActions");
;
var Profile = function () {
    var _a = react_redux_1.useSelector(function (state) { return ({
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }); }), loggedIn = _a.loggedIn, user = _a.user;
    var dispatch = react_redux_1.useDispatch();
    var location = react_router_dom_1.useLocation();
    var _b = react_1.useState(), redirect = _b[0], setRedirect = _b[1];
    react_1.useEffect(function () {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(React.createElement(react_router_dom_1.Redirect, { to: "/auth/" }));
        }
    }, [loggedIn]);
    return (React.createElement("div", { className: ["container", classes.Profile].join(' ') },
        redirect,
        React.createElement(PageTitle_1.default, { title: "Profile" }),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-6 card bg-info" },
                React.createElement("div", { className: "card-body" },
                    React.createElement("img", { src: "/images/avatar.png", alt: "avatar", className: "img-response" })),
                React.createElement("div", { className: "card-body text-center" },
                    React.createElement("h4", { className: "card-title" }, "Software Developer"),
                    React.createElement("p", { className: "card-text" }, user === null || user === void 0 ? void 0 : user.email))))));
};
exports.Profile = Profile;
exports.default = exports.Profile;
//# sourceMappingURL=Profile.js.map