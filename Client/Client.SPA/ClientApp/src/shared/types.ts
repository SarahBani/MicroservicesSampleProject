import { FormControlType } from "./enums";

export type FormElementType = {
    elementType: FormControlType,
    elementConfig: ElementConfigType,
    value: string,
    validation?: ValidationType,
    valid: boolean
};

type ElementConfigType = {
    type?: string,
    placeholder?: string,
};

type ValidationType = {
    required: boolean
};

export type Dictionary<T> = {
    [Key: string]: T;
}