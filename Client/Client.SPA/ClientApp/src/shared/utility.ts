import { ChangeEvent, FormEvent, SyntheticEvent } from "react";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        updatedProperties
    };
};

export const getFormElements = (formControls) => {
    const formElements = [];
    for (const key in formControls) {
        formElements.push({
            id: key,
            content: formControls[key]
        });
    }
    return formElements;
};

//export const getUpdatedForm = (event: { target: HTMLInputElement }, formControls, controlId) => {
export const getUpdatedForm = (event: SyntheticEvent<Element>, formControls, controlId) => {
    const isControlValid = checkValidity((event.target as HTMLInputElement).value, formControls[controlId].validation);
    const updatedForm = {
        ...formControls,
        [controlId]: {
            ...formControls[controlId],
            value: (event.target as HTMLInputElement).value,
            valid: isControlValid,
            touched: true
        }
    };
    return updatedForm;
};

export const ValidateForm = (formControls) => {
    let isValid = true;
    for (const controlId in formControls) {
        if (!formControls[controlId].valid) {
            isValid = false;
            break;
        }
    }
    return isValid;
};

export const checkValidity = (value, rules): boolean => {
    if (!rules) {
        return true;
    }

    if (rules.required) {
        if (!value || value.trim() === '') {
            return false;
        }
    }
    if (rules.minLength) {
        if (value.length < rules.minLength) {
            return false;
        }
    }
    if (rules.maxLength) {
        if (value.length > rules.maxLength) {
            return false;
        }
    }
    if (rules.minimum) {
        if (value < rules.minimum) {
            return false;
        }
    }
    if (rules.maximum) {
        if (value > rules.maximum) {
            return false;
        }
    }
    if (rules.email) {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegEx.test(value)) {
            return false;
        }
    }
    if (rules.regularExpression) {
        if (!rules.maximum.test(value)) {
            return false;
        }
    }

    return true;
};

export const disableForm = (formControls, isDisabled) => {
    const updatedForm = { ...formControls };
    for (const inputId in updatedForm) {
        formControls[inputId].disabled = isDisabled;
    }
    return updatedForm;
};