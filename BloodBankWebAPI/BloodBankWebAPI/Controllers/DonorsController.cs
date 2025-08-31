using BloodBankWebAPI.Data; 
using BloodBankWebAPI.Models;
using BloodBankWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BloodBankWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public DonorsController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonorDTO>>> GetDonors()
        {
            var donors = await _context.Donors
                .Include(d => d.BloodGroup)
                .ToListAsync();

            var dtoList = donors.Select(d => new DonorDTO
            {
                DonorId = d.DonorId,
                DonorName = d.DonorName,
                DateOfBirth = d.DateOfBirth,
                Gender = d.Gender,
                BloodGroupId = d.BloodGroupId,
                BloodGroupName = d.BloodGroup.GroupName,
                MobileNo = d.MobileNo,
                Email = d.Email,
                Address = d.Address,
                LastDonationDate = d.LastDonationDate,
                Picture = GetPictureUrl(d.Picture),
                CreatedAt = d.CreatedAt,
                UpdatedAt = d.UpdatedAt
            }).ToList();

            return Ok(dtoList);
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<DonorDTO>> GetDonor(int id)
        {
            var donor = await _context.Donors
                .Include(d => d.BloodGroup)
                .FirstOrDefaultAsync(d => d.DonorId == id);

            if (donor == null) return NotFound();

            var dto = new DonorDTO
            {
                DonorId = donor.DonorId,
                DonorName = donor.DonorName,
                DateOfBirth = donor.DateOfBirth,
                Gender = donor.Gender,
                BloodGroupId = donor.BloodGroupId,
                BloodGroupName = donor.BloodGroup.GroupName,
                MobileNo = donor.MobileNo,
                Email = donor.Email,
                Address = donor.Address,
                LastDonationDate = donor.LastDonationDate,
                Picture = GetPictureUrl(donor.Picture),
                CreatedAt = donor.CreatedAt,
                UpdatedAt = donor.UpdatedAt
            };

            return Ok(dto);
        }

        
        [HttpPost]
        public async Task<ActionResult<DonorDTO>> PostDonor([FromForm] DonorCreateUpdateDTO dto)
        {
            var donor = new Donor
            {
                DonorName = dto.DonorName,
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender,
                BloodGroupId = dto.BloodGroupId,
                MobileNo = dto.MobileNo,
                Email = dto.Email,
                Address = dto.Address,
                LastDonationDate = dto.LastDonationDate,
                Picture = "noimage.png",
                CreatedAt = DateTime.UtcNow
            };

            if (dto.PictureFile != null)
            {
                donor.Picture = await SaveImage(dto.PictureFile);
            }

            _context.Donors.Add(donor);
            await _context.SaveChangesAsync();

            
            await _context.Entry(donor).Reference(d => d.BloodGroup).LoadAsync();

            var donorDto = new DonorDTO
            {
                DonorId = donor.DonorId,
                DonorName = donor.DonorName,
                DateOfBirth = donor.DateOfBirth,
                Gender = donor.Gender,
                BloodGroupId = donor.BloodGroupId,
                BloodGroupName = donor.BloodGroup.GroupName,
                MobileNo = donor.MobileNo,
                Email = donor.Email,
                Address = donor.Address,
                LastDonationDate = donor.LastDonationDate,
                Picture = GetPictureUrl(donor.Picture),
                CreatedAt = donor.CreatedAt,
                UpdatedAt = donor.UpdatedAt
            };

            return CreatedAtAction(nameof(GetDonor), new { id = donor.DonorId }, donorDto);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonor(int id, [FromForm] DonorCreateUpdateDTO dto)
        {
            var donor = await _context.Donors.FindAsync(id);
            if (donor == null) return NotFound();

            donor.DonorName = dto.DonorName;
            donor.DateOfBirth = dto.DateOfBirth;
            donor.Gender = dto.Gender;
            donor.BloodGroupId = dto.BloodGroupId;
            donor.MobileNo = dto.MobileNo;
            donor.Email = dto.Email;
            donor.Address = dto.Address;
            donor.LastDonationDate = dto.LastDonationDate;
            donor.UpdatedAt = DateTime.UtcNow;

            if (dto.PictureFile != null)
            {
                if (!string.IsNullOrEmpty(donor.Picture) && donor.Picture != "noimage.png")
                {
                    DeleteImage(donor.Picture);
                }
                donor.Picture = await SaveImage(dto.PictureFile);
            }

            _context.Entry(donor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonor(int id)
        {
            var donor = await _context.Donors.FindAsync(id);
            if (donor == null) return NotFound();

            if (!string.IsNullOrEmpty(donor.Picture) && donor.Picture != "noimage.png")
            {
                DeleteImage(donor.Picture);
            }

            _context.Donors.Remove(donor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpGet("bloodgroups")]
        public async Task<ActionResult<IEnumerable<BloodGroupDTO>>> GetBloodGroups()
        {
            var groups = await _context.BloodGroups.ToListAsync();

            var dtoList = groups.Select(g => new BloodGroupDTO
            {
                BloodGroupId = g.BloodGroupId,
                GroupName = g.GroupName
            }).ToList();

            return Ok(dtoList);
        }

       
        [NonAction]
        private async Task<string> SaveImage(IFormFile file)
        {
            string folderPath = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

            string fileName = Path.GetFileNameWithoutExtension(file.FileName)
                .Replace(" ", "_")
                + "_" + Guid.NewGuid() + Path.GetExtension(file.FileName);

            string fullPath = Path.Combine(folderPath, fileName);
            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return "/uploads/" + fileName;
        }

        [NonAction]
        private void DeleteImage(string path)
        {
            string file = path.StartsWith("/") ? path.Substring(1) : path;
            var fullPath = Path.Combine(_env.WebRootPath, file);
            if (System.IO.File.Exists(fullPath)) System.IO.File.Delete(fullPath);
        }

        [NonAction]
        private string GetPictureUrl(string path)
        {
            if (string.IsNullOrEmpty(path)) return null;
            return $"{Request.Scheme}://{Request.Host}{Request.PathBase}{path}";
        }
       
    }
}
