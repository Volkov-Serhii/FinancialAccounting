using FinancialAccounting.Models;
using FinancialAccounting.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinancialAccounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticalController : ControllerBase
    {
        private FinancialAccountingContext db;
        public StatisticalController(FinancialAccountingContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("GetMonthStatistic")]
        [Authorize]
        public IActionResult GetMonthStatistic()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(401);
            }
            var jwtHeader = Request.Headers["Authorization"].ToString();
            var token = jwtHeader.Split(' ')[1];
            JWTService jwt = new JWTService();
            var userId = jwt.ReadIdFromToken(token);

            var firstDayOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            var transactions = (from t in db.Transactions
                                            join a in db.Accounts on t.AccountID equals a.Id
                                            join c in db.Currencies on a.CurrencyId equals c.Id
                                            join cat in db.Categories on t.CategoryID equals cat.Id
                                            where a.UserID == userId && t.DateTime >= firstDayOfMonth && t.DateTime <= lastDayOfMonth && t.Amount < 0
                                            select new
                                            {
                                                isPositive = t.isPositive,
                                                Amount = t.Amount * -1,
                                                DateTime = t.DateTime,
                                                Category = cat.CategoryName,
                                                Currency = c.Currency
                                            }).ToList();
            //var groupedTransactions = transactions.GroupBy(t => t.Category)
            //                             .Select(group => new
            //                             {
            //                                 Category = group.Key,
            //                                 TotalAmount = group.Sum(t => t.Amount),
            //                                 Count = group.Count()
            //                             })
            //                             .ToList();
            return Ok(transactions);
        }

    }
}
