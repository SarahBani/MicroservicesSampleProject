using CRUD.APIService.Entities;
using CRUD.APIService.Repository;
using CRUD.APIService.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CRUD.APIService.Helpers
{
    public static class DependencyInjection
    {

        public static IServiceCollection SetInjection(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IEntityService, EntityService>();

            services.AddScoped(typeof(IBaseRepository<Bank, int>), typeof(BankRepository));
            services.AddScoped(typeof(IBaseRepository<Branch, long>), typeof(BranchRepository));
            //services.AddScoped(typeof(IBaseReadOnlyRepository<City, long>), typeof(CityRepository));
            services.AddScoped(typeof(IBaseReadOnlyRepository<Country, short>), typeof(CountryRepository));

            services.AddScoped(typeof(IBankService), typeof(BankService));
            services.AddScoped(typeof(IBranchService), typeof(BranchService));
            //services.AddScoped(typeof(ICityService), typeof(CityService));
            services.AddScoped(typeof(ICountryService), typeof(CountryService));

            return services;
        }

    }
}
