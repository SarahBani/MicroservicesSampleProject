"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalType = exports.FormControlType = exports.FailedOperation = exports.SuccessfulOperation = void 0;
var SuccessfulOperation;
(function (SuccessfulOperation) {
    SuccessfulOperation[SuccessfulOperation["Insert"] = 0] = "Insert";
    SuccessfulOperation[SuccessfulOperation["Update"] = 1] = "Update";
    SuccessfulOperation[SuccessfulOperation["Delete"] = 2] = "Delete";
    SuccessfulOperation[SuccessfulOperation["Upload"] = 3] = "Upload";
    SuccessfulOperation[SuccessfulOperation["Remove"] = 4] = "Remove";
})(SuccessfulOperation = exports.SuccessfulOperation || (exports.SuccessfulOperation = {}));
;
var FailedOperation;
(function (FailedOperation) {
    FailedOperation[FailedOperation["FetchBank"] = 0] = "FetchBank";
})(FailedOperation = exports.FailedOperation || (exports.FailedOperation = {}));
;
var FormControlType;
(function (FormControlType) {
    FormControlType[FormControlType["Input"] = 0] = "Input";
    FormControlType[FormControlType["TextArea"] = 1] = "TextArea";
    FormControlType[FormControlType["Select"] = 2] = "Select";
    FormControlType[FormControlType["DropDown"] = 3] = "DropDown";
    FormControlType[FormControlType["Stars"] = 4] = "Stars";
})(FormControlType = exports.FormControlType || (exports.FormControlType = {}));
;
var ModalType;
(function (ModalType) {
    ModalType[ModalType["INFO"] = 0] = "INFO";
    ModalType[ModalType["QUESTION"] = 1] = "QUESTION";
    ModalType[ModalType["WARNING"] = 2] = "WARNING";
    ModalType[ModalType["ERROR"] = 3] = "ERROR";
    ModalType[ModalType["COMPONENT"] = 4] = "COMPONENT";
})(ModalType = exports.ModalType || (exports.ModalType = {}));
;
//# sourceMappingURL=enums.js.map