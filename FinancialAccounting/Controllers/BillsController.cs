using FinancialAccounting.Models;
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
        public BillsController() {
            db = new FinancialAccountingContext();
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

        [HttpPost]
        [Route("CreateBill")]
        [Authorize]
        public IActionResult CreateBill(Accounts bill)
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
            bill.UserID = userId;
            db.Accounts.Add(bill);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("EditBill")]
        [Authorize]
        public IActionResult EditBill(Accounts bill)
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
            bill.UserID = userId;
            var account = db.Accounts.FirstOrDefault(a => a.Id == bill.Id);
            if(account !=null) { 
                account.AccountName = bill.AccountName;
                account.AccountType = bill.AccountType;
                account.AccountTypeId = bill.AccountTypeId;
                account.InterestAccounts = bill.InterestAccounts;
                account.Balance = bill.Balance;
            }
            db.SaveChanges();
            return Ok();
        }
    }
}
