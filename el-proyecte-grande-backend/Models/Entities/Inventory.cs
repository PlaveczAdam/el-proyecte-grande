namespace el_proyecte_grande_backend.Models.Entities
{
	public class Inventory
	{
		public long Id { get; set; }
		public List<Item> Inventories { get; set; }

		public Hotel Hotel { get; set; }
	}
}
