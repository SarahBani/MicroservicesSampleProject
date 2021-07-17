using CRUD.APIService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace CRUD.APIService.Entities
{
    public class Branch : Entity<long>, IAggregateRoot
    {

        #region Properties

        [Required(ErrorMessage = "Bank is required!")]
        public int BankId { get; set; }

        [Required]
        [StringLength(10)]
        public string Code { get; set; }

        [Required]
        [StringLength(60, ErrorMessage = "Name cannot be longer than 60 characters!")]
        public string Name { get; set; }

        public Address Address { get; set; }

        public virtual Bank Bank { get; set; }

        #endregion /Properties

        #region Constructors

        public Branch()
        {

        }

        public Branch(int id, int bankId, string code, string name, Address address)
        {
            this.Id = id;
            this.BankId = bankId;
            this.Code = code;
            this.Name = name;
            this.Address = address;
        }

        #endregion /Constructors

        #region Methods

        public void SetAddress(Address address)
        {
            if (string.IsNullOrEmpty(address.CityName))
            {
                throw new CustomException(ExceptionKey.Invalid_Address_City_Required);
            }
            /// & so on 
            this.Address = address;
        }

        #endregion /Methods

    }

    internal class BranchEntityTypeConfiguration : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.HasAlternateKey(q => new { q.BankId, q.Name }); // unique key

            builder.Property(q => q.Code)
                .IsRequired()
                .HasMaxLength(10);

            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(60);

            /// Address value object persisted as owned entity in EF Core 2.0
            /// By default, EF Core conventions name the database columns for the properties of the
            /// owned entity type as EntityProperty_OwnedEntityProperty -- it didn't!!!!, maybe in the past
            builder.OwnsOne(x => x.Address, q =>
            {
                q.Property(p => p.CityName)
                    //.HasColumnName("BranchCity")
                    .IsRequired()
                    .HasMaxLength(60);
                q.Property(p => p.Street)
                    //.HasColumnName("ShippingStreet")
                    .IsRequired()
                    .HasMaxLength(200);
                q.Property(p => p.BlockNo)
                    //.HasColumnName("ShippingBlockNo")
                    .IsRequired()
                    .HasMaxLength(20);
                q.Property(p => p.PostalCode)
                    //.HasColumnName("PostalCode")
                    .HasMaxLength(10);

                q.ToTable("BranchAddress"); // Storing owned type in a specific table, otherwise it would be Address table
            });

            //builder.HasOne(q => q.Bank)
            //    .WithMany(q => q.Branches)
            //    .HasForeignKey(q => q.BankId)
            //    .HasConstraintName("FK_Branch_Bank");
        }
    }
}