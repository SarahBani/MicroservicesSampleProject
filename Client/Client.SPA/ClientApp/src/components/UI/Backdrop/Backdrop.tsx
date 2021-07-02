import * as React from 'react';
import { FC, MouseEventHandler } from 'react';

import * as classes from './Backdrop.module.scss';
import { ModalType } from '../../../shared/enums';

interface Props {
    isShown: boolean,
    type?: ModalType,
    clicked: MouseEventHandler
}

const Backdrop: FC<Props> = ({ children, isShown, type, clicked }) => (
    isShown ?
    <div onClick={clicked}
        className={[classes.Backdrop, type === ModalType.COMPONENT ? '' : classes.Popup].join(' ')}>
        {children}
    </div>
    : null
);

export default Backdrop;