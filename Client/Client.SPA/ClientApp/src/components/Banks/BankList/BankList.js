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
var Pagination_1 = require("../../UI/Pagination/Pagination");
var pageCount = 10;
;
var BankList = function (_a) {
    var banks = _a.banks, banksCount = _a.banksCount, successfulOperation = _a.successfulOperation, loggedIn = _a.loggedIn, onFetchBanks = _a.onFetchBanks, onFetchBanksCount = _a.onFetchBanksCount;
    var _b = react_1.useState(1), pageNo = _b[0], setPageNo = _b[1];
    var _c = react_1.useState(1), pagesCount = _c[0], setPagesCount = _c[1];
    react_1.useEffect(function () {
        //onFetchBanks?.(pageNo, pageCount);
        onFetchBanks(pageNo, pageCount);
    }, [pageNo, pageCount, onFetchBanks]);
    react_1.useEffect(function () {
        onFetchBanksCount();
    }, [onFetchBanksCount]);
    react_1.useEffect(function () {
        setPagesCount((banksCount / pageCount) + ((banksCount % pageCount) === 0 ? 0 : 1));
    }, [banksCount]);
    react_1.useEffect(function () {
        if (successfulOperation) {
            refreshHandler();
        }
    }, [successfulOperation]);
    var refreshHandler = react_1.useCallback(function () {
        onFetchBanks(pageNo, pageCount);
        onFetchBanksCount();
    }, [onFetchBanks, onFetchBanksCount]);
    var changePageHandler = react_1.useCallback(function (no) {
        setPageNo(no);
    }, [setPageNo]);
    var bankItems = react_1.useMemo(function () {
        return banks.map(function (bank) {
            return React.createElement(BankItem_1.default, { key: bank.id, bank: bank });
        });
    }, [banks]);
    var footerContent = (banksCount > 0 &&
        React.createElement("div", { className: classes.Counter },
            React.createElement("div", null,
                React.createElement(Pagination_1.default, { pageNo: pageNo, pagesCount: pagesCount, onChange: changePageHandler })),
            React.createElement("div", { className: "float-right" },
                React.createElement("b", null, "Count: "),
                React.createElement("span", null, banksCount))));
    var listContent = ((banks.length > 0 && banksCount > 0) ?
        React.createElement("div", { className: "list-group" })
        : React.createElement(NoBank_1.default, null));
    return (React.createElement("div", { className: classes.BankList },
        listContent,
        React.createElement("div", null,
            loggedIn && React.createElement(react_router_dom_1.Link, { className: "btn btn-primary", to: "/Banks/new" }, "Add"),
            React.createElement("button", { className: "btn btn-success", onClick: refreshHandler }, "Refresh"))));
};
var mapStateToProps = function (state) {
    return {
        banks: state.bank.banks,
        banksCount: state.bank.count,
        successfulOperation: state.common.successfulOperation,
        loggedIn: state.auth.loggedIn
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onFetchBanks: function (pageNo, pageCount) { return dispatch(actions.fetchBanks(pageNo, pageCount)); },
        onFetchBanksCount: function () { return dispatch(actions.fetchBanksCount()); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BankList);
//# sourceMappingURL=BankList.js.map