using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace elproyectegrandebackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateGuestModelCalss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guests_Hotels_HotelId",
                table: "Guests");

            migrationBuilder.DropForeignKey(
                name: "FK_Guests_Rooms_RoomId",
                table: "Guests");

            migrationBuilder.AlterColumn<long>(
                name: "RoomId",
                table: "Guests",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "HotelId",
                table: "Guests",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_Hotels_HotelId",
                table: "Guests",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_Rooms_RoomId",
                table: "Guests",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guests_Hotels_HotelId",
                table: "Guests");

            migrationBuilder.DropForeignKey(
                name: "FK_Guests_Rooms_RoomId",
                table: "Guests");

            migrationBuilder.AlterColumn<long>(
                name: "RoomId",
                table: "Guests",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "HotelId",
                table: "Guests",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_Hotels_HotelId",
                table: "Guests",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Guests_Rooms_RoomId",
                table: "Guests",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
