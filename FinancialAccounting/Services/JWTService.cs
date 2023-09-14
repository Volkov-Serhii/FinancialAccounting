using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinancialAccounting.Services
{
    public class JWTService
    {
        public string CreateJWT(IdentityUser user)
        {
            try
            {
            var claims = new List<Claim>
            { 
                new Claim("ID", user.Id),
                new Claim("Email", user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("LeshaISeregaSpat’Lozgat’siaTozhe"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "MyServer",
                audience: "MyClient",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            var JWTtoken = new JwtSecurityTokenHandler().WriteToken(token);
            return JWTtoken;

            }
            catch (Exception ex) {
                return ex.Message;
            }
        }
        public string ReadIdFromToken(string token)
        {
            if (token != null)
            {
                var handler = new JwtSecurityTokenHandler();
                var claims = handler.ReadJwtToken(token);
                string id = claims.Claims.FirstOrDefault(x => x.Type == "ID")?.Value;
                return id;
            }
            return token;
        }
    }
}
