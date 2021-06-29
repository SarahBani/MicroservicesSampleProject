import * as React from 'react';
import { FC, useMemo, useState, useCallback, useEffect, InputHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import * as classes from './BankList.module.scss';
import BankItem from '../BankItem/BankItem';
import NoBank from '../NoBank/NoBank';
import * as actions from '../../../store/actions/bankActions';
import Pagination from '../../UI/Pagination/Pagination';
import { Bank } from '../../../models/Bank.model';
import { AppDispatch, AppState } from '../../../store';

const pageCount: number = 10;

interface StateProps 
{
    banks: Bank[],
    banksCount: number,
    successfulOperation: string,
    loggedIn: boolean
};

//interface DispatchProps {
//    onSomeEvent: () => void,
//    onChange: (pageIndex: number) => void
//}

const BankList: FC = () => {

    const { banks, banksCount, successfulOperation, loggedIn }: StateProps = useSelector((state: AppState ) => ({
        banks: state.bank.banks,
        banksCount: state.bank.count,
        successfulOperation: state.common.successfulOperation,
        loggedIn: state.auth.loggedIn
    }));
    const dispatch = useDispatch();

    const [pageNo, setPageNo] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    //const rootDispatcher = new RootDispatcher(dispatch);



    useEffect(() => {
        //onFetchBanks?.(pageNo, pageCount);
        //onFetchBanks!(pageNo, pageCount)
        dispatch(actions.fetchBanks(pageNo, pageCount));
    }, [pageNo, pageCount]);

    useEffect(() => {
        dispatch(actions.fetchBanksCount());
    }, []);

    useEffect(() => {
        setPagesCount((banksCount! / pageCount) + ((banksCount! % pageCount) === 0 ? 0 : 1));
    }, [banksCount]);

    useEffect(() => {
        if (successfulOperation) {
            refreshHandler();
        }
    }, [successfulOperation]);

    const refreshHandler = useCallback(() => {
        dispatch(actions.fetchBanks(pageNo, pageCount));
        dispatch(actions.fetchBanksCount());
    }, []);

    const changePageHandler = useCallback((no) => {
        setPageNo(no);
    }, [setPageNo]);

    const bankItems = useMemo(() => {
        return banks.map((bank: Bank) =>
            <BankItem key={bank.id} bank={bank} />
        );
    }, [banks]);

    const footerContent = (
        banksCount! > 0 &&
        <div className={classes.Counter}>
            <div>
                <Pagination pageNo={pageNo} pagesCount={pagesCount}
                    onChange={changePageHandler} />
            </div>
            <div className="float-right">
                <b>Count: </b><span>{banksCount}</span>
            </div>
        </div>
    );

    const listContent = (
        (banks!.length > 0 && banksCount! > 0) ?
            <div className="list-group">
                {bankItems}
                {/*footerContent */}
            </div>
            : <NoBank />
    );

    return (
        <div className={classes.BankList}>
            {listContent}
            <div>
                {loggedIn && <Link className="btn btn-primary" to="/Banks/new">Add</Link>}
                <button className="btn btn-success" onClick={refreshHandler}>Refresh</button>
            </div>
        </div>
    );
};

//const mapStateToProps = (state: AppState) => {
//    return {
//        banks: state.bank.banks,
//        banksCount: state.bank.count,
//        successfulOperation: state.common.successfulOperation,
//        loggedIn: state.auth.loggedIn
//    };
//};

//const mapDispatchToProps = (dispatch: AppDispatch) => {
//    return {
//        onFetchBanks: (pageNo: number, pageCount: number) => dispatch(actions.fetchBanks(pageNo, pageCount)),
//        onFetchBanksCount: () => dispatch(actions.fetchBanksCount()),
//    };
//};

//export default connect(mapStateToProps, mapDispatchToProps)(BankList);
export default BankList;