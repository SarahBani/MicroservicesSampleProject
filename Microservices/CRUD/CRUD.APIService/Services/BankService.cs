using CRUD.APIService.Entities;
using CRUD.APIService.Helpers;
using CRUD.APIService.Models;
using CRUD.APIService.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CRUD.APIService.Services
{
    public class BankService : BaseService<IBankRepository, Bank, int>, IBankService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BankService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public async Task<string> GetLogoUrlByIdAsync(int id) =>
            (await base.GetByIdAsync(id)).LogoUrl;

        public Task<int> GetCountAsync() => base.GetCountAsync();

        public Task<IList<Bank>> GetListAsync(Page page = null)
        {
            var list = base.GetQueryable();
            if (page != null)
            {
                list = list.Skip(page.FirstRowIndex).Take(page.Count);
            }
            return list.ToIListAsync();
        }

        public async void MoveLogoFile(string logoUrl)
        {
            string gatewayUrl = base.EntityService.Configuration.GetSection(Constant.AppSettings_GatewayUrl).Value;
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add(HttpRequestHeader.Authorization.ToString(), base.EntityService.HttpContext.Request.Headers["Authorization"].ToString());

                var request = new HttpRequestMessage(HttpMethod.Post, $"{gatewayUrl}/MoveBankLogo");
                request.Content = new StringContent(JsonConvert.SerializeObject(logoUrl),
                    Encoding.UTF8,
                    "application/json"); // CONTENT-TYPE header
                await client.SendAsync(request);
            }
        }

        public async void DeleteLogoFile(string logoUrl)
        {
            //try
            //{
            string gatewayUrl = base.EntityService.Configuration.GetSection(Constant.AppSettings_GatewayUrl).Value;
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add(HttpRequestHeader.Authorization.ToString(), base.EntityService.HttpContext.Request.Headers["Authorization"].ToString());

                var request = new HttpRequestMessage(HttpMethod.Delete, $"{gatewayUrl}/DeleteBankLogo");
                request.Content = new StringContent(JsonConvert.SerializeObject(logoUrl),
                    Encoding.UTF8,
                    "application/json"); // CONTENT-TYPE header
                await client.SendAsync(request);
                //HttpResponseMessage response = await client.SendAsync(request);

                //await client.SendAsync(request)
                //    .ContinueWith(responseTask =>
                //    {
                //        Console.WriteLine("Response: {0}", responseTask.Result);
                //    });
                //if (response.IsSuccessStatusCode)
                //{
                //    return Ok();
                //}
                //else
                //{
                //}
            }
            //}
            //catch (Exception e)
            //{
            //    return Problem(result.ExceptionContentResult);
            //}
        }

        #endregion /Methods

    }
}