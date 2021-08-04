using FileManager.APIService.Models;
using FileManager.APIService.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.APIService.Controllers
{
    [ApiController]
    public abstract class BaseUploaderAPIController : ControllerBase
    {

        #region Properties

        private readonly IFileManagerService _fileManagerService;

        #endregion /Properties

        #region Constructors

        public BaseUploaderAPIController(IFileManagerService fileManagerService)
        {
            this._fileManagerService = fileManagerService;
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
                    string filePath = this._fileManagerService.UploadImage(file, subFolderName);
                    return Ok(filePath);
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

        protected IActionResult DeleteFile(string filePath)
        {
            try
            {
                this._fileManagerService.DeleteFile(filePath);
                return Ok();
            }
            catch
            {
                return Problem(Constant.Exception_DeleteFileProblem);
            }
        }

        protected void DeleteOldImages(string subFolderName)
        {
            string tempDirectoryPath = $"Resources/Images/{subFolderName}/Temp";
            this._fileManagerService.DeleteOldFiles(tempDirectoryPath);
        }

        protected IActionResult MoveTempFile(string filePath)
        {
            try
            {
                string destFilePath = filePath.Replace("/Temp", "");
                this._fileManagerService.MoveFile(filePath, destFilePath);
                return Ok();
            }
            catch
            {
                return Problem(Constant.Exception_MoveFileProblem);
            }
        }

        #endregion /Methods

    }
}
