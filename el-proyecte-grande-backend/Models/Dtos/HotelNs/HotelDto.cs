using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Dtos.HotelNs
{
    public record HotelDto(long Id, string Name, HotelStatus HotelStatus, Classification Classification, uint Floor, uint Rooms, AddressDto Adress);
}
