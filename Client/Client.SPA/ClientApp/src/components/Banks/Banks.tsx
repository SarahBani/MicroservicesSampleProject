import * as React from 'react';
import { FC, useMemo } from 'react';
import { useParams } from 'react-router';

import PageTitle from '../UI/PageTitle/PageTitle';
import BankDetail from './BankDetail/BankDetail';
import BankEdit from './BankEdit/BankEdit';
import BankList from './BankList/BankList';
import BankNew from './BankNew/BankNew';
import SelectBank from './SelectBank/SelectBank';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

interface Props {
    add: boolean
}

//const Banks: FC<{ add?: boolean }> = ({ add }) => {
const Banks: FC<Props> = ({ add }) => {

    const { id, action } = useParams<{ id: string, action: string }>();

    const detailContent = useMemo(() => {
        if (action) {
            if (action.toLowerCase() === 'edit') {
                return <BankEdit id={parseInt(id)} />;
            }
            else {
                return <BankDetail id={parseInt(id)} />;
            }
        }
        else if (id) {
            return <BankDetail id={parseInt(id)} />;
        }
        else if (add) {
            return <BankNew />;
        }
        else {
            return <SelectBank />;
        }
    }, [id, action, add]);

    return (
        <div className="container">
            <PageTitle title="Banks" />
            <div className="row">
                <div className="col-7">
                    <BankList />
                </div>
                <div className="col-5">
                    {detailContent}
                </div>
            </div>
        </div>
    );
};

export default withErrorHandler(Banks);