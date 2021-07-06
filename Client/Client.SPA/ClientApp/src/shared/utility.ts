import { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import * as Constants from "./constants";
import { HttpErrorEnum } from "./enums";
import { Dictionary, FormControlElementContent, Validation, FormControlElement } from "./types";

export const updateObject = <T>(oldObject: T, updatedProperties: any) => {
    return {
        ...oldObject,
        updatedProperties
    };
};

export const getFormElements = (formControls: Dictionary<FormControlElementContent>): FormControlElement[] => {
    const formElements: FormControlElement[] = [];
    for (const key in formControls) {
        formElements.push({
            id: key,
            content: formControls[key]
        });
    }
    return formElements;
};

//export const getUpdatedForm = (event: { target: HTMLInputElement }, formControls, controlId) => {
export const getUpdatedForm = (
    event: SyntheticEvent<Element>,
    formControls: Dictionary<FormControlElementContent>,
    controlId: string): Dictionary<FormControlElementContent> => {
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

export const ValidateForm = (formControls: Dictionary<FormControlElementContent>): boolean => {
    let isValid: boolean = true;
    for (const controlId in formControls) {
        if (!formControls[controlId].valid) {
            isValid = false;
            break;
        }
    }
    return isValid;
};

export const checkValidity = (value: string | number, rules?: Validation): boolean => {
    if (!rules) {
        return true;
    }

    if (rules.required) {
        if (!value || value.toString().trim() === '') {
            return false;
        }
    }
    if (rules.minLength) {
        if (value.toString().length < rules.minLength) {
            return false;
        }
    }
    if (rules.maxLength) {
        if (value.toString().length > rules.maxLength) {
            return false;
        }
    }
    if (rules.min) {
        if (value < rules.min) {
            return false;
        }
    }
    if (rules.max) {
        if (value > rules.max) {
            return false;
        }
    }
    if (rules.email) {
        const emailRegEx: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegEx.test(value.toString())) {
            return false;
        }
    }
    if (rules.pattern) {
        if (!new RegExp(rules.pattern).test(value.toString())) {
            return false;
        }
    }

    return true;
};

export const disableForm = (formControls: Dictionary<FormControlElementContent>, isDisabled: boolean)
    : Dictionary<FormControlElementContent> => {
    const updatedForm: Dictionary<FormControlElementContent> = { ...formControls };
    for (const inputId in updatedForm) {
        formControls[inputId].disabled = isDisabled;
    }
    return updatedForm;
};

export const getErrorMessage = (error: HttpErrorEnum): string => {
    switch (error) {
        case HttpErrorEnum.Unauthorized:
            return Constants.ERROR_UNAUTHORIZED;
        case HttpErrorEnum.Forbidden:
            return Constants.ERROR_FORBIDDEN;
        case HttpErrorEnum.BadRequest:
            return Constants.ERROR_BAD_REQUEST;
        case HttpErrorEnum.BadGateway:
            return Constants.ERROR_BAD_GATEWAY;
        case HttpErrorEnum.NotFound:
        default:
            return Constants.ERROR_UNKNOWN;
    }
};