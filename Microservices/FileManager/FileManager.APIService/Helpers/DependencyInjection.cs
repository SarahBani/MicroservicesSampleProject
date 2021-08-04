using FileManager.APIService.Services;
using Microsoft.Extensions.DependencyInjection;

namespace FileManager.APIService.Helpers
{
    public static class DependencyInjection
    {

        public static IServiceCollection SetInjection(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddScoped(typeof(IFileManagerService), typeof(FileManagerService));

            return services;
        }

    }
}
