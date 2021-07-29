import * as React from 'react';
import { useMemo, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as classes from './BanksSummary.module.scss';
import BankItemCard from '../BankItemCard/BankItemCard';
import * as actions from '../../../store/actions/bankActions';
import { Bank } from '../../../models/Bank.model';
import { AppState } from '../../../store';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

interface StoreProps {
    banks: Bank[]
};

const pageCount: number = 6;

const BanksSummary: FC = () => {

    const { banks }: StoreProps = useSelector((state: AppState) => ({
        banks: state.bank.banks
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchBanks(null, null, 1, pageCount));
    }, []);

    const bankItemCards = useMemo(() => (
        banks?.map(bank => <BankItemCard key={bank.id} bank={bank} />)
    ), [banks]);

    return (
        <div className={["card-deck", classes.BanksSummary].join(' ')}>
            {bankItemCards}
        </div>
    );
};

export default withErrorHandler(BanksSummary);