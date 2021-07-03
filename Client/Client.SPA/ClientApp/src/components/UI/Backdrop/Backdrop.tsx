import * as React from 'react';
import { FC, MouseEventHandler } from 'react';

import * as classes from './Backdrop.module.scss';
import { ModalTypeEnum } from '../../../shared/enums';

interface Props {
    isShown: boolean,
    type?: ModalTypeEnum,
    clicked: MouseEventHandler
}

const Backdrop: FC<Props> = ({ children, isShown, type, clicked }) => (
    isShown ?
    <div onClick={clicked}
        className={[classes.Backdrop, type === ModalTypeEnum.COMPONENT ? '' : classes.Popup].join(' ')}>
        {children}
    </div>
    : null
);

export default Backdrop;