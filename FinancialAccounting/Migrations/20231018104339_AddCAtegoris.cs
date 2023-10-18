using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialAccounting.Migrations
{
    public partial class AddCAtegoris : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryName", "UserID" },
                values: new object[,]
                {
                    { 3L, "Health", null },
                    { 4L, "Products", null },
                    { 5L, "Education", null },
                    { 6L, "Pets", null },
                    { 7L, "Hobby", null },
                    { 8L, "Leisure", null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 8L);
        }
    }
}
