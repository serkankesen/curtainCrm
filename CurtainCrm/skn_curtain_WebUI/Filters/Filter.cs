using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace skn_curtain_WebUI.Filters
{
    public static class UrlHelper
    {
        public static string GetUrlChar(string str)
        {
            str = string.IsNullOrEmpty(str) ? "" : str;
            str = str.ToLower();
            string[] chars = new string[] { "ç", "ğ", "ı", "ö", "ş", "ü", " ", "/", "&", " ", "+", "?", ".", ",", "\"", "!", ":", "'", "’", "”", "“" };
            string[] charsReplace = new string[] { "c", "g", "i", "o", "s", "u", "-", "-", "-", "-", "-", "-", "-", "", "", "", "", "", "", "", "" };
            for (int i = 0; i < chars.Length; i++)
            {
                str = str.ToLower().Replace(chars[i], charsReplace[i]);
            }
            return str;
        }

        public static string RemoveInvalidChars(this string input)
        {

            var chars = new List<string> { "^", "~", "<", ">", "/", ";", "|", "(", ")" };

            return chars.Aggregate(input, (current, chr) => current.Replace(chr, string.Empty));

        }
    }
}