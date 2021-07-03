using Identity.APIService.Models;
using Microsoft.Extensions.Configuration;

namespace Identity.APIService.AppConfig
{
    public class AppConfiguration
    {

        #region Properties

        public readonly string _connectionString = string.Empty;
        public string ConnectionString => _connectionString;

        #endregion /Properties

        #region Constructors

        public AppConfiguration()
        {
            var root = new ConfigurationBuilder().Build();
            this._connectionString = root
                .GetSection(Constant.AppSettings_ConnectionString)
                .GetSection(Constant.AppSettings_DefaultConnection).Value;
        }

        #endregion /Constructors

    }
}
