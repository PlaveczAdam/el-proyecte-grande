using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Entities
{
	public class Reservation
	{
		public long Id { get; set; }
		public uint ReservedFor { get; set; }
		public DateTime ReserveDate { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public double Price { get; set; }
		public bool PayFullfillment { get; set; }
		public BoardType BoardType { get; set; }
		public PaymentMethod? PaymentMethod { get; set; }

		public Reservator Reservator { get; set; }
		public Hotel Hotel { get; set; }
		public List<Room> Rooms { get; set; }
		public List<Guest> Guests { get; set; }

	}
}
