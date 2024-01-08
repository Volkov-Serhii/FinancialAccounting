namespace FinancialAccounting.Models
{
    public class Transactions
    {
        public long Id { get; set; }
        public long AccountID { get; set; }
        public bool isPositive { get; set; }
        public double Amount { get; set; }
        public DateTime DateTime { get; set; }
        public long CategoryID { get; set; }
        public  string? Discription { get; set; }


        public Accounts Account { get; set; }
        public Categories Categories { get; set; }

    }
}
