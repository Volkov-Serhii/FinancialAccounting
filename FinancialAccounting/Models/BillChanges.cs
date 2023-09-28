namespace FinancialAccounting.Models
{
    public class BillChanges
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public string? Description { get; set; }
        public int BillChange { get; set; }

        public Bill Bill { get; set; }

    }
}
