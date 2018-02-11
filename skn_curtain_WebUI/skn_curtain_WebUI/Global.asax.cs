using skn_curtain_WebUI.App_Start;
using skn_curtain_WebUI.Infrastructure;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace skn_curtain_WebUI
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            ControllerBuilder.Current.SetControllerFactory(new NinjectFactory());
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }
    }
}
