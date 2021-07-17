"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_saga_1 = require("redux-saga");
var uploadFileChannel = function (endpoint, file, token) {
    return redux_saga_1.eventChannel(function (emitter) {
        var xhr = new XMLHttpRequest();
        var onProgress = function (event) {
            if (event.lengthComputable) {
                var progress = event.loaded / event.total * 100;
                emitter({ progress: progress });
            }
        };
        var onFailure = function (event) {
            emitter({ err: new Error('Upload failed') });
            emitter(redux_saga_1.END);
        };
        xhr.upload.addEventListener("progress", onProgress);
        xhr.upload.addEventListener("error", onFailure);
        xhr.upload.addEventListener("abort", onFailure);
        xhr.onreadystatechange = function () {
            var readyState = xhr.readyState, status = xhr.status;
            if (readyState === 4) {
                if (status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.isSuccessful) {
                        emitter({
                            success: true,
                            //filePath: response.content
                        });
                        emitter(redux_saga_1.END);
                    }
                    else {
                        onFailure(null);
                    }
                }
                else {
                    onFailure(null);
                }
            }
        };
        xhr.open("POST", endpoint, true);
        xhr.setRequestHeader('Authorization', "Bearer " + token);
        xhr.send(file);
        return function () {
            xhr.upload.removeEventListener("progress", onProgress);
            xhr.upload.removeEventListener("error", onFailure);
            xhr.upload.removeEventListener("abort", onFailure);
            xhr.onreadystatechange = null;
            xhr.abort();
        };
    }, redux_saga_1.buffers.sliding(2));
};
exports.default = uploadFileChannel;
//# sourceMappingURL=uploadFileChannel.js.map