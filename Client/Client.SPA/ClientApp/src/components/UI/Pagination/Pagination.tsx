import * as React from 'react';
import { useMemo, Fragment, memo, FC } from 'react';

import * as classes from './Pagination.module.scss';

interface Props {
    pageNo: number,
    pagesCount: number,
    onChange: (pageIndex: number) => void
};

const Pagination: FC<Props> = memo(({ pageNo, pagesCount, onChange }) => {

    let prevPages = useMemo(() => {
        if (pageNo > 1) {
            return (
                <Fragment>
                    <li onClick={() => onChange(pageNo - 1)}>
                        &laquo;
                    </li>
                    {
                        (pageNo === pagesCount && pageNo > 2) &&
                        <li onClick={() => onChange(pageNo - 2)}>
                            {pageNo - 2}
                        </li>
                    }
                    <li onClick={() => onChange(pageNo - 1)}>
                        {pageNo - 1}
                    </li>
                </Fragment>
            );
        }
    }, [pageNo]);

    const currentPage = useMemo(() => (
        <li className={classes.ActiveLink}>
            {pageNo}
        </li>
    ), [pageNo]);

    let nextPages = useMemo(() => {
        if (pageNo < pagesCount) {
            return (
                <Fragment>
                    <li onClick={() => onChange(pageNo + 1)}>
                        {pageNo + 1}
                    </li>
                    {
                        (pageNo === 1 && pageNo + 1 < pagesCount) &&
                        <li onClick={() => onChange(pageNo + 2)}>
                            {pageNo + 2}
                        </li>
                    }
                    <li onClick={() => onChange(pageNo + 1)}>
                        &raquo;
                    </li>
                </Fragment>
            );
        }
    }, [pageNo, pagesCount]);

    return (
        <ul className={[classes.Pagination, "pagination"].join(' ')}>
            {prevPages}
            {currentPage}
            {nextPages}
        </ul>
    );
});

export default Pagination;