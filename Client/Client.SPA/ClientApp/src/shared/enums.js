"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorEnum = exports.ButtonTypeEnum = exports.ModalTypeEnum = exports.ElementConfigTypeEnum = exports.ElementTypeEnum = exports.FailedOperationEnum = exports.SuccessfulOperationEnum = void 0;
var SuccessfulOperationEnum;
(function (SuccessfulOperationEnum) {
    SuccessfulOperationEnum[SuccessfulOperationEnum["Insert"] = 1] = "Insert";
    SuccessfulOperationEnum[SuccessfulOperationEnum["Update"] = 2] = "Update";
    SuccessfulOperationEnum[SuccessfulOperationEnum["Delete"] = 3] = "Delete";
    SuccessfulOperationEnum[SuccessfulOperationEnum["Upload"] = 4] = "Upload";
    SuccessfulOperationEnum[SuccessfulOperationEnum["Remove"] = 5] = "Remove";
})(SuccessfulOperationEnum = exports.SuccessfulOperationEnum || (exports.SuccessfulOperationEnum = {}));
;
var FailedOperationEnum;
(function (FailedOperationEnum) {
    FailedOperationEnum[FailedOperationEnum["FetchBank"] = 1] = "FetchBank";
})(FailedOperationEnum = exports.FailedOperationEnum || (exports.FailedOperationEnum = {}));
;
var ElementTypeEnum;
(function (ElementTypeEnum) {
    ElementTypeEnum[ElementTypeEnum["Input"] = 0] = "Input";
    ElementTypeEnum[ElementTypeEnum["TextArea"] = 1] = "TextArea";
    ElementTypeEnum[ElementTypeEnum["Select"] = 2] = "Select";
    ElementTypeEnum[ElementTypeEnum["DropDown"] = 3] = "DropDown";
    ElementTypeEnum[ElementTypeEnum["Stars"] = 4] = "Stars";
})(ElementTypeEnum = exports.ElementTypeEnum || (exports.ElementTypeEnum = {}));
;
var ElementConfigTypeEnum;
(function (ElementConfigTypeEnum) {
    ElementConfigTypeEnum[ElementConfigTypeEnum["Text"] = 0] = "Text";
    ElementConfigTypeEnum[ElementConfigTypeEnum["Number"] = 1] = "Number";
    ElementConfigTypeEnum[ElementConfigTypeEnum["Email"] = 2] = "Email";
    ElementConfigTypeEnum[ElementConfigTypeEnum["Password"] = 3] = "Password";
    ElementConfigTypeEnum[ElementConfigTypeEnum["Button"] = 4] = "Button";
    ElementConfigTypeEnum[ElementConfigTypeEnum["Checkbox"] = 5] = "Checkbox";
    ElementConfigTypeEnum[ElementConfigTypeEnum["Radio"] = 6] = "Radio";
    ElementConfigTypeEnum[ElementConfigTypeEnum["Range"] = 7] = "Range";
})(ElementConfigTypeEnum = exports.ElementConfigTypeEnum || (exports.ElementConfigTypeEnum = {}));
;
var ModalTypeEnum;
(function (ModalTypeEnum) {
    ModalTypeEnum[ModalTypeEnum["Info"] = 0] = "Info";
    ModalTypeEnum[ModalTypeEnum["Question"] = 1] = "Question";
    ModalTypeEnum[ModalTypeEnum["Warning"] = 2] = "Warning";
    ModalTypeEnum[ModalTypeEnum["Error"] = 3] = "Error";
    ModalTypeEnum[ModalTypeEnum["Component"] = 4] = "Component";
})(ModalTypeEnum = exports.ModalTypeEnum || (exports.ModalTypeEnum = {}));
;
var ButtonTypeEnum;
(function (ButtonTypeEnum) {
    ButtonTypeEnum[ButtonTypeEnum["Success"] = 0] = "Success";
    ButtonTypeEnum[ButtonTypeEnum["Danger"] = 1] = "Danger";
})(ButtonTypeEnum = exports.ButtonTypeEnum || (exports.ButtonTypeEnum = {}));
;
var HttpErrorEnum;
(function (HttpErrorEnum) {
    HttpErrorEnum[HttpErrorEnum["BadRequest"] = 400] = "BadRequest";
    HttpErrorEnum[HttpErrorEnum["Unauthorized"] = 401] = "Unauthorized";
    HttpErrorEnum[HttpErrorEnum["Forbidden"] = 403] = "Forbidden";
    HttpErrorEnum[HttpErrorEnum["NotFound"] = 404] = "NotFound";
    HttpErrorEnum[HttpErrorEnum["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpErrorEnum[HttpErrorEnum["RequestTimeout"] = 408] = "RequestTimeout";
    HttpErrorEnum[HttpErrorEnum["TooManyRequests"] = 429] = "TooManyRequests";
    HttpErrorEnum[HttpErrorEnum["InternalServerError"] = 500] = "InternalServerError";
    HttpErrorEnum[HttpErrorEnum["BadGateway"] = 502] = "BadGateway";
    HttpErrorEnum[HttpErrorEnum["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpErrorEnum[HttpErrorEnum["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpErrorEnum = exports.HttpErrorEnum || (exports.HttpErrorEnum = {}));
;
//# sourceMappingURL=enums.js.map