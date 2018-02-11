using System;
using System.Collections.Generic;
using System.Linq;
using skn_curtain_Data.Entities;

namespace skn_curtain_Core.Repos
{
    public class UserRepo : CRUD, IUser
    {
        public IEnumerable<ApplicationUser> GetAllUser()
        {
            //var users = db.Users.ToList();
            //var roles = db.Roles.ToList();
            return db.Users.ToList();
        }
    }
}
