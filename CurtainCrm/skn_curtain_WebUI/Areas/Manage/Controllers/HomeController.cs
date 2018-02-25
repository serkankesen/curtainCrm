using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;
using skn_curtain_WebUI.Filters;

namespace skn_curtain_WebUI.Areas.Manage.Controllers
{
    public class HomeController : Controller
    {
        [ConnectionContext]
        
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult LogOff()
        {
            AuthenticationManager.SignOut();

            return Json(new { success = true, returnurl = "serkankesen.com" }, JsonRequestBehavior.AllowGet);
        }
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
    }
}
