using FinancialAccounting.Models;
using FinancialAccounting.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<FinancialAccountingContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    // Configuring Password Settings
    options.Password.RequiredLength = 6;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireDigit = true;
    options.Password.RequireNonAlphanumeric = false;
})
    .AddEntityFrameworkStores<FinancialAccountingContext>();

builder.Services.AddControllersWithViews();

//JWT
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // specifies whether the publisher will be validated when validating the token
            ValidateIssuer = true,
            // string representing the publisher
            ValidIssuer = "MyServer",
            //whether the token consumer will be validated
            ValidateAudience = true,
            // ÛÒÚ‡ÌÓ‚Í‡ ÔÓÚÂ·ËÚÂÎˇ ÚÓÍÂÌ‡
            ValidAudience = "MyClient",
            //whether the lifetime will be validated
            ValidateLifetime = true,
            // setting the security key
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("LeshaISeregaSpatíLozgatísiaTozhe")),
            // security key validation
            ValidateIssuerSigningKey = true,
        };
    });
builder.Services.AddScoped<JWTService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

//Add migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<FinancialAccountingContext>();
    dbContext.Database.Migrate();
}

app.Run();