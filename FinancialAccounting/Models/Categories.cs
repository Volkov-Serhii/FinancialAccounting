namespace FinancialAccounting.Models
{
    public class Categories
    {
        public long Id { get; set; }
        public string? UserID { get; set; }
        public string CategoryName { get; set; }

        public User User { get; set; }
        public ICollection<Transactions> Transactions { get; set; }

    }
}
