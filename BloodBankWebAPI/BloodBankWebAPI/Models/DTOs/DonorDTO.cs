using System.ComponentModel.DataAnnotations;

namespace BloodBankWebAPI.Models.DTOs
{
    public class DonorCreateUpdateDTO
    {
        [Required(ErrorMessage = "Donor name is required.")]
        [StringLength(100, ErrorMessage = "Donor name cannot exceed 100 characters.")]
        public string DonorName { get; set; }

        
        public DateTime? DateOfBirth { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        [StringLength(10, ErrorMessage = "Gender cannot exceed 10 characters.")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Blood Group ID is required.")]
        public int BloodGroupId { get; set; }

        [Required(ErrorMessage = "Mobile number is required.")]
        [StringLength(15, ErrorMessage = "Mobile number cannot exceed 15 characters.")]
        [Phone(ErrorMessage = "Invalid mobile number format.")]
        public string MobileNo { get; set; }

        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string? Email { get; set; } 

        [StringLength(200, ErrorMessage = "Address cannot exceed 200 characters.")]
        public string? Address { get; set; } 

        
        public DateTime? LastDonationDate { get; set; }

        
        public IFormFile? PictureFile { get; set; }
    }
    public class DonorDTO
    {
        public int DonorId { get; set; }
        public string DonorName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int BloodGroupId { get; set; }
       
        public string BloodGroupName { get; set; }

       

        public string MobileNo { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public DateTime? LastDonationDate { get; set; }
        public string? Picture { get; set; } 
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
    public class BloodGroupDTO
    {
        public int BloodGroupId { get; set; }
        public string GroupName { get; set; }
       
        [StringLength(250, ErrorMessage = "Description cannot exceed 250 characters.")]
        public string? Description { get; set; } 
    }
    public class DonationHistoryDTO
    {
        public int DonationId { get; set; }
        public int DonorId { get; set; }
        public DateTime DonationDate { get; set; }
        public string? DonationLocation { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ReceiverDTO
    {
        public int ReceiverId { get; set; }
        public string FullName { get; set; }
        public int BloodGroupId { get; set; }
       
        public string ContactNo { get; set; }
        public DateTime RequestDate { get; set; }
        public string Status { get; set; } 
        public string? Address { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    public class BloodInventoryDTO
    {
        public int InventoryId { get; set; }
        public int BloodGroupId { get; set; }
        public string? BloodGroupName { get; set; }

        
        [Required(ErrorMessage = "Quantity is required.")]
        public int QuantityML { get; set; }

       
        [StringLength(150, ErrorMessage = "Storage location cannot exceed 150 characters.")]
        public string? StorageLocation { get; set; }

        public DateTime LastUpdated { get; set; }
    }

}
