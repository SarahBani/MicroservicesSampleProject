using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CRUD.APIService.Entities
{
    public enum Grade
    {
        A, B, C, D, E
    }

    public class Bank : Entity<int>
    {

        #region Properties

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public Grade? Grade { get; set; }

        public string LogoUrl { get; set; }

        public ICollection<Branch> Branches { get; set; }

        #endregion /Properties

        #region Constructors

        public Bank()
        {
        }

        #endregion /Constructors

    }

    internal class BankEntityTypeConfiguration : IEntityTypeConfiguration<Bank>
    {
        public void Configure(EntityTypeBuilder<Bank> builder)
        { 
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(q => q.Grade)
                .HasColumnType("tinyint");

            builder.HasMany(q => q.Branches)
                .WithOne(q => q.Bank)
                .HasForeignKey(q => q.BankId)
                .OnDelete(DeleteBehavior.NoAction); // disable cascade delete;
        }
    }
}
