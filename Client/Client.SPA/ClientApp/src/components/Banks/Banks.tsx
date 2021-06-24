import * as React from 'react';
import { FC, useMemo } from 'react';

import PageTitle from '../UI/PageTitle/PageTitle';
import BankList from './BankList/BankList';

const Banks: FC = () => {
    return (
        <div className="container">
            <PageTitle title="Hotels" />
            <div className="row">
                <div className="col-7">
                    <BankList />
                </div>
                <div className="col-5">
                    {/*{detailContent}*/}
                </div>
            </div>
        </div>
    );
};

//const Banks2: FC<{ title: string }> = ({ title }) => <div>sdfsdf</div>;

export default Banks;