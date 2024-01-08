namespace FinancialAccounting.Models.NoDBModels
{
    public class CreateTransactions
    {
        public long AccountID { get; set; }
        public bool isPositive { get; set; }
        public double Amount { get; set; }
        public long CategoryID { get; set; }
        public string? Discription { get; set; }
    }

    public class EditTransactions
    {
        public long Id { get; set; }
        public bool isPositive { get; set; }
        public double Amount { get; set; }
        public long CategoryID { get; set; }
        public string? Discription { get; set; }
    }
}
