using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BloodBankWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BloodGroups",
                columns: table => new
                {
                    BloodGroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloodGroups", x => x.BloodGroupId);
                });

            migrationBuilder.CreateTable(
                name: "BloodInventories",
                columns: table => new
                {
                    InventoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BloodGroupId = table.Column<int>(type: "int", nullable: false),
                    UnitsAvailable = table.Column<int>(type: "int", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloodInventories", x => x.InventoryId);
                    table.ForeignKey(
                        name: "FK_BloodInventories_BloodGroups_BloodGroupId",
                        column: x => x.BloodGroupId,
                        principalTable: "BloodGroups",
                        principalColumn: "BloodGroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Donors",
                columns: table => new
                {
                    DonorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DonorName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    BloodGroupId = table.Column<int>(type: "int", nullable: false),
                    MobileNo = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    LastDonationDate = table.Column<DateTime>(type: "date", nullable: true),
                    Picture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Donors", x => x.DonorId);
                    table.ForeignKey(
                        name: "FK_Donors_BloodGroups_BloodGroupId",
                        column: x => x.BloodGroupId,
                        principalTable: "BloodGroups",
                        principalColumn: "BloodGroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Receivers",
                columns: table => new
                {
                    ReceiverId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BloodGroupId = table.Column<int>(type: "int", nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    RequestDate = table.Column<DateTime>(type: "date", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receivers", x => x.ReceiverId);
                    table.ForeignKey(
                        name: "FK_Receivers_BloodGroups_BloodGroupId",
                        column: x => x.BloodGroupId,
                        principalTable: "BloodGroups",
                        principalColumn: "BloodGroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DonationHistories",
                columns: table => new
                {
                    DonationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DonorId = table.Column<int>(type: "int", nullable: false),
                    DonationDate = table.Column<DateTime>(type: "date", nullable: false),
                    DonationLocation = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonationHistories", x => x.DonationId);
                    table.ForeignKey(
                        name: "FK_DonationHistories_Donors_DonorId",
                        column: x => x.DonorId,
                        principalTable: "Donors",
                        principalColumn: "DonorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BloodGroups",
                columns: new[] { "BloodGroupId", "GroupName" },
                values: new object[,]
                {
                    { 1, "A+" },
                    { 2, "A-" },
                    { 3, "B+" },
                    { 4, "B-" },
                    { 5, "O+" },
                    { 6, "O-" },
                    { 7, "AB+" },
                    { 8, "AB-" }
                });

            migrationBuilder.InsertData(
                table: "BloodInventories",
                columns: new[] { "InventoryId", "BloodGroupId", "LastUpdated", "UnitsAvailable" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(167), 10 },
                    { 2, 2, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(178), 10 },
                    { 3, 3, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(179), 10 },
                    { 4, 4, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(180), 10 },
                    { 5, 5, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(181), 10 },
                    { 6, 6, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(182), 10 },
                    { 7, 7, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(183), 10 },
                    { 8, 8, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(185), 10 }
                });

            migrationBuilder.InsertData(
                table: "Donors",
                columns: new[] { "DonorId", "Address", "BloodGroupId", "CreatedAt", "DateOfBirth", "DonorName", "Email", "Gender", "LastDonationDate", "MobileNo", "Picture", "UpdatedAt" },
                values: new object[] { 1, "Dhaka", 1, new DateTime(2025, 7, 20, 22, 0, 36, 608, DateTimeKind.Local).AddTicks(203), null, "John Doe", "john@example.com", "Male", null, "01700000000", null, null });

            migrationBuilder.CreateIndex(
                name: "IX_BloodInventories_BloodGroupId",
                table: "BloodInventories",
                column: "BloodGroupId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DonationHistories_DonorId",
                table: "DonationHistories",
                column: "DonorId");

            migrationBuilder.CreateIndex(
                name: "IX_Donors_BloodGroupId",
                table: "Donors",
                column: "BloodGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Receivers_BloodGroupId",
                table: "Receivers",
                column: "BloodGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BloodInventories");

            migrationBuilder.DropTable(
                name: "DonationHistories");

            migrationBuilder.DropTable(
                name: "Receivers");

            migrationBuilder.DropTable(
                name: "Donors");

            migrationBuilder.DropTable(
                name: "BloodGroups");
        }
    }
}
