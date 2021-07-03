using Identity.APIService.Repository;
using Identity.APIService.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Identity.APIService.Helpers
{
    public static class DependencyInjection
    {

        public static IServiceCollection SetInjection(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IAuthService), typeof(AuthService));

            return services;
        }

    }
}
