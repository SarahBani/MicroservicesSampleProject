using Common;
using CRUD.APIService.Entities;
using CRUD.APIService.Models;
using CRUD.APIService.Repository;
using CRUD.APIService.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CRUD.APIService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Utility.GetConnectionString(this.Configuration, Constant.AppSettings_DefaultConnection);
            services.AddDbContext<CRUDDbContext>(options => options.UseSqlServer(connectionString));
            
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

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
