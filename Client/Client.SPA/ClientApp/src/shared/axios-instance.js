"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var utility_1 = require("./utility");
//import * as https from 'https';
//const httpsAgent = new https.Agent({ rejectUnauthorized: false });
var cancelSource = axios_1.default.CancelToken.source();
var axiosInstance = axios_1.default.create({
    baseURL: 'https://localhost:5101/gateway',
    //cancelToken: cancelSource.token
    //httpsAgent: httpsAgent
});
//instance.default.headers.common['Authorization'] = 'Auth Token dgdfgdfg';
//instance.default.headers.post['Content-Type'] = 'application/json';
var redundantErrorMessage = 'Error: Request failed with status code ';
axiosInstance.interceptors.request.use(function (requestConfig) {
    return requestConfig;
}, function (error) {
    console.log('axiosInstance request error');
    console.log(error);
    var httpErrorMessage = getHttpErrorMessage(error);
    console.log(httpErrorMessage);
    return Promise.reject(httpErrorMessage);
});
axiosInstance.interceptors.response.use(function (responseConfig) {
    return responseConfig;
}, function (error) {
    console.log('axiosInstance response error');
    console.log(error);
    var httpErrorMessage = getHttpErrorMessage(error);
    console.log(httpErrorMessage);
    return Promise.reject(httpErrorMessage);
});
var getHttpErrorMessage = function (error) {
    var errorCode = parseInt(error.toString().replace(redundantErrorMessage, ''));
    var httpError = errorCode;
    return utility_1.getErrorMessage(httpError);
};
exports.default = axiosInstance;
//# sourceMappingURL=axios-instance.js.map