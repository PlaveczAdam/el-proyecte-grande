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

        [Required]
        public bool IsCancelled { get; set; }

        public Hotel? Hotel { get; set; }
        public GetReservatorDTOForReservation Reservator { get; set; }
    }

    public class GetAllReservationDTO : BaseReservationDTO
    {
        public long Id { get; set; }
    }


    public class GetReservationDTO : BaseReservationDTO
    {
        public long Id { get; set; }

        public Hotel Hotel { get; set; }
        public GetReservatorDTOForReservation Reservator { get; set; }

        public List<RoomDTOsForReservation> Rooms { get; set; }
        public List<Guest> Guests { get; set; }
    }

    public class AddReservationDTO : BaseReservationDTO
    {
        [Required]
        public long HotelId { get; set; }

        [Required]
        public AddReservatorDTOForReservation Reservator { get; set; }

        [Required]
        public long[] RoomIds { get; set; }

        //public List<RoomDTOsForReservation> Rooms { get; set; }

    }

    public class UpdateReservationDTO 
    {
        [Required]
        public string PaymentMethod { get; set; }
    }



    public class GetReservatorDTOForReservation
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

    public class RoomDTOsForReservation
    {
        [Required]
        public long Id { get; set; }
        public int Floor { get; set; }
        public int DoorNo { get; set; }
        public bool Accessible { get; set; }
        public string Status { get; set; }

        public RoomType RoomType { get; set; }
    }
}
