using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Entities
{
	public class RoomType
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public double Price { get; set; }
		public RoomQuality RoomQuality { get; set; }

		public List<Accessory> Accessories { get; set; }
	}
}
