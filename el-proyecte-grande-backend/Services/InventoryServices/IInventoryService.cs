using System.Collections.Generic;
using System.Threading.Tasks;
using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Services.InventoryServices
{
    public interface IInventoryService
    {
        Task<IEnumerable<Inventory>> GetAllInventoriesAsync();
        Task<Inventory> GetInventoryByIdAsync(long id);
        Task<Inventory> GetInventoryByHotelIdAsync(long hotelId);
        Task<IEnumerable<Item>> GetItemsByInventoryIdAsync(long inventoryId);
        Task<IEnumerable<Item>> GetAllItemsAsync();
        Task<Item> GetItemByIdAsync(long itemId);
        Task<bool> InventoryExistsAsync(long id);
        Task<bool> CreateInventoryAsync(Inventory inventory);
        Task<bool> UpdateInventoryAsync(Inventory inventory);
        Task<bool> DeleteInventoryAsync(long id);
        Task<bool> CreateItemAsync(Item item);
        Task<bool> UpdateItemAsync(Item item);
        Task<bool> DeleteItemAsync(long id);
    }
}
