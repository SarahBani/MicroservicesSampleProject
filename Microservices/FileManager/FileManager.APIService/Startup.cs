using FileManager.APIService.Helpers;
using FileManager.APIService.Models;
using FileManager.APIService.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FileManager.APIService
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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // configure strongly typed settings objects
            var tokenSetting = this.Configuration.GetSection(Constant.AppSettings_TokenSetting);
            services.Configure<TokenSetting>(tokenSetting);
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
            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });

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

            //// prevent from mapping "sub" claim to nameidentifier.
            //JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer(options =>
           {
               options.RequireHttpsMetadata = false;
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateAudience = false,
                   ValidateIssuer = false,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(key),
                   // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                   ClockSkew = TimeSpan.Zero
               };
               options.Events = new JwtBearerEvents()
               {
                   OnAuthenticationFailed = context =>
                   {
                       context.NoResult();
                       context.Response.StatusCode = 500;
                       context.Response.ContentType = "text/plain";
                       context.Response.WriteAsync(context.Exception.ToString()).Wait();
                       return Task.CompletedTask;
                   },
                   OnTokenValidated = context =>
                   {
                       var identity = context.Principal.Identity;
                       var claimsIdentity = (ClaimsIdentity)context.Principal.Identity;
                       if (context.Request.Headers.ContainsKey("Microservice"))
                       {
                           string service = context.Request.Headers["Microservice"].First();
                           if (service != tokenSetting.Audience)
                           {
                               context.Response.StatusCode = StatusCodes.Status403Forbidden;
                               context.Fail(Constant.Exception_Forbidden);
                           }
                       }
                       //otherwise succeed the request
                       return Task.CompletedTask;
                   },
                   OnChallenge = context =>
                   {
                       // Skip the default logic.
                       context.HandleResponse();

                       var payload = new JObject
                       {
                           ["error"] = context.Error,
                           ["error_description"] = context.AuthenticateFailure.Message,// context.ErrorDescription,
                           ["error_uri"] = context.ErrorUri
                       };

                       return context.Response.WriteAsync(payload.ToString());
                   },
                   OnMessageReceived = async ctx =>
                   {
                       int i = 0;
                   }
               };
           });
            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(ClaimTypes.Role, "Admin"));
            });
        }

        #endregion /Methods

    }
}
