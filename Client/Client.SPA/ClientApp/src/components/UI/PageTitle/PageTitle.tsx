import * as React from 'react';
import { FC } from 'react';

const PageTitle: FC<{ title: string }> = ({ title }) => {
    console.log(222222222222);
    return (
        <div>
            <h1><span>⌘</span> {title}</h1>
        </div>
    );
};

export default PageTitle;