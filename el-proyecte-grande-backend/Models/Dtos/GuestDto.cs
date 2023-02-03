using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Dtos
{
    public class GuestDto
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
        public long? HotelId { get; set; }
        public long? RoomId { get; set; }
        public Address Address { get; set; }

    }
}
