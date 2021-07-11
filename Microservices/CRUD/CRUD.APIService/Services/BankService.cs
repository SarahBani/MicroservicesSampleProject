﻿using Common;
using CRUD.APIService.Entities;
using CRUD.APIService.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD.APIService.Services
{
    public class BankService : BaseService<IBankRepository, Bank, int>, IBankService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BankService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public Task<int> GetCountAsync() => base.GetCountAsync();

        public Task<IList<Bank>> GetListAsync(Page page = null)
        {
            var list = base.GetQueryable();
            if (page != null)
            {
                list = list.Skip(page.FirstRowIndex).Take(page.Count);
            }
            return list.ToIListAsync();
        }

        #endregion /Methods
    }
}