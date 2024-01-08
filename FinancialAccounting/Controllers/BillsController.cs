using FinancialAccounting.Models;
using FinancialAccounting.Models.NoDBModels;
using FinancialAccounting.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Diagnostics;

namespace FinancialAccounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private FinancialAccountingContext db;
        public BillsController(FinancialAccountingContext db) {

            this.db = db;
        }

        [HttpGet]
        [Route("GetBills")]
        [Authorize]
        public IActionResult GetBills() {
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var jwtHeader = Request.Headers["Authorization"].ToString();
            var token = jwtHeader.Split(' ')[1];
            JWTService jwt = new JWTService();
            var userId = jwt.ReadIdFromToken(token);
            var bills = (from account in db.Accounts
                         join currency in db.Currencies on account.CurrencyId equals currency.Id
                         where account.UserID == userId
                         select new
                         {
                             account.Id,
                             account.AccountName,
                             account.AccountTypeId,
                             account.isActiv,
                             account.DateTime,
                             account.Balance,
                             CurrencyName = currency.Currency
                         }).ToList();
            return Ok(bills);
        }

        [HttpGet]
        [Route("GetBillsType")]
        [Authorize]
        public IActionResult GetBillsType() {
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var billsType = db.AccountTypes.ToList();
            return Ok(billsType);
        }

        [HttpGet]
        [Route("GetAllTransactions")]
        [Authorize]
        public IActionResult GetAllTransactions()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var jwtHeader = Request.Headers["Authorization"].ToString();
            var token = jwtHeader.Split(' ')[1];
            JWTService jwt = new JWTService();
            var userId = jwt.ReadIdFromToken(token);
            var transactionsWithCurrency = (from t in db.Transactions
                                            join a in db.Accounts on t.AccountID equals a.Id
                                            join c in db.Currencies on a.CurrencyId equals c.Id
                                            where a.UserID == userId
                                            select new
                                            {
                                                TransactionID = t.Id,
                                                AccountID = t.AccountID,
                                                isPositive = t.isPositive,
                                                Amount = t.Amount,
                                                DateTime = t.DateTime,
                                                CategoryID = t.CategoryID,
                                                Discription = t.Discription,
                                                Currency = c.Currency
                                            }).ToList();
            //var transactions = db.Accounts
            //    .Where(a => a.UserID == userId)
            //    .SelectMany(a => a.Transactions)
            //    .ToList();
            return Ok(transactionsWithCurrency);
        }

        [HttpGet]
        [Route("GetTransactions")]
        [Authorize]
        public IActionResult GetTransactions(long billId)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var transactionsWithCurrency = (from t in db.Transactions
                                            join a in db.Accounts on t.AccountID equals a.Id
                                            join c in db.Currencies on a.CurrencyId equals c.Id
                                            where t.AccountID == billId
                                            select new
                                            {
                                                TransactionID = t.Id,
                                                AccountID = t.AccountID,
                                                isPositive = t.isPositive,
                                                Amount = t.Amount,
                                                DateTime = t.DateTime,
                                                CategoryID = t.CategoryID,
                                                Discription = t.Discription,
                                                Currency = c.Currency
                                            }).ToList();
            //var transactions = db.Transactions.Where(t=> t.AccountID == billId).ToList();
            return Ok(transactionsWithCurrency);
        }

        [HttpGet]
        [Route("GetCategories")]
        [Authorize]
        public IActionResult GetCategories()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var jwtHeader = Request.Headers["Authorization"].ToString();
            var token = jwtHeader.Split(' ')[1];
            JWTService jwt = new JWTService();
            var userId = jwt.ReadIdFromToken(token);
            var transactionCategories = db.Categories.Where(c => c.UserID == null || c.UserID == userId).ToList();
            return Ok(transactionCategories);
        }

        [HttpPost]
        [Route("CreateBill")]
        [Authorize]
        public IActionResult CreateBill(CreateAccounts bill)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var jwtHeader = Request.Headers["Authorization"].ToString();
            var token = jwtHeader.Split(' ')[1];
            JWTService jwt = new JWTService();
            var userId = jwt.ReadIdFromToken(token);
            var currancy = db.Currencies.FirstOrDefault(c => c.Currency == bill.Currency);
            if (currancy == null)
            {
                currancy = new Currencies()
                {
                    Currency = bill.Currency
                };
                db.Currencies.Add(currancy);
                db.SaveChanges();
            }
            Accounts account = new Accounts()
            {
                UserID = userId,
                AccountName = bill.AccountName,
                AccountTypeId = bill.AccountTypeId,
                isActiv = bill.isActiv,
                DateTime = DateTime.Today,
                Balance = bill.Balance,
                CurrencyId = currancy.Id
            };
            db.Accounts.Add(account);
            if(bill.Interest != null)
            {
                InterestAccount interestAccount = new InterestAccount()
                {
                    Interest = (double)bill.Interest,
                    InterestInterval = (int)bill.InterestInterval,
                    InterestAccrualDate = (DateTime)bill.InterestAccrualDate
                };
                db.InterestAccounts.Add(interestAccount);
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("EditBill")]
        [Authorize]
        public IActionResult EditBill(EditAccounts bill)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var account = db.Accounts.FirstOrDefault(a => a.Id == bill.Id);
            if(account !=null) { 
                account.AccountName = bill.AccountName;
                account.AccountTypeId = bill.AccountTypeId;
                account.isActiv = bill.isActiv;
                account.Balance = bill.Balance;
            }
            if (bill.Interest != null)
            {
                var interestbill = account.InterestAccounts;
                //if (interestbill != null)
                //{
                //    interestbill.Interest = bill.Interest;
                //    interestbill.InterestInterval = bill.InterestInterval;
                //    interestbill.InterestAccrualDate = bill.InterestAccrualDate;
                //}
                //else
                //{
                //    InterestAccount interestAccount = new InterestAccount()
                //    {
                //        Interest = (double)bill.Interest,
                //        InterestInterval = (int)bill.InterestInterval,
                //        InterestAccrualDate = (DateTime)bill.InterestAccrualDate
                //    };
                //    db.InterestAccounts.Add(interestAccount);
                //}
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteBill")]
        [Authorize]
        public IActionResult DeleteBill(int id)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var bill = db.Accounts.FirstOrDefault(c => c.Id == id);
            db.Accounts.Remove(bill);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("CreateTransaction")]
        [Authorize]
        public IActionResult CreateTransaction([FromBody]CreateTransactions transaction)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            Transactions newTransaction = new Transactions()
            {
                AccountID = transaction.AccountID,
                isPositive =transaction.isPositive,
                Amount = transaction.Amount,
                DateTime = DateTime.Now,
                CategoryID = transaction.CategoryID,
                Discription = transaction.Discription
            };
            var account = db.Accounts.FirstOrDefault(a => a.Id == transaction.AccountID);
            account.Balance = account.Balance + transaction.Amount;
            db.Transactions.Add(newTransaction);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("EditTransaction")]
        [Authorize]
        public IActionResult EditTransaction(EditTransactions transaction)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }

            var trans = db.Transactions.FirstOrDefault(a => a.Id == transaction.Id);
            var account = db.Accounts.FirstOrDefault(a => a.Id == trans.AccountID);
            account.Balance = account.Balance - trans.Amount + transaction.Amount;
            if (trans != null)
            {
                trans.isPositive = transaction.isPositive;
                trans.Amount = transaction.Amount;
                trans.CategoryID = transaction.CategoryID;
                trans.Discription = transaction.Discription;
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteTransaction")]
        [Authorize]
        public IActionResult DeleteTransaction(int id)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var transaction = db.Transactions.FirstOrDefault(t => t.Id == id);
            var account = db.Accounts.FirstOrDefault(a => a.Id == transaction.AccountID);
            account.Balance = account.Balance - transaction.Amount;
            db.Transactions.Remove(transaction);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("CreateCategori")]
        [Authorize]
        public IActionResult CreateCategori(CreateCategory createCategory)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var jwtHeader = Request.Headers["Authorization"].ToString();
            var token = jwtHeader.Split(' ')[1];
            JWTService jwt = new JWTService();
            var userId = jwt.ReadIdFromToken(token);
            Categories category = new Categories()
            {
                UserID = userId,
                CategoryName = createCategory.CategoryName
            };
            db.Categories.Add(category);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("EditCategory")]
        [Authorize]
        public IActionResult EditCategory(EditCategory editCategori)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var cat = db.Categories.FirstOrDefault(c  => c.Id == editCategori.Id);
            if(cat != null)
            {
                cat.CategoryName = editCategori.CategoryName;
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCategori")]
        [Authorize]
        public IActionResult DeleteCategori(int id)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var cat = db.Categories.FirstOrDefault(c => c.Id == id);
            db.Categories.Remove(cat);
            db.SaveChanges();
            return Ok();
        }
    }
}
