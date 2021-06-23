using CRUD.APIService.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CRUD.APIService.Services
{
    public interface ICountryService
    {

        Task<Country> GetByIdAsync(short id);

        Task<int> GetCountAsync();

        Task<IList<Country>> GetAllAsync();

    }
}