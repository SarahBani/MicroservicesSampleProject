using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using CRUD.APIService.Entities;
using CRUD.APIService.Models;
using CRUD.APIService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace CRUD.APIService.Controllers
{
    [Route("api/[controller]")]
    public class BankController : BaseAPIController
    {

        #region Properties

        private readonly IConfiguration _configuration;
        private readonly IBankService _bankService;

        #endregion /Properties

        #region Constructors

        public BankController(IConfiguration configuration, IBankService bankService)
        {
            this._configuration = configuration;
            this._bankService = bankService;
        }

        #endregion /Constructors

        #region Actions

        // GET: api/Bank
        [HttpGet]
        [ProducesResponseType(typeof(IList<Bank>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetListAsync(short? pageNo, short? pageCount)
        {
            var banks = await this._bankService.GetListAsync(GetPage(pageNo, pageCount));
            return Ok(banks);
        }

        // GET: api/Bank/Count
        [HttpGet("Count")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCountAsync()
        {
            int count = await this._bankService.GetCountAsync();
            return Ok(count);
        }

        // GET: api/Bank/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(Bank), StatusCodes.Status200OK)]
        //[ActionName(nameof(GetByIdAsync))]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var bank = await this._bankService.GetByIdAsync(id);
            if (bank != null)
            {
                return Ok(bank);
            }
            else
            {
                return NotFound();
            }
        }

        // POST: api/Bank
        //[Authorize(Roles = nameof(RoleEnum.Admin))]
        [Authorize(Roles = "Admin")]
        [Authorize(Policy = "ApiUser")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostAsync([FromBody] Bank bank)
        {
            if (bank == null)
            {
                return new NoContentResult();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await this._bankService.InsertAsync(bank);
            if (result.IsSuccessful)
            {
                if (!string.IsNullOrEmpty(bank.LogoUrl))
                {
                    MoveLogoFile(bank.LogoUrl);
                }
                return CreatedAtAction("GetById", new
                {
                    controller = "bank",
                    id = bank.Id
                }, bank);
                //    return CreatedAtAction(nameof(GetByIdAsync), new
                //    {
                //        controller = "bank",
                //        id = bank.Id
                //    }, bank);
            }
            return Problem(result.ExceptionContentResult);
        }

        // PUT: api/Bank
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutAsync([FromBody] Bank bank)
        {
            if (bank == null)
            {
                return new NoContentResult();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (bank.Id <= 0)
            {
                return BadRequest(Constant.Exception_InvalidModelState);
            }
            string prevLogoUrl = await this._bankService.GetLogoUrlByIdAsync(bank.Id);
            var result = await this._bankService.UpdateAsync(bank);
            if (result.IsSuccessful)
            {
                if (prevLogoUrl != bank.LogoUrl)
                {
                    DeleteLogoFile(prevLogoUrl);
                }
                if (!string.IsNullOrEmpty(bank.LogoUrl))
                {
                    MoveLogoFile(bank.LogoUrl);
                }
                return Ok();
            }
            return Problem(result.ExceptionContentResult);
        }

        // DELETE: api/Bank/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            if (id <= 0)
            {
                return BadRequest(Constant.Exception_InvalidModelState);
            }
            string logoUrl = await this._bankService.GetLogoUrlByIdAsync(id);
            var result = await this._bankService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                if (!string.IsNullOrEmpty(logoUrl))
                {
                    DeleteLogoFile(logoUrl);
                }
                return Ok();
            }
            return Problem(result.ExceptionContentResult);
        }

        //// POST: api/Bank/UploadLogo
        //[Authorize(Roles = "Admin")]
        //[HttpPost("UploadLogo"), DisableRequestSizeLimit]
        //public IActionResult UploadLogo()
        //{
        //    return base.UploadImage("Banks");
        //}

        private async void MoveLogoFile(string logoUrl)
        {
            string gatewayUrl = this._configuration.GetSection(Constant.AppSettings_GatewayUrl).Value;
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add(HttpRequestHeader.Authorization.ToString(), HttpContext.Request.Headers["Authorization"].ToString());

                var request = new HttpRequestMessage(HttpMethod.Post, $"{gatewayUrl}/MoveBankLogo");
                request.Content = new StringContent(JsonConvert.SerializeObject(logoUrl),
                    Encoding.UTF8,
                    "application/json"); // CONTENT-TYPE header
                await client.SendAsync(request);
            }
        }

        private async void DeleteLogoFile(string logoUrl)
        {
            //try
            //{
            string gatewayUrl = this._configuration.GetSection(Constant.AppSettings_GatewayUrl).Value;
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add(HttpRequestHeader.Authorization.ToString(), HttpContext.Request.Headers["Authorization"].ToString());

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

        #endregion /Actions

    }
}
