import { buffers, eventChannel, END, EventChannel } from 'redux-saga';

import * as Constants from "../../shared/constants";

export type UploadChannelResult = { progress: number } | { success: boolean } | { err: Error } | { filePath: string};

const uploadFileChannel = (endpoint: string, file: FormData, token: string): EventChannel<UploadChannelResult> => {

    return eventChannel(emitter => {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        const onProgress = (event: any) => {
            if (event.lengthComputable) {
                const progress: number = event.loaded / event.total * 100;
                emitter({ progress });
            }
        };
        const onFailure = (event: any) => {
            emitter({ err: new Error('Upload failed') });
            emitter(END);
        };
        xhr.upload.addEventListener("progress", onProgress);
        xhr.upload.addEventListener("error", onFailure);
        xhr.upload.addEventListener("abort", onFailure);
        xhr.onreadystatechange = () => {
            const { readyState, status } = xhr;
            if (readyState === 4) {
                if (status === 200) {
                    const uploadedFilePath: string = xhr.responseText;
                    emitter({
                        success: true,
                        filePath: uploadedFilePath
                    });
                    emitter(END);
                }
                else {
                    onFailure(null);
                }
            }
        };
        xhr.open("POST", Constants.GATEWAY_URL + '/' + endpoint, true);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(file);
        return () => {
            xhr.upload.removeEventListener("progress", onProgress);
            xhr.upload.removeEventListener("error", onFailure);
            xhr.upload.removeEventListener("abort", onFailure);
            xhr.onreadystatechange = null;
            xhr.abort();
        };
    }, buffers.sliding(2));
};

export default uploadFileChannel;