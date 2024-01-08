using System;

namespace FinancialAccounting.Models
{
    public class Accounts
    {
        public long Id { get; set; }
        public string UserID { get; set; }
        public string AccountName { get; set; }
        public int AccountTypeId { get; set; }
        public bool isActiv { get; set; }
        public DateTime DateTime { get; set; }
        public double Balance { get; set; }
        public long CurrencyId { get; set; }

        public User User { get; set; }
        public AccountType AccountType { get; set; }
        public ICollection<Transactions> Transactions { get; set; }
        public ICollection<InterestAccount> InterestAccounts { get; set; }
        public Currencies Currency { get; set; }

    }
}
