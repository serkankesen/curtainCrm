using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using CodeFirstStoreFunctions;
using Microsoft.AspNet.Identity.EntityFramework;
using skn_curtain_Data.Entities;

namespace skn_curtain_Core
{
    public class CurtainDbContext : IdentityDbContext<ApplicationUser>
    {
        public CurtainDbContext() : base(Properties.Settings.Default.curtain, false)
        {
            Configuration.LazyLoadingEnabled = false;
            Database.Log = s => Debug.WriteLine(s);
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Add(new FunctionsConvention<CurtainDbContext>("curtain"));
            modelBuilder.Entity<IdentityRole>().Property(c => c.Name).HasMaxLength(128).IsRequired();
            modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers").Property(c => c.UserName).HasMaxLength(128).IsRequired();
        }
        public static CurtainDbContext Create()
        {
            return new CurtainDbContext();
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<CurtainInfoes> CurtainInfoes { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<County> County { get; set; }
        public DbSet<Columns> Columns { get; set; }



     
    }
}
