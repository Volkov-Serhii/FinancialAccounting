using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace FinancialAccounting.Models.NoDBModels
{
    public class LoginModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Display(Name = "Запомнить?")]
        public bool RememberMe { get; set; }

        //public string ReturnUrl { get; set; }
    }
}
