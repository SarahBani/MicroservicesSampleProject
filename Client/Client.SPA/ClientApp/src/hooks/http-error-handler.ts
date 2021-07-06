import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";

export default (axios: AxiosInstance): [string | null, (() => void)] => {

    const [error, setError] = useState<string | null>(null);

    const reqInterceptor = axios.interceptors.request.use(
        req => {
            setError(null);
            return req;
        });

    const resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
            setError(err);
        }
    );

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);

    const clearError = (): void => {
        setError(null);
    }

    return [error, clearError];
};


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