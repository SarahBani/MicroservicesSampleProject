import * as React from 'react';
import { Fragment, useState, useEffect, FC, useMemo, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import * as actions from '../../store/actions/commonActions';
import { ModalTypeEnum } from '../../shared/enums';
import { AppState } from '../../store';
import axiosInstance from '../../shared/axios-instance';
import { useCallback } from 'react';

interface StoreProps {
    customError: string
};

const withErrorHandler = (WrappedComponent: FC<any>) => {

    return (props: any) => {

        const { customError }: StoreProps = useSelector((state: AppState) => ({
            customError: state.common.error
        }));
        const dispatch = useDispatch();
        const [error, setError] = useState<string | null>();
        const [errorType, setErrorType] = useState<ModalTypeEnum>();
        const [axiosError, axiosClearErrorHandler] = useHttpErrorHandler(axiosInstance);

        useEffect(() => {
            if (axiosError) {
                setError(axiosError);
                setErrorType(ModalTypeEnum.Error);
            }
            else if (customError) {
                setError(customError);
                setErrorType(ModalTypeEnum.Warning);
            }
            else {
                setError(null);
            }
            //cleanup function:
            return () => {
                setError(null);
            }
        }, [axiosError, customError, setError]);

        const onHideErrorHandler = useCallback(() => {
            if (axiosError) {
                axiosClearErrorHandler();
            }
            dispatch(actions.clearError());
        }, [axiosError, axiosClearErrorHandler]);

        return (
            <Fragment>
                <Modal type={errorType as ModalTypeEnum} isShown={!!error} onHide={onHideErrorHandler} >
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );

    };
};

export default (WrappedComponent: FC<any>) => withErrorHandler(WrappedComponent);