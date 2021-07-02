import * as React from 'react';
import { FC } from 'react';

import * as classes from './SelectBank.module.scss';

const SelectBank: FC = () => (
    <p className={classes.SelectBank}>
        Please select a Bank!
    </p>
);

export default SelectBank;