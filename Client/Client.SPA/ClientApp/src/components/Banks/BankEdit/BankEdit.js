"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var utility_1 = require("../../../shared/utility");
var FormElement_1 = require("../../UI/FormElement/FormElement");
var ConfirmDelete_1 = require("../../UI/ConfirmDelete/ConfirmDelete");
var Modal_1 = require("../../UI/Modal/Modal");
var enums_1 = require("../../../shared/enums");
var actions = require("../../../store/actions/bankActions");
var authActions = require("../../../store/actions/authActions");
;
var initialFormState = {
    name: {
        elementType: enums_1.ElementTypeEnum.Input,
        elementConfig: {
            type: enums_1.ElementConfigTypeEnum.Text,
            placeholder: 'Name',
        },
        value: '',
        validation: {
            required: true
        },
        valid: false
    },
    grade: {
        elementType: enums_1.ElementTypeEnum.Input,
        elementConfig: {
            type: enums_1.ElementConfigTypeEnum.Number,
            placeholder: 'Grade',
        },
        value: '',
        validation: {
            required: true
        },
        valid: false
    }
};
var BankEdit = react_1.memo(function (_a) {
    var id = _a.id;
    var _b = react_redux_1.useSelector(function (state) { return ({
        bank: state.bank.selectedBank,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        loading: state.common.isLoading,
        successfulOperation: state.common.successfulOperation,
        failedOperation: state.common.failedOperation
    }); }), bank = _b.bank, loggedIn = _b.loggedIn, token = _b.token, loading = _b.loading, successfulOperation = _b.successfulOperation, failedOperation = _b.failedOperation;
    var dispatch = react_redux_1.useDispatch();
    var location = react_router_dom_1.useLocation();
    var _c = react_1.useState(initialFormState), formControls = _c[0], setFormControls = _c[1];
    var _d = react_1.useState(false), isFormValid = _d[0], setIsFormValid = _d[1];
    var _e = react_1.useState(), redirect = _e[0], setRedirect = _e[1];
    var _f = react_1.useState(false), isDeleteConfirmShown = _f[0], setIsDeleteConfirmShown = _f[1];
    var _g = react_1.useState(true), isInitializing = _g[0], setIsInitializing = _g[1];
    react_1.useEffect(function () {
        if (failedOperation && failedOperation === enums_1.FailedOperationEnum.FetchBank) {
            setRedirect(React.createElement(react_router_dom_1.Redirect, { to: '/banks' }));
        }
    }, [failedOperation]);
    react_1.useEffect(function () {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(React.createElement(react_router_dom_1.Redirect, { to: "/auth/" }));
        }
    }, [loggedIn]);
    react_1.useEffect(function () {
        var _a;
        var _b, _c;
        var updatedForm = __assign({}, formControls);
        if (updatedForm && isInitializing) {
            updatedForm = __assign(__assign({}, updatedForm), (_a = {}, _a['name'] = __assign(__assign({}, updatedForm['name']), { value: bank.name, valid: true }), _a['grade'] = __assign(__assign({}, updatedForm['grade']), { value: (_c = (_b = bank.grade) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '', valid: true }), _a));
            setIsInitializing(false);
        }
        setFormControls(updatedForm);
    }, []);
    react_1.useEffect(function () {
        if (!bank) {
            dispatch(actions.fetchBank(id));
        }
    }, [id]);
    react_1.useEffect(function () {
        setIsFormValid(utility_1.ValidateForm(formControls));
    }, [formControls]);
    react_1.useEffect(function () {
        switch (successfulOperation) {
            case enums_1.SuccessfulOperationEnum.Update:
                cancelHandler();
                break;
            case enums_1.SuccessfulOperationEnum.Delete:
                setRedirect(React.createElement(react_router_dom_1.Redirect, { to: "/banks/" }));
                break;
        }
    }, [successfulOperation]);
    var elementHandler = function (event, id) {
        console.log(event);
        setFormControls(utility_1.getUpdatedForm(event, formControls, id));
    };
    var cancelHandler = react_1.useCallback(function () {
        setRedirect(React.createElement(react_router_dom_1.Redirect, { to: "/banks/" + id }));
    }, [id, setRedirect]);
    var saveHandler = function (event) {
        event.preventDefault();
        var bank = {
            id: id,
            name: formControls.name.value.toString(),
            grade: parseInt(formControls.grade.value.toString())
        };
        dispatch(actions.saveBank(bank, token));
    };
    var deleteConfirmContent = react_1.useMemo(function () {
        return (React.createElement(Modal_1.default, { isShown: isDeleteConfirmShown, type: enums_1.ModalTypeEnum.Component },
            React.createElement(ConfirmDelete_1.default, { onOK: function () { return confirmDeleteHandler(true); }, onCancel: function () { return confirmDeleteHandler(false); } })));
    }, [isDeleteConfirmShown]);
    var deleteHandler = react_1.useCallback(function () {
        setIsDeleteConfirmShown(true);
    }, [setIsDeleteConfirmShown]);
    var confirmDeleteHandler = react_1.useCallback(function (isConfirmed) {
        if (isConfirmed) {
            dispatch(actions.deleteBank(id, token));
        }
        setIsDeleteConfirmShown(false);
    }, [id, token, setIsDeleteConfirmShown]);
    var formElements = utility_1.getFormElements(formControls).map(function (formElement) { return (React.createElement(FormElement_1.default, { formElement: formElement, key: formElement.id, onChange: function (event) { return elementHandler(event, formElement.id); }, onLostFocus: function (event) { return elementHandler(event, formElement.id); } })); });
    return (React.createElement("div", null,
        redirect,
        deleteConfirmContent,
        React.createElement("form", { onSubmit: saveHandler },
            formElements,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12 text-center" },
                    React.createElement("button", { className: "btn btn-primary", type: "reset" }, "Clear"),
                    React.createElement("button", { className: "btn btn-success", type: "submit", disabled: !isFormValid || loading }, "Save"),
                    React.createElement("button", { className: "btn btn-info", type: "button" }, "Photos"),
                    React.createElement("button", { className: "btn btn-danger", type: "button", onClick: deleteHandler }, " Delete"),
                    React.createElement("button", { className: "btn btn-warning", type: "button", onClick: cancelHandler }, " Cancel"))))));
});
exports.default = BankEdit;
//# sourceMappingURL=BankEdit.js.map