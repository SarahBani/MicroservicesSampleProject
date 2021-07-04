import * as React from 'react';
import { Fragment, useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosInstance } from 'axios';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import * as actions from '../../store/actions/commonActions';
import { ModalTypeEnum } from '../../shared/enums';
import { AppState } from '../../store';

interface StoreProps {
    customError: string
}

const withErrorHandler = (WrappedComponent: FC<any>, axios: AxiosInstance) => {

    return (props: any) => {

        const { customError }: StoreProps = useSelector((state: AppState) => ({
            customError: state.common.error
        }));
        const dispatch = useDispatch();
        const [error, setError] = useState<string | null>();
        const [errorType, setErrorType] = useState<ModalTypeEnum>();
        const [axiosError, axiosClearErrorHandler] = useHttpErrorHandler(axios);

        useEffect(() => {
            if (axiosError) {
                setError(axiosError + '!');
                setErrorType(ModalTypeEnum.Error);
            }
            else if (customError) {
                setError(customError);
                setErrorType(ModalTypeEnum.Warning);
            }
            else {
                setError(null);
            }
        }, [axiosError, customError, setError]);

        const hideErrorHandler = () => {
            if (axiosError) {
                axiosClearErrorHandler();
            }
            dispatch(actions.clearError());
        };

        return (
            <Fragment>
                <Modal type={errorType as ModalTypeEnum} isShown={!!error} hide={hideErrorHandler} >
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );

    };
};

export default (WrappedComponent: FC<any>, axios: AxiosInstance) => withErrorHandler(WrappedComponent, axios);