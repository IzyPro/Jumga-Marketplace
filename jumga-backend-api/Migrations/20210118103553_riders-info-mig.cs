using Microsoft.EntityFrameworkCore.Migrations;

namespace JumgaAPI.Migrations
{
    public partial class ridersinfomig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Riders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Riders",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Riders");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Riders");
        }
    }
}
