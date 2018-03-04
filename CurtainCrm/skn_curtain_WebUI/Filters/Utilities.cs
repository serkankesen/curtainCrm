using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;


namespace skn_curtain_WebUI.Filters
{
    public class ImageProcessor
    {
        public Bitmap Resize(Bitmap image, int newWidth, int newHeight)
        {
            try
            {

                Size newSize = new Size(newWidth, newHeight);
                Bitmap newImage = ResizeImage(image, newSize);
                return newImage;


            }
            catch (Exception exc)
            {
                throw exc;
            }
        }
        public Bitmap ResizeImage(Bitmap imgToResize, Size size)
        {
            int sourceWidth = imgToResize.Width;
            int sourceHeight = imgToResize.Height;

            float nPercent = 0;
            float nPercentW = 0;
            float nPercentH = 0;

            nPercentW = ((float)size.Width / (float)sourceWidth);
            nPercentH = ((float)size.Height / (float)sourceHeight);

            if (nPercentH < nPercentW)
                nPercent = nPercentH;
            else
                nPercent = nPercentW;

            int destWidth = (int)(sourceWidth * nPercent);
            int destHeight = (int)(sourceHeight * nPercent);

            Bitmap b = new Bitmap(destWidth, destHeight);

            using (Graphics g = Graphics.FromImage(b))
            {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;

                g.DrawImage(imgToResize, 0, 0, destWidth, destHeight);
            }



            return (Bitmap)b;
        }



    }
}