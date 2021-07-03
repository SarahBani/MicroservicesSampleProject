using APIManager.WebAPIGateway.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System;
using System.Text;
using System.Threading.Tasks;

namespace APIManager.WebAPIGateway
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
            ConfigureAuthentication(services);
            services.AddCors();
            services.AddOcelot(this.Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.UseAuthentication();

            //app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials
            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllers();
            //});
            app.UseOcelot().Wait();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }

        private void ConfigureAuthentication(IServiceCollection services)
        {
            // configure strongly typed settings objects
            // configure jwt authentication
            var appSettingsSection = Configuration.GetSection(Constant.AppSettings_TokenSetting);
            //services.Configure<TokenSetting>(appSettingsSection);
            var tokenSetting = appSettingsSection.Get<TokenSetting>();
            var key = Encoding.ASCII.GetBytes(tokenSetting.SecretKey);
            var identityUrl = Configuration.GetValue<string>(Constant.AppSettings_TokenSetting);
            string authenticationProviderKey = tokenSetting.ProviderKey;
            string[] audiences = tokenSetting.Audiences.Split(";");

            // configure jwt authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(authenticationProviderKey, options =>
            {
                options.Authority = identityUrl;
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudiences = audiences,
                    ValidIssuer = tokenSetting.Issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero,
                    RequireExpirationTime = true,
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
                        var user = context.Principal.Identity.Name;
                        //Grab the http context user and validate the things you need to
                        //if you are not satisfied with the validation, fail the request using the below commented code
                        context.Fail(Constant.Exception_UnAuthorized);

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
