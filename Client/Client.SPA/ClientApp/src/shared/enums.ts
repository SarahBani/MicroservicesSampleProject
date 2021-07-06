export enum SuccessfulOperationEnum {
    Insert,
    Update,
    Delete,
    Upload,
    Remove
};

export enum FailedOperationEnum {
    FetchBank
};

export enum ElementTypeEnum {
    Input,
    TextArea,
    Select,
    DropDown,
    Stars
};

export enum ElementConfigTypeEnum {
    Text,
    Email,
    Password,
    Button,
    Checkbox,
    Radio,
    Range
};

export enum ModalTypeEnum {
    Info,
    Question,
    Warning,
    Error,
    Component
};

export enum ButtonTypeEnum {
    Success,
    Danger
};

export enum HttpErrorEnum {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    TooManyRequests = 429,
    InternalServerError = 500,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
};