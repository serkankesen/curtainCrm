using System;
using System.Collections.Generic;
using System.Linq;
using skn_curtain_Data.Entities;

namespace skn_curtain_Core.Repos
{
    public class CurtainInfoRepo : CRUD, ICurtainInfoes
    {
        public IEnumerable<object> getCurtainInfoesById(int id)
        {
            return db.CurtainInfoes.Where(x => x.ID == id);
        }

        public bool remove(int id)
        {
            Delete<CurtainInfoes>(id);
            Save();
            return true;
        }

        public bool setCurtainInfoes(CurtainInfoes model)
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
