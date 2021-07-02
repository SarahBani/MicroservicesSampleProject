import * as React from 'react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import * as classes from './Layout.module.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import Footer from '../../components/UI/Footer/Footer';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import { AppState } from '../../store';
import Spinner from '../../components/UI/Spinner/Spinner';

interface StoreProps {
    loading: boolean
};

export default (props: { children?: React.ReactNode }) => {

    const { loading }: StoreProps = useSelector((state: AppState) => ({
        loading: state.common.isLoading
    }));

    const [isSideDrawerVisible, setIsSideDrawerVisible] = useState<boolean>(false);
    const toggleSideDrawerHandler = () => {
        setIsSideDrawerVisible(prevIsSideDrawerVisible => !prevIsSideDrawerVisible);
    };

    return (
        <div className={classes.Layout}>
            <Toolbar drawerToggleClicked={() => toggleSideDrawerHandler()} >
            </Toolbar>
            <SideDrawer
                isShown={isSideDrawerVisible}
                hide={() => toggleSideDrawerHandler()} />
            <main>
                {props.children}
            </main>
            <Footer />
            {loading && <Spinner />}
        </div>
    );
};
