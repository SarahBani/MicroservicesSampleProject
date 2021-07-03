import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5100/gateway'
});

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