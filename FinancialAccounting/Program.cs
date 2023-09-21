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

//Setting of CORS
//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(builder =>
//    {
//        builder.AllowAnyOrigin()
//               .AllowAnyMethod()
//               .AllowAnyHeader();
//    });
//});

// Add services to the container(SQLServer).
//builder.Services.AddDbContext<FinancialAccountingContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container(MySQL).
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

//интеграция React приложения 
//builder.Services.AddSpaStaticFiles(configuration =>
//{
//    configuration.RootPath = "ClientApp/build"; // Путь к React приложению
//});

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
            // установка потребителя токена
            ValidAudience = "MyClient",
            //whether the lifetime will be validated
            ValidateLifetime = true,
            // setting the security key
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("LeshaISeregaSpat’Lozgat’siaTozhe")),
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

//app.UseCors();

//интеграция React приложения
//app.UseSpaStaticFiles();
//app.Map("/app", builder =>
//{
//    builder.UseSpa(spa =>
//    {
//        spa.Options.SourcePath = "ClientApp"; // Путь к React приложению

//        if (app.Environment.IsDevelopment())
//        {
//            spa.UseReactDevelopmentServer(npmScript: "start"); // Запустить React Development Server в режиме разработки
//        }
//    });
//});
//app.MapWhen(context => !context.Request.Path.StartsWithSegments("/api"), builder =>
//{
//    builder.UseSpa(spa =>
//    {
//        spa.Options.SourcePath = "ClientApp"; // Путь к исходникам React приложения

//        if (app.Environment.IsDevelopment())
//        {
//            spa.UseReactDevelopmentServer(npmScript: "start");
//        }
//    });
//});
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
