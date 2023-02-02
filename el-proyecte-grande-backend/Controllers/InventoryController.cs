using System.Collections.Generic;
using System.Threading.Tasks;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Repositories.Inventories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace el_proyecte_grande_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InventoryController : ControllerBase
{
	private readonly IInventoryRepository _inventoryRepository;

	public InventoryController(IInventoryRepository inventoryRepository)
	{
		_inventoryRepository = inventoryRepository;
	}

	// GET: api/Inventory
	[HttpGet]
	public async Task<ActionResult<IEnumerable<Inventory>>> GetInventories()
	{
		var inventories = await _inventoryRepository.GetAllInventoriesAsync();
		return Ok(inventories);
	}

	// GET: api/Inventory/5
	[HttpGet("{id}")]
	public async Task<ActionResult<Inventory>> GetInventory(long id)
	{
		var inventory = await _inventoryRepository.GetInventoryByIdAsync(id);

		if (inventory == null)
		{
			return NotFound();
		}

		return Ok(inventory);
	}

	// GET: api/Inventory/Hotel/5
	[HttpGet("Hotel/{hotelId}")]
	public async Task<ActionResult<Inventory>> GetInventoryByHotelId(long hotelId)
	{
		var inventory = await _inventoryRepository.GetInventoryByHotelIdAsync(hotelId);

		if (inventory == null)
		{
			return NotFound();
		}

		return Ok(inventory);
	}

	// GET: api/Inventory/5/Items
	[HttpGet("{inventoryId}/Items")]
	public async Task<ActionResult<IEnumerable<Item>>> GetItems(long inventoryId)
	{
		var items = await _inventoryRepository.GetItemsByInventoryIdAsync(inventoryId);

		if (items == null)
		{
			return NotFound();
		}

		return Ok(items);
	}

	// GET: api/Inventory/Item/5
	[HttpGet("Item/{itemId}")]
	public async Task<ActionResult<Item>> GetItem(long itemId)
	{
		var item = await _inventoryRepository.GetItemByIdAsync(itemId);

		if (item == null)
		{
			return NotFound();
		}

		return Ok(item);
	}

	// POST: api/Inventory
	[HttpPost]
	public async Task<ActionResult<Inventory>> CreateInventory(Inventory inventory)
	{
		if (!await _inventoryRepository.InventoryExistsAsync(inventory.Id))
		{
			if (await _inventoryRepository.CreateInventoryAsync(inventory))
			{
				return CreatedAtAction("GetInventory", new { id = inventory.Id }, inventory);
			}
			else
			{
				return BadRequest("Failed to create inventory.");
			}
		}
		else
		{
			return BadRequest("Inventory already exists.");
		}
	}

	// PUT: api/Inventory/5
	[HttpPut("{id}")]
	public async Task<ActionResult<Inventory>> UpdateInventory(long id, Inventory inventory)
	{
		if (id != inventory.Id)
		{
			return BadRequest();
		}

		if (await _inventoryRepository.UpdateInventoryAsync(inventory))
		{
			return NoContent();
		}
		else
		{
			return NotFound();
		}
	}

	// DELETE: api/Inventory/5
	[HttpDelete("{id}")]
	public async Task<ActionResult<Inventory>> DeleteInventory(long id)
	{
		if (!await _inventoryRepository.InventoryExistsAsync(id))
		{
			return NotFound();
		}

		if (await _inventoryRepository.DeleteInventoryAsync(id))
		{
			return NoContent();
		}
		else
		{
			return BadRequest();
		}
	}
}
