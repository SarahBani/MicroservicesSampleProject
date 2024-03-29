﻿// <auto-generated />
using CRUD.APIService.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CRUD.APIService.Migrations
{
    [DbContext(typeof(CRUDDbContext))]
    [Migration("20210623184935_Branch_Fields")]
    partial class Branch_Fields
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CRUD.APIService.Entities.Bank", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte?>("Grade")
                        .HasColumnType("tinyint");

                    b.Property<string>("LogoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Bank");
                });

            modelBuilder.Entity("CRUD.APIService.Entities.Branch", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BankId")
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)")
                        .HasMaxLength(10);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.HasAlternateKey("BankId", "Name");

                    b.ToTable("Branch");
                });

            modelBuilder.Entity("CRUD.APIService.Entities.Country", b =>
                {
                    b.Property<short>("Id")
                        .HasColumnType("smallint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Country");
                });

            modelBuilder.Entity("CRUD.APIService.Entities.Branch", b =>
                {
                    b.HasOne("CRUD.APIService.Entities.Bank", "Bank")
                        .WithMany("Branches")
                        .HasForeignKey("BankId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.OwnsOne("CRUD.APIService.Entities.Address", "Address", b1 =>
                        {
                            b1.Property<long>("BranchId")
                                .HasColumnType("bigint");

                            b1.Property<string>("BlockNo")
                                .IsRequired()
                                .HasColumnType("nvarchar(20)")
                                .HasMaxLength(20);

                            b1.Property<string>("CityName")
                                .IsRequired()
                                .HasColumnType("nvarchar(60)")
                                .HasMaxLength(60);

                            b1.Property<string>("PostalCode")
                                .IsRequired()
                                .HasColumnType("nvarchar(10)")
                                .HasMaxLength(10);

                            b1.Property<string>("Street")
                                .IsRequired()
                                .HasColumnType("nvarchar(200)")
                                .HasMaxLength(200);

                            b1.HasKey("BranchId");

                            b1.ToTable("BranchAddress");

                            b1.WithOwner()
                                .HasForeignKey("BranchId");
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
