"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_1 = require("react-router");
var PageTitle_1 = require("../UI/PageTitle/PageTitle");
var BankDetail_1 = require("./BankDetail/BankDetail");
var BankEdit_1 = require("./BankEdit/BankEdit");
var BankList_1 = require("./BankList/BankList");
var BankNew_1 = require("./BankNew/BankNew");
var SelectBank_1 = require("./SelectBank/SelectBank");
var withErrorHandler_1 = require("../../hoc/withErrorHandler/withErrorHandler");
//const Banks: FC<{ add?: boolean }> = ({ add }) => {
var Banks = function (_a) {
    var add = _a.add;
    var _b = react_router_1.useParams(), id = _b.id, action = _b.action;
    var detailContent = react_1.useMemo(function () {
        if (action) {
            if (action.toLowerCase() === 'edit') {
                return React.createElement(BankEdit_1.default, { id: parseInt(id) });
            }
            else {
                return React.createElement(BankDetail_1.default, { id: parseInt(id) });
            }
        }
        else if (id) {
            return React.createElement(BankDetail_1.default, { id: parseInt(id) });
        }
        else if (add) {
            return React.createElement(BankNew_1.default, null);
        }
        else {
            return React.createElement(SelectBank_1.default, null);
        }
    }, [id, action, add]);
    return (React.createElement("div", { className: "container" },
        React.createElement(PageTitle_1.default, { title: "Banks" }),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-7" },
                React.createElement(BankList_1.default, null)),
            React.createElement("div", { className: "col-5" }, detailContent))));
};
exports.default = withErrorHandler_1.default(Banks);
//# sourceMappingURL=Banks.js.map