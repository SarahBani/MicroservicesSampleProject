using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CRUD.APIService.Entities
{
    public class CRUDDbContext : DbContext
    {

        #region Properties

        public DbSet<Bank> Banks { get; set; }

        public DbSet<Branch> Branches { get; set; }

        //public DbSet<City> Cities { get; set; }

        public DbSet<Country> Countries { get; set; }

        #endregion /Properties

        #region Constructors

        public CRUDDbContext(DbContextOptions<CRUDDbContext> options)
        : base(options)
        {

        }

        #endregion /Constructors

        #region Methods

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //This will singularize all table names
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }

            modelBuilder.ApplyConfiguration(new BankEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BranchEntityTypeConfiguration());
            //modelBuilder.ApplyConfiguration(new CityEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CountryEntityTypeConfiguration());
        }

        #endregion /Methods

    }
}
