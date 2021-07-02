import * as React from "react";
import { useContext, useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";

import * as classes from './Auth.module.scss';
import FormElement from '../UI/FormElement/FormElement';
import Button from '../UI/Button/Button';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { getFormElements, getUpdatedForm, disableForm, ValidateForm } from '../../shared/utility';
import * as actions from '../../store/actions/authActions';
import { ButtonType, FormControlType } from "../../shared/enums";
import { AppState } from "../../store";

interface StoreProps {
    isLoggedIn: boolean,
    isLoading: boolean,
    authRedirectPath: string
}

const initialFormState = {
    email: {
        elementType: FormControlType.Input,
        elementConfig: {
            type: 'email',
            placeholder: 'Email',
        },
        value: 'sarah@yahoo.com',
        validation: {
            required: true,
            email: true
        },
        valid: true
    },
    password: {
        elementType: FormControlType.Input,
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
        },
        value: '',
        autoComplete: 'on',
        validation: {
            required: true,
            minLength: 6
        },
        valid: true
    }
};

export const Auth: FC = () => {

    const { isLoggedIn, isLoading, authRedirectPath }: StoreProps = useSelector((state: AppState) => ({
        isLoggedIn: state.auth.loggedIn,
        isLoading: state.common.isLoading,
        authRedirectPath: state.auth.authRedirectPath
    }));
    const dispatch = useDispatch();
    const history = useHistory();
    const [formControls, setFormControls] = useState(initialFormState);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (history.action !== 'REPLACE') {
            dispatch(actions.setAuthRedirectPath('/'));
        }
    }, []);

    useEffect(() => {
        const updatedForm = disableForm(formControls, isLoading);
        setFormControls(updatedForm);
    }, [isLoading, setFormControls]);

    const elementChangedHandler = (event: any, id: string) => {
        const updatedForm = getUpdatedForm(event, formControls, id);
        setFormControls(updatedForm);
        setIsFormValid(ValidateForm(updatedForm));
    };

    const elementLostFocusHandler = (event: any, id: string) => {
        setFormControls(getUpdatedForm(event, formControls, id));
    };

    const signInHandler = (event: any) => {
        event.preventDefault();
        dispatch(actions.signIn(formControls.email.value, formControls.password.value));
    };

    const loggedInRedirect = (isLoggedIn && <Redirect to={authRedirectPath} />);

    const form = (
        <form onSubmit={signInHandler}>
            {
                getFormElements(formControls).map(formElement => (
                    <FormElement formElement={formElement}
                        key={formElement.id}
                        onChange={(event: any) => elementChangedHandler(event, formElement.id)}
                        onLostFocus={(event: any) => elementLostFocusHandler(event, formElement.id)}
                    />
                ))
            }
            <Button type={ButtonType.Success} disabled={!isFormValid || isLoading}>Sign In</Button>
        </form>
    );

    return (
        <div className={classes.Auth}>
            {loggedInRedirect}
            {form}
        </div>
    );
};

export default withErrorHandler(Auth);