"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalType = exports.FormControlTypesEnum = exports.FailedOperationsEnum = exports.SuccessfulOperationsEnum = exports.UNKNOWN_ERROR_MESSAGE = void 0;
exports.UNKNOWN_ERROR_MESSAGE = "An error has occured!";
exports.SuccessfulOperationsEnum = Object.freeze({
    Insert: 'Insert',
    Update: 'Update',
    Delete: 'Delete',
    Upload: 'Upload',
    Remove: 'Remove'
});
exports.FailedOperationsEnum = Object.freeze({
    FetchBank: 'FetchBank'
});
exports.FormControlTypesEnum = Object.freeze({
    Input: 'input',
    TextArea: 'textarea',
    Select: 'select',
    DropDown: 'dropdown',
    Stars: 'stars'
});
exports.ModalType = Object.freeze({
    INFO: 'INFO',
    QUESTION: 'QUESTION',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    COMPONENT: 'COMPONENT'
});
//# sourceMappingURL=constant.js.map