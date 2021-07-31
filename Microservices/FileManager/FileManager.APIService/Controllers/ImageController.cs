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
            base.DeleteOldImages("Banks");
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

        // DELETE: api/Image/DeleteBankLogo
        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteBankLogo")]
        public IActionResult DeleteBankLogo([FromBody] string logoName)
        {
            string logoPath = $"Resources/Images/Banks/{logoName}";
            return base.DeleteFile(logoPath);
        }

        // POST: api/Image/MoveBankLogo
        [Authorize(Roles = "Admin")]
        [HttpPost("MoveBankLogo")]
        public IActionResult MoveBankLogo([FromBody] string logoName)
        {
            string logoPath = $"Resources/Images/Banks/Temp/{logoName}";
            return base.MoveTempFile(logoPath);
        }

        #endregion /Actions

    }
}
