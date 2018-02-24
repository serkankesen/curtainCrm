namespace skn_curtain_Data.Entities
{
    public class Columns : BaseEntity
    {
        public string ColumnWidth { get; set; }
        public string ColumnName { get; set; }
        public bool Status { get; set; }
        public long CurtainInfoesId { get; set; }
    }
}