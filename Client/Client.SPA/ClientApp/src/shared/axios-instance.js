"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var axiosInstance = axios_1.default.create({
    baseURL: 'https://localhost:5101/gateway'
});
//instance.default.headers.common['Authorization'] = 'Auth Token dgdfgdfg';
//instance.default.headers.post['Content-Type'] = 'application/json';
axiosInstance.interceptors.request.use(function (requestConfig) {
    return requestConfig;
}, function (error) {
    console.log('axiosInstance request error');
    console.log(error);
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use(function (responseConfig) {
    return responseConfig;
}, function (error) {
    console.log('axiosInstance response error');
    console.log(error);
    return Promise.reject(error);
});
exports.default = axiosInstance;
//# sourceMappingURL=axios-instance.js.map