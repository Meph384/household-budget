﻿// <auto-generated />
using System;
using BudgetAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BudgetAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240531090357_Jwt_Login_Balance")]
    partial class Jwt_Login_Balance
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BudgetAPI.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CategoryId"));

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("BudgetAPI.Models.Currency", b =>
                {
                    b.Property<int>("CurrencyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CurrencyId"));

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(3)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("CurrencyId");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("BudgetAPI.Models.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TransactionId"));

                    b.Property<double>("Amount")
                        .HasColumnType("float");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<int>("CurrencyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TransactionId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("UserId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("BudgetAPI.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<double>("Balance")
                        .HasColumnType("float");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BudgetAPI.Models.Transaction", b =>
                {
                    b.HasOne("BudgetAPI.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BudgetAPI.Models.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BudgetAPI.Models.User", "User")
                        .WithMany("Transactions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Currency");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BudgetAPI.Models.User", b =>
                {
                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}