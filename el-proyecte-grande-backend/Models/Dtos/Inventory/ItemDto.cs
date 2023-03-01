using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Dtos.Inventory;

public class ItemDto
{
	public int Id { get; set; }
	public string Name { get; set; }
	public uint Amount { get; set; }
	public uint RequiredAmount { get; set; }
	public ItemType ItemType { get; set; }
	public long InventoryID { get; set; }
}
