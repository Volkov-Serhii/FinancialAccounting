using FinancialAccounting.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

//Setting of CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
// Add services to the container(SQLServer).
//builder.Services.AddDbContext<FinancialAccountingContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container(MySQL).
builder.Services.AddDbContext<FinancialAccountingContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<FinancialAccountingContext>();

builder.Services.AddControllersWithViews();

//интеграция React приложения 
//builder.Services.AddSpaStaticFiles(configuration =>
//{
//    configuration.RootPath = "ClientApp/build"; // Путь к React приложению
//});

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

app.UseCors();

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

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

//Add migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<FinancialAccountingContext>();
    dbContext.Database.Migrate();
}

app.Run();
