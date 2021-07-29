"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var classes = require("./BankItemCard.module.scss");
var Constants = require("../../../shared/constants");
;
var BankItemCard = function (props) {
    var imageUrl = (props.bank.logoUrl ? Constants.FILE_MANAGER_URL + "/Resources/Images/Banks/" + props.bank.logoUrl : 'images/no-image.png');
    return (React.createElement("div", { className: ["card", classes.BankItemCard].join(' ') },
        React.createElement(react_router_dom_1.Link, { to: '/banks/' + props.bank.id },
            React.createElement("img", { src: imageUrl, alt: props.bank.name })),
        React.createElement("div", { className: "card-body text-center" },
            React.createElement(react_router_dom_1.Link, { to: '/banks/' + props.bank.id },
                React.createElement("strong", { className: "card-title" }, props.bank.name)))));
};
exports.default = BankItemCard;
//# sourceMappingURL=BankItemCard.js.map