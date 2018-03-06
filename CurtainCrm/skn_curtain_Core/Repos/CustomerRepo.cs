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
            return db.Customer.Where(x => x.ID == id).Select(x => new
            {
                x.City,
                x.County,
                x.AddressId,
                x.CityId,
                x.CountyId,
                x.OpenAddress,
                x.ID,
                CurtainInfoes = x.CurtainInfoes.Where(m => !m.Status).Select(a => new
                {
                    a.ID,
                    a.Room,
                    a.WidthxHeight,
                    a.Description,
                    a.Height,
                    a.Status,
                    a.CustomerId,
                    Pictures = a.Pictures.Where(m => !m.Status).Select(k => new
                    {
                       k.ID,
                       k.name,
                       k.FileName,
                       k.Path,
                       k.Size,
                       k.Description,
                       k.Status,
                       k.CurtainInfoesId
                    }),
                    //Columns = a.Columns.Where(m => !m.Status).Select(k => new
                    //{
                    //    k.ID,
                    //    k.ColumnWidth,
                    //    k.ColumnName,
                    //    k.CurtainInfoesId,
                    //    k.Description,
                    //    k.Status
                    //})
                }),
                x.Description,
                x.IdentityNo,
                x.Email,
                x.Phone,
                x.UserName,
                x.UserSurname,
                x.WorkTitle,
                x.Editor
            }).FirstOrDefault();
        }

        public Tuple<IEnumerable<object>, int> getCustomers(string search, int page, int pageSize)
        {
            var list = db.Customer.AsEnumerable().Where(x => !x.isActive);
            if (!string.IsNullOrEmpty(search))
                list = list.Where(s => s.IdentityNo != null && s.IdentityNo.ToLower().Contains(search.ToLower()) ||
                s.UserName != null && s.UserName.ToLower().Contains(search.ToLower()) ||
                s.UserSurname != null && s.UserSurname.ToLower().Contains(search.ToLower()) ||
                s.UserName != null && s.UserSurname != null && (s.UserName + " " + s.UserSurname).ToLower().Contains(search.ToLower()) ||
                s.Phone != null && s.Phone.ToLower().Contains(search.ToLower()) ||
                s.City != null && s.City.ToLower().Contains(search.ToLower()) ||
                s.OpenAddress != null && s.OpenAddress.ToLower().Contains(search.ToLower()) ||
                s.County != null && s.County.ToLower().Contains(search.ToLower()) ||
                s.Email != null && s.Email.ToLower().Contains(search.ToLower()));
            list = list.OrderBy(x => x.CreatedDate).Skip((page - 1) * pageSize).Take(pageSize);
            return new Tuple<IEnumerable<object>, int>(list, list.Count());
        }

        public bool remove(int id)
        {
            var data = db.Customer.Where(x => x.ID == id).FirstOrDefault();
            data.isActive = true;
            Save();

            return true;
        }
        // emre_akbal@hotmail.com
        // Tel: 5302209358
        public bool removeCurtain(int id)
        {
            var data = db.CurtainInfoes.Where(x => x.ID == id).FirstOrDefault();
            data.Status = true;
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
        
        public bool removePicture(int id)
        {
            var data = db.Pictures.Where(x => x.ID == id).FirstOrDefault();
            data.Status = true;
            Save();
            return true;
        }

        public int setCustomer(Customer model)
        {
            try
            {
                if (model.ID > 0)
                {
                    if (model.CurtainInfoes != null)
                        foreach (var item in model.CurtainInfoes)
                        {
                            if (item.ID > 0)
                            {

                                if (item.Pictures != null)
                                {
                                    foreach (var picture in item.Pictures)
                                    {
                                        if (picture.ID > 0)
                                        {
                                            Update(picture);
                                        }
                                        else
                                            Create(picture);
                                    }
                                }
                                //if (item.Columns != null)
                                //{
                                //    foreach (var column in item.Columns)
                                //    {
                                //        if (column.ID > 0)
                                //        {
                                //            Update(column);
                                //        }
                                //        else
                                //            Create(column);
                                //    }
                                //}
                                Update(item);
                            }
                            else
                                Create(item);
                        }
                    Update(model);
                    Save();
                }
                else
                {
                    Create(model);
                    Save();
                }
                return (int)model.ID;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public object getAllCity()
        {
            return db.City;
        }

        public object getCountyByCity(int id)
        {
            return db.County.Where(x => x.CityId == id);
        }
    }
}


