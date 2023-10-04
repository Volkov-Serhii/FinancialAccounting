using FinancialAccounting.Models;
using FinancialAccounting.Models.NoDBModels;
using FinancialAccounting.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

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
            var bills = db.Accounts.Where(a => a.UserID == userId).ToList();
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
        [Route("GetTransactions")]
        [Authorize]
        public IActionResult GetTransactions(long billId)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var billsType = db.Transactions.Where(t=> t.AccountID == billId).ToList();
            return Ok(billsType);
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
            var transactionCategories = db.Categories.Where(c => c.UserID == null && c.UserID == userId).ToList();
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
            Accounts account = new Accounts()
            {
                UserID = userId,
                AccountName = bill.AccountName,
                AccountTypeId = bill.AccountTypeId,
                isActiv = bill.isActiv,
                DateTime = DateTime.Today,
                Balance = bill.Balance
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
        public IActionResult CreateTransaction(Transactions transaction)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            db.Transactions.Add(transaction);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("EditTransaction")]
        [Authorize]
        public IActionResult EditTransaction(Transactions transaction)
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
            if (trans != null)
            {
                trans.Amount = transaction.Amount;
                trans.CategoryID = transaction.CategoryID;
                trans.Discription = transaction.Discription;
                trans.TransactionType = transaction.TransactionType;
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
            db.Transactions.Remove(transaction);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("CreateCategori")]
        [Authorize]
        public IActionResult CreateCategori(Categories categori)
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
            categori.UserID = userId;
            db.Categories.Add(categori);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("EditCategori")]
        [Authorize]
        public IActionResult EditCategori(Categories categori)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var cat = db.Categories.FirstOrDefault(c  => c.Id == categori.Id);
            if(cat == null)
            {
                cat.CategoryName = categori.CategoryName;
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
