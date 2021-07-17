import * as React  from 'react';
import { FC } from 'react';

import * as classes from './NoBank.module.scss';

const NoBank: FC = () => (
    <p className={classes.NoBank}>
        There is no bank!
    </p>
);

export default NoBank;