using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using skn_curtain_Data.Entities;
using skn_curtain_WebUI.App_Start;
using skn_curtain_WebUI.Filters;
using skn_curtain_WebUI.Models;

namespace skn_curtain_WebUI.Controllers
{
    //[RequireHttps]
    [Authorize]
    public class AccountController : Controller
    {
        [AllowAnonymous]
        [Login]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public JsonResult Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = "Enter any username and password." });
            }

            var user = UserManager.Find(model.Email, model.Password);
            if (user == null)
            {
                return Json(new { success = false, message = "Sorry, we did not recognize that email address or password." });
            }


            var serializer = new JavaScriptSerializer();

            var userData = serializer.Serialize(model);

            var authTicket = new FormsAuthenticationTicket(
                   1,
                   user.Email,
                   DateTime.Now,
                   DateTime.Now.AddDays(1),
                   false,
                   userData);



            string encTicket = FormsAuthentication.Encrypt(authTicket);
            var faCookie = new HttpCookie(FormsAuthentication.FormsCookieName,
                FormsAuthentication.Encrypt(authTicket));
            //var faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket) { Domain = "localhost:49576/" };
            Response.Cookies.Add(faCookie);


            return Json(new { success = true, data = string.Format("{0}://{1}:{2}/{3}", HttpContext.Request.Url.Scheme, HttpContext.Request.Url.Host, HttpContext.Request.Url.Port, "manage#/customers") });

        }

        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public AccountController()
        {
        }
        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        private ApplicationSignInManager _signInManager;
        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }

        public JsonResult LogOff()
        {
            AuthenticationManager.SignOut();
            try
            {
                var authCookie = HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName];
                if (authCookie != null)
                {
                    //var  authTicket = new FormsAuthenticationTicket(1, "", DateTime.Now, DateTime.Now.AddMinutes(-30), false, "");
                    //      var faCookie = new HttpCookie(FormsAuthentication.FormsCookieName,
                    //          FormsAuthentication.Encrypt(authTicket));
                    authCookie.Expires = DateTime.Now.AddYears(-1);
                    authCookie.Domain = ".netuce.com";
                    Response.Cookies.Add(authCookie);
                }
                AuthenticationManager.SignOut();
            }
            catch
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, returnurl = string.Format("{0}://{1}.netuce.com{2}/", Request.Url.Scheme, RouteData.Values["subdomain"], ":" + HttpContext.Request.Url.Port) }, JsonRequestBehavior.AllowGet);
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    Email = model.Email,
                    UserName = model.Email,
                    Creator = User.Identity.Name,
                    Editor = User.Identity.Name,
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,

                };
                var result = await UserManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    var callbackUrl = Url.Action("confirmemail", "account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);

                    await UserManager.SendEmailAsync(user.Id,
                        "Binbirgece Üyelik Onayı",
                    #region Mail Template
                        "<html>"
                        + "Onay için <a href=" + callbackUrl + ">aktivasyon linkine tıklayınız.</a><br /><br />"
                        + "</html>");
                    #endregion

                    //await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    await UserManager.AddToRoleAsync(user.Id, "Üye");

                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");
                    TempData["ErrorMessage"] = "Üyelik onayınız e-posta adresinize gönderilmiştir.";
                    return View("info");
                }
                AddErrors(result);
            }
            ViewBag.ErrorMessage = "Lütfen bilgilerinizi kontrol ediniz...";


            // If we got this far, something failed, redisplay form
            return View(model);
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (string tempError in from error in result.Errors where !error.Contains("Name") select error.Replace("is already taken", "adresi kullanılmaktadır. E-Posta adresi size ait ise giriş yapabilirsiniz.").Replace("Email ", "").Replace("Name ", ""))
            {
                ModelState.AddModelError("", tempError);
            }
        }
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                TempData["ErrorMessage"] = "Kullanıcı tanımlı değil yada sistem onay vermemektedir.";
                return View("info");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            if (result.Succeeded)
            {
                await SignInManager.SignInAsync(UserManager.FindById(userId), isPersistent: false, rememberBrowser: false);
                return RedirectToAction("index", "home");
            }
            else
            {
                TempData["ErrorMessage"] = "Onay kodunuz geçerli değildir.";
                return View("info");
            }
        }
    }
}