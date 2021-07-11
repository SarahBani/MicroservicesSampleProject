using CRUD.APIService.Entities;

namespace CRUD.APIService.Repository
{
    public class BankRepository : BaseRepository<Bank, int>, IBankRepository
    {
        public BankRepository(CRUDDbContext dbContext)
            : base(dbContext)
        {

        }
    }
}
