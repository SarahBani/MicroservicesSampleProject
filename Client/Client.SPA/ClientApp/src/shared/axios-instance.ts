import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:5101/gateway',
    httpsAgent: httpsAgent
});

//instance.default.headers.common['Authorization'] = 'Auth Token dgdfgdfg';
//instance.default.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
    return requestConfig;
}, error => {
    console.log('axiosInstance request error');
    console.log(error);
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((responseConfig: AxiosResponse) => {
    return responseConfig;
}, error => {
    console.log('axiosInstance response error');
    console.log(error);
    return Promise.reject(error);
});

export default axiosInstance;