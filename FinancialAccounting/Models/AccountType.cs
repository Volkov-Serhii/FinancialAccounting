namespace FinancialAccounting.Models
{
    public class AccountType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Accounts> Accounts { get; set; }

    }
}
