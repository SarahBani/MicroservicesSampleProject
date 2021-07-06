"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Modal_1 = require("../../components/UI/Modal/Modal");
var http_error_handler_1 = require("../../hooks/http-error-handler");
var actions = require("../../store/actions/commonActions");
var enums_1 = require("../../shared/enums");
var axios_instance_1 = require("../../shared/axios-instance");
var withErrorHandler = function (WrappedComponent) {
    return function (props) {
        var customError = react_redux_1.useSelector(function (state) { return ({
            customError: state.common.error
        }); }).customError;
        var dispatch = react_redux_1.useDispatch();
        var _a = react_1.useState(), error = _a[0], setError = _a[1];
        var _b = react_1.useState(), errorType = _b[0], setErrorType = _b[1];
        var _c = http_error_handler_1.default(axios_instance_1.default), axiosError = _c[0], axiosClearErrorHandler = _c[1];
        react_1.useEffect(function () {
            if (axiosError) {
                setError(axiosError + '!');
                setErrorType(enums_1.ModalTypeEnum.Error);
            }
            else if (customError) {
                setError(customError);
                setErrorType(enums_1.ModalTypeEnum.Warning);
            }
            else {
                setError(null);
            }
        }, [axiosError, customError, setError]);
        var hideErrorHandler = function () {
            if (axiosError) {
                axiosClearErrorHandler();
            }
            dispatch(actions.clearError());
        };
        return (React.createElement(react_1.Fragment, null,
            React.createElement(Modal_1.default, { type: errorType, isShown: !!error, hide: hideErrorHandler }, error),
            React.createElement(WrappedComponent, __assign({}, props))));
    };
};
exports.default = (function (WrappedComponent) { return withErrorHandler(WrappedComponent); });
//# sourceMappingURL=withErrorHandler.js.map