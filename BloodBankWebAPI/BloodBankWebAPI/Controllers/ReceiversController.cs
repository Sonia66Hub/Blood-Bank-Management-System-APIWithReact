using BloodBankWebAPI.Data;
using BloodBankWebAPI.Models;
using BloodBankWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BloodBankWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiversController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReceiversController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceiverDTO>>> GetReceivers()
        {
            var receivers = await _context.Receivers
                .Include(r => r.BloodGroup)
                .ToListAsync();

            return receivers.Select(r => new ReceiverDTO
            {
                ReceiverId = r.ReceiverId,
                FullName = r.FullName,
                BloodGroupId = r.BloodGroupId,
                ContactNo = r.ContactNo,
                RequestDate = r.RequestDate,
                Status = r.Status,
                Address = r.Address,
                CreatedAt = r.CreatedAt
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReceiverDTO>> GetReceiver(int id)
        {
            var r = await _context.Receivers.FindAsync(id);
            if (r == null) return NotFound();

            return new ReceiverDTO
            {
                ReceiverId = r.ReceiverId,
                FullName = r.FullName,
                BloodGroupId = r.BloodGroupId,
                ContactNo = r.ContactNo,
                RequestDate = r.RequestDate,
                Status = r.Status,
                Address = r.Address,
                CreatedAt = r.CreatedAt
            };
        }

        [HttpPost]
        public async Task<ActionResult<ReceiverDTO>> PostReceiver(ReceiverDTO dto)
        {
            var r = new Receiver
            {
                FullName = dto.FullName,
                BloodGroupId = dto.BloodGroupId,
                ContactNo = dto.ContactNo,
                RequestDate = dto.RequestDate,
                Status = dto.Status,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow
            };

            _context.Receivers.Add(r);
            await _context.SaveChangesAsync();

            dto.ReceiverId = r.ReceiverId;
            dto.CreatedAt = r.CreatedAt;

            return CreatedAtAction(nameof(GetReceiver), new { id = r.ReceiverId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceiver(int id, ReceiverDTO dto)
        {
            if (id != dto.ReceiverId) return BadRequest();

            var r = await _context.Receivers.FindAsync(id);
            if (r == null) return NotFound();

            r.FullName = dto.FullName;
            r.BloodGroupId = dto.BloodGroupId;
            r.ContactNo = dto.ContactNo;
            r.RequestDate = dto.RequestDate;
            r.Status = dto.Status;
            r.Address = dto.Address;

            _context.Entry(r).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceiver(int id)
        {
            var r = await _context.Receivers.FindAsync(id);
            if (r == null) return NotFound();

            _context.Receivers.Remove(r);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
