import * as React from 'react';
import { FC, MouseEventHandler, ReactNode } from 'react';

import * as classes from './Backdrop.module.scss';
import { ModalTypeEnum } from '../../../shared/enums';

interface OwnProps {
    isShown: boolean,
    type?: ModalTypeEnum,
    onClick: MouseEventHandler
}

type Props = OwnProps & { children?: ReactNode };

const Backdrop: FC<Props> = (props) => (
    props.isShown ?
        <div onClick={props.onClick}
            className={[classes.Backdrop, props.type === ModalTypeEnum.Component ? '' : classes.Popup].join(' ')}>
            {props.children}
        </div>
        : null
);

export default Backdrop;