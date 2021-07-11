using CRUD.APIService.Entities;
using CRUD.APIService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRUD.APIService.Services
{
    public interface IBranchService
    {

        Task<Branch> GetByIdAsync(long id);

        Task<int> GetCountByBankIdAsync(int bankId);

        Task<IList<Branch>> GetListByBankIdAsync(int bankId);

        Task<TransactionResult> InsertAsync(Branch branch);

        Task<TransactionResult> UpdateAsync(Branch branch);

        Task<TransactionResult> DeleteAsync(long id);

        Task<TransactionResult> DeleteByBankIdAsync(int bankId);

    }
}
