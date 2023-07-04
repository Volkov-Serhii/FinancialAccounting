using Microsoft.AspNetCore.Identity;

namespace FinancialAccounting.Models
{
    public class User : IdentityUser
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
