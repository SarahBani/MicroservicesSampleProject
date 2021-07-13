using APIManager.WebAPIGateway.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Ocelot.Configuration.Creator;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System;
using System.Security.Claims;
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
            // configure strongly typed settings objects
            var tokenSetting = this.Configuration.GetSection(Constant.AppSettings_TokenSetting);
            services.Configure<TokenSetting>(tokenSetting);
            ConfigureAuthentication(services, tokenSetting.Get<TokenSetting>());

            services.AddCors();
            //services.AddOcelot(this.Configuration);
            services.AddOcelot();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                IdentityModelEventSource.ShowPII = true;
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseAuthentication();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials());

            //var ocelotConfig = new OcelotPipelineConfiguration
            //{
            //    AuthenticationMiddleware = async (ctx, next) =>
            //    {
            //        try
            //        {
            //            string sss = ctx.Items.DownstreamRoute().DownstreamPathTemplate.Value;
            //            ctx.Items.DownstreamRoute().AddHeadersToUpstream.Add(new AddHeader("dddddd", "22222"));
            //        }
            //        //catch (ApiGateway.Core.Exceptions.ForbiddenException e)
            //        //{
            //        //    ctx.Errors.Add(new ApiGateway.WebApi.Exceptions.ForbiddenException(e.Message, Ocelot.Errors.OcelotErrorCode.UnauthorizedError));
            //        //}
            //        catch (Exception e)
            //        {
            //            //ctx.Response.Add(new UnauthenticatedError(e.Message));
            //            new UnauthenticatedError(e.Message);
            //        }
            //        await next.Invoke();
            //    },
            //    AuthorisationMiddleware = async (ctx, next) =>
            //    {
            //        await next.Invoke();
            //    }
            //};
            //app.UseOcelot(ocelotConfig).Wait();
            app.UseOcelot().Wait();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }

        private void ConfigureAuthentication(IServiceCollection services, TokenSetting tokenSetting)
        {
            var key = Encoding.ASCII.GetBytes(tokenSetting.SecretKey);
            string authenticationProviderKey = tokenSetting.ProviderKey;
            string[] audiences = tokenSetting.Audiences.Split(";");

            services.AddAuthentication()
               .AddJwtBearer(authenticationProviderKey, options =>
               {
                   options.Audience = tokenSetting.Audiences;
                   options.RequireHttpsMetadata = false;
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
                   options.SaveToken = true;
                   options.Events = new JwtBearerEvents()
                   {
                       OnAuthenticationFailed = context =>
                       {
                           context.NoResult();
                           context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                           context.Response.ContentType = "application/json";

                           string response = JsonConvert.SerializeObject(Constant.Exception_UnAuthorized);// "The access token provided is not valid.");
                           if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                           {
                               context.Response.Headers.Add("Token-Expired", "true");
                               response = JsonConvert.SerializeObject(Constant.Exception_UnAuthorized); // "The access token provided has expired.");
                           }
                           context.Response.WriteAsync(response);
                           return Task.CompletedTask;
                       },
                       OnTokenValidated = context =>
                       {
                           var identity = context.Principal.Identity;
                           var claimsIdentity = (ClaimsIdentity)context.Principal.Identity;

                           //options.SecurityTokenValidators.Clear();

                           //if you are not satisfied with the validation, fail the request using the below commented code
                           //context.Fail(Constant.Exception_Forbidden);

                           //otherwise succeed the request
                           return Task.CompletedTask;
                       },
                       OnMessageReceived = async context =>
                        {
                            int i = 0;
                        }
                   };
               });
        }

        #endregion /Methods

    }
}
