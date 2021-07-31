using System;

namespace FileManager.APIService.Models
{
    public static class Constant
    {

        #region AppSettings

        public const string AppSettings_DefaultConnection = "DefaultConnection";

        public const string AppSettings_TokenSetting = "TokenSetting";

        #endregion /AppSettings

        #region Validations

        public const string Validation_RequiredField = "The {0} field is required!.";
        public const string Validation_StringLength_Max = "The {0} cannot be more than {1} characters long.!";
        public const string Validation_StringLength_Min = "The {0} must be at least {2} characters long.!";
        public const string Validation_StringLength_MinMax = "The {0} must be between {2} and {1} characters long.!";
        public const string Validation_StringLength = "The {0} must be at least {2} characters long.!";
        public const string Validation_RegularExpression = "The {0} is invalid!";
        public const string Validation_UrlRegularExpression = "The {0} contains invalid characters!";
        public const string Validation_Compare = "The {0} is not correct!";

        public const string Validation_Address_City_Required = "The address in city is required!";

        #endregion /Validations

        #region Exceptions

        public const string Exception_HasError = "An error has occured!";

        public const string Exception_UserNotAccess = "The user does not have the required access!";
        public const string Exception_AuthenticationRequired = "Please sign in!";
        public const string Exception_UnAuthorized = "Please Login!";
        public const string Exception_Forbidden = "You don't have the permission!";
        public const string Exception_EmptyFile = "The file is empty!";
        public const string Exception_UploadFileProblem = "The file cannot be uploaded!";
        public const string Exception_DeleteFileProblem = "The file cannot be deleted!";
        public const string Exception_MoveFileProblem = "The file cannot be moved!";

        public const string ActionResult_Successful = "Successful";

        #endregion /Exceptions

    }
}
