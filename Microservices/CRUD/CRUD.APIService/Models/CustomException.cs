﻿using System;
using System.ComponentModel;
using System.Data.SqlClient;

namespace CRUD.APIService.Models
{

    public enum ExceptionKey
    {
        NotDefined = -1,

        TimeoutExpired = -2,
        HasForeignKey = 547,
        RecordAlreadyExsits = 2601,
        ArithmeticOverflow = 8115,

        NoActiveTransaction,
        EmptyFile,
        ImpossibleOperation,
        [Description(Constant.Validation_Address_City_Required)]
        Invalid_Address_City_Required,

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

        public CustomException(Exception exception)
        {
            Exception innerException = null;
            if (exception.InnerException != null)
            {
                innerException = exception.InnerException;
            }
            else
            {
                innerException = exception;
            }
            this.CustomMessage = GetMessage(innerException);
        }

        public CustomException(ExceptionKey exceptionKey, params object[] args)
        {
            this.ExceptionKey = exceptionKey;
            this.CustomMessage = string.Format(GetMessage(null), args);
        }

        public CustomException(string message)
        {
            this.ExceptionKey = ExceptionKey.NotDefined;
            this.CustomMessage = message;
        }

        #endregion /Constructors

        #region Methods

        private string GetMessage(Exception innerException)
        {
            string result = string.Empty;

            if (innerException != null)
            {
                result = innerException.Message;

                if (innerException.GetBaseException() is SqlException)
                {
                    this.ExceptionKey = (ExceptionKey)(innerException.GetBaseException() as SqlException).Number;
                }

                switch (this.ExceptionKey)
                {
                    case ExceptionKey.TimeoutExpired:
                        result = Constant.Exception_sql_TimeoutExpired;
                        break;
                    case ExceptionKey.HasForeignKey:
                        result = Constant.Exception_sql_HasDepandantInfo;
                        break;
                    case ExceptionKey.RecordAlreadyExsits:
                        result = Constant.Exception_sql_HasDuplicateInfo;
                        break;
                    case ExceptionKey.ArithmeticOverflow:
                        result = Constant.Exception_sql_ArithmeticOverflow;
                        break;
                    default:
                        result = Constant.Exception_HasError;
                        break;
                }
            }
            else
            {
                switch (this.ExceptionKey)
                {
                    case ExceptionKey.NoActiveTransaction:
                        result = Constant.Exception_NoActiveTransaction;
                        break;
                    case ExceptionKey.EmptyFile:
                        result = Constant.Exception_EmptyFile;
                        break;
                    case ExceptionKey.NotDefined:
                    default:
                        result = Constant.Exception_HasError;
                        break;
                }
            }

            return result;
        }

        #endregion /Methods

    }
}