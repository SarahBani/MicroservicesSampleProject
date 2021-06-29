import * as React from 'react';
import { FC, ReactElement } from 'react';

interface Props {
    pageNo?: number,
    pagesCount?: number,
    onChange?: (pageIndex: number) => void
};

//type Props = React.InputHTMLAttributes<HTMLInputElement> & {
//    pageNo?: number,
//    pagesCount?: number,
//    onTextChange?: (text: string) => void;
//};


export interface OwnProps {
    propFromParent: number
}

//interface StateProps {
//    propFromReduxStore: string,
//    pageNo: number,
//    pagesCount: number
//}

//interface DispatchProps {
//    onSomeEvent: () => void,
//    onChange: (pageIndex: number) => void
//}

//interface State {
//    internalComponentStateField: string
//}


//type Props = StateProps & DispatchProps & OwnProps

//const Sss: FC<Props> = ({ pageNo, pagesCount }): ReactElement => (
//const Sss: FC<{ props?: Props }> = ({ props }): ReactElement => (
//const Sss: FC<Props> = (props: Props): ReactElement => (
const Sss: FC<Props> = (props): ReactElement => (
    <p>
        fghfghfghfgh {props?.pageNo}
    </p>
);

export default Sss;