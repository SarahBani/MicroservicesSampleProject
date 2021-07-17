import * as React from 'react';
import { useState, useEffect, useCallback, useMemo, Fragment, memo, FC, ReactElement } from 'react';
import { Redirect, useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import * as classes from './BankDetail.module.scss';
import ConfirmDelete from '../../UI/ConfirmDelete/ConfirmDelete';
import { FailedOperationEnum, SuccessfulOperationEnum, ModalTypeEnum } from '../../../shared/enums';
import * as actions from '../../../store/actions/bankActions';
import { AppState } from '../../../store';
import { Bank } from '../../../models/Bank.model';
import Modal from '../../UI/Modal/Modal';

interface Props {
    id: number,
}

interface StoreProps {
    bank: Bank,
    successfulOperation: SuccessfulOperationEnum,
    failedOperation: FailedOperationEnum,
    loggedIn: boolean,
    token: string,
    error: string,
};

const BankDetail: FC<Props> = memo(({ id }) => {

    const { bank, successfulOperation, failedOperation, loggedIn, token }: StoreProps =
        useSelector((state: AppState) => ({
            bank: state.bank.selectedBank,
            successfulOperation: state.common.successfulOperation,
            failedOperation: state.common.failedOperation,
            loggedIn: state.auth.loggedIn,
            token: state.auth.token,
            error: state.common.error
        }));
    const dispatch = useDispatch();

    const { action } = useParams<{ action: string }>();
    const history = useHistory();
    const [redirect, setRedirect] = useState<ReactElement>();
    const [isDeleteConfirmShown, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        dispatch(actions.fetchBank(id));
    }, [id]);

    useEffect(() => {
        if (failedOperation && failedOperation === FailedOperationEnum.FetchBank) {
            cancelHandler();
        }
    }, [failedOperation]);

    useEffect(() => {
        if (!action && successfulOperation === SuccessfulOperationEnum.Delete) {
            cancelHandler();
        }
    }, [successfulOperation]);

    const cancelHandler = useCallback(() => {
        dispatch(actions.clearSelectedBank());
        setRedirect(<Redirect to="/Banks" />);
    }, [setRedirect]);

    const editHandler = useCallback(() => {
        history.push(`/Banks/${id}/edit`);
    }, [id, history]);

    const deleteConfirmContent = useMemo(() => {
        return (
            <Modal isShown={isDeleteConfirmShown} type={ModalTypeEnum.Component}>
                <ConfirmDelete onOK={() => confirmDeleteHandler(true)}
                    onCancel={() => confirmDeleteHandler(false)} />
            </Modal>
        );
    }, [isDeleteConfirmShown]);

    const deleteHandler = useCallback(() => {
        setShowDeleteConfirm(true);
    }, [setShowDeleteConfirm]);

    const confirmDeleteHandler = useCallback((isConfirmed) => {
        if (isConfirmed) {
            dispatch(actions.deleteBank(id, token));
        }
        setShowDeleteConfirm(false);
    }, [id, token, setShowDeleteConfirm]);

    return (
        <div className={classes.BankDetail}>
            {redirect}
            {deleteConfirmContent}

            <div className="row">
                <div className="col-12">
                    <h4>{bank?.name}</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={cancelHandler}>
                            Back
                        </button>
                        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" disabled={!loggedIn} >
                            Manage
                        </button>
                        <ul className="dropdown-menu">
                            {!!loggedIn && (
                                <Fragment>
                                    <a className="dropdown-item" onClick={editHandler}>Edit</a>
                                    <a className="dropdown-item" onClick={deleteHandler}>Delete</a>
                                </Fragment>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default BankDetail;