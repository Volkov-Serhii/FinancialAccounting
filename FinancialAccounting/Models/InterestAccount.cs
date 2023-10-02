namespace FinancialAccounting.Models
{
    public class InterestAccount
    {
        public long Id { get; set; }
        public long AccountID { get; set; }
        public double Interest { get; set; }
        public int InterestInterval { get; set; }
        public DateTime InterestAccrualDate { get; set; }
        public Accounts Accounts { get; set; }

    }
}
