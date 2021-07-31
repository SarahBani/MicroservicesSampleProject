"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_1 = require("react-router");
var react_redux_1 = require("react-redux");
var classes = require("./BankDetail.module.scss");
var ConfirmDelete_1 = require("../../UI/ConfirmDelete/ConfirmDelete");
var enums_1 = require("../../../shared/enums");
var actions = require("../../../store/actions/bankActions");
var Modal_1 = require("../../UI/Modal/Modal");
var Constants = require("../../../shared/constants");
;
var BankDetail = react_1.memo(function (_a) {
    var id = _a.id;
    var _b = react_redux_1.useSelector(function (state) { return ({
        bank: state.bank.selectedBank,
        successfulOperation: state.common.successfulOperation,
        failedOperation: state.common.failedOperation,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        error: state.common.error
    }); }), bank = _b.bank, successfulOperation = _b.successfulOperation, failedOperation = _b.failedOperation, loggedIn = _b.loggedIn, token = _b.token;
    var dispatch = react_redux_1.useDispatch();
    var action = react_router_1.useParams().action;
    var history = react_router_1.useHistory();
    var _c = react_1.useState(), redirect = _c[0], setRedirect = _c[1];
    var _d = react_1.useState(false), isDeleteConfirmShown = _d[0], setShowDeleteConfirm = _d[1];
    react_1.useEffect(function () {
        dispatch(actions.fetchBank(id));
    }, [id]);
    var logo = react_1.useMemo(function () {
        var fileManagerUrl = Constants.FILE_MANAGER_URL;
        var logoSrc = ((bank === null || bank === void 0 ? void 0 : bank.logoUrl) ? fileManagerUrl + "/Resources/Images/Banks/" + bank.logoUrl : 'images/no-image.png');
        return React.createElement("img", { className: "img-response", src: logoSrc });
    }, [bank]);
    react_1.useEffect(function () {
        if (!!failedOperation && failedOperation === enums_1.FailedOperationEnum.FetchBank) {
            cancelHandler();
        }
    }, [failedOperation]);
    react_1.useEffect(function () {
        if (!action && successfulOperation === enums_1.SuccessfulOperationEnum.Delete) {
            cancelHandler();
        }
    }, [successfulOperation]);
    var cancelHandler = react_1.useCallback(function () {
        dispatch(actions.clearSelectedBank());
        setRedirect(React.createElement(react_router_1.Redirect, { to: "/Banks" }));
    }, [setRedirect]);
    var editHandler = react_1.useCallback(function () {
        history.push("/Banks/" + id + "/edit");
    }, [id, history]);
    var deleteConfirmContent = react_1.useMemo(function () {
        return (React.createElement(Modal_1.default, { isShown: isDeleteConfirmShown, type: enums_1.ModalTypeEnum.Component },
            React.createElement(ConfirmDelete_1.default, { onOK: function () { return confirmDeleteHandler(true); }, onCancel: function () { return confirmDeleteHandler(false); } })));
    }, [isDeleteConfirmShown]);
    var deleteHandler = react_1.useCallback(function () {
        setShowDeleteConfirm(true);
    }, [setShowDeleteConfirm]);
    var confirmDeleteHandler = react_1.useCallback(function (isConfirmed) {
        if (isConfirmed) {
            dispatch(actions.deleteBank(id, token));
        }
        setShowDeleteConfirm(false);
    }, [id, token, setShowDeleteConfirm]);
    return (React.createElement("div", { className: classes.BankDetail },
        redirect,
        deleteConfirmContent,
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12" }, logo)),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12" },
                React.createElement("h4", null, bank === null || bank === void 0 ? void 0 : bank.name))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12" },
                React.createElement("div", { className: "btn-group" },
                    React.createElement("button", { className: "btn btn-primary", onClick: cancelHandler }, "Back"),
                    React.createElement("button", { className: "btn btn-primary dropdown-toggle", type: "button", "data-bs-toggle": "dropdown", disabled: !loggedIn }, "Manage"),
                    React.createElement("ul", { className: "dropdown-menu" }, !!loggedIn && (React.createElement(react_1.Fragment, null,
                        React.createElement("a", { className: "dropdown-item", onClick: editHandler }, "Edit"),
                        React.createElement("a", { className: "dropdown-item", onClick: deleteHandler }, "Delete")))))))));
});
exports.default = BankDetail;
//# sourceMappingURL=BankDetail.js.map