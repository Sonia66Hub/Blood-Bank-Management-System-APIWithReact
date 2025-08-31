using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BloodBankWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class one : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "BloodGroups",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 1,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 2,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 3,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 4,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 5,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 6,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 7,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodGroups",
                keyColumn: "BloodGroupId",
                keyValue: 8,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 1,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3506));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 2,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3517));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 3,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3518));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 4,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3519));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 5,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3520));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 6,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3521));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 7,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3522));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 8,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3523));

            migrationBuilder.UpdateData(
                table: "Donors",
                keyColumn: "DonorId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 21, 12, 39, 7, 924, DateTimeKind.Local).AddTicks(3542));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "BloodGroups");

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 1,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(167));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 2,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(178));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 3,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(179));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 4,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(180));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 5,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(181));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 6,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(182));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 7,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(183));

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 8,
                column: "LastUpdated",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(185));

            migrationBuilder.UpdateData(
                table: "Donors",
                keyColumn: "DonorId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(203));
        }
    }
}
