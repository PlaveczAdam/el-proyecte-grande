using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Entities
{
	public class Item
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public uint Amount { get; set; }
        public uint RequiredAmount { get; set; }
		public ItemType ItemType { get; set; }

		public Inventory Inventory { get; set; }
    }
}
