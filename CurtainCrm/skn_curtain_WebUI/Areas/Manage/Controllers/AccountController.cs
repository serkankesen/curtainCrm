using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using skn_curtain_WebUI.App_Start;
using skn_curtain_Data.Entities;
using skn_curtain_WebUI.Models;

namespace skn_curtain_WebUI.Areas.Manage.Controllers
{
    public class AccountController : Controller
    {
        #region Elleşme Kodlarıma Ula
        private skn_curtain_Core.IUser _repo;
        private const int pageSize = 10; //default
        public AccountController(skn_curtain_Core.IUser iUser)
        {
            _repo = iUser;
        }
        #endregion

        public JsonResult PlatformUsers()
        {
            var list = _repo.GetAllUser();
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        private ApplicationSignInManager _signInManager;
        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
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

        [Authorize(Roles = "Admin")]
        public async Task<JsonResult> Register(RegisterViewModel model, string usertype)
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
                        "Gıda Bankası Üyelik Onayı",
                    #region Mail Template
 "<html>"
                        + "Onay için <a href=" + callbackUrl + ">aktivasyon linkine tıklayınız.</a><br /><br />"
                        + "</html>");
                    #endregion
                    await UserManager.AddToRoleAsync(user.Id, usertype == "1" ? "Admin" : "Üye");
                    return Json("Üyelik onayınız e-posta adresinize gönderilmiştir.", JsonRequestBehavior.AllowGet);
                }
                AddErrors(result);
            }

            return Json("Lütfen bilgilerinizi kontrol ediniz...", JsonRequestBehavior.AllowGet);
        }
        private JsonResult AddErrors(IdentityResult result)
        {
            foreach (string tempError in from error in result.Errors where !error.Contains("Name") select error.Replace("is already taken", "adresi kullanılmaktadır. E-Posta adresi size ait ise giriş yapabilirsiniz.").Replace("Email ", "").Replace("Name ", ""))
            {
                ModelState.AddModelError("", tempError);
            }
            return Json("Email Adresininiz Kullanılmaktadır.", JsonRequestBehavior.AllowGet);
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