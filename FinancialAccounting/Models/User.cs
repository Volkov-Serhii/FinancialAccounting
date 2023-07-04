using Microsoft.AspNetCore.Identity;

namespace FinancialAccounting.Models
{
    public class User : IdentityUser
    {
        //public string Login { get; set; }
        //public string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
