import * as React from 'react';
import { FC, Fragment, memo, MouseEventHandler, ReactElement, ReactNode, useEffect, useReducer } from 'react';

import * as classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import { ModalType } from '../../../shared/enums';

type ModalState = {
    typeClass?: string | null,
    title?: string | null,
    icon?: ReactElement | null
};

const initialModalState: ModalState = {
    typeClass: null,
    title: null,
    icon: null
};

type ModalAction = { type: ModalType };

const modalReducer = (currentState: ModalState, action: ModalAction): ModalState => {
    switch (action.type) {
        case ModalType.INFO:
            return {
                ...currentState,
                typeClass: classes.Info,
                title: null,
                icon: <span className="fa fa-info" ></span>
            };
        case ModalType.QUESTION:
            return {
                ...currentState,
                typeClass: classes.Question,
                title: null,
                icon: <span className="fa fa-question" ></span>
            };
        case ModalType.WARNING:
            return {
                ...currentState,
                typeClass: classes.Warning,
                title: 'Warning',
                icon: <span className="fa fa-warning" ></span>
            };
        case ModalType.ERROR:
            return {
                ...currentState,
                typeClass: classes.Error,
                title: 'Error',
                icon: <span className="fa fa-warning" ></span>
            };
        case ModalType.COMPONENT:
            return {
                ...currentState,
                typeClass: classes.Component,
                title: null,
                icon: null,
            };
        default:
            return {
                ...currentState,
                typeClass: classes.Component,
                title: null,
                icon: null,
            };
    }
};

interface OwnProps {
    type: ModalType,
    isShown: boolean,
    hide?: MouseEventHandler
};

type Props = OwnProps & { children: ReactNode };

const Modal: FC<Props> = ({ children, type, isShown, hide }) => {

    const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

    useEffect(() => {
        dispatch({ type: type });
    }, [type]);

    return (
        <Fragment>
            <Backdrop isShown={isShown} clicked={() => hide} type={type}>
            </Backdrop>
            <div className={[classes.Modal, modalState.typeClass].join(' ')}
                style=
                {{
                    transform: isShown ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: isShown ? '1' : '0'
                }}>
                {modalState.icon}
                {children}
            </div>
        </Fragment>
    );
};

export default memo(Modal, (prevProps, nextProps) =>
    (prevProps.isShown === nextProps.isShown && prevProps.children === nextProps.children)
);
