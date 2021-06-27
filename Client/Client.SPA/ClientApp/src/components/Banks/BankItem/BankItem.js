"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var BankItem_module_scss_1 = require("./BankItem.module.scss");
var BankItem = function (_a) {
    var bank = _a.bank;
    var _b = react_1.useState('images/no-image.png'), imageUrl = _b[0], setImageUrl = _b[1];
    return (React.createElement(react_router_dom_1.Link, { className: ["list-group-item", "clearfix", BankItem_module_scss_1.default.BankItem].join(' '), to: "/Banks/" + bank.id },
        React.createElement("img", { src: imageUrl, className: "img-response" }),
        React.createElement("strong", { className: "list-group-item-heading" }, bank.name)));
};
exports.default = BankItem;
//# sourceMappingURL=BankItem.js.map