using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace skn_curtain_WebUI.Models
{
    public class InitializerModels
    {
        public class PageInfo
        {
            public int totalItems { get; set; }
            public int currentPage { get; set; }
            public int pageSize { get; set; }
        }
    }
}