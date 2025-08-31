using Microsoft.EntityFrameworkCore;
using BloodBankWebAPI.Models;

namespace BloodBankWebAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Donor> Donors { get; set; }
        public DbSet<BloodGroup> BloodGroups { get; set; }
        public DbSet<DonationHistory> DonationHistories { get; set; }
        public DbSet<Receiver> Receivers { get; set; }
        public DbSet<BloodInventory> BloodInventories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BloodGroup>().HasOne(bg => bg.BloodInventory)
                .WithOne(bi => bi.BloodGroup)
                .HasForeignKey<BloodInventory>(bi => bi.BloodGroupId);

            modelBuilder.Entity<BloodGroup>().HasMany(bg => bg.Donors)
                .WithOne(d => d.BloodGroup)
                .HasForeignKey(d => d.BloodGroupId);

            modelBuilder.Entity<BloodGroup>().HasMany(bg => bg.Receivers)
                .WithOne(r => r.BloodGroup)
                .HasForeignKey(r => r.BloodGroupId);

            modelBuilder.Entity<Donor>().HasMany(d => d.DonationHistories)
                .WithOne(dh => dh.Donor)
                .HasForeignKey(dh => dh.DonorId);

            
            modelBuilder.Entity<BloodGroup>().HasData(
                new BloodGroup { BloodGroupId = 1, GroupName = "A+" },
                new BloodGroup { BloodGroupId = 2, GroupName = "A-" },
                new BloodGroup { BloodGroupId = 3, GroupName = "B+" },
                new BloodGroup { BloodGroupId = 4, GroupName = "B-" },
                new BloodGroup { BloodGroupId = 5, GroupName = "O+" },
                new BloodGroup { BloodGroupId = 6, GroupName = "O-" },
                new BloodGroup { BloodGroupId = 7, GroupName = "AB+" },
                new BloodGroup { BloodGroupId = 8, GroupName = "AB-" }
            );

            
            modelBuilder.Entity<BloodInventory>().HasData(
                new BloodInventory { InventoryId = 1, BloodGroupId = 1, UnitsAvailable = 10, LastUpdated = DateTime.Now },
                new BloodInventory { InventoryId = 2, BloodGroupId = 2, UnitsAvailable = 10, LastUpdated = DateTime.Now },
                new BloodInventory { InventoryId = 3, BloodGroupId = 3, UnitsAvailable = 10, LastUpdated = DateTime.Now },
                new BloodInventory { InventoryId = 4, BloodGroupId = 4, UnitsAvailable = 10, LastUpdated = DateTime.Now },
                new BloodInventory { InventoryId = 5, BloodGroupId = 5, UnitsAvailable = 10, LastUpdated = DateTime.Now },
                new BloodInventory { InventoryId = 6, BloodGroupId = 6, UnitsAvailable = 10, LastUpdated = DateTime.Now },
                new BloodInventory { InventoryId = 7, BloodGroupId = 7, UnitsAvailable = 10, LastUpdated = DateTime.Now },
                new BloodInventory { InventoryId = 8, BloodGroupId = 8, UnitsAvailable = 10, LastUpdated = DateTime.Now }
            );

           
            modelBuilder.Entity<Donor>().HasData(
                new Donor
                {
                    DonorId = 1,
                    DonorName = "John Doe",
                    Gender = "Male",
                    BloodGroupId = 1,
                    MobileNo = "01700000000",
                    CreatedAt = DateTime.Now,
                    Address = "Dhaka",
                    Email = "john@example.com"
                }
            );
        }
    }
}
