"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var utility_1 = require("../../../shared/utility");
var FormElement_1 = require("../../UI/FormElement/FormElement");
var enums_1 = require("../../../shared/enums");
var actions = require("../../../store/actions/bankActions");
//import * as locationActions from '../../../store/actions/locationActions';
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
    //grade: {
    //    elementType: ElementTypeEnum.Input,
    //    elementConfig: {
    //        type: ElementConfigTypeEnum.Number,
    //        placeholder: 'Grade',
    //        maxLength: 1
    //    },
    //    value: '',
    //    validation: {
    //        maxLength: 1,
    //        max: 5
    //    },
    //    valid: true
    //}
    grade: {
        elementType: enums_1.ElementTypeEnum.Select,
        elementConfig: {
            placeholder: 'Grade',
            options: [
                { value: '', text: '---' },
                { value: '1', text: 'A' },
                { value: '2', text: 'B' },
                { value: '3', text: 'C' },
                { value: '4', text: 'D' },
                { value: '5', text: 'E' }
            ],
        },
        value: '',
        validation: {},
        valid: true
    }
};
var BankNew = react_1.memo(function (props) {
    var _a = react_redux_1.useSelector(function (state) { return ({
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        loading: state.common.isLoading,
        successfulOperation: state.common.successfulOperation
    }); }), loggedIn = _a.loggedIn, token = _a.token, loading = _a.loading, successfulOperation = _a.successfulOperation;
    var dispatch = react_redux_1.useDispatch();
    var location = react_router_dom_1.useLocation();
    var _b = react_1.useState(initialFormState), formControls = _b[0], setFormControls = _b[1];
    var _c = react_1.useState(false), isFormValid = _c[0], setIsFormValid = _c[1];
    var _d = react_1.useState(), redirect = _d[0], setRedirect = _d[1];
    react_1.useEffect(function () {
        if (!loggedIn) {
            dispatch(authActions.setAuthRedirectPath(location.pathname));
            setRedirect(React.createElement(react_router_dom_1.Redirect, { to: "/auth/" }));
        }
    }, [loggedIn]);
    react_1.useEffect(function () {
        setIsFormValid(utility_1.ValidateForm(formControls));
    }, [formControls]);
    react_1.useEffect(function () {
        if (successfulOperation === enums_1.SuccessfulOperationEnum.Insert) {
            cancelHandler();
        }
    }, [successfulOperation]);
    var elementHandler = function (event, id) {
        setFormControls(utility_1.getUpdatedForm(event, formControls, id));
    };
    var cancelHandler = react_1.useCallback(function () {
        setRedirect(React.createElement(react_router_dom_1.Redirect, { to: "/banks/" }));
    }, [setRedirect]);
    var saveHandler = function (event) {
        event.preventDefault();
        var bank = {
            id: 0,
            name: formControls.name.value.toString(),
            grade: (formControls.grade.value ? parseInt(formControls.grade.value.toString()) : undefined)
        };
        dispatch(actions.saveBank(bank, token));
    };
    var formElements = utility_1.getFormElements(formControls).map(function (formElement) { return (React.createElement(FormElement_1.default, { formElement: formElement, key: formElement.id, onChange: function (event) { return elementHandler(event, formElement.id); }, onLostFocus: function (event) { return elementHandler(event, formElement.id); } })); });
    return (React.createElement("div", null,
        redirect,
        React.createElement("form", { onSubmit: saveHandler },
            formElements,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-12 text-center" },
                    React.createElement("button", { className: "btn btn-primary", type: "reset" }, "Clear"),
                    React.createElement("button", { className: "btn btn-success", type: "submit", disabled: !isFormValid || loading }, "Save"),
                    React.createElement("button", { className: "btn btn-warning", type: "button", onClick: cancelHandler }, " Cancel"))))));
});
exports.default = BankNew;
//# sourceMappingURL=BankNew.js.map