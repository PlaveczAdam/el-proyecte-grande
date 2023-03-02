namespace el_proyecte_grande_backend.Models.Entities
{
	public class Accessory
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public uint Quantity { get; set; }

		public RoomType RoomType { get; set; }
	}
}
