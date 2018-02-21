using skn_curtain_Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace skn_curtain_Core.Repos
{
    public class CustomerRepo : CRUD, ICustomer
    {
        public object getCustomerById(int id)
        {
            return db.Customer.Where(x => x.ID == id).Select(x=> new {
                x.AddressId,
                CurtainInfoes = x.CurtainInfoes.Where(m=>!m.Status).Select(a=> new {
                    a.ID,
                    a.Room,
                    a.WidthxHeight,
                    a.Height,
                    a.Status,
                    Columns = a.Columns.Where(m=>!m.Status).Select(k=> new
                    {
                        k.ID,
                        k.ColumnWidth,
                        k.ColumnName,
                        k.Status
                    })
                }),
                x.Description,
                x.IdentityNo,
                x.Email,x.ID,x.Phone,x.UserName,x.UserSurname,x.WorkTitle,x.Editor
            }).FirstOrDefault();
        }

        public Tuple<IEnumerable<object>, int> getCustomers(string search, int page, int pageSize)
        {
            var list = db.Customer.AsEnumerable().Where(x=>!x.isActive);
            if (!string.IsNullOrEmpty(search))            
                list = list.Where(s => s.IdentityNo.ToLower().Contains(search.ToLower()) || s.UserName.ToLower().Contains(search.ToLower()) || s.UserSurname.ToLower().Contains(search.ToLower()) || 
                (s.UserName+" "+s.UserSurname).ToLower().Contains(search.ToLower()) || s.Phone.ToLower().Contains(search.ToLower()) || s.Email.ToLower().Contains(search.ToLower()));    
            list = list.OrderBy(x => x.UserName).Skip((page - 1) * pageSize).Take(pageSize);
            return new Tuple<IEnumerable<object>, int>(list, list.Count());
        }

        public bool remove(int id)
        {
            var data = db.Customer.Where(x => x.ID == id).FirstOrDefault();
            data.isActive = false;
            Save();

            return true;
        }

        public bool removeCurtain(int id)
        {
            var data = db.CurtainInfoes.Where(x => x.ID == id).FirstOrDefault();
            data.Status = false;
            Save();
            return true;
        }

        public bool removeColumn(int id)
        {
            var data = db.Columns.Where(x => x.ID == id).FirstOrDefault();
            data.Status = true;
            Save();
            return true;
        }

        public int setCustomer(Customer model)
        {
            try
            {
                Create(model);
                Save();
                return (int)model.ID;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
