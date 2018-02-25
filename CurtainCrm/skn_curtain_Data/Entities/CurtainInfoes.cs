using System.Collections.Generic;

namespace skn_curtain_Data.Entities
{
    public class CurtainInfoes: BaseEntity
    {
        public string Barcode { get; set; }
        public string Brand { get; set; }
        public string Room { get; set; }
        public string Height { get; set; }
        public string Description { get; set; }
        public string WidthxHeight { get; set; }
        public string Picture { get; set; }
        public bool Status { get; set; }
        public long CustomerId { get; set; }
        public virtual ICollection<Columns> Columns { get; set; }
    }
}
