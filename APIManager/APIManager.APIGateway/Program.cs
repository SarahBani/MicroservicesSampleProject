using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Net;
using System.Security.Authentication;

namespace APIManager.WebAPIGateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            //CreateWebHostBuilder(args).Build().Run();
        }

        //public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        //  WebHost.CreateDefaultBuilder(args)
        //      .UseStartup<Startup>()
        //      .ConfigureKestrel((a, b) => {
        //          int i = 24;
        //      });

        public static IHostBuilder CreateHostBuilder(string[] args) =>
             Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            })
            //.ConfigureWebHostDefaults(webBuilder =>
            //{
            //    webBuilder.ConfigureKestrel((context, options) =>
            //    {
            //        options.ConfigureHttpsDefaults(co => co.SslProtocols = SslProtocols.Tls12);
            //        //    // development options for kestrel
            //        //    //if (context.HostingEnvironment.IsDevelopment())
            //        //    //{
            //        options.Listen(IPAddress.Loopback, 5100);
            //        options.Listen(IPAddress.Loopback, 5101, listenOptions =>
            //        {
            //            listenOptions.Protocols = HttpProtocols.Http1;
            //            listenOptions.UseHttps(@"G:\MyCertificate.pfx", "123456", httpsOptions =>
            //            {
            //                httpsOptions.SslProtocols = SslProtocols.Tls12;
            //            });
            //            //        //listenOptions.UseHttps(@"G:\MyCertificate.pfx", "123456");
            //        });
            //        //}
            //    });
            //    webBuilder.UseStartup<Startup>();
            //})
            .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                        .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
                });
        //.ConfigureAppConfiguration((host, config) =>
        //{
        //    config.AddJsonFile("configuration.json");
        //});

    }
}
