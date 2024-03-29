﻿import * as React from 'react';
import { ChangeEvent, FC, FocusEvent } from 'react';

import FormControl from './FormControl/FormControl';
import { FormControlElement } from '../../../shared/types';

interface Props {
    formElement: FormControlElement,
    onChange?: (event: ChangeEvent, id: string) => void,
    onSelect?: (id: string) => void,
    //onLostFocus?: (event: SyntheticEvent<EventTarget>, id: number) => void//FocusEventHandler<Element>,
    onLostFocus?: (event: FocusEvent<Element>, id: string) => void
};

const FormElement: FC<Props> = ({ formElement, onChange, onSelect, onLostFocus }) => (
    <FormControl
        type={formElement.content.elementType}
        elementConfig={formElement.content.elementConfig}
        value={formElement.content.value}
        options={formElement.content.options}
        disabled={formElement.content.disabled}
        autoComplete={formElement.content.autoComplete}
        touched={formElement.content.touched}
        valid={formElement.content.valid}
        //onChange={(event: FormEvent<EventTarget>) => onChange(event, formElement.id)}
        onChange={(event: ChangeEvent) => onChange?.(event, formElement.id)}
        onSelect={(id: string) => onSelect?.(id)}
        //onLostFocus={(event: FormEvent<EventTarget>) => onLostFocus(event, formElement.id)}
        onLostFocus={(event: FocusEvent<Element>) => onLostFocus?.(event, formElement.id)}
    />
);

export default FormElement;