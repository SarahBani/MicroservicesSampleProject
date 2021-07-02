import * as React from 'react';
import { Fragment, useState, useEffect, FC, FunctionComponent, PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import axiosInstance from '../../shared/axios-instance';
import * as actions from '../../store/actions/commonActions';
import { ModalType } from '../../shared/enums';
import { AppState } from '../../store';

interface StoreProps {
    customError: string
}

const withErrorHandler = (WrappedComponent: FC<any>) => {

    return (props: any) => {

        const { customError }: StoreProps = useSelector((state: AppState) => ({
            customError: state.common.error
        }));
        const dispatch = useDispatch();
        const [error, setError] = useState<string | null>();
        const [errorType, setErrorType] = useState<ModalType>();
        const [axiosError, axiosClearErrorHandler] = useHttpErrorHandler(axiosInstance);

        useEffect(() => {
            if (axiosError) {
                setError(axiosError + '!');
                setErrorType(ModalType.ERROR);
            }
            else if (customError) {
                setError(customError);
                setErrorType(ModalType.WARNING);
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
                <Modal type={errorType as ModalType} isShown={!!error} hide={hideErrorHandler} >
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );

    };
};

export default (WrappedComponent: FC<any>) => withErrorHandler(WrappedComponent);