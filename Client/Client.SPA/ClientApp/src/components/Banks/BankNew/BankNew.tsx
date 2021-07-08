import * as React from 'react';
import { useState, useEffect, useCallback, memo, ReactElement, FormEventHandler, FormEvent } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUpdatedForm, getFormElements, ValidateForm, checkValidity } from '../../../shared/utility';
import FormElement from '../../UI/FormElement/FormElement';
import { ElementConfigTypeEnum, ElementTypeEnum, SuccessfulOperationEnum } from '../../../shared/enums';
import * as actions from '../../../store/actions/bankActions';
//import * as locationActions from '../../../store/actions/locationActions';
import * as authActions from '../../../store/actions/authActions';
import { AppState } from '../../../store';
import { Bank } from '../../../models/Bank.model';
import { Dictionary, FormControlElement, FormControlElementContent } from '../../../shared/types';

interface StoreProps {
    loggedIn: boolean
    token: string,
    loading: boolean,
    successfulOperation: SuccessfulOperationEnum,
};

const initialFormState: Dictionary<FormControlElementContent> = {
    name: {
        elementType: ElementTypeEnum.Input,
        elementConfig: {
            type: ElementConfigTypeEnum.Text,
            placeholder: 'Name',
        },
        value: '',
        validation: {
            required: true
        },
        valid: false
    },
    grade: {
        elementType: ElementTypeEnum.Input,
        elementConfig: {
            type: ElementConfigTypeEnum.Number,
            placeholder: 'Grade',
            maxLength: 1
        },
        value: '',
        validation: {
            maxLength: 1,
            max: 5
        },
        valid: false
    }
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
        if (successfulOperation === SuccessfulOperationEnum.Insert) {
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
            name: formControls.name.value.toString(),
            grade: 0
        };
        dispatch(actions.saveBank(bank, token));
    };

    const formElements = getFormElements(formControls).map((formElement: FormControlElement) => (
        <FormElement formElement={formElement}
            key={formElement.id}
            onChange={(event) => elementHandler(event, formElement.id)}
            onLostFocus={(event) => elementHandler(event, formElement.id)}
        />
    ));

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