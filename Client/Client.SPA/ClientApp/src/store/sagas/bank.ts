import { call, put, take } from 'redux-saga/effects';

import { SuccessfulOperationEnum, FailedOperationEnum } from '../../shared/enums';
import * as actions from '../actions/bankActions';
import * as commonActions from '../actions/commonActions';
import * as uploadActions from '../actions/uploadActions';
import { ResponseGenerator } from '../../models/ResponseGenerator.model';
import axiosInstance from '../../shared/axios-instance';
import uploadFileChannel, { UploadChannelResult } from './uploadFileChannel';
import { getHeaders, getTokenHeaders } from '../../shared/utility';

//const cancelSource = axios.CancelToken.source();

export function* fetchBanksSaga(payload: ReturnType<typeof actions.fetchBanks>) {
    yield put(commonActions.showLoader());
    try {
        const filters = [];
        if (payload.cityId) {
            yield filters.push(`cityId=${payload.cityId}`);
        }
        if (payload.countryId) {
            yield filters.push(`countryId=${payload.countryId}`);
        }
        if (payload.pageNo) {
            yield filters.push(`pageNo=${payload.pageNo}`);
        }
        if (payload.pageCount) {
            yield filters.push(`pageCount=${payload.pageCount}`);
        }
        const queryString: string = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response: ResponseGenerator = yield axiosInstance.get('/banks' + queryString,
            {
                headers: getHeaders(),
                //cancelToken: cancelSource.token
            });
        if (response?.status === 200) {
            yield put(actions.setBanks(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchBanksCountSaga(payload: ReturnType<typeof actions.fetchBanksCount>) {
    yield put(commonActions.showLoader());
    try {
        const filters = [];
        if (payload.cityId) {
            yield filters.push(`cityId=${payload.cityId}`);
        }
        if (payload.countryId) {
            yield filters.push(`countryId=${payload.countryId}`);
        }
        const queryString: string = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response: ResponseGenerator = yield axiosInstance.get('/bank/count' + queryString,
            {
                headers: getHeaders()
            });
        if (response?.status === 200) {
            yield put(actions.setBanksCount(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchBankSaga(payload: ReturnType<typeof actions.fetchBank>) {
    yield put(commonActions.showLoader());
    try {
        const response: ResponseGenerator = yield axiosInstance.get('/bank/' + payload.id,
            {
                headers: getHeaders()
            });
        if (response?.status === 200) {
            yield put(actions.setBank(response.data));
        }
        else {
            yield put(commonActions.operationFailed(FailedOperationEnum.FetchBank));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* uploadBankLogoSaga(payload: ReturnType<typeof actions.uploadBankLogo>) {
    yield put(commonActions.showLoader());
    yield put(uploadActions.startUpload());

    const formData: FormData = new FormData();
    formData.append("file", payload.file, payload.file.name);
    //const channel= yield call(uploadFileChannel,
    //    `/Bank/UploadLogo/${payload.hotelId}`,
    //    formData,
    //    payload.token);

    const channel = call(uploadFileChannel,
        '/Bank/UploadLogo/',
        formData,
        payload.token);

    console.log(channel);

    //while (true) {
    //    const { progress = 0, err, success, filePath } = yield take(channel);
    //    if (err) {
    //        yield put(commonActions.raiseError(err));
    //        return;
    //    }
    //    if (success) {
    //        const imageUrl = filePath.replace('Resources\\Images\\Banks\\', '').replace('\\', '/');
    //        console.log(3333333333);
    //        console.log(imageUrl);
    //        //yield put(actions.saveHotelPhoto({
    //        //    hotelId: payload.hotelId,
    //        //    photoUrl: imageUrl
    //        //}, payload.token));
    //    }
    //    yield put(uploadActions.showProgress(progress));
    //}
}

export function* removeBankLogoSaga(payload: ReturnType<typeof actions.removeBankLogo>) {
    yield put(commonActions.showLoader());
    try {
        const response: Promise<{ status: number }> = axiosInstance.delete(`/Bank/RemoveLogoFile?filePath=${payload.filePath}`,
            {
                headers: getTokenHeaders(payload.token)
            });
        //const response: Promise<{ status: number } > = yield axiosInstance.delete(`/Bank/RemoveLogoFile?filePath=${payload.filePath}`,
        //    {
        //        headers: getTokenHeaders(payload.token)
        //    });
        //if (response?.status === 200) {
        //    console.log(433333334444);
        //    //yield put(actions.deleteBankLogo(payload.id, payload.token));
        //}
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* saveBankSaga(payload: ReturnType<typeof actions.saveBank>) {
    yield put(commonActions.showLoader());
    try {
        let response: ResponseGenerator;
        if (!payload.bank.id) {
            response = yield axiosInstance.post('/bank', payload.bank,
                {
                    headers: getTokenHeaders(payload.token)
                });
            if (response?.status === 201) {
                yield put(commonActions.operationSucceeded(SuccessfulOperationEnum.Insert));
            }
        }
        else {
            response = yield axiosInstance.put('/bank', payload.bank,
                {
                    headers: getTokenHeaders(payload.token)
                });
            if (response?.status === 200) {
                yield put(commonActions.operationSucceeded(SuccessfulOperationEnum.Update));
            }
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        console.log(error);
        yield put(commonActions.raiseError(error));
    }
}

export function* deleteBankSaga(payload: ReturnType<typeof actions.deleteBank>) {
    yield put(commonActions.showLoader());
    try {
        const response: ResponseGenerator = yield axiosInstance.delete('/bank/' + payload.id,
            {
                headers: getTokenHeaders(payload.token)
            });
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(SuccessfulOperationEnum.Delete));
            yield put(actions.clearSelectedBank());
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}