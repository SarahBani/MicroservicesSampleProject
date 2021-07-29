using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Identity.APIService.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class AccountController : BaseAPIController
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
