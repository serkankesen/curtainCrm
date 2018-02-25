using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using skn_curtain_WebUI.App_Start;
using skn_curtain_WebUI.Models;

namespace skn_curtain_WebUI.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]

    public class ConnectionContext : ActionFilterAttribute
    {


        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var usermanager = filterContext.HttpContext.GetOwinContext().Get<ApplicationUserManager>();
                //yönledirdiğimiz sayfada maneul oturum açmmasını sağlamak amacıyla kullanıyoruz
            var singinmanager = filterContext.HttpContext.GetOwinContext().Get<ApplicationSignInManager>();




            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {

                if (filterContext.HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName] != null)
                    //authentice olamamış olan kullancının giriş bilgileri ticket de varmı kontrolü
                {
                    var authCookie =
                        filterContext.HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName];

                    if (authCookie != null)
                    {
                        var authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                        var serializer = new JavaScriptSerializer();

                        if (authTicket != null)
                        {
                            var loginviewmodel = serializer.Deserialize<LoginViewModel>(authTicket.UserData);

                            var user = usermanager.Find(loginviewmodel.Email, loginviewmodel.Password);

                            try
                            {

                                singinmanager.SignIn(user, false, false);
                                if (filterContext.HttpContext.Request.Url != null)

                                    filterContext.Result = new RedirectResult("/manage#/customers");

                            }
                            catch (Exception)
                            {
                                filterContext.Result = new RedirectResult("~/Account/Login");
                            }
                        }
                    }


                }
                else
                {
                    filterContext.Result = new RedirectResult("~/Account/Login");
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}
