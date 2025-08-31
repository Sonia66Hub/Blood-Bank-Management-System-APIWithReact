using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace BloodBankWebAPI.Models
{
    public class Donor
    {
        public int DonorId { get; set; }

        [Required]
        [StringLength(100)]
        public string DonorName { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DateOfBirth { get; set; }

        [Required]
        [StringLength(10)]
        public string Gender { get; set; }

        [Required]
        public int BloodGroupId { get; set; }
        public virtual BloodGroup BloodGroup { get; set; }

        [Required]
        [StringLength(15)]
        [Phone]
        public string MobileNo { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        [Column(TypeName = "date")]
        public DateTime? LastDonationDate { get; set; }

        public string? Picture { get; set; }

        [NotMapped]
        public IFormFile? PictureFile { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public ICollection<DonationHistory> DonationHistories { get; set; } = new List<DonationHistory>();
    }

    public class BloodGroup
    {
        public int BloodGroupId { get; set; }

        [Required]
        [StringLength(10)]
        public string GroupName { get; set; }
        
        [StringLength(250)] 
        public string? Description { get; set; }

        public ICollection<Donor> Donors { get; set; } = new List<Donor>();
        public ICollection<Receiver> Receivers { get; set; } = new List<Receiver>();
        public BloodInventory BloodInventory { get; set; }
    }

    public class DonationHistory
    {
        [Key]
        public int DonationId { get; set; }

        [Required]
        public int DonorId { get; set; }
        public virtual Donor Donor { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime DonationDate { get; set; }

        [StringLength(150)]
        public string? DonationLocation { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }
    }

    public class Receiver
    {
        public int ReceiverId { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }

        [Required]
        public int BloodGroupId { get; set; }
        public virtual BloodGroup BloodGroup { get; set; }

        [Required]
        [StringLength(15)]
        [Phone]
        public string ContactNo { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime RequestDate { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; }
    }

    public class BloodInventory
    {
        [Key]
        public int InventoryId { get; set; }

        [Required]
        [ForeignKey("BloodGroup")]
        public int BloodGroupId { get; set; }
        public BloodGroup BloodGroup { get; set; }

        [Required]
        public int UnitsAvailable { get; set; } 

        
        [StringLength(150)]
        public string? StorageLocation { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
