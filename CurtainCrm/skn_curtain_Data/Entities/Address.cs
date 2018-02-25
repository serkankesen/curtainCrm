using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace skn_curtain_Data.Entities
{
    [Serializable]
    public class Address
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AddressId { get; set; }
        public int CountyId { get; set; }
        public virtual County County { get; set; }
        public string CustomerId { get; set; }
    }

    [Serializable]
    public class City
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CityId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        public virtual ICollection<County> Counties { get; set; }
    }

    [Serializable]
    public class County // ilçe
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CountyId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        public int CityId { get; set; }

        [ForeignKey("CityId")]
        public virtual City City { get; set; }
    }

  
}
