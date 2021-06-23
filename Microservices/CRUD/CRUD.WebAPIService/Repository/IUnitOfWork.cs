using System;
using System.Threading.Tasks;

namespace CRUD.APIService.Repository
{
    public interface IUnitOfWork : IDisposable
    {

        string GetTransactionName();

        bool HasTransaction();

        void BeginTransaction(string transactionName);

        Task Commit();

        void RollBack();

    }
}
