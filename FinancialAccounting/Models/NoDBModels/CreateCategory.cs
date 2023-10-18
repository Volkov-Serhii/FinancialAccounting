namespace FinancialAccounting.Models.NoDBModels
{
    public class CreateCategory
    {
        public string CategoryName { get; set; }

    }
    public class EditCategory
    {
        public long Id { get; set; }
        public string CategoryName { get; set; }
    }
}
