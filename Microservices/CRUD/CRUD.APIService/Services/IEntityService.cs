using CRUD.APIService.Entities;
using CRUD.APIService.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace CRUD.APIService.Services
{
    public interface IEntityService
    {

        IConfiguration Configuration { get; }

        HttpContext HttpContext { get; }

        IUnitOfWork UnitOfWork { get; }

        IBankService BankService { get; }

        //IBranchService BranchService { get; }

        //ICityService CityService { get; }

        //ICountryService CountryService { get; }

        IBankRepository BankRepository { get; }

        //IBranchRepository BranchRepository { get; }

        //ICityRepository CityRepository { get; }

        //ICountryRepository CountryRepository { get; }

        IBaseReadOnlyRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
            where TEntity : Entity<TKey>;

    }
}
