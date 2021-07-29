using System;

namespace FileManager.APIService.Models
{

    public enum ExceptionKey
    {
        NotDefined = -1,

        TimeoutExpired = -2,

        NoActiveTransaction,
        EmptyFile,
        ImpossibleOperation,

        InvalidWebServiceAssignmentToken,
        WebServiceAssignmentExpired,
    }

    public class CustomException : Exception
    {

        #region Properties

        public ExceptionKey ExceptionKey { get; private set; }

        public string CustomMessage { get; private set; }

        #endregion /Properties

        #region Constructors

        public CustomException()
        {
            this.CustomMessage = GetMessage();
        }

        public CustomException(ExceptionKey exceptionKey, params object[] args)
        {
            this.ExceptionKey = exceptionKey;
            this.CustomMessage = string.Format(GetMessage(), args);
        }

        public CustomException(string message)
        {
            this.ExceptionKey = ExceptionKey.NotDefined;
            this.CustomMessage = message;
        }

        #endregion /Constructors

        #region Methods

        private string GetMessage()
        {
            string result = string.Empty;

                switch (this.ExceptionKey)
                {
                    case ExceptionKey.EmptyFile:
                        result = Constant.Exception_EmptyFile;
                        break;
                    case ExceptionKey.NotDefined:
                    default:
                        result = Constant.Exception_HasError;
                        break;
                }

            return result;
        }

        #endregion /Methods

    }
}