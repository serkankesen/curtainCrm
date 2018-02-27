namespace skn_curtain_Data.Entities
{
    public class Pictures : BaseEntity
    {
        public string FileName { get; set; }
        public string Size { get; set; }
        public string Path { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public long CurtainInfoesId { get; set; }
    }
}
