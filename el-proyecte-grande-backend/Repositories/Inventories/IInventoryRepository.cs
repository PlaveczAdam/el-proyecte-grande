using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Repositories.Inventories;

public interface IInventoryRepository
{
	public Task<IEnumerable<Inventory>> GetAllInventories();
	public Task<Inventory> GetInventoryById(int id);
	public Task<Inventory> GetInventoryByHotel(int hotelId);
	public Task<Inventory> AddInventory(Inventory inventory);
	public Task<Inventory> UpdateInventory(Inventory inventory);
}
