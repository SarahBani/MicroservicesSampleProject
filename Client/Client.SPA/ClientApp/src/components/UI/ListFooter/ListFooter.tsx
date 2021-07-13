import * as React from 'react';
import { memo, FC } from 'react';

import * as classes from './ListFooter.module.scss';
import Pagination from '../Pagination/Pagination';

interface Props {
    listCount?: number,
    pageNo: number,
    pagesCount: number,
    onChangePage: (pageIndex: number) => void
};

const ListFooter: FC<Props> = memo(props => (
    props.listCount! > 0 ?
        <div className={classes.ListFooter}>
            <div>
                <Pagination pageNo={props.pageNo} pagesCount={props.pagesCount}
                    onChange={props.onChangePage} />
            </div>
            <div>
                <b>Count:</b><span>{props.listCount}</span>
            </div>
        </div>
        : null
));

export default ListFooter;