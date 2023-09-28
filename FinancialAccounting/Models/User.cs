using Microsoft.AspNetCore.Identity;

namespace FinancialAccounting.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public ICollection<Bill> Bills { get; set; }

    }
}
