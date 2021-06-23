using Microsoft.Extensions.Configuration;
using System;
using System.Linq.Expressions;

namespace Common
{
    public static class Utility
    {

        public static string GetConnectionString(IConfiguration config, string connectionName)
        {
            return config.GetConnectionString(connectionName);
        }

        public static T GetApplicationSettingSecion<T>(IConfiguration config)
            where T : class, ISetting => config.GetSection(typeof(T).Name).Get<T>();

        public static string GetApplicationSetting(IConfiguration config, string key) =>
            config.GetSection(key).Value;

        public static Expression<Func<T, K>> GetRelatedPropertyExpression<T, K>(string property)
        {
            var param = Expression.Parameter(typeof(T), "q");
            var body = Expression.PropertyOrField(param, property);
            var lambda = Expression.Lambda<Func<T, K>>(body, param);

            return lambda;
        }

    }
}
