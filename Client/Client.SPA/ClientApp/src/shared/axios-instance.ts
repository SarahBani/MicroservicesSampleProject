import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpErrorEnum } from './enums';
import { getErrorMessage } from './utility';
//import * as https from 'https';

//const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:5101/gateway',
    //httpsAgent: httpsAgent
});

//instance.default.headers.common['Authorization'] = 'Auth Token dgdfgdfg';
//instance.default.headers.post['Content-Type'] = 'application/json';

const redundantErrorMessage = 'Error: Request failed with status code ';

axiosInstance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
    return requestConfig;
}, (error: any) => {
    console.log('axiosInstance request error');
    console.log(error);
    const httpErrorMessage: string = getHttpErrorMessage(error);
    console.log(httpErrorMessage);
    return Promise.reject(httpErrorMessage);
});
axiosInstance.interceptors.response.use((responseConfig: AxiosResponse) => {
    return responseConfig;
}, (error: any) => {
    console.log('axiosInstance response error');
    console.log(error);
    const httpErrorMessage: string = getHttpErrorMessage(error);
    console.log(httpErrorMessage);
    return Promise.reject(httpErrorMessage);
});

const getHttpErrorMessage = (error: any): string => {
    const errorCode: number = parseInt(error.toString().replace(redundantErrorMessage, ''));
    const httpError: HttpErrorEnum = errorCode as HttpErrorEnum;
    return getErrorMessage(httpError);
};

export default axiosInstance;