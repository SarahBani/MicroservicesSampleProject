import * as React from 'react';
import { useState, useEffect, useCallback, useReducer, memo, ReactElement, FormEventHandler, FormEvent } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUpdatedForm, getFormElements, ValidateForm, checkValidity } from '../../../shared/utility';
import FormElement from '../../UI/FormElement/FormElement';
import { FormControlType, SuccessfulOperation } from '../../../shared/enums';
import * as actions from '../../../store/actions/bankActions';
//import * as locationActions from '../../../store/actions/locationActions';
import * as authActions from '../../../store/actions/authActions';
import { AppState } from '../../../store';
import { Bank } from '../../../models/Bank.model';
import { Dictionary, FormElementType } from '../../../shared/types';

interface StoreProps {
    loggedIn: boolean
    token: string,
    loading: boolean,
    successfulOperation: SuccessfulOperation,
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
    },
    address: {
        elementType: FormControlType.TextArea,
        elementConfig: {
            placeholder: 'Address',
        },
        value: '',
        valid: true
    },
};

const BankNew = memo(props => {

    const { loggedIn, token, loading, successfulOperation }: StoreProps = useSelector((state: AppState) => ({
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        loading: state.common.isLoading,
        successfulOperation: state.common.successfulOperation
    }));
    const dispatch = useDispatch();

    const location = useLocation();
    const [formControls, setFormControls] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<ReactElement>();

    useEffect(() => {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(<Redirect to="/auth/" />);
        }
    }, [loggedIn]);

    useEffect(() => {
        setIsFormValid(ValidateForm(formControls));
    }, [formControls]);

    useEffect(() => {
        if (successfulOperation === SuccessfulOperation.Insert) {
            cancelHandler();
        }
    }, [successfulOperation]);

    const elementHandler = (event: FormEvent, id: string) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to="/banks/" />);
    }, [setRedirect]);

    const saveHandler: FormEventHandler = (event: FormEvent) => {
        event.preventDefault();
        const bank: Bank = {
            id: 0,
            name: formControls.name.value,
            grade: 0
        };
        dispatch(actions.saveBank(bank, token));
    };

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
            <form onSubmit={saveHandler}>
                {formElements}
                <div className="row">
                    <div className="col-12 text-center">
                        <button className="btn btn-primary" type="reset">Clear</button>
                        <button className="btn btn-success" type="submit"
                            disabled={!isFormValid || loading}>Save</button>
                        <button className="btn btn-warning" type="button" onClick={cancelHandler}> Cancel</button >
                    </div>
                </div>
            </form>
        </div>
    );
});

export default BankNew;