"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.default = (function (httpErrorHandler) {
    var _a = react_1.useState(), error = _a[0], setError = _a[1];
    var reqInterceptor = httpErrorHandler.interceptors.request.use(function (req) {
        setError(null);
        return req;
    });
    var resInterceptor = httpErrorHandler.interceptors.response.use(function (res) { return res; }, function (err) {
        setError(err);
    });
    react_1.useEffect(function () {
        return function () {
            httpErrorHandler.interceptors.request.eject(reqInterceptor);
            httpErrorHandler.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);
    var clearError = function () {
        setError(null);
    };
    return [error, clearError];
});
//# sourceMappingURL=http-error-handler.js.map