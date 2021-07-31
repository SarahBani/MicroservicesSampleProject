export enum SuccessfulOperationEnum {
    Insert = 1,
    Update = 2,
    Delete = 3,
    Upload = 4,
    Remove = 5
};

export enum FailedOperationEnum {
    FetchBank = 1
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
    Number,
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