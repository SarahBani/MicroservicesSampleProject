using CRUD.APIService.Entities;

namespace CRUD.APIService.Repository
{
    public class BranchRepository : BaseRepository<Branch, long>, IBranchRepository
    {
        public BranchRepository(CRUDDbContext dbContext)
            : base(dbContext)
        {

        }
    }
}
