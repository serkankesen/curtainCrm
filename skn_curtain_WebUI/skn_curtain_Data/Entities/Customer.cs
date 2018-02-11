﻿using System.ComponentModel.DataAnnotations.Schema;

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

        public int AddressId { get; set; }
        [ForeignKey("AddressId")]
        public virtual Address Addresses { get; set; }
    }
}