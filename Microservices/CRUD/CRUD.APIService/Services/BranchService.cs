using CRUD.APIService.Entities;
using CRUD.APIService.Helpers;
using CRUD.APIService.Models;
using CRUD.APIService.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD.APIService.Services
{
    public class BranchService : BaseService<IBranchRepository, Branch, long>, IBranchService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BranchService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public Task<int> GetCountByBankIdAsync(int bankId) =>
            base.GetQueryable().CountAsync(q => q.BankId.Equals(bankId));

        public Task<IList<Branch>> GetListByBankIdAsync(int bankId)=>
            base.GetQueryable().Where(q => q.BankId.Equals(bankId))
                .ToIListAsync();

        public async Task<TransactionResult> DeleteByBankIdAsync(int bankId)
        {
            base.BeginTransaction();
            foreach (var bank in await GetListByBankIdAsync(bankId))
            {
                await base.DeleteAsync(bank);
            }
            return await base.CommitTransactionAsync();
        }

        #endregion /Methods
    }
}