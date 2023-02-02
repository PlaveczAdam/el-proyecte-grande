using AutoMapper;
using el_proyecte_grande_backend.Models.Dtos.Reservation;
using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Configurations
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration()
        {
            CreateMap<Reservation, GetAllReservationDTO>().ReverseMap();
            CreateMap<Reservation, GetReservationDTO>().ReverseMap();
            CreateMap<Reservation, AddReservationDTO>().ReverseMap();
            CreateMap<Reservation, UpdateReservationDTO>().ReverseMap();

            CreateMap<Reservator, GetReservatorDTOForReservation>().ReverseMap();
            CreateMap<Reservator, AddReservatorDTOForReservation>().ReverseMap();

            CreateMap<Address, AddressDTOForReservation>().ReverseMap();
            CreateMap<Room, RoomDTOsForReservation>().ReverseMap();
        }
    }
}
