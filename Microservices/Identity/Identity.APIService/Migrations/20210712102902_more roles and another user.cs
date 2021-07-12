using Microsoft.EntityFrameworkCore.Migrations;

namespace Identity.APIService.Migrations
{
    public partial class morerolesandanotheruser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { 2, "35344e60-d5c4-4dec-82d8-15180a5d5173", null, "Clerk", "CLERK" },
                    { 3, "cdf1fe6f-bd43-43b2-8634-7a5d4d20118b", null, "Client", "CLIENT" },
                    { 4, "393c999d-d1a8-49ba-a51c-88e7a7be5cbf", null, "Guest", "GUEST" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CustomTag", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { 2, 0, "b318d0a7-bcdd-4277-9899-c5067db241d0", null, "john@gmail.com", false, false, null, "JOHN@GMAIL.COM", "JOHN", "AQAAAAEAACcQAAAAEKm5kCO8kgtzkMGuX0J1W9izHYH0IoLxsTRqIuYptc1kJaGS3W6LDQw/9D4gkcYlfQ==", null, false, null, false, "john" });

            migrationBuilder.InsertData(
                table: "UserRole",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { 2, 2 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "UserRole",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
