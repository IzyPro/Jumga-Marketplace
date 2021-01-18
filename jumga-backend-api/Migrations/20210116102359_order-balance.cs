using Microsoft.EntityFrameworkCore.Migrations;

namespace JumgaAPI.Migrations
{
    public partial class orderbalance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Balance",
                table: "Riders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SubTotalDeliveryCost",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SubTotalItemCost",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "Riders");

            migrationBuilder.DropColumn(
                name: "SubTotalDeliveryCost",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SubTotalItemCost",
                table: "Orders");
        }
    }
}
