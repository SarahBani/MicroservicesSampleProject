using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Identity.APIService.Services;
using Identity.APIService.Models;
using Microsoft.AspNetCore.Authorization;
using Authentication.WebAPIService.Models;

namespace Identity.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    [Authorize]

    public class AuthenticationController : BaseAPIController
    {

        #region Properties

        private readonly IAuthService _authService;

        #endregion /Properties

        #region Constructors

        public AuthenticationController(IAuthService authService)
        {
            this._authService = authService;
        }

        #endregion /Constructors

        #region Actions

        // POST: api/Account/Login
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserCredentialModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var transactionResult = await this._authService.LoginAsync(model.Username, model.Password);
            if (transactionResult.IsSuccessful)
            {
                string token = transactionResult.Content.ToString();
                return Ok(token);
            }
            else
            {
                //return BadRequest(transactionResult.ExceptionContentResult);
                return Unauthorized(transactionResult.ExceptionContentResult);
            }
        }

        // POST: api/Account/Register
        [HttpPost]
        [Route("Register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegistrationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await this._authService.RegisterAsync(model.ConvertToUser(), model.Password);
            if (result.IsSuccessful)
            {
                return Ok();
            }
            else
            {
                return BadRequest(result.ExceptionContentResult);
            }
        }

        // PUT api/Account/ChangePassword
        [HttpPut]
        [Route("ChangePassword")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] PasswordChangeModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await this._authService.ChangePasswordAsync(model.UsertName, model.OldPassword, model.NewPassword);
            if (result.IsSuccessful)
            {
                return Ok();
            }
            else
            {
                return BadRequest(result.ExceptionContentResult);
            }
        }

        #endregion /Actions

    }
}
