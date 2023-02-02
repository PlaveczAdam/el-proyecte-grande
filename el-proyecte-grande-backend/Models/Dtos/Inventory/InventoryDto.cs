using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using System.ComponentModel.DataAnnotations;


namespace el_proyecte_grande_backend.Models.Dtos.Inventory
{
	public class GetInventoryDTO
	{
		public long Id { get; set; }

		public List<GetItemDTO> Items { get; set; }
		public Hotel Hotel { get; set; }
	}

	public class AddInventoryDTO
	{
		[Required]
		public int HotelId { get; set; }

		[Required]
		public List<AddItemDTO> Items { get; set; }
	}

	public class UpdateInventoryDTO : AddInventoryDTO
	{
	}

	public class GetItemDTO
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public uint Amount { get; set; }
		public uint RequiredAmount { get; set; }
		public ItemType ItemType { get; set; }
	}

	public class AddItemDTO
	{
		[Required]
		public string Name { get; set; }

		[Required]
		public uint Amount { get; set; }

		[Required]
		public uint RequiredAmount { get; set; }

		[Required]
		public ItemType ItemType { get; set; }
	}
}
