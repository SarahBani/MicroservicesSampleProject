"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showProgress = exports.startUpload = exports.reset = void 0;
var actionTypes = require("./uploadActionTypes");
var reset = function () {
    return {
        type: actionTypes.RESET
    };
};
exports.reset = reset;
var startUpload = function () {
    return {
        type: actionTypes.START_UPLOAD
    };
};
exports.startUpload = startUpload;
var showProgress = function (progress) {
    return {
        type: actionTypes.SHOW_PROGRESS,
        progress: progress
    };
};
exports.showProgress = showProgress;
//# sourceMappingURL=uploadActions.js.map