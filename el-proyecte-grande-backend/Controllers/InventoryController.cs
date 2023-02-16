using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Repositories.Inventories;
using Microsoft.AspNetCore.Mvc;


namespace el_proyecte_grande_backend.Controllers;

[Route("api/inventory")]
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
	public async Task<IActionResult> GetInventories()
	{
		var inventories = await _inventoryRepository.GetAllInventoriesAsync();
		if (!inventories.Any())
		{
			return NotFound();
		}

		return Ok(inventories);
	}

	// GET: api/Inventory/5
	[HttpGet("{id}")]
	public async Task<IActionResult> GetInventory(long id)
	{
		var inventory = await _inventoryRepository.GetInventoryByIdAsync(id);
		if (inventory == null)
		{
			return NotFound();
		}
		return Ok(inventory);
	}


	// GET: api/Inventory/Hotel/5
	[HttpGet("hotel/{hotelId}")]
	public async Task<IActionResult> GetInventoryByHotelId(long hotelId)
	{
		var inventory = await _inventoryRepository.GetInventoryByHotelIdAsync(hotelId);
		if (inventory == null)
		{
			return NotFound();
		}

		return Ok(inventory);
	}


	// GET: api/Inventory/Item
	[HttpGet("item")]
	public async Task<IActionResult> GetItems()
	{
		var items = await _inventoryRepository.GetAllItemsAsync();
		return Ok(items);
	}



	// GET: api/Inventory/Item/5
	[HttpGet("item/{itemId}")]
	public async Task<IActionResult> GetItem(long id)
	{
		var item = await _inventoryRepository.GetItemByIdAsync(id);
		if (item == null)
		{
			return NotFound();
		}

		return Ok(item);
	}

	// GET: api/Inventory/5/Items
	[HttpGet("{inventoryId}/items")]
	public async Task<IActionResult> GetItemsOfInventory(long inventoryId)
	{
		var items = await _inventoryRepository.GetItemsByInventoryIdAsync(inventoryId);
		if (items == null)
		{
			return NotFound();
		}

		return Ok(items);
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

	// POST: api/Inventory/Item
	[HttpPost("item")]
	public async Task<IActionResult> CreateItem([FromBody] Item item)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var success = await _inventoryRepository.CreateItemAsync(item);
		if (success)
		{
			return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
		}
		else
		{
			return BadRequest();
		}
	}

	//PUT: api/Inventory/Item/{id}
	[HttpPut("item/{id}")]
	public async Task<IActionResult> UpdateItem(long id, [FromBody] Item item)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var itemToUpdate = await _inventoryRepository.GetItemByIdAsync(id);
		if (itemToUpdate == null)
		{
			return NotFound();
		}

		itemToUpdate.Name = item.Name;
		itemToUpdate.ItemType = item.ItemType;
		itemToUpdate.Inventory = item.Inventory;

		await _inventoryRepository.UpdateItemAsync(itemToUpdate);
		return NoContent();
	}

	//DELETE: api/Inventory/Item/{id}
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteItem(long id)
	{
		var item = await _inventoryRepository.GetItemByIdAsync(id);
		if (item == null)
		{
			return NotFound();
		}

		var success = await _inventoryRepository.DeleteItemAsync(item.Id);
		if (success)
		{
			return NoContent();
		}

		return BadRequest();
	}

}
