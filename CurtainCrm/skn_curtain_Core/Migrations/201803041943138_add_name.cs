namespace skn_curtain_Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_name : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pictures", "name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Pictures", "name");
        }
    }
}
