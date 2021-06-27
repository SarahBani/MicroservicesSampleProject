import * as React from 'react';
import { FC } from 'react';

import * as classes from './PageTitle.module.scss';

const PageTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <div className={classes.PageTitle}>
            <h1><span>⌘</span> {title}</h1>
        </div>
    );
};

export default PageTitle;