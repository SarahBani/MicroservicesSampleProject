"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var classes = require("./BanksSummary.module.scss");
var BankItemCard_1 = require("../BankItemCard/BankItemCard");
var actions = require("../../../store/actions/bankActions");
var withErrorHandler_1 = require("../../../hoc/withErrorHandler/withErrorHandler");
var crud_axios_instance_1 = require("../../../shared/crud-axios-instance");
;
var BanksSummary = function () {
    var banks = react_redux_1.useSelector(function (state) { return ({
        banks: state.bank.banks
    }); }).banks;
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(actions.fetchBanks(1, 6));
    }, []);
    var bankItemCards = react_1.useMemo(function () { return banks === null || banks === void 0 ? void 0 : banks.map(function (bank) {
        return React.createElement(BankItemCard_1.default, { key: bank.id, bank: bank });
    }); }, [banks]);
    return (React.createElement("div", { className: ["card-deck", classes.BanksSummary].join(' ') }, bankItemCards));
};
exports.default = withErrorHandler_1.default(BanksSummary, crud_axios_instance_1.default);
//# sourceMappingURL=BanksSummary.js.map