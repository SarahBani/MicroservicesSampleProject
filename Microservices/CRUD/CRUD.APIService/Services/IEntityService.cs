using Common.Entities;
using CRUD.APIService.Repository;

namespace CRUD.APIService.Services
{
    public interface IEntityService
    {

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
