namespace FinancialAccounting.Models
{
    public class Currencies
    {
        public long Id { get; set; }
        public string Currency { get; set; }

        public ICollection<Accounts> Accounts { get; set; }

    }
}
