namespace FinancialAccounting.Models
{
    public class Bill
    {
        public int Id { get; set; }
        public string BillName { get; set; }
        public string UserId { get; set; }
        public long BillAmount { get; set; }

        public User User { get; set; }
        public ICollection<BillChanges> BillChanges { get; set; }

    }
}
