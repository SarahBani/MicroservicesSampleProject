﻿import { useEffect, useState } from "react";

interface ErrorHandlerType {
    interceptors: {
        request: {
            use: (arg0: (req: any) => any) => any;
            eject: (arg0: any) => void
        },
        response: {
            use: (arg0: (res: any) => any, arg1: (err: any) => void) => any;
            eject: (arg0: any) => void
        }
    }
}

export default (httpErrorHandler: ErrorHandlerType): [string | null | undefined, () => void] => {

    const [error, setError] = useState<string | null>();

    const reqInterceptor = httpErrorHandler.interceptors.request.use(
        req => {
            setError(null);
            return req;
        });

    const resInterceptor = httpErrorHandler.interceptors.response.use(
        res => res,
        err => {
            setError(err);
        }
    );

    useEffect(() => {
        return () => {
            httpErrorHandler.interceptors.request.eject(reqInterceptor);
            httpErrorHandler.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);

    const clearError = (): void => {
        setError(null);
    }

    return [error, clearError];
}