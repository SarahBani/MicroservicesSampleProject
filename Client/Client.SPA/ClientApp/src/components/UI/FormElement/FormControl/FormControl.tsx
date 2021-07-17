import * as React from 'react';
import { ChangeEventHandler, FC, FocusEventHandler, ReactElement } from 'react';

import * as classes from './FormControl.module.scss';
import DropDown from '../../DropDown/DropDown';
import { ElementTypeEnum } from '../../../../shared/enums';
import { DropDownItem, ElementConfig } from '../../../../shared/types';
import { ElementConfigTypeEnum } from '../../../../shared/enums';

interface Props {
    type: ElementTypeEnum,
    id?: string,
    label?: string,
    title?: string,
    value: string | number,
    options?: DropDownItem[],
    autoComplete?: boolean,
    disabled?: boolean,
    valid: boolean,
    touched?: boolean,
    elementConfig?: ElementConfig,
    onChange: ChangeEventHandler<Element>,
    onSelect: (id: string) => void,
    onLostFocus: FocusEventHandler<Element>
};

const FormControl: FC<Props> = props => {

    let formElement: ReactElement;
    const controlClasses: string[] = [classes.FormElement];

    let validationError: ReactElement | null = null;
    if (!props.valid && props.touched) {
        controlClasses.push(classes.Invalid);
        validationError = (
            <p className={classes.ValidationError}>
                Please enter a valid {props.label ? props.label : 'value'}!
            </p>);
    }

    switch (props.type) {
        case ElementTypeEnum.TextArea:
            formElement =
                <textarea
                    {...props.elementConfig}
                    value={props.value}
                    className={controlClasses.join(' ')}
                    onChange={props.onChange}
                    onBlur={props.onLostFocus}
                    disabled={props.disabled} />;
            break;
        case ElementTypeEnum.Select:
            formElement =
                <select
                    name={props.id}
                    className={controlClasses.join(' ')}
                    title={props.title}
                    value={props.value.toString()}
                    onChange={props.onChange}
                    onBlur={props.onLostFocus}
                    disabled={props.disabled}>
                    {props.elementConfig?.options?.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>;
            break;
        case ElementTypeEnum.DropDown:
            formElement =
                <DropDown
                    {...props.elementConfig}
                    id={props.id}
                    className={controlClasses.join(' ')}
                    data={props.options!}
                    value={props.value.toString()}
                    title={props.title}
                    disabled={props.disabled}
                    onSelect={props.onSelect}
                    onBlur={props.onLostFocus} />;
            break;
        case ElementTypeEnum.Input:
        default:
            //let patternConfig: { pattern: string } | undefined;
            //if (props.elementConfig!.type === ElementConfigTypeEnum.Number &&
            //    props.elementConfig!.maxLength &&
            //    !props.elementConfig!.pattern) {
            //    props.elementConfig!.type = ElementConfigTypeEnum.Text;
            //    patternConfig = { pattern: "\\d".repeat(props.elementConfig!.maxLength!) };
            //}
            let keyPressHandler: { onKeyPress: any } | undefined;
            if (props.elementConfig!.type === ElementConfigTypeEnum.Number &&
                props.elementConfig!.maxLength) {
                keyPressHandler = {
                    onKeyPress: numberInputHandler
                };
            }
            const inputType: string = ElementConfigTypeEnum[props.elementConfig!.type!]?.toLowerCase();
            formElement =
                <input
                    {...props.elementConfig}
                    type={inputType}
                    name={props.id}
                    value={props.value}
                    className={controlClasses.join(' ')}
                    onChange={props.onChange}
                    onBlur={props.onLostFocus}
                    disabled={props.disabled}
                    autoComplete={props.autoComplete ? 'on' : undefined}
                    {...keyPressHandler}
                />;
    }

    return (
        <div className={classes.FormControl}>
            {props.label && <label>{props.label}</label>}
            {formElement}
            {validationError}
        </div>
    );
};

const numberInputHandler = (e: KeyboardEvent): void => {
    const { value, maxLength } = e.target as HTMLInputElement;
    if (String(value).length >= maxLength) {
        e.preventDefault();
    }
};

export default FormControl;