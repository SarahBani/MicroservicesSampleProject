using CRUD.APIService.Helpers;
using CRUD.APIService.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.APIService.Controllers
{
    public abstract class BaseUploaderAPIController : BaseAPIController
    {

        #region Properties

        [TempData]
        public string FilePath { get; set; }

        #endregion /Properties

        #region Constructors

        public BaseUploaderAPIController()
        {
        }

        #endregion /Constructors

        #region Methods

        protected IActionResult UploadImage(string subFolderName)
        {
            try
            {
                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeletePreviousFile();
                    this.FilePath = Utility.UploadImage(file, subFolderName);
                    return Ok(this.FilePath);
                }
                else
                {
                    return BadRequest(Constant.Exception_EmptyFile);
                }
            }
            catch 
            {
               return Problem(Constant.Exception_UploadFileProblem);
            }
        }

        protected void DeletePreviousFile()
        {
            if (!string.IsNullOrEmpty(this.FilePath))
            {
                Utility.DeleteFile(this.FilePath);
                this.FilePath = string.Empty;
            }
        }

        #endregion /Methods

    }
}
