import * as React from 'react';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

import * as classes from './FormControl.module.scss';
import DropDown, { DropDownItem } from '../../DropDown/DropDown';
import { FormControlType } from '../../../../shared/enums';

interface Props {
    type: FormControlType,
    id?: string,
    label?: string,
    title?: string,
    value: string,
    autoComplete: boolean,
    disabled: boolean,
    valid: boolean,
    touched: boolean,
    elementConfig: any,
    options: DropDownItem[],
    onChange: ChangeEventHandler<Element>,
    onSelect: (id: string) => void,
    onLostFocus: FocusEventHandler<Element>
};

const FormControl: FC<Props> = props => {

    let formElement = null;
    const controlClasses = [classes.FormElement];

    let validationError = null;
    if (!props.valid && props.touched) {
        controlClasses.push(classes.Invalid);
        validationError = (
            <p className={classes.ValidationError}>
                Please enter a valid {props.label ? props.label : 'value'}!
            </p>);
    }

    switch (props.type) {
        case FormControlType.TextArea:
            formElement = <textarea
                {...props.elementConfig}
                value={props.value}
                className={controlClasses.join(' ')}
                onChange={props.onChange}
                onBlur={props.onLostFocus}
                disabled={props.disabled} />;
            break;
        case FormControlType.Select:
            formElement =
                <select
                    name={props.id}
                    className={controlClasses.join(' ')}
                    title={props.value}
                    onChange={props.onChange}
                    onBlur={props.onLostFocus}
                    disabled={props.disabled}>
                    {props.elementConfig?.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>;
            break;
        case FormControlType.DropDown:
            formElement =
                <DropDown
                    {...props.elementConfig}
                    name={props.id}
                    className={controlClasses.join(' ')}
                    data={props.options}
                    value={props.value}
                    title={props.title}
                    disabled={props.disabled}
                    onSelect={props.onSelect}
                    onBlur={props.onLostFocus} />;
            break;
        case FormControlType.Input:
        default:
            formElement = <input
                {...props.elementConfig}
                name={props.id}
                value={props.value}
                className={controlClasses.join(' ')}
                onChange={props.onChange}
                onBlur={props.onLostFocus}
                disabled={props.disabled}
                autoComplete={props.autoComplete} />;
    }

    return (
        <div className={classes.FormControl}>
            {props.label && <label>{props.label}</label>}
            {formElement}
            {validationError}
        </div>
    );
};

export default FormControl;