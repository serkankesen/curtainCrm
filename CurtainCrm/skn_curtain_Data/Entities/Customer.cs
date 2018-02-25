using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace skn_curtain_Data.Entities
{
    public class Customer : BaseEntity
    {
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string IdentityNo { get; set; }
        public string WorkTitle { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool isActive { get; set; }
        public string City { get; set; }
        public string County { get; set; }
        public int CountyId { get; set; }
        public int CityId { get; set; }
        public string OpenAddress { get; set; }
        public int AddressId { get; set; }
        public virtual ICollection<CurtainInfoes> CurtainInfoes { get; set; }

        //[ForeignKey("AddressId")]
        //public virtual Address Addresses { get; set; }
    }
}
