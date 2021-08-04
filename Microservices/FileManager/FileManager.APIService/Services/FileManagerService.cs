using FileManager.APIService.Helpers;
using FileManager.APIService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace FileManager.APIService.Services
{
    public class FileManagerService : IFileManagerService
    {

        #region Properties

        private readonly IConfiguration _configuration;

        #endregion /Properties

        #region Constructors

        public FileManagerService(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        #endregion /Constructors

        #region Methods

        public string UploadImage(IFormFile file, string subFolderName)
        {
            string filePath = Utility.UploadImage(file, subFolderName + "/Temp");
            return filePath;
        }

        public void DeleteFile(string filePath)
        {
            Utility.DeleteFile(filePath);
        }

        /// <summary>
        /// Delete uploaded files older than the specific time
        /// </summary>
        /// <param name="subFolderName"></param>
        public void DeleteOldFiles(string directoryPath)
        {
            int uploadDeadlineMinutes = int.Parse(this._configuration.GetSection(Constant.AppSettings_FileUploadDeadline).Value);
            foreach (string fileName in Directory.GetFiles(directoryPath))
            {
                var fileInfo = new FileInfo(fileName);
                if (fileInfo.LastAccessTime < DateTime.Now.AddMinutes(-uploadDeadlineMinutes))
                {
                    fileInfo.Delete();
                }
            }
        }

        public void MoveFile(string sourcePath, string destinationPath)
        {
            File.Move(sourcePath, destinationPath, true);
        }

        #endregion /Methods

    }
}
