using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace elproyectegrandebackend.Migrations
{
    /// <inheritdoc />
    public partial class AddIsCancelledPropertyToReservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isCancelled",
                table: "Reservations",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isCancelled",
                table: "Reservations");
        }
    }
}
