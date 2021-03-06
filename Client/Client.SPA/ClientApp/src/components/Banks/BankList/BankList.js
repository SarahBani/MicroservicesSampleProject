"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var classes = require("./BankList.module.scss");
var BankItem_1 = require("../BankItem/BankItem");
var NoBank_1 = require("../NoBank/NoBank");
var actions = require("../../../store/actions/bankActions");
var ListFooter_1 = require("../../UI/ListFooter/ListFooter");
var pageCount = 10;
;
//interface DispatchProps {
//    onSomeEvent: () => void,
//    onChange: (pageIndex: number) => void
//}
var BankList = function () {
    var _a = react_redux_1.useSelector(function (state) { return ({
        banks: state.bank.banks,
        banksCount: state.bank.count,
        successfulOperation: state.common.successfulOperation,
        loggedIn: state.auth.loggedIn
    }); }), banks = _a.banks, banksCount = _a.banksCount, successfulOperation = _a.successfulOperation, loggedIn = _a.loggedIn;
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState(1), pageNo = _b[0], setPageNo = _b[1];
    var _c = react_1.useState(0), pagesCount = _c[0], setPagesCount = _c[1];
    react_1.useEffect(function () {
        dispatch(actions.fetchBanks(null, null, pageNo, pageCount));
    }, [pageNo, pageCount]);
    react_1.useEffect(function () {
        dispatch(actions.fetchBanksCount());
    }, []);
    react_1.useEffect(function () {
        setPagesCount(Math.ceil(banksCount / pageCount));
    }, [banksCount]);
    react_1.useEffect(function () {
        if (!!successfulOperation) {
            refreshHandler();
        }
    }, [successfulOperation]);
    var refreshHandler = react_1.useCallback(function () {
        dispatch(actions.fetchBanks(null, null, pageNo, pageCount));
        dispatch(actions.fetchBanksCount());
        setPageNo(1);
    }, []);
    var changePageHandler = react_1.useCallback(function (no) {
        setPageNo(no);
    }, [setPageNo]);
    var bankItems = react_1.useMemo(function () {
        return banks === null || banks === void 0 ? void 0 : banks.map(function (bank) {
            return React.createElement(BankItem_1.default, { key: bank.id, bank: bank });
        });
    }, [banks]);
    var footerContent = react_1.useMemo(function () { return (React.createElement(ListFooter_1.default, { listCount: banksCount, pageNo: pageNo, pagesCount: pagesCount, onChangePage: changePageHandler })); }, [banksCount, pageNo, pagesCount, changePageHandler]);
    var listContent = (((banks === null || banks === void 0 ? void 0 : banks.length) > 0 && banksCount > 0) ?
        React.createElement("div", { className: "list-group" },
            bankItems,
            footerContent)
        : React.createElement(NoBank_1.default, null));
    return (React.createElement("div", { className: classes.BankList },
        listContent,
        React.createElement("div", null,
            loggedIn && React.createElement(react_router_dom_1.Link, { className: "btn btn-primary", to: "/Banks/new" }, "Add"),
            React.createElement("button", { className: "btn btn-success", onClick: refreshHandler }, "Refresh"))));
};
exports.default = BankList;
//# sourceMappingURL=BankList.js.map