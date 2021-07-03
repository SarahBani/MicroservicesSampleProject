﻿import { ElementConfigTypeEnum, ElementTypeEnum } from "./enums";

export type FormControlElement = {
    id: string,
    content: FormControlElementContent
};

export type FormControlElementContent = {
    elementType: ElementTypeEnum,
    elementConfig: ElementConfig,
    value: string | number,
    autoComplete?: boolean;
    disabled?: boolean,
    readonly?: boolean,
    validation?: Validation,
    valid: boolean,
    touched?: boolean
};

export type ElementConfig = {
    type?: ElementConfigTypeEnum,
    placeholder?: string,
    options?: ElementConfigOption[]
};

type ElementConfigOption = {
    value: string,
    text: string
};

export type Validation = {
    required?: boolean,
    email?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: string | number,
    max?: string | number,
    pattern?: string
};

export type Dictionary<T> = {
    [Key: string]: T;
};