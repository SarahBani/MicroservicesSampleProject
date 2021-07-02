"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var classes = require("./Auth.module.scss");
var FormElement_1 = require("../UI/FormElement/FormElement");
var Button_1 = require("../UI/Button/Button");
var withErrorHandler_1 = require("../../hoc/withErrorHandler/withErrorHandler");
var utility_1 = require("../../shared/utility");
var actions = require("../../store/actions/authActions");
var enums_1 = require("../../shared/enums");
var initialFormState = {
    email: {
        elementType: enums_1.FormControlType.Input,
        elementConfig: {
            type: 'email',
            placeholder: 'Email',
        },
        value: 'sarah@yahoo.com',
        validation: {
            required: true,
            email: true
        },
        valid: true
    },
    password: {
        elementType: enums_1.FormControlType.Input,
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
        },
        value: '',
        autoComplete: 'on',
        validation: {
            required: true,
            minLength: 6
        },
        valid: true
    }
};
var Auth = function () {
    var _a = react_redux_1.useSelector(function (state) { return ({
        isLoggedIn: state.auth.loggedIn,
        isLoading: state.common.isLoading,
        authRedirectPath: state.auth.authRedirectPath
    }); }), isLoggedIn = _a.isLoggedIn, isLoading = _a.isLoading, authRedirectPath = _a.authRedirectPath;
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_1.useHistory();
    var _b = react_1.useState(initialFormState), formControls = _b[0], setFormControls = _b[1];
    var _c = react_1.useState(false), isFormValid = _c[0], setIsFormValid = _c[1];
    react_1.useEffect(function () {
        if (history.action !== 'REPLACE') {
            dispatch(actions.setAuthRedirectPath('/'));
        }
    }, []);
    react_1.useEffect(function () {
        var updatedForm = utility_1.disableForm(formControls, isLoading);
        setFormControls(updatedForm);
    }, [isLoading, setFormControls]);
    var elementChangedHandler = function (event, id) {
        var updatedForm = utility_1.getUpdatedForm(event, formControls, id);
        setFormControls(updatedForm);
        setIsFormValid(utility_1.ValidateForm(updatedForm));
    };
    var elementLostFocusHandler = function (event, id) {
        setFormControls(utility_1.getUpdatedForm(event, formControls, id));
    };
    var signInHandler = function (event) {
        event.preventDefault();
        dispatch(actions.signIn(formControls.email.value, formControls.password.value));
    };
    var loggedInRedirect = (isLoggedIn && React.createElement(react_router_1.Redirect, { to: authRedirectPath }));
    var form = (React.createElement("form", { onSubmit: signInHandler },
        utility_1.getFormElements(formControls).map(function (formElement) { return (React.createElement(FormElement_1.default, { formElement: formElement, key: formElement.id, onChange: function (event) { return elementChangedHandler(event, formElement.id); }, onLostFocus: function (event) { return elementLostFocusHandler(event, formElement.id); } })); }),
        React.createElement(Button_1.default, { type: enums_1.ButtonType.Success, disabled: !isFormValid || isLoading }, "Sign In")));
    return (React.createElement("div", { className: classes.Auth },
        loggedInRedirect,
        form));
};
exports.Auth = Auth;
exports.default = withErrorHandler_1.default(exports.Auth);
//# sourceMappingURL=Auth.js.map