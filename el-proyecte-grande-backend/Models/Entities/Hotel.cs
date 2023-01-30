using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Entities
{
	public class Hotel
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public HotelStatus Status { get; set; }
		public Classification Classification { get; set; }
		public uint Floor { get; set; }
		public uint Rooms { get; set; }

		public Address Address { get; set; }
	}
}
