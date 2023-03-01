using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace el_proyecte_grande_backend.Models.Dtos.Inventory;

public class InventoryDto
{
	public long Id { get; set; }
	public long HotelId { get; set; }
	public List<long>? ItemIds { get; set; }
}