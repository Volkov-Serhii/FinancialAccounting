using Microsoft.AspNetCore.Identity;

namespace FinancialAccounting.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public ICollection<Accounts> Accounts { get; set; }
        public ICollection<Categories> Categories { get; set; }

    }
}
