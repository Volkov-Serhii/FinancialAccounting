using FinancialAccounting.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;

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
// Add services to the container.
builder.Services.AddDbContext<FinancialAccountingContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<FinancialAccountingContext>();

builder.Services.AddControllersWithViews();

//���������� React ���������� 
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build"; // ���� � React ����������
});

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

//���������� React ����������
app.UseSpaStaticFiles();
app.Map("/app", builder =>
{
    builder.UseSpa(spa =>
    {
        spa.Options.SourcePath = "ClientApp"; // ���� � React ����������

        if (app.Environment.IsDevelopment())
        {
            spa.UseReactDevelopmentServer(npmScript: "start"); // ��������� React Development Server � ������ ����������
        }
    });
});
//app.MapWhen(context => !context.Request.Path.StartsWithSegments("/api"), builder =>
//{
//    builder.UseSpa(spa =>
//    {
//        spa.Options.SourcePath = "ClientApp"; // ���� � ���������� React ����������

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

app.Run();
