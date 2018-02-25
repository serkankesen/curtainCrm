using skn_curtain_Core;
using skn_curtain_Data.Entities;
using skn_curtain_WebUI.Models;
using System;
using System.Web.Mvc;

namespace skn_curtain_WebUI.Areas.Manage.Controllers
{
    public class CustomersController : Controller
    {
        private ICustomer _repo;
        private const int pageSize = 10; //default
        public CustomersController(ICustomer _repo)
        {
            this._repo = _repo;
        }
        // GET: Manage/Customers
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllCustomers(string Search, int? totalItems, int page = 1, int pageSize = pageSize)
        {
            return Json(new
            {
                data = _repo.getCustomers(Search, page, pageSize).Item1,
                paging = new InitializerModels.PageInfo
                {
                    totalItems =
                        totalItems.HasValue
                            ? (int)totalItems
                            : _repo.getCustomers(Search, page, pageSize).Item2,
                    currentPage = page,
                    pageSize = pageSize
                }
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Detail(int id)
        {
            return Json(_repo.getCustomerById(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddCustomer(Customer model)
        {
            try
            {
                return Json(_repo.setCustomer(model), JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                Response.StatusCode = 501;
                throw;
            }
        }

        public JsonResult EditCustomer(Customer model)
        {
            try
            {
                return Json(_repo.setCustomer(model), JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                Response.StatusCode = 501;
                throw;
            }
        }


        public JsonResult RemoveMove(int id)
        {
            return Json(_repo.remove(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveCurtain(int id)
        {
            return Json(_repo.removeCurtain(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveColumn(int id)
        {
            return Json(_repo.removeColumn(id), JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetAllCity()
        {
            return Json(_repo.getAllCity(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCountyByCity(int id)
        {
            return Json(_repo.getCountyByCity(id), JsonRequestBehavior.AllowGet);
        }

    }
}