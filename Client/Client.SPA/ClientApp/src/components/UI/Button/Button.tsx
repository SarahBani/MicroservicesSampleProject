import * as React from 'react';
import { FC, MouseEventHandler, ReactNode } from 'react';

import * as classes from './Button.module.scss';
import { ButtonTypeEnum } from '../../../shared/enums';

interface OwnProps {
    type: ButtonTypeEnum,
    disabled?: boolean,
    clicked?: MouseEventHandler
};

type Props = OwnProps & { children?: ReactNode };

const button: FC<Props> = props => {
    let buttonTypeClass: string = (classes as any)[ButtonTypeEnum[props.type]];
    return <button className={[classes.Button, buttonTypeClass].join(' ')}
        onClick={props.clicked} disabled={props.disabled}>
        {props.children}
    </button>
};

export default button;