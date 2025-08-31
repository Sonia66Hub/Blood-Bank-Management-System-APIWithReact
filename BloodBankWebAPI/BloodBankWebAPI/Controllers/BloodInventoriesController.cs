using BloodBankWebAPI.Data;
using BloodBankWebAPI.Models;
using BloodBankWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BloodBankWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodInventoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BloodInventoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloodInventoryDTO>>> GetBloodInventories()
        {
            var inventories = await _context.BloodInventories
                .Include(bi => bi.BloodGroup)
                .ToListAsync();

            var dtoList = inventories.Select(i => new BloodInventoryDTO
            {
                InventoryId = i.InventoryId,
                BloodGroupId = i.BloodGroupId,
                BloodGroupName = i.BloodGroup?.GroupName,
                QuantityML = i.UnitsAvailable, 
                StorageLocation = i.StorageLocation, 
                LastUpdated = i.LastUpdated
            }).ToList();

            return Ok(dtoList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BloodInventoryDTO>> GetBloodInventory(int id)
        {
            var inventory = await _context.BloodInventories
                .Include(bi => bi.BloodGroup)
                .FirstOrDefaultAsync(i => i.InventoryId == id);

            if (inventory == null) return NotFound();

            var dto = new BloodInventoryDTO
            {
                InventoryId = inventory.InventoryId,
                BloodGroupId = inventory.BloodGroupId,
                BloodGroupName = inventory.BloodGroup?.GroupName,
                QuantityML = inventory.UnitsAvailable,
                StorageLocation = inventory.StorageLocation, 
                LastUpdated = inventory.LastUpdated
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<BloodInventoryDTO>> PostBloodInventory(BloodInventoryDTO dto)
        {
            var inventory = new BloodInventory
            {
                BloodGroupId = dto.BloodGroupId,
                UnitsAvailable = dto.QuantityML, 
                StorageLocation = dto.StorageLocation, 
                LastUpdated = DateTime.UtcNow
            };

            _context.BloodInventories.Add(inventory);
            await _context.SaveChangesAsync();

            dto.InventoryId = inventory.InventoryId;
            dto.LastUpdated = inventory.LastUpdated;

            
            await _context.Entry(inventory).Reference(bi => bi.BloodGroup).LoadAsync();
            dto.BloodGroupName = inventory.BloodGroup?.GroupName;

            return CreatedAtAction(nameof(GetBloodInventory), new { id = inventory.InventoryId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBloodInventory(int id, BloodInventoryDTO dto)
        {
            if (id != dto.InventoryId) return BadRequest();

            var inventory = await _context.BloodInventories.FindAsync(id);
            if (inventory == null) return NotFound();

            inventory.BloodGroupId = dto.BloodGroupId;
            inventory.UnitsAvailable = dto.QuantityML; 
            inventory.StorageLocation = dto.StorageLocation; 
            inventory.LastUpdated = DateTime.UtcNow;

            _context.Entry(inventory).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodInventory(int id)
        {
            var inventory = await _context.BloodInventories.FindAsync(id);
            if (inventory == null) return NotFound();

            _context.BloodInventories.Remove(inventory);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}