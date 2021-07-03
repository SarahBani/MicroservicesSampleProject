import * as React from 'react';
import { FC, MouseEventHandler } from 'react';
import { ButtonTypeEnum } from '../../../shared/enums';

import * as classes from './Button.module.scss';

interface Props {
    type: ButtonTypeEnum,
    disabled?: boolean,
    clicked?: MouseEventHandler
};

const button: FC<Props> = props => {
    let buttonTypeClass: string = (classes as any)[ButtonTypeEnum[props.type]];
    return <button className={[classes.Button, buttonTypeClass].join(' ')}
        onClick={props.clicked} disabled={props.disabled}>
        {props.children}
    </button>
};

export default button;