using System.Collections.Generic;
using System.Threading.Tasks;
using CRUD.APIService.Entities;
using CRUD.APIService.Models;
using CRUD.APIService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.APIService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BankController : ControllerBase
    {

        #region Properties

        private readonly IBankService _bankService;

        #endregion /Properties

        #region Constructors

        public BankController(IBankService bankService)
        {
            this._bankService = bankService;
        }

        #endregion /Constructors

        #region Actions

        // GET: api/Bank
        [HttpGet]
        [ProducesResponseType(typeof(IList<Bank>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllAsync()
        {
            var banks = await this._bankService.GetAllAsync();
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
        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
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
                return CreatedAtAction(nameof(GetByIdAsync), new
                {
                    id = bank.Id
                }, bank);
            }
            return BadRequest(result.ExceptionContentResult);
        }

        // PUT: api/Bank
        [Authorize]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
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
            var result = await this._bankService.UpdateAsync(bank);
            if (result.IsSuccessful)
            {
                return Ok();
            }
            return BadRequest(result.ExceptionContentResult);
        }

        // DELETE: api/Bank/5
        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            if (id <= 0)
            {
                return BadRequest(Constant.Exception_InvalidModelState);
            }
            var result = await this._bankService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                return Ok();
            }
            return BadRequest(result.ExceptionContentResult);
        }

        #endregion /Actions

    }
}
