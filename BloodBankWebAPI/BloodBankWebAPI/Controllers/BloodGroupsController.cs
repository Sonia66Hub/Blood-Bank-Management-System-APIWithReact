using BloodBankWebAPI.Data;
using BloodBankWebAPI.Models;
using BloodBankWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BloodBankWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodGroupsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BloodGroupsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloodGroupDTO>>> GetBloodGroups()
        {
            var groups = await _context.BloodGroups.ToListAsync();
            return groups.Select(g => new BloodGroupDTO
            {
                BloodGroupId = g.BloodGroupId,
                GroupName = g.GroupName,
                Description = g.Description 
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BloodGroupDTO>> GetBloodGroup(int id)
        {
            var group = await _context.BloodGroups.FindAsync(id);
            if (group == null) return NotFound();

            return new BloodGroupDTO
            {
                BloodGroupId = group.BloodGroupId,
                GroupName = group.GroupName,
                Description = group.Description 
            };
        }

        [HttpPost]
        public async Task<ActionResult<BloodGroupDTO>> PostBloodGroup(BloodGroupDTO dto)
        {
            var group = new BloodGroup
            {
                GroupName = dto.GroupName,
                Description = dto.Description 
            };
            _context.BloodGroups.Add(group);
            await _context.SaveChangesAsync();

            dto.BloodGroupId = group.BloodGroupId;

            return CreatedAtAction(nameof(GetBloodGroup), new { id = group.BloodGroupId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBloodGroup(int id, BloodGroupDTO dto)
        {
            if (id != dto.BloodGroupId) return BadRequest();

            var group = await _context.BloodGroups.FindAsync(id);
            if (group == null) return NotFound();

            group.GroupName = dto.GroupName;
            group.Description = dto.Description; 
            _context.Entry(group).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodGroup(int id)
        {
            var group = await _context.BloodGroups
                .Include(bg => bg.Donors)
                .Include(bg => bg.Receivers)
                .Include(bg => bg.BloodInventory)
                .FirstOrDefaultAsync(bg => bg.BloodGroupId == id);

            if (group == null) return NotFound();

            if (group.Donors.Any() || group.Receivers.Any())
                return BadRequest("Cannot delete blood group with existing donors or receivers.");

            if (group.BloodInventory != null)
                _context.BloodInventories.Remove(group.BloodInventory);

            _context.BloodGroups.Remove(group);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}