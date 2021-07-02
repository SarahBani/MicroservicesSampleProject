import * as React from 'react';
import { FC } from 'react';

import siteLogo from '../../../assets/img/logo.png';
import * as classes from './Logo.module.scss';

interface Props {
    height?: number
};

const Logo: FC<Props> = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={siteLogo} alt="Logo" />
    </div>
);

export default Logo;