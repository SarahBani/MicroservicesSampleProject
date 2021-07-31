using FileManager.APIService.Helpers;
using FileManager.APIService.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace FileManager.APIService.Controllers
{
    [ApiController]
    public abstract class BaseUploaderAPIController : ControllerBase
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
                    this.FilePath = Utility.UploadImage(file, subFolderName + "/Temp");
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

        protected IActionResult DeleteFile(string filePath)
        {
            try
            {
                Utility.DeleteFile(filePath);
                return Ok();
            }
            catch
            {
                return Problem(Constant.Exception_DeleteFileProblem);
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

        /// <summary>
        /// Delete uploaded files older than one hour
        /// </summary>
        /// <param name="subFolderName"></param>
        protected void DeleteOldImages(string subFolderName)
        {
            string tempDirectoryPath = $"Resources/Images/{subFolderName}/Temp";
            foreach (string fileName in Directory.GetFiles(tempDirectoryPath))
            {
                var fileInfo = new FileInfo(fileName);
                if (fileInfo.LastAccessTime < DateTime.Now.AddHours(-1)) { 
                    fileInfo.Delete();
                }
            }
        }

        protected IActionResult MoveTempFile(string filePath)
        {
            try
            {
                string destFilePath = filePath.Replace("/Temp", "");
                System.IO.File.Move(filePath, destFilePath, true);
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
