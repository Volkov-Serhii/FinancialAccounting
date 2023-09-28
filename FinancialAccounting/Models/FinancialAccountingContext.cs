using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinancialAccounting.Models
{
    public class FinancialAccountingContext : IdentityDbContext<User>
    {
        public FinancialAccountingContext(DbContextOptions<FinancialAccountingContext> options)
            : base(options)
        {

        }

        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillChanges> BillChanges { get; set; }

    }
}
