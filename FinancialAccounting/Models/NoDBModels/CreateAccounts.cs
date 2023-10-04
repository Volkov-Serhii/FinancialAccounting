namespace FinancialAccounting.Models.NoDBModels
{
    public class CreateAccounts
    {
        public string AccountName { get; set; }
        public int AccountTypeId { get; set; }
        public bool isActiv { get; set; }
        public long Balance { get; set; }
        public double? Interest { get; set; }
        public int? InterestInterval { get; set; }
        public DateTime? InterestAccrualDate { get; set; }
    }
    public class EditAccounts
    {
        public long Id { get; set; }
        public string AccountName { get; set; }
        public int AccountTypeId { get; set; }
        public bool isActiv { get; set; }
        public long Balance { get; set; }
        public double? Interest { get; set; }
        public int? InterestInterval { get; set; }
        public DateTime? InterestAccrualDate { get; set; }
    }
}
