using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BloodBankWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class two : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StorageLocation",
                table: "BloodInventories",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 1,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3088), null });

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 2,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3099), null });

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 3,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3100), null });

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 4,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3101), null });

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 5,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3102), null });

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 6,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3103), null });

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 7,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3104), null });

            migrationBuilder.UpdateData(
                table: "BloodInventories",
                keyColumn: "InventoryId",
                keyValue: 8,
                columns: new[] { "LastUpdated", "StorageLocation" },
                values: new object[] { new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3104), null });

            migrationBuilder.UpdateData(
                table: "Donors",
                keyColumn: "DonorId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 7, 21, 12, 52, 39, 406, DateTimeKind.Local).AddTicks(3123));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StorageLocation",
                table: "BloodInventories");

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
    }
}
