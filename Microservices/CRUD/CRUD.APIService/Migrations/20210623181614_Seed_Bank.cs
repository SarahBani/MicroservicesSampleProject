using Microsoft.EntityFrameworkCore.Migrations;

namespace CRUD.APIService.Migrations
{
    public partial class Seed_Bank : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string sql = @"
                SET IDENTITY_INSERT [dbo].[Bank] ON 
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (1, N'BNP Paribas', NULL, N'e2f3de14-fe0d-435b-bb5e-3877701d0910.jpg')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (2, N'Barcley', NULL, N'c47cca6d-1fc9-4603-b2a9-fec4953edcbc.jpg')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (3, N'Citi', NULL, N'59a18139-c191-48d2-aa7b-1910c1a105bd.png')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (4, N'Deutsche Bank', NULL, N'df459fa2-2d7b-4d61-8c59-ec5eb1a68fbe.png')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (5, N'Capital One 360', NULL, N'cap_3a43.png')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (6, N'HSBC', NULL, N'08a886d6-6265-4e98-8bbf-1ac7796cc4f2.png')
                GO
                SET IDENTITY_INSERT [dbo].[Bank] OFF
                GO
                ";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            string sql = @"
                DELETE dbo.Bank";
            migrationBuilder.Sql(sql);
        }
    }
}
