import * as React from 'react';
import { Fragment } from 'react';
import { Container } from 'reactstrap';

import NavMenu from '../../components/UI/NavMenu/NavMenu';

export default (props: { children?: React.ReactNode }) => (
    <Fragment>
        <NavMenu/>
        <Container>
            {props.children}
        </Container>
    </Fragment>
);
