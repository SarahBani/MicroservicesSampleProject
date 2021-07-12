using Identity.APIService.Entities;
using Identity.APIService.Helpers;
using Identity.APIService.Models;
using Identity.APIService.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Utility = Common.Utility;

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
            // configure strongly typed settings objects
            var tokenSetting = this.Configuration.GetSection(Constant.AppSettings_TokenSetting);
            services.Configure<TokenSetting>(tokenSetting);

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

            ConfigureAuthentication(services, tokenSetting.Get<TokenSetting>());

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

        private void ConfigureAuthentication(IServiceCollection services, TokenSetting tokenSetting)
        {
            // configure jwt authentication
            var key = Encoding.ASCII.GetBytes(tokenSetting.SecretKey);

            // prevent from mapping "sub" claim to nameidentifier.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidAudience = tokenSetting.Audience,
                    ValidateIssuer = true,
                    ValidIssuer = tokenSetting.Issuer,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                };
                options.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = async ctx =>
                    {
                        int i = 0;
                    },
                    OnTokenValidated = context =>
                    {
                        var identity = context.Principal.Identity;
                        // var user = context.Principal.Identity.Name;
                        //Grab the http context user and validate the things you need to
                        //if you are not satisfied with the validation, fail the request using the below commented code
                        //context.Fail(Constant.Exception_UnAuthorized);

                        //otherwise succeed the request
                        return Task.CompletedTask;
                    },
                    OnMessageReceived = async ctx =>
                    {
                        int i = 0;
                    }
                };
            });
        }

        #endregion /Methods

    }
}
