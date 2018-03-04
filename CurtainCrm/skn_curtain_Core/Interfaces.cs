using skn_curtain_Data.Entities;
using System;
using System.Collections.Generic;

namespace skn_curtain_Core
{
    public interface ICustomer : ICRUD
    {
        Tuple<IEnumerable<object>, int> getCustomers(string search, int page, int pageSize);
        int setCustomer(Customer model);
        object getCustomerById(int id);
        bool remove(int id);
        bool removeCurtain(int id);
        bool removePicture(int id);
        bool removeColumn(int id);
        object getAllCity();
        object getCountyByCity(int id);
    }

    public interface ICurtainInfoes :ICRUD
    {
        bool setCurtainInfoes(CurtainInfoes model);
        IEnumerable<object> getCurtainInfoesById(int id);
        bool remove(int id);
    }

    public interface IUser : ICRUD
    {
        IEnumerable<ApplicationUser> GetAllUser();
    }


}
