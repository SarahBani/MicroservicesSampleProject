using Common;
using Identity.APIService.Entities;
using Identity.APIService.Helpers;
using Identity.APIService.Models;
using Identity.APIService.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Identity.APIService
{
    public class Startup
    {

        #region Properties

        public IConfiguration Configuration { get; }

        #endregion /Properties

        #region Constructors

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        #endregion /Constructors

        #region Methods

        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Utility.GetConnectionString(this.Configuration, Constant.AppSettings_DefaultConnection);
            services.AddDbContext<IdentityDbContext>(options => options.UseSqlServer(connectionString));
            /// custom user & Role with int key
            services.AddIdentity<User, Role>(options =>
            {
                options.SignIn.RequireConfirmedEmail = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
            })
                .AddRoles<Role>()
                .AddEntityFrameworkStores<IdentityDbContext>()
                //.AddDefaultUI()
                .AddDefaultTokenProviders();

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection(Constant.AppSettings_TokenSetting);
            services.Configure<TokenSetting>(appSettingsSection);

            DependencyInjection.SetInjection(services);
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        #endregion /Methods

    }
}
