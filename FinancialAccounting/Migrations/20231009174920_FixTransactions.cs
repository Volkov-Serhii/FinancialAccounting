using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialAccounting.Migrations
{
    public partial class FixTransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Categories_CategoriesId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_CategoriesId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "CategoriesId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "Transactions",
                newName: "isPositive");

            migrationBuilder.AlterColumn<int>(
                name: "InterestInterval",
                table: "InterestAccounts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CategoryID",
                table: "Transactions",
                column: "CategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Categories_CategoryID",
                table: "Transactions",
                column: "CategoryID",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Categories_CategoryID",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_CategoryID",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "isPositive",
                table: "Transactions",
                newName: "TransactionType");

            migrationBuilder.AddColumn<long>(
                name: "CategoriesId",
                table: "Transactions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<int>(
                name: "InterestInterval",
                table: "InterestAccounts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CategoriesId",
                table: "Transactions",
                column: "CategoriesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Categories_CategoriesId",
                table: "Transactions",
                column: "CategoriesId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
