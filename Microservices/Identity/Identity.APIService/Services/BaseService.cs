using Identity.APIService.Helpers;
using Identity.APIService.Models;
using Identity.APIService.Repository;
using System;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Identity.APIService.Services
{
    public abstract class BaseService
    {

        #region Properties

        protected string MethodName
        {
            get
            {
                StackFrame frame = new StackTrace().GetFrame(1);
                return frame.GetMethod().Name;
            }
        }

        public IUnitOfWork _unitOfWork { get; private set; }

        #endregion /Properties

        #region Constructors

        protected BaseService(IUnitOfWork unitOfWork)
            : base()
        {
            this._unitOfWork = unitOfWork;
        }

        #endregion /Constructors

        #region Methods

        [MethodImpl(MethodImplOptions.NoInlining)]
        protected Task<TransactionResult> GetTransactionResultAsync(Action action)
        {
            BeginTransaction();
            action();
            return CommitTransactionAsync();
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        protected void BeginTransaction()
        {
            if (!this._unitOfWork.HasTransaction())
            {
                this._unitOfWork.BeginTransaction(GetCallerMethod());
            }
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        protected async Task<TransactionResult> CommitTransactionAsync(object content = null)
        {
            if (this._unitOfWork.GetTransactionName().Equals(GetCallerMethod()))
            {
                await this._unitOfWork.Commit();
            }
            return new TransactionResult(content);
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        private string GetCallerMethod()
        {
            int intSkipFrames = 0;
            while (new StackFrame(intSkipFrames).GetMethod().GetMethodImplementationFlags() == MethodImplAttributes.NoInlining ||
                   new StackFrame(intSkipFrames).GetMethod().GetRealMethod() == null ||
                   new StackFrame(intSkipFrames).GetMethod().GetBaseDeclaringType() != typeof(BaseService)) // This line is added for preventing mistakes in tests
            {
                intSkipFrames++;
            }
            var method = new StackTrace(new StackFrame(intSkipFrames)).GetFrame(0).GetMethod().GetRealMethod();
            return method.ReflectedType.Name + "." + method.Name;
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        protected TransactionResult GetTransactionException(Exception exception)
        {
            this._unitOfWork.RollBack();
            if (exception is CustomException)
            {
                return new TransactionResult(exception as CustomException);
            }
            else
            {
                return new TransactionResult(new CustomException(exception));
            }
        }

        #endregion /Methods

    }
}