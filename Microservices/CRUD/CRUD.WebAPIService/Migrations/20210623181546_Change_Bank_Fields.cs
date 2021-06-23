using Microsoft.EntityFrameworkCore.Migrations;

namespace CRUD.APIService.Migrations
{
    public partial class Change_Bank_Fields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branch_Bank_BankId",
                table: "Branch");

            migrationBuilder.AlterColumn<byte>(
                name: "Grade",
                table: "Bank",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LogoUrl",
                table: "Bank",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Branch_Bank_BankId",
                table: "Branch",
                column: "BankId",
                principalTable: "Bank",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branch_Bank_BankId",
                table: "Branch");

            migrationBuilder.DropColumn(
                name: "LogoUrl",
                table: "Bank");

            migrationBuilder.AlterColumn<int>(
                name: "Grade",
                table: "Bank",
                type: "int",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Branch_Bank_BankId",
                table: "Branch",
                column: "BankId",
                principalTable: "Bank",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
