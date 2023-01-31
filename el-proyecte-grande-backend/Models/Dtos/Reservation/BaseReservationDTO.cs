using el_proyecte_grande_backend.Models.Entities;
using Microsoft.Build.Framework;

namespace el_proyecte_grande_backend.Models.Dtos.Reservation
{
    public abstract class BaseReservationDTO
    {
        [Required]
        public uint ReservedFor { get; set; }

        [Required]
        public DateTime ReserveDate { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public bool PayFullfillment { get; set; }

        [Required]
        public string BoardType { get; set; }

        [Required]
        public string? PaymentMethod { get; set; }
    }

    public class GetAllReservationDTO : BaseReservationDTO
    {
        public long Id { get; set; }
    }


    public class GetReservationDTO : BaseReservationDTO
    {
        public long Id { get; set; }

        public Hotel Hotel { get; set; }
        public Reservator Reservator { get; set; }

        public List<Room> Rooms { get; set; }
        public List<Guest> Guests { get; set; }
    }

    public class AddReservationDTO : BaseReservationDTO
    { 
        public int HotelId { get; set; }


    }


    public class UpdateReservationDTO { }



    public class ReservatorDTOForReservation
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public AddressDTOForReservation? Address { get; set; }
    }
    
    public class AddReservatorDTOForReservation
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public AddressDTOForReservation? Address { get; set; }
    }

    public class AddressDTOForReservation
    {
        [Required]
        public string? PostalCode { get; set; }
        [Required]
        public string? Country { get; set; }
        [Required]
        public string? Region { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? AddressLineOne { get; set; }
        [Required]
        public string? AddressLineTwo { get; set; }
    }
}
