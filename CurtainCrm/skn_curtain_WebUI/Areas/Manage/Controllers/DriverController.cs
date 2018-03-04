using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using skn_curtain_WebUI.Filters;
using UrlHelper = skn_curtain_WebUI.Filters.UrlHelper;

namespace skn_curtain_WebUI.Areas.Manage.Controllers
{
    public class DriverController : Controller
    {
        [HttpPost]
        public JsonResult MultiImageUpload()
        {
            try
            {
                string[] arr1 = new string[] { ".jpeg", ".jpg", ".png", ".JPEG", ".JPG", ".PNG", ".PDF", ".pdf", ".doc", ".docx", ".gif", ".GIF" };
                foreach (string file in Request.Files)
                {
                    var hpf = Request.Files[file];
                    var filename = Regex.Split(hpf.FileName, @"\.")[0];
                    var guid = UrlHelper.GetUrlChar(Filters.UrlHelper.RemoveInvalidChars(filename));

                    var path = Server.MapPath(skn_curtain_Core.Properties.System.Default.ImageFolderPath);
                    var isfilename = Directory.EnumerateFiles(path).Any(f => f.IndexOf(guid, StringComparison.OrdinalIgnoreCase) > 0);
                    if (isfilename)
                    {
                        guid = guid + "-" + DateTime.Now.Day + DateTime.Now.Millisecond;
                    }
                    
                    var fileFolderPathThumb = Server.MapPath(skn_curtain_Core.Properties.System.Default.ThumbFolderPath);
                    var extension = Path.GetExtension(hpf.FileName);
                    var savedFileName = Path.Combine(path, guid + extension);
                    var filePathThumb = skn_curtain_Core.Properties.System.Default.ThumbVirtualPath;


                    if ((!(hpf.ContentLength >= 0 && hpf.ContentLength < 2000000) || !arr1.Contains(Path.GetExtension(hpf.FileName))))
                    {
                        if (extension != null && !(extension.ToLower().Contains(".pdf") || extension.ToLower().Contains(".doc") || extension.ToLower().Contains(".docx")))
                        {
                            return Json(new { isValid = false, message = "Dosya formatınız geçerli değil veya boyut geçerli değil.", name = hpf.FileName });

                        }

                        hpf.SaveAs(savedFileName);

                        var orgImage = new Bitmap(savedFileName);
                        ResizeAndSaveImages(orgImage, fileFolderPathThumb, guid + extension, _thumbImageWidth, _thumbImageHeight, hpf.InputStream);

                        //foo.Add(new { isValid = true, message = "Dosya eklenmiştir.", name = guid + extension, path = savedFileName });
                        return Json(new
                        {
                            isValid = true,
                            message = "Dosya eklenmiştir.",
                            name = guid + extension,
                            FileName = skn_curtain_Core.Properties.System.Default.ImageVirtualPath + guid + extension,
                            path = skn_curtain_Core.Properties.System.Default.ImageFolderPath + guid + extension,
                            isMain = false
                        }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        hpf.SaveAs(savedFileName);

                        var orgImage = new Bitmap(savedFileName);
                        ResizeAndSaveImages(orgImage, fileFolderPathThumb, guid + extension, _thumbImageWidth, _thumbImageHeight, hpf.InputStream);

                        //foo.Add(new { isValid = true, message = "Dosya eklenmiştir.", name = guid + extension, path = savedFileName });
                        return Json(new
                        {
                            isValid = true,
                            message = "Dosya eklenmiştir.",
                            name = guid + extension,
                            FileName = skn_curtain_Core.Properties.System.Default.ImageVirtualPath + guid + extension,
                            path = skn_curtain_Core.Properties.System.Default.ImageFolderPath + guid + extension,
                            isMain = false
                        }, JsonRequestBehavior.AllowGet);
                    }
                }
                return Json(new { isValid = false, message = "Dosya bulunamadı.", name = "Dosya bulunamadı.", path = "Dosya bulunamadı." }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { isValid = false, message = "Beklenmedik bir hata oluştu." });
            }

        }
        
      

        public void RemoveImage(string name)
        {
            try
            {
                GC.Collect();
                GC.WaitForPendingFinalizers();
                if (string.IsNullOrEmpty(name)) throw new ArgumentNullException();
                if (System.IO.File.Exists(Server.MapPath(skn_curtain_Core.Properties.System.Default.ImageFolderPath + name)))
                {
                    System.IO.File.Delete(Server.MapPath(skn_curtain_Core.Properties.System.Default.ThumbFolderPath + name));

                }
            }
            catch (Exception)
            {
                Response.StatusCode = 500;
                throw;
            }
        }

        #region ImageResizer
        private int _smallImageWidth = 200;
        private int _smallImageHeight = 150;

        private int _mediumImageWidth = 400;
        private int _mediumImageHeight = 300;

        private int _thumbImageWidth = 100;
        private int _thumbImageHeight = 100;

        private int _mainSliderImageWidth = 700;
        private int _mainSliderImageHeight = 400;

        private int _miniSliderImageWidth = 700;
        private int _miniSliderImageHeight = 400;

        private int _subImageWidth = 700;
        private int _subImageHeight = 400;

        private void ResizeAndSaveImages(Bitmap orgImage, string filePath, string fileName, int width, int height,
                                        Stream imageBuffer)
        {
            try
            {
                var image = Image.FromStream(imageBuffer);
                var oldWidth = image.Width;
                var oldHeight = image.Height;
                var maxSide = oldWidth >= oldHeight ? oldWidth : oldHeight;
                var maxSideSize = width >= height ? width : height;
                int newWidth, newHeight;
                Bitmap newImage;
                if (maxSide > maxSideSize)
                {
                    double coeficient = maxSideSize / (double)maxSide;
                    newWidth = Convert.ToInt32(coeficient * oldWidth);
                    newHeight = Convert.ToInt32(coeficient * oldHeight);
                }
                else
                {
                    newWidth = oldWidth;
                    newHeight = oldHeight;
                }
                newImage = new Bitmap(image, newWidth, newHeight);
                var imageProcessor = new ImageProcessor();
                var imgConverter = new ImageConverter();
                Image img = imageProcessor.Resize(newImage, width, height);

                var bytes = (byte[])imgConverter.ConvertTo(img, typeof(byte[]));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                if (bytes != null) System.IO.File.WriteAllBytes(filePath + fileName, bytes);
            }
            catch (Exception exc)
            {
                ViewBag.ErrorMessage = "Haber fotoğraf boyutları yükenirken hata oluştu. HATA :" + exc.Message;
            }
        }
        #endregion
    }
}