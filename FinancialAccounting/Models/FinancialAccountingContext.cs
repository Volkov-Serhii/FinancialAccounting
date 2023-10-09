using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace FinancialAccounting.Models
{
    public class FinancialAccountingContext : IdentityDbContext<User>
    {
        public FinancialAccountingContext()
        {
        }

        public FinancialAccountingContext(DbContextOptions<FinancialAccountingContext> options)
            : base(options)
        {

        }
        public DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<Accounts> Accounts { get; set; }
        public DbSet<Transactions> Transactions { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<InterestAccount> InterestAccounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Accounts>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Accounts>()
                .HasOne(a => a.AccountType)
                .WithMany(i => i.Accounts)
                .HasForeignKey(a => a.AccountTypeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<InterestAccount>()
                .HasOne(i => i.Accounts)
                .WithMany(a => a.InterestAccounts)
                .HasForeignKey(i => i.AccountID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transactions>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Categories>()
                .Property(c => c.UserID)
                .IsRequired(false);

            modelBuilder.Entity<Categories>()
                .HasOne(a => a.User)
                .WithMany(u => u.Categories)
                .HasForeignKey(a => a.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transactions>()
                .HasOne(t => t.Categories)
                .WithMany (c => c.Transactions)
                .HasForeignKey(t => t.CategoryID)
                .OnDelete (DeleteBehavior.Cascade);

            modelBuilder.Entity<Categories>()
                .HasData(
                    new Categories
                    {
                        Id = 1,
                        CategoryName = "Home"
                    },
                    new Categories
                    {
                        Id = 2,
                        CategoryName = "Work"
                    }
                );

            modelBuilder.Entity<AccountType>()
                .HasData(
                    new AccountType
                    {
                        Id = 1,
                        Name = "Bill"
                    },
                    new AccountType
                    {
                        Id = 2,
                        Name = "Deposit"
                    }
                );
        }
    }
}
