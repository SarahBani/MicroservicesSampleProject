import * as React from 'react';
import { FC, ReactElement } from 'react';

interface PropTypes {
    pageNo?: number,
    pagesCount?: number,
    onChange?: (pageIndex: number) => void
};

const Sss: FC<PropTypes> = (props): ReactElement  => (
//const Sss: FC<PropTypes> = ({ pageNo, pagesCount }): ReactElement => (
    <p>
        fghfghfghfgh {props.pageNo}
    </p>
);

export default Sss;