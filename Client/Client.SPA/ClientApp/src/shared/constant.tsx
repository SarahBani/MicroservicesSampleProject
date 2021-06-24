export const UNKNOWN_ERROR_MESSAGE: string = "An error has occured!";

export const SuccessfulOperationsEnum = Object.freeze({
    Insert: 'Insert',
    Update: 'Update',
    Delete: 'Delete',
    Upload: 'Upload',
    Remove: 'Remove'
});

export const FailedOperationsEnum = Object.freeze({
    FetchBank: 'FetchBank'
});

export const FormControlTypesEnum = Object.freeze({
    Input: 'input',
    TextArea: 'textarea',
    Select: 'select',
    DropDown: 'dropdown',
    Stars: 'stars'
});

export const ModalType = Object.freeze({
    INFO: 'INFO',
    QUESTION: 'QUESTION',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    COMPONENT: 'COMPONENT'
});