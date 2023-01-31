using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Entities
{
	public class Guest
	{
		public long Id { get; set; }
		public string PersonalId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string BirthPlace { get; set; }
		public string Phone { get; set; }
		public string Email { get; set; }
		public string Note { get; set; }
		public DateTime BirthDate { get; set; }
		public Gender Gender { get; set; }
		public GuestStatus Status { get; set; }

		public Address Address { get; set; }
		public Room Room { get; set; }
		public Hotel Hotel { get; set; }
		public virtual ICollection<Reservation> Reservations { get; set; } 
	}
}
