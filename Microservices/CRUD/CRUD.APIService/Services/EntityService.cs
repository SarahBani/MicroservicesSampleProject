using CRUD.APIService.Entities;
using CRUD.APIService.Repository;
using System.Linq;

namespace CRUD.APIService.Services
{
    public class EntityService : IEntityService
    {

        #region Properties

        public IUnitOfWork UnitOfWork { get; private set; }

        #region Repositories

        public IBankRepository BankRepository { get; private set; }

        public IBranchRepository BranchRepository { get; private set; }

        //public ICityRepository CityRepository { get; private set; }

        public ICountryRepository CountryRepository { get; private set; }

        #endregion /Repositories

        #region Services

        private IBankService _bankService;
        public IBankService BankService
        {
            get
            {
                if (_bankService == null)
                {
                    _bankService = new BankService(this);

                }
                return _bankService;
            }
        }

        private IBranchService _branchService;
        public IBranchService BranchService
        {
            get
            {
                if (_branchService == null)
                {
                    _branchService = new BranchService(this);

                }
                return _branchService;
            }
        }

        //private ICityService _cityService;
        //public ICityService CityService
        //{
        //    get
        //    {
        //        if (_cityService == null)
        //        {
        //            _cityService = new CityService(this);

        //        }
        //        return _cityService;
        //    }
        //}

        private ICountryService _countryService;
        public ICountryService CountryService
        {
            get
            {
                if (_countryService == null)
                {
                    _countryService = new CountryService(this);

                }
                return _countryService;
            }
        }

        #endregion /Repositories

        #endregion /Properties

        #region Constructors

        public EntityService(IBaseRepository<Bank, int> bankRepository,
                             IBaseRepository<Branch, long> branchRepository,
                             //IBaseReadOnlyRepository<City, long> cityRepository,
                             IBaseReadOnlyRepository<Country, short> countryRepository,
                             IUnitOfWork unitOfWork)
        {
            this.BankRepository = (bankRepository as IBankRepository);
            this.BranchRepository = (branchRepository as IBranchRepository);
            //this.CityRepository = (cityRepository as ICityRepository);
            this.CountryRepository = (countryRepository as ICountryRepository);

            this.UnitOfWork = unitOfWork;
        }

        #endregion /Constructors

        #region Methods

        public IBaseReadOnlyRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
          where TEntity : Entity<TKey>
        {
            string entityName = typeof(TEntity).Name;

            var prop = this.GetType().GetProperties()
                .Where(q => q.Name.Equals(entityName + "Repository"))
                .SingleOrDefault();

            return prop.GetValue(this) as IBaseReadOnlyRepository<TEntity, TKey>;
        }

        #endregion /Methods

    }
}
