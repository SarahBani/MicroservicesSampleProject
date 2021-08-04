using Microsoft.AspNetCore.Http;

namespace FileManager.APIService.Services
{
    public interface IFileManagerService
    {

        string UploadImage(IFormFile file, string subFolderName);

        void DeleteFile(string filePath);

        void DeleteOldFiles(string directoryPath);

        void MoveFile(string sourcePath, string destinationPath);

    }
}
