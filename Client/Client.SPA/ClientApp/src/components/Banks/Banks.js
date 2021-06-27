"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PageTitle_1 = require("../UI/PageTitle/PageTitle");
var BankList_1 = require("./BankList/BankList");
var Banks = function () {
    return (React.createElement("div", { className: "container" },
        React.createElement(PageTitle_1.default, { title: "Banks" }),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-7" },
                React.createElement(BankList_1.default, null)),
            React.createElement("div", { className: "col-5" }))));
};
//const Banks2: FC<{ title: string }> = ({ title }) => <div>sdfsdf</div>;
exports.default = Banks;
//# sourceMappingURL=Banks.js.map