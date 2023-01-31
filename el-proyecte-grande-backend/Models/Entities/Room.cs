using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Entities
{
	public class Room
	{
		public long Id { get; set; }
		public int Floor { get; set; }
		public int DoorNo { get; set; }
		public bool Accessible { get; set; }
		public RoomStatus Status { get; set; }

		public Hotel Hotel { get; set; }
		public RoomType RoomType { get; set; }
		public virtual ICollection<Reservation> Reservations { get; set; }
	}
}
