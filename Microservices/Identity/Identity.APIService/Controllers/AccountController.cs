using Authentication.WebAPIService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Identity.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public AccountController()
        {
        }

        #endregion /Constructors

        #region Actions

        #endregion /Actions

    }
}
