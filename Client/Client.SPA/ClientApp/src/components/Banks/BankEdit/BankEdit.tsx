import * as React from 'react';
import { useState, useEffect, useCallback, useMemo, memo, FC, ReactElement } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUpdatedForm, getFormElements, ValidateForm, checkValidity } from '../../../shared/utility';
import FormElement from '../../UI/FormElement/FormElement';
import ConfirmDelete from '../../UI/ConfirmDelete/ConfirmDelete';
import Modal from '../../UI/Modal/Modal';
import { SuccessfulOperation, FailedOperation, FormControlType, ModalType } from '../../../shared/enums';
import * as actions from '../../../store/actions/bankActions';
import * as authActions from '../../../store/actions/authActions';
import { FormElementType, Dictionary } from '../../../shared/types';
import { AppState } from '../../../store';
import { Bank } from '../../../models/Bank.model';
//import * as locationActions from '../../../store/actions/locationActions';
//import * as authActions from '../../../store/actions/authActions';

interface StoreProps {
    bank: Bank,
    loggedIn: boolean
    token: string,
    loading: boolean,
    successfulOperation: SuccessfulOperation,
    failedOperation: FailedOperation
};

const initialFormState: Dictionary<FormElementType> = {
    name: {
        elementType: FormControlType.Input,
        elementConfig: {
            type: 'text',
            placeholder: 'Name',
        },
        value: '',
        validation: {
            required: true
        },
        valid: false
    }
};

const BankEdit: FC<{ id: number }> = memo(({ id }) => {

    const { bank, loggedIn, token, loading, successfulOperation, failedOperation }: StoreProps = useSelector((state: AppState) => ({
        bank: state.bank.selectedBank,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        loading: state.common.isLoading,
        successfulOperation: state.common.successfulOperation,
        failedOperation: state.common.failedOperation
    }));
    const dispatch = useDispatch();
    const location = useLocation();
    const [formControls, setFormControls] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState(false);
    const [redirect, setRedirect] = useState<ReactElement>();
    const [isDeleteConfirmShown, setIsDeleteConfirmShown] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        if (failedOperation && failedOperation === FailedOperation.FetchBank) {
            setRedirect(<Redirect to={'/banks'} />);
        }
    }, [failedOperation]);

    useEffect(() => {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(<Redirect to="/auth/" />);
        }
    }, [loggedIn]);

    useEffect(() => {
        if (!bank) {
            dispatch(actions.fetchBank(id));
        }
    }, [id]);

    useEffect(() => {
        let updatedForm = {
            ...formControls
        };

        if (updatedForm && isInitializing) {
            updatedForm = {
                ...updatedForm,
                ['name']: {
                    ...updatedForm['name'],
                    value: bank.name,
                    valid: true
                },
                ['grade']: {
                    ...updatedForm['grade'],
                    value: bank.grade?.toString(),
                    valid: true
                },
            };
            setIsInitializing(false);
        }
        setFormControls(updatedForm);
    }, []);

    useEffect(() => {
        setIsFormValid(ValidateForm(formControls));
    }, [formControls]);

    useEffect(() => {
        switch (successfulOperation) {
            case SuccessfulOperation.Update:
                cancelHandler();
                break;
            case SuccessfulOperation.Delete:
                setRedirect(<Redirect to="/banks/" />);
            default:
        }
    }, [successfulOperation]);

    const elementHandler = (event, id) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const changeStarsHandler = (value, id) => {
        const updatedForm = {
            ...formControls,
            ['stars']: {
                ...formControls['stars'],
                value: value
            }
        };
        setFormControls(updatedForm);
    };

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to={`/banks/${id}`} />);
    }, [id, setRedirect]);

    const saveHandler = (event) => {
        event.preventDefault();
        const bank: Bank = {
            id: id,
            name: formControls.name.value,
            grade: parseInt(formControls.grade.value)
        };
        dispatch(actions.saveBank(bank, token));
    };

    const deleteConfirmContent = useMemo(() => {
        return (
            <Modal isShown={isDeleteConfirmShown} type={ModalType.COMPONENT}>
                <ConfirmDelete onOK={() => confirmDeleteHandler(true)}
                    onCancel={() => confirmDeleteHandler(false)} />
            </Modal>
        );
    }, [isDeleteConfirmShown]);

    const deleteHandler = useCallback(() => {
        setIsDeleteConfirmShown(true);
    }, [setIsDeleteConfirmShown]);

    const confirmDeleteHandler = useCallback((isConfirmed) => {
        if (isConfirmed) {
            dispatch(actions.deleteBank(id, token));
        }
        setIsDeleteConfirmShown(false);
    }, [id, token, setIsDeleteConfirmShown]);

    const formElements = getFormElements(formControls).map(formElement => {
        return (
            <FormElement formElement={formElement}
                key={formElement.id}
                onChange={(event) => elementHandler(event, formElement.id)}
                onLostFocus={(event) => elementHandler(event, formElement.id)}
            />
        )
    });

    return (
        <div>
            {redirect}
            {deleteConfirmContent}

            <form onSubmit={saveHandler}>
                {formElements}

                <div className="row">
                    <div className="col-12 text-center">
                        <button className="btn btn-primary" type="reset" >Clear</button>
                        <button className="btn btn-success" type="submit" disabled={!isFormValid || loading}>Save</button>
                        <button className="btn btn-info" type="button">Photos</button>
                        <button className="btn btn-danger" type="button" onClick={deleteHandler}> Delete</button >
                        <button className="btn btn-warning" type="button" onClick={cancelHandler}> Cancel</button >
                    </div>
                </div>
            </form>
        </div>
    );
});

export default BankEdit;