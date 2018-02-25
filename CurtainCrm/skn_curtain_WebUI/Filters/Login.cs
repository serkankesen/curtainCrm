using System.Web.Mvc;

namespace skn_curtain_WebUI.Filters
{
    public class Login : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                filterContext.Result = new RedirectResult("~/manage#/customers");
            }
            base.OnActionExecuting(filterContext);
        }
    }
}