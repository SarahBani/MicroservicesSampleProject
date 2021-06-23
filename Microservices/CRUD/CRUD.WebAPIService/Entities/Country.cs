using Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace CRUD.APIService.Entities
{
    public class Country : Entity<short>
    {

        #region Properties

        [Required]
        //[MaxLength(40)]
        public string Name { get; set; }

        #endregion /Properties

    }

    internal class CountryEntityTypeConfiguration : IEntityTypeConfiguration<Country>
    {

        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.Property(q => q.Id)
                .ValueGeneratedNever();

            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(40);

            builder.HasIndex(q => q.Name)
                .IsUnique();

            //builder.HasMany(q => q.Cities)
            //    .WithOne(q => q.Country)
            //    .HasForeignKey(q => q.CountryId);
        }

    }
}
