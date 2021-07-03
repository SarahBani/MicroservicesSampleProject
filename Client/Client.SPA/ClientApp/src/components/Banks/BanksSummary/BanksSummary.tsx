import * as React from 'react';
import { useMemo, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as classes from './BanksSummary.module.scss';
import BankItemCard from '../BankItemCard/BankItemCard';
import * as actions from '../../../store/actions/bankActions';
import { Bank } from '../../../models/Bank.model';
import { AppState } from '../../../store';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../../shared/crud-axios-instance';

interface StoreProps {
    banks: Bank[]
};

const BanksSummary: FC = () => {

    const { banks }: StoreProps = useSelector((state: AppState) => ({
        banks: state.bank.banks
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchBanks(1, 6))
    }, []);

    const bankItemCards = useMemo(() => banks?.map(bank =>
        <BankItemCard key={bank.id} bank={bank} />)
        , [banks]);

    return (
        <div className={["card-deck", classes.BanksSummary].join(' ')}>
            {bankItemCards}
        </div>
    );
};

export default withErrorHandler(BanksSummary, axiosInstance);