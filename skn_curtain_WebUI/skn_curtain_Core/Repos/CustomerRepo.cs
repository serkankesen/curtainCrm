using System;
using System.Collections.Generic;
using System.Linq;
using skn_curtain_Data.Entities;

namespace skn_curtain_Core.Repos
{
    public class CustomerRepo : CRUD, ICustomer
    {
        public object getCustomerById(int id)
        {
            return db.Customer.FirstOrDefault(x => x.ID == id);
        }

        public Tuple<IEnumerable<object>, int> getCustomers(int page, int pageSize)
        {
            var list = db.Customer.AsEnumerable();
            var listcount = list.Count();          
            list = list.OrderBy(x => x.UserName).Skip((page - 1) * pageSize).Take(pageSize);
            return new Tuple<IEnumerable<object>, int>(list, listcount);
        }

        public bool remove(int id)
        {
            Delete<Customer>(id);
            Save();
            return true;
        }

        public bool setCustomer(Customer model)
        {
            try
            {
                if (model.ID > 0)
                {
                    Update(model);
                }
                else
                {
                    Create(model);
                }
                Save();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
