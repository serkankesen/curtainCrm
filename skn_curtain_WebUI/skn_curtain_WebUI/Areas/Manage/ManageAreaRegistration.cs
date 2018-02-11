using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace skn_curtain_WebUI.Areas.Manage
{
    public class ManageAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Manage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
           
            context.MapRoute(
                "Manage_default",
                "Manage/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new string[] { "skn_curtain_WebUI.Areas.Manage.Controllers" });
        }
    }
}