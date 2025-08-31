using BloodBankWebAPI.Data;
using BloodBankWebAPI.Models;
using BloodBankWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BloodBankWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationHistoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DonationHistoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonationHistoryDTO>>> GetDonationHistories()
        {
            var histories = await _context.DonationHistories.ToListAsync();

            var dtos = histories.Select(h => new DonationHistoryDTO
            {
                DonationId = h.DonationId,
                DonorId = h.DonorId,
                DonationDate = h.DonationDate,
                DonationLocation = h.DonationLocation,
                Notes = h.Notes,
                CreatedAt = h.CreatedAt
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DonationHistoryDTO>> GetDonationHistory(int id)
        {
            var h = await _context.DonationHistories.FindAsync(id);
            if (h == null) return NotFound();

            return new DonationHistoryDTO
            {
                DonationId = h.DonationId,
                DonorId = h.DonorId,
                DonationDate = h.DonationDate,
                DonationLocation = h.DonationLocation,
                Notes = h.Notes,
                CreatedAt = h.CreatedAt
            };
        }

        [HttpPost]
        public async Task<ActionResult<DonationHistoryDTO>> PostDonationHistory(DonationHistoryDTO dto)
        {
            var h = new DonationHistory
            {
                DonorId = dto.DonorId,
                DonationDate = dto.DonationDate,
                DonationLocation = dto.DonationLocation,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow
            };

            _context.DonationHistories.Add(h);
            await _context.SaveChangesAsync();

            dto.DonationId = h.DonationId;
            dto.CreatedAt = h.CreatedAt;

            return CreatedAtAction(nameof(GetDonationHistory), new { id = h.DonationId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonationHistory(int id, DonationHistoryDTO dto)
        {
            if (id != dto.DonationId) return BadRequest();

            var h = await _context.DonationHistories.FindAsync(id);
            if (h == null) return NotFound();

            h.DonorId = dto.DonorId;
            h.DonationDate = dto.DonationDate;
            h.DonationLocation = dto.DonationLocation;
            h.Notes = dto.Notes;

            _context.Entry(h).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonationHistory(int id)
        {
            var h = await _context.DonationHistories.FindAsync(id);
            if (h == null) return NotFound();

            _context.DonationHistories.Remove(h);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
