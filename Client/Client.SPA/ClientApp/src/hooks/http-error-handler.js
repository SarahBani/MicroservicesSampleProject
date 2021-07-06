"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.default = (function (axios) {
    var _a = react_1.useState(null), error = _a[0], setError = _a[1];
    var reqInterceptor = axios.interceptors.request.use(function (req) {
        setError(null);
        return req;
    });
    var resInterceptor = axios.interceptors.response.use(function (res) { return res; }, function (err) {
        setError(err);
    });
    react_1.useEffect(function () {
        return function () {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);
    var clearError = function () {
        setError(null);
    };
    return [error, clearError];
});
//interface ErrorHandlerType {
//    interceptors: {
//        request: {
//            use: (arg0: (req: any) => any) => any;
//            eject: (arg0: any) => void
//        },
//        response: {
//            use: (arg0: (res: any) => any, arg1: (err: any) => void) => any;
//            eject: (arg0: any) => void
//        }
//    }
//}
//export default (httpErrorHandler: ErrorHandlerType): [string | null, (() => void)] => {
//    const [error, setError] = useState<string | null>(null);
//    const reqInterceptor = httpErrorHandler.interceptors.request.use(
//        req => {
//            setError(null);
//            return req;
//        });
//    const resInterceptor = httpErrorHandler.interceptors.response.use(
//        res => res,
//        err => {
//            setError(err);
//        }
//    );
//    useEffect(() => {
//        return () => {
//            httpErrorHandler.interceptors.request.eject(reqInterceptor);
//            httpErrorHandler.interceptors.response.eject(resInterceptor);
//        }
//    }, [reqInterceptor, resInterceptor]);
//    const clearError = (): void => {
//        setError(null);
//    }
//    return [error, clearError];
//};
//const httpErrorHandler = (axios: AxiosInstance): [string | null, () => void] => {
//    //export default (httpErrorHandler: ErrorHandlerType)    => {
//    //export default (httpErrorHandler: [string | null, (() => void)])=> {
//    const [error, setError] = useState<string | null>(null);
//    const reqInterceptor = axios.interceptors.request.use(
//        req => {
//            setError(null);
//            return req;
//        });
//    const resInterceptor = axios.interceptors.response.use(
//        res => res,
//        err => {
//            setError(err);
//        }
//    );
//    useEffect(() => {
//        return () => {
//            axios.interceptors.request.eject(reqInterceptor);
//            axios.interceptors.response.eject(resInterceptor);
//        }
//    }, [reqInterceptor, resInterceptor]);
//    const clearError = (): void => {
//        setError(null);
//    }
//    //return [error, clearError] as [string, () => void]; // as const;
//    return [error, clearError];
//};
//export default httpErrorHandler;
//# sourceMappingURL=http-error-handler.js.map