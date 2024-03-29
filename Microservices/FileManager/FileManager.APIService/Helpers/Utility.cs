﻿using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace FileManager.APIService.Helpers
{
    public static class Utility
    {

        #region Image

        public static string UploadImage(IFormFile file, string subFolderName) =>
            UploadFile(file, Path.Combine("Images", subFolderName));

        public static string UploadFile(IFormFile file, string resourceFolderPath)
        {
            string directoryRelativePath = Path.Combine("Resources", resourceFolderPath);
            string directoryFullPath = Path.Combine(Directory.GetCurrentDirectory(), directoryRelativePath);
            string fileName = GetUniqueFileName(file.FileName);
            if (!Directory.Exists(directoryFullPath))
            {
                Directory.CreateDirectory(directoryFullPath);
            }
            string fileFullPath = Path.Combine(directoryFullPath, fileName);
            using (var stream = new FileStream(fileFullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            //string fileRelativePath = Path.Combine(directoryRelativePath, fileName);
            //return fileRelativePath;
            return fileName;
        }

        public static void DeleteFile(string fileRelativePath)
        {
            var fileFullPath = Path.Combine(Directory.GetCurrentDirectory(), fileRelativePath);
            if (File.Exists(fileFullPath))
            {
                File.Delete(fileFullPath);
            }
        }

        public static void DeleteFolder(string relativePath)
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), relativePath);
            if (Directory.Exists(fullPath))
            {
                Directory.Delete(fullPath, true);
            }
        }

        private static string GetUniqueFileName(string fileName)
        {
            string fullFileName = Path.GetFileName(fileName);
            return $"{ Guid.NewGuid().ToString() + Path.GetExtension(fullFileName) }";
        }

        /// <summary>
        /// If you want to save the file as bytearray/varbinary to your database, 
        /// you may convert the IFormFile object to byte array like this
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static byte[] GetByteArrayFromImage(IFormFile file)
        {
            using (var target = new MemoryStream())
            {
                file.CopyTo(target);
                return target.ToArray();
            }
        }

        // Resize an Image File   
        public static Bitmap ResizeImage(Stream fileStream, int width, int height)
            => ResizeImage(new Bitmap(fileStream), width, height);

        // Resize an Image File with preserve aspect ratio
        public static Bitmap ResizeRatioImage(Stream fileStream, int maxWidth, int maxHeight)
            => ResizeRatioImage(new Bitmap(fileStream), maxWidth, maxHeight);

        // Resize a Bitmap   
        public static Bitmap ResizeImage(Bitmap image, int width, int height)
        {
            Bitmap resizedImage = new Bitmap(width, height, PixelFormat.Format32bppRgb);
            using (Graphics gfx = Graphics.FromImage(resizedImage))
            {
                gfx.DrawImage(image, new Rectangle(0, 0, width, height),
                                     new Rectangle(0, 0, image.Width, image.Height), GraphicsUnit.Pixel);
            }
            image.Dispose();
            return resizedImage;
        }

        // Resize a Bitmap with preserve aspect ratio   
        public static Bitmap ResizeRatioImage(Bitmap image, int maxWidth, int maxHeight)
        {
            int newWidth = maxWidth;
            int newHeight = maxHeight;
            if ((decimal)image.Width / (decimal)maxWidth > (decimal)image.Height / (decimal)maxHeight)
            {
                newWidth = maxWidth;
                newHeight = (int)Math.Round((maxWidth / (double)image.Width) * image.Height);
            }
            else
            {
                newHeight = maxHeight;
                newWidth = (int)Math.Round((maxHeight / (double)image.Height) * image.Width);
            }

            Bitmap resizedImage = new Bitmap(newWidth, newHeight, PixelFormat.Format32bppRgb);
            using (Graphics gfx = Graphics.FromImage(resizedImage))
            {
                gfx.DrawImage(image, new Rectangle(0, 0, newWidth, newHeight),
                                     new Rectangle(0, 0, image.Width, image.Height), GraphicsUnit.Pixel);
            }
            image.Dispose();
            return resizedImage;
        }

        public static byte[] BitmapToBytes(Bitmap image)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                image.Save(stream, ImageFormat.Png);
                return stream.ToArray();
            }
        }

        #endregion /Image

    }
}
