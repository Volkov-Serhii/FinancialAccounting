using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinancialAccounting.Models
{
    public class FinancialAccountingContext : IdentityDbContext<User>
    {
        public FinancialAccountingContext(DbContextOptions<FinancialAccountingContext> options)
            : base(options)
        {
            //Database.EnsureCreated();

        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
