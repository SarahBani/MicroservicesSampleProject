using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.APIService.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : BaseUploaderAPIController
    {

        #region Constructors

        public ImageController()
        {
        }

        #endregion /Constructors

        #region Actions

        // POST: api/Image/UploadBankLogo
        [Authorize(Roles = "Admin")]
        [HttpPost("UploadBankLogo"), DisableRequestSizeLimit]
        public IActionResult UploadBankLogo()
        {
            return base.UploadImage("Banks");
        }

        #endregion /Actions

    }
}
