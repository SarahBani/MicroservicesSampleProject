﻿using CRUD.APIService.Entities;
using CRUD.APIService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRUD.APIService.Services
{
    public interface IBankService
    {

        Task<Bank> GetByIdAsync(int id);

        Task<string> GetLogoUrlByIdAsync(int id);

        Task<int> GetCountAsync();

        Task<IList<Bank>> GetAllAsync();

        Task<IList<Bank>> GetListAsync(Page page = null);

        Task<TransactionResult> InsertAsync(Bank bank);

        Task<TransactionResult> UpdateAsync(Bank bank);

        Task<TransactionResult> DeleteAsync(int id);

        void MoveLogoFile(string logoUrl);

        void DeleteLogoFile(string logoUrl);

    }
}
