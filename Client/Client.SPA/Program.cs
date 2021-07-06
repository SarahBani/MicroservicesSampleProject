using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Hosting;
using System.Net;

namespace Client.SPA
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    //webBuilder.ConfigureKestrel((context, options) =>
                    // {
                    //     // development options for kestrel
                    //     if (context.HostingEnvironment.IsDevelopment())
                    //     {
                    //         options.Listen(IPAddress.Any, 5000);  // http:localhost:5000
                    //         options.Listen(IPAddress.Any, 5001, listenOptions =>
                    //         {
                    //             listenOptions.Protocols = HttpProtocols.Http1;   // force http1 during dev.
                    //             ////install certificate with private key
                    //             //listenOptions.UseHttps(@"S:\Certs\SSL\example.com.pfx", "1234567", httpsOptions =>
                    //             //{
                    //             //    httpsOptions.SslProtocols = SslProtocols.Tls;
                    //             //});
                    //         });
                    //     }
                    // });
                    //webBuilder.ConfigureKestrel(serverOptions =>
                    //{
                    //    serverOptions.Listen(IPAddress.Loopback, 5000, cfg =>
                    //    {
                    //        cfg.Protocols = HttpProtocols.Http1;
                    //    });
                    //    serverOptions.Listen(IPAddress.Loopback, 5001, cfg =>
                    //    {
                    //        cfg.Protocols = HttpProtocols.Http1;
                    //    });
                    //});
                    //webBuilder.UseKestrel(options =>
                    //{
                    //    options.ConfigureEndpointDefaults(listenOptions =>
                    //    {
                    //        listenOptions.Protocols = HttpProtocols.Http1;
                    //    });
                    //    options.Listen(IPAddress.Loopback, 5000);
                    //    options.Listen(IPAddress.Loopback, 5001, options =>
                    //    {
                    //        options.UseHttps();
                    //    });
                    //    ////HTTP 5000
                    //    //options.ListenLocalhost(5000);
                    //    ////HTTPS 5001
                    //    //options.ListenLocalhost(5001, options =>
                    //    //{
                    //    //    options.UseHttps();
                    //    //});
                    //});
                    webBuilder.UseStartup<Startup>();
                });
    }
}
