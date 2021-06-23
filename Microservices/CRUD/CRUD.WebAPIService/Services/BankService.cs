using CRUD.APIService.Entities;
using CRUD.APIService.Repository;
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

        #endregion /Methods
    }
}