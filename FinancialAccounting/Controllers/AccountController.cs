using FinancialAccounting.Models.NoDBModels;
using FinancialAccounting.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using FinancialAccounting.Services;
using Microsoft.AspNetCore.Authorization;

namespace FinancialAccounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        // POST api/<AccountController>/Register
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }
            if (User.Identity.IsAuthenticated)
            {
                await _signInManager.SignOutAsync();
            }

            User user = new User { Email = model.Email, UserName = model.Email, FirstName = model.FirstName, LastName = model.LastName };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                JWTService jwt = new JWTService();
                string token = jwt.CreateJWT(user);
                return Ok(new { token = token });
            }
            return new StatusCodeResult(401);

        }


        // POST api/<AccountController>/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return new StatusCodeResult(404);
            }

            if (!User.Identity.IsAuthenticated) {
                var user = await _userManager.FindByEmailAsync(model.Email);
                var passwordCheck = await _userManager.CheckPasswordAsync(user, model.Password);
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
                if (user != null && passwordCheck && result.Succeeded)
                {
                    JWTService jwt = new JWTService();
                    string token = jwt.CreateJWT(user);
                    return Ok(new { token = token });
                }
                else
                {
                    return new StatusCodeResult(401);
                }

            }
            else
            {
                return new StatusCodeResult(409);
            }
        }


        // POST api/<AccountController>/Logout
        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        [Route("GetUserEmail")]
        [Authorize]
        public async Task<IActionResult> GetUserEmail(string token)
        {
            //if (User.Identity.IsAuthenticated)
            //{
                //var jwtHeader = Request.Headers["AuthenticationToken"].ToString();
                if (token != null)
                {
                    //var token = token.Split(' ')[1];
                    JWTService jwt = new JWTService();
                    var userId = jwt.ReadIdFromToken(token);
                    var userInfo = await _userManager.FindByIdAsync(userId);
                    var userEmail = userInfo.Email;
                    return Ok(userEmail);
                }
                else
                {
                    return new StatusCodeResult(401);
                }
            //}
            //else
            //{
            //    return new StatusCodeResult(409);
            //}
        }
    }
}
