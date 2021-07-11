using CRUD.APIService.Entities;

namespace CRUD.APIService.Repository
{
    public class CountryRepository : BaseReadOnlyRepository<Country, short>, ICountryRepository
    {
        public CountryRepository(CRUDDbContext dbContext)
            : base(dbContext)
        {

        }
    }
}
