using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande_backend.Services.InventoryServices;

public class InventoryService : IInventoryService
{
    private readonly GrandeHotelContext _context;

    public InventoryService(GrandeHotelContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Inventory>> GetAllInventoriesAsync()
    {
        return await _context.Inventories.Include(i => i.Items).ToListAsync();
    }

    public async Task<Inventory> GetInventoryByIdAsync(long id)
    {
        return await _context.Inventories.Include(i => i.Items)
            .FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task<Inventory> GetInventoryByHotelIdAsync(long hotelId)
    {
        return await _context.Inventories.Include(i => i.Items)
            .FirstOrDefaultAsync(i => i.Hotel.Id == hotelId);
    }

    public async Task<IEnumerable<Item>> GetItemsByInventoryIdAsync(long inventoryId)
    {
        return await _context.Items
            .Where(i => i.Inventory.Id == inventoryId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Item>> GetAllItemsAsync()
    {
        return await _context.Items.ToListAsync();
    }

    public async Task<Item> GetItemByIdAsync(long itemId)
    {
        return await _context.Items.FirstOrDefaultAsync(i => i.Id == itemId);
    }

    public async Task<bool> InventoryExistsAsync(long id)
    {
        return await _context.Inventories.AnyAsync(i => i.Id == id);
    }

    public async Task<bool> CreateInventoryAsync(Inventory inventory)
    {
        _context.Inventories.Add(inventory);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateInventoryAsync(Inventory inventory)
    {
        _context.Inventories.Update(inventory);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteInventoryAsync(long id)
    {
        var inventory = await _context.Inventories.FindAsync(id);
        if (inventory == null) return false;

        _context.Inventories.Remove(inventory);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> CreateItemAsync(Item item)
    {
        _context.Items.Add(item);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateItemAsync(Item item)
    {
        _context.Items.Update(item);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteItemAsync(long id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null)
        {
            return false;
        }

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }
}