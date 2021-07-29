"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var classes = require("./BankItem.module.scss");
var Constants = require("../../../shared/constants");
var BankItem = function (_a) {
    var bank = _a.bank;
    var imageUrl = (bank.logoUrl ? Constants.FILE_MANAGER_URL + "/Resources/Images/Banks/" + bank.logoUrl : 'images/no-image.png');
    return (React.createElement(react_router_dom_1.Link, { className: ["list-group-item", "clearfix", classes.BankItem].join(' '), to: "/Banks/" + bank.id },
        React.createElement("img", { src: imageUrl, className: "img-response" }),
        React.createElement("strong", { className: "list-group-item-heading" }, bank.name)));
};
exports.default = BankItem;
//# sourceMappingURL=BankItem.js.map